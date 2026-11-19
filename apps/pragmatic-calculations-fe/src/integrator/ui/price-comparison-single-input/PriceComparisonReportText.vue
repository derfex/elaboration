<script lang="ts" setup>
import { ref, watch } from 'vue'
import { calculateRoundedNumberParts } from '|logic/rounded-number/rounded-number'
import {
  type BargainReport,
  type BargainReportCommodityItem,
  type BargainReportRangeErrorItem,
  type BargainReportSyntaxErrorItem,
} from '|ui/price-comparison-single-input/bargain-report.utility'

// # API

const props = defineProps<{
  readonly initialMessage: string
  readonly report: BargainReport
}>()

// # Uses in the template

const bargainReportText = ref<string>(props.initialMessage)
watch(props, (): void => {
  bargainReportText.value = _generateReportText(props.report)
})

// # Private

function _generateCommoditiesText(commoditiesList: readonly BargainReportCommodityItem[]): string {
  const essential = 2
  const minor = 4
  return _sortCommodities(commoditiesList)
    .map(
      (
        {
          report: { comment, costPer1000Units, costPerUnit, packageSize, price },
          sequentialNumber,
        }: BargainReportCommodityItem,
        index,
      ): string => {
        const costPerUnitNumberParts = calculateRoundedNumberParts(costPerUnit, essential, minor)
        const costPerUnitText = `${costPerUnitNumberParts.essential}{${costPerUnitNumberParts.minor}}`
        const costPer1000UnitsNumberParts = calculateRoundedNumberParts(costPer1000Units, essential, minor)
        const costPer1000UnitsText = `${costPer1000UnitsNumberParts.essential}{${costPer1000UnitsNumberParts.minor}}`
        const cost = `${costPerUnitText} (1000: ${costPer1000UnitsText})`
        return `${index + 1}. #${sequentialNumber}. ${price}¤ ÷ ${packageSize} = ${cost}${comment ? ' — ' + comment : ''}`
      },
    )
    .join('\n')
}

function _generateRangeErrorsText(syntaxErrorsList: readonly BargainReportRangeErrorItem[]): string {
  return syntaxErrorsList
    .map(({ report, sequentialNumber }: BargainReportRangeErrorItem): string => {
      return `   #${sequentialNumber}. ${report}\n`
    })
    .join('')
}

function _generateSyntaxErrorsText(syntaxErrorsList: readonly BargainReportSyntaxErrorItem[]): string {
  return syntaxErrorsList
    .map(({ report, sequentialNumber }: BargainReportSyntaxErrorItem): string => {
      return `   #${sequentialNumber}. ${report}\n`
    })
    .join('')
}

function _generateReportText(report: BargainReport): string {
  const {
    commodities,
    errors: { range, syntax },
  } = report
  return _generateRangeErrorsText(range) + _generateSyntaxErrorsText(syntax) + _generateCommoditiesText(commodities)
}

function _sortCommoditiesCompareFn(a: BargainReportCommodityItem, b: BargainReportCommodityItem): number {
  return a.report.costPerUnit - b.report.costPerUnit
}

function _sortCommodities(commodities: readonly BargainReportCommodityItem[]): readonly BargainReportCommodityItem[] {
  // TODO:
  //  TS2550: Property `toSorted` does not exist on type `BargainReportCommodityItem[]`.
  //  Do you need to change your target library? Try changing the `lib` compiler option to `es2023` or later.
  return [...commodities].sort(_sortCommoditiesCompareFn)
}
</script>

<template>
  <div>
    <pre class="app-component-independent-root">{{ bargainReportText }}</pre>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/ui-kit'


$_root_border-radius: 4px
$_root_padding: 8px
$_root_font-size: 16px


.app-component-independent-root
  @include ui-kit.app-ui-kit_glass-mixin

  margin-block: 0
  border-radius: $_root_border-radius
  padding: $_root_padding
  font-size: $_root_font-size
  white-space: pre-wrap
</style>
