<script lang="ts" setup>
import PriceComparison from './PriceComparison.vue'

// # Uses in the template

const costPerUnitTitleText = 'Cost per unit'
const packageSize = 100
const packageSizeInputPlaceholder = '' + packageSize
const packageSizeTitleText = 'Package size'
const price = 250
const priceInputPlaceholder = '' + price
const priceTitleText = 'Price'
const titleText = 'Price comparison'
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <PriceComparison
          :cost-per-unit-title-text="costPerUnitTitleText"
          :package-size-input-placeholder="packageSizeInputPlaceholder"
          :package-size-title-text="packageSizeTitleText"
          :package-size="packageSize"
          :price-input-placeholder="priceInputPlaceholder"
          :price-title-text="priceTitleText"
          :price="price"
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
