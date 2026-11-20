<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import { useLocalStorage } from '|integrator/data-access/web-api/local-storage/local-storage'
import PriceComparisonSingleInput from './PriceComparisonSingleInput.vue'

// # Private configuration

const calculatorLocaleStorageKey = 'pragmatic-calculations:price-comparison-v2→singleInputText'
const singleInputTextDefault = ''

// # Uses in the template

const singleInputTextLS = useLocalStorage(calculatorLocaleStorageKey, singleInputTextDefault)
const singleInputTextModel = shallowRef(singleInputTextLS.state.value)
const singleInputHintText = 'ⓘ Type “{price} {package size} {optional comment}” lines and press “Parse”'
const singleInputTextAreaPlaceholder = '89.99 950 milk A\n129.99 1500 milk B'
const singleInputTitleText = 'Single input'
watch(singleInputTextModel, (value: string): void => {
  singleInputTextLS.writeValue(value)
})

const errorInitialDataLabelText = 'Initial data'
const errorRangeCodename = 'Range error'
const errorSyntaxCodename = 'Syntax error'
const parseSingleInputButtonText = 'Parse'
const reportInitialMessage = 'Here will be a report on the best prices.'
const resetButtonText = 'Reset'
const titleText = 'Price comparison: single input'

const clearLocaleStorageButtonText = 'Clear locale storage'
const clearLocaleStorageForCalculatorButtonText = 'Clear locale storage for the calculator'
function clearLocaleStorageButtonClickHandler(): void {
  singleInputTextLS.clear()
}
function clearLocaleStorageForCalculatorButtonClickHandler(): void {
  singleInputTextLS.removeItem()
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <div class="app-content-and-extra-buttons">
          <PriceComparisonSingleInput
            v-model:single-input-text="singleInputTextModel"
            :error-initial-data-label-text="errorInitialDataLabelText"
            :error-range-codename="errorRangeCodename"
            :error-syntax-codename="errorSyntaxCodename"
            :parse-single-input-button-text="parseSingleInputButtonText"
            :report-initial-message="reportInitialMessage"
            :reset-button-text="resetButtonText"
            :single-input-hint-text="singleInputHintText"
            :single-input-text-area-placeholder="singleInputTextAreaPlaceholder"
            :single-input-title-text="singleInputTitleText"
            :title-text="titleText"
          />
          <div class="app-extra-buttons">
            <button
              class="app-clear-locale-storage-for-calculator-button"
              type="button"
              @click="clearLocaleStorageForCalculatorButtonClickHandler"
            >
              {{ clearLocaleStorageForCalculatorButtonText }}
            </button>
            <button
              class="app-clear-locale-storage-for-calculator-button"
              type="button"
              @click="clearLocaleStorageButtonClickHandler"
            >
              {{ clearLocaleStorageButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/interactive/buttons'
@use '../../ui-kit/layout/layout'

.app-component-independent-root
  padding-block: 20px

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin


.app-content-and-extra-buttons
  @include layout.app-layout_flex-column-mixin(16px)


.app-clear-locale-storage-button
  @include buttons.app-interactive-standalone-buttons_button-secondary-mixin

.app-clear-locale-storage-for-calculator-button
  @include buttons.app-interactive-standalone-buttons_button-secondary-mixin

.app-extra-buttons
  display: flex
  flex-wrap: wrap
  gap: 8px
  padding: 4px 20px
</style>
