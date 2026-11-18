<script lang="ts" setup>
import { ref, watch } from 'vue'
import { calculateRoundedNumberParts } from '|logic/rounded-number/rounded-number'
import {
  type BargainReportCommodityItem,
  type BargainReportItem,
  type BargainReportList,
  type BargainReportSyntaxErrorItem,
  checkIfBargainReportItemIsCommodity,
  checkIfBargainReportItemIsSyntaxError,
} from '|ui/price-comparison-single-input/bargain-report.utility'

// # API

const props = defineProps<{
  readonly initialMessage: string
  readonly list: BargainReportList
}>()

// # Uses in the template

const bargainReportText = ref<string>(props.initialMessage)
watch(props, (): void => {
  const { commoditiesList, syntaxErrorsList } = _categorizeBargainReportItems(props.list)
  bargainReportText.value = _generateSyntaxErrorsText(syntaxErrorsList) + _generateCommoditiesText(commoditiesList)
})

// # Private

function _categorizeBargainReportItems(bargainReport: BargainReportList): {
  readonly commoditiesList: readonly BargainReportCommodityItem[]
  readonly syntaxErrorsList: readonly BargainReportSyntaxErrorItem[]
} {
  const commoditiesList: BargainReportCommodityItem[] = []
  const syntaxErrorsList: BargainReportSyntaxErrorItem[] = []
  bargainReport.forEach((item: BargainReportItem): void => {
    if (checkIfBargainReportItemIsCommodity(item)) {
      commoditiesList.push(item)
    } else if (checkIfBargainReportItemIsSyntaxError(item)) {
      syntaxErrorsList.push(item)
    } else {
      // TODO.
    }
  })
  commoditiesList.sort(_sortCommoditiesCompareFn)
  return {
    commoditiesList,
    syntaxErrorsList,
  }
}

function _generateCommoditiesText(commoditiesList: readonly BargainReportCommodityItem[]): string {
  const essential = 2
  const minor = 4
  return commoditiesList
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

function _generateSyntaxErrorsText(syntaxErrorsList: readonly BargainReportSyntaxErrorItem[]): string {
  return syntaxErrorsList
    .map(({ report, sequentialNumber }: BargainReportSyntaxErrorItem): string => {
      return `   #${sequentialNumber}. ${report}\n`
    })
    .join('')
}

function _sortCommoditiesCompareFn(a: BargainReportCommodityItem, b: BargainReportCommodityItem): number {
  return a.report.costPerUnit - b.report.costPerUnit
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
