<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import { useLocalStorage } from '|integrator/data-access/web-api/local-storage/local-storage'
import PriceComparisonSingleInput from './PriceComparisonSingleInput.vue'

// # Private configuration

const singleInputTextDefault = ''

// # Uses in the template

const singleInputTextLS = useLocalStorage('pragmatic-calculations:singleInputText', singleInputTextDefault)
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
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
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
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/layout/layout'

.app-component-independent-root
  padding-block: 20px

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin
</style>
