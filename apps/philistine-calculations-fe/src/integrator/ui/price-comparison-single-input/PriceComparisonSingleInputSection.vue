<script lang="ts" setup>
import PriceComparisonSingleInput from './PriceComparisonSingleInput.vue'

// # Uses in the template

const parseSingleInputButtonText = 'Parse'
const singleInputText = ''
const singleInputTextAreaPlaceholder = '89.99 950 milk A\n129.99 1500 milk B'
const singleInputTitleText = 'Single input'
const syntaxErrorCodename = 'Syntax error'
const syntaxErrorInitialDataLabelText = 'Initial data'
const titleText = 'Price comparison: single input'
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <PriceComparisonSingleInput
          :parse-single-input-button-text="parseSingleInputButtonText"
          :single-input-text="singleInputText"
          :single-input-text-area-placeholder="singleInputTextAreaPlaceholder"
          :single-input-title-text="singleInputTitleText"
          :syntax-error-codename="syntaxErrorCodename"
          :syntax-error-initial-data-label-text="syntaxErrorInitialDataLabelText"
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
