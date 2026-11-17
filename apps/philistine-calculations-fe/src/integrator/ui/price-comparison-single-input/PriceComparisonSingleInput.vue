<script lang="ts" setup>
import { ref } from 'vue'
import {
  type BargainReportCommodity,
  type BargainReportItem,
  type BargainReportList,
  calculateCostPerUnit,
} from '|ui/price-comparison-single-input/bargain-report.utility'
import {
  parseCommoditiesNotes,
  type ParseCommoditiesReport,
  type ParsedCommodityNote,
} from '|ui/price-comparison-single-input/commodity-parsing.utility'
import PriceComparisonReportText from '|ui/price-comparison-single-input/PriceComparisonReportText.vue'

// # API

const props = defineProps<{
  readonly errorInitialDataLabelText: string
  readonly parseSingleInputButtonText: string
  readonly reportInitialMessage: string
  readonly singleInputHintText: string
  readonly singleInputText: string
  readonly singleInputTextAreaPlaceholder: string
  readonly singleInputTitleText: string
  readonly syntaxErrorCodename: string
  readonly titleText: string
}>()

// # Uses in the template

const bargainReport = ref<BargainReportList>([])
const singleInputModel = ref(props.singleInputText)

function parseSingleInputButtonClickHandler(): void {
  _parseNotes(singleInputModel.value)
}

// # Private

function _convertToBargainReportCommodity({
  comment,
  packageSize,
  price,
}: ParsedCommodityNote): BargainReportCommodity {
  const costPerUnit = calculateCostPerUnit(price, packageSize)
  const costPer1000Units = costPerUnit * 1000
  return {
    comment,
    costPer1000Units,
    costPerUnit,
    packageSize,
    price,
  }
}

function _generateSyntaxErrorMessage(
  syntaxErrorCodename: string,
  syntaxErrorInitialDataLabelText: string,
  initialData: string,
): string {
  return `${syntaxErrorCodename}. ${syntaxErrorInitialDataLabelText}: ${initialData}`
}

function _parseNotes(notes: string): void {
  const report: BargainReportItem[] = []
  const { commodities, syntaxErrors } = parseCommoditiesNotes(notes)
  commodities.forEach(({ parsed, sequentialNumber }: ParseCommoditiesReport['commodities'][number]): void => {
    report.push({
      id: sequentialNumber,
      kind: 'commodity',
      report: _convertToBargainReportCommodity(parsed),
    })
  })
  syntaxErrors.forEach(({ note, sequentialNumber }): void => {
    report.push({
      // TODO: Unused. Check. Do we need `id`.
      id: sequentialNumber,
      kind: 'syntaxError',
      report: _generateSyntaxErrorMessage(props.syntaxErrorCodename, props.errorInitialDataLabelText, note),
    })
  })
  // TODO: The report's items are categorized. Is it ok?
  //  Do we need to categorize the second time (check `_categorizeBargainReportItems`)?
  bargainReport.value = report
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <h2 class="app-title">
        {{ props.titleText }}
      </h2>

      <form class="app-form">
        <label class="app-form__control-container">
          <span>{{ props.singleInputTitleText }}</span>
          <span class="app-single-input-hint">{{ props.singleInputHintText }}</span>
          <textarea
            v-model="singleInputModel"
            :placeholder="props.singleInputTextAreaPlaceholder"
            class="app-single-input-textarea"
          />
        </label>
        <button
          class="app-parse-single-input-button"
          type="button"
          @click="parseSingleInputButtonClickHandler"
        >
          {{ props.parseSingleInputButtonText }}
        </button>
      </form>

      <PriceComparisonReportText
        :initial-message="props.reportInitialMessage"
        :list="bargainReport"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/interactive/buttons'
@use '../../ui-kit/interactive/form/form'
@use '../../ui-kit/layout/layout'
@use '../../ui-kit/ui-kit'


$_form_gap: 24px
$_base_gap: 20px
$_root_gap: $_base_gap * 2
$_root_padding: $_base_gap


.app-component-independent-root
  @include layout.app-layout_flex-column-mixin($_root_gap)
  @include ui-kit.app-ui-kit_glass-mixin

  border-radius: 4px
  padding: $_root_padding


.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin


.app-form
  @include layout.app-layout_flex-column-mixin($_form_gap)

.app-form__control-container
  @include layout.app-layout_flex-column-mixin(8px)


.app-parse-single-input-button
  @include buttons.app-interactive-standalone-buttons_button-primary-mixin

.app-single-input-hint
  font-size: 12px
  // TODO?: Create and use a mixin?
  color: var(--app-color--foreground--small-text)

.app-single-input-textarea
  $_config_line-height: 1.18
  $_config_vertical-paddings: 8px * 2
  $_config_lines-quantity: 5

  $_font-size: 16px
  $_min-height: $_font-size * $_config_line-height * $_config_lines-quantity + $_config_vertical-paddings

  @include form.app-form_textbox_area-mixin
  @include ui-kit.app-ui-kit_glass-mixin

  display: block
  resize: vertical
  width: 100%
  min-height: $_min-height
  font-size: $_font-size
  font-family: monospace
</style>
