<script lang="ts" setup>
import { ref, watch } from 'vue'
import { calculateRoundedNumberParts } from '|logic/rounded-number/rounded-number'
import {
  type BargainReportCommodityItem,
  type BargainReportItem,
  type BargainReportList,
  type BargainReportSyntaxErrorItem,
  checkIfBargainReportItemIsCommodity,
} from '|ui/price-comparison-single-input/bargain-report.utility'

// # API

const props = defineProps<{
  readonly list: BargainReportList
}>()

// # Uses in the template

const bargainReportText = ref<string>('')
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
    } else {
      syntaxErrorsList.push(item)
    }
  })
  commoditiesList.sort((a, b) => a.report.costPerUnit - b.report.costPerUnit)
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
        { id, report: { comment, costPer1000Units, costPerUnit, packageSize, price } }: BargainReportCommodityItem,
        index,
      ): string => {
        const costPerUnitNumberParts = calculateRoundedNumberParts(costPerUnit, essential, minor)
        const costPerUnitText = `${costPerUnitNumberParts.essential}{${costPerUnitNumberParts.minor}}`
        const costPer1000UnitsNumberParts = calculateRoundedNumberParts(costPer1000Units, essential, minor)
        const costPer1000UnitsText = `${costPer1000UnitsNumberParts.essential}{${costPer1000UnitsNumberParts.minor}}`
        const cost = `${costPerUnitText} (1000: ${costPer1000UnitsText})`
        return `${index + 1}. #${id}. ${price}¤ · ${packageSize} → ${cost} — ${comment}`
      },
    )
    .join('\n')
}

function _generateSyntaxErrorsText(syntaxErrorsList: readonly BargainReportSyntaxErrorItem[]): string {
  return syntaxErrorsList
    .map(({ id, report }: BargainReportSyntaxErrorItem): string => {
      return `_. #${id}. ${report}\n`
    })
    .join()
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
$_root_padding: 20px


.app-component-independent-root
  @include ui-kit.app-ui-kit_glass-mixin

  margin-block: 0
  border-radius: $_root_border-radius
  padding: $_root_padding
  white-space: pre-wrap
</style>
