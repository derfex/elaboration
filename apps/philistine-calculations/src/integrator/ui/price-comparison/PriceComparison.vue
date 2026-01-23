<script lang="ts" setup>
import { computed } from 'vue'
import RoundedNumber from '|ui-kit/form/RoundedNumber.vue'

// # API

const props = defineProps<{
  readonly costPerUnitTitleText: string
  readonly packageSize: number
  readonly packageSizeInputPlaceholder: string
  readonly packageSizeTitleText: string
  readonly price: number
  readonly priceInputPlaceholder: string
  readonly priceTitleText: string
  readonly titleText: string
}>()

// # Uses in the template

const r0PackageSize = computed(() => props.packageSize)
const r0Price = computed(() => props.price)
const r0CostPerUnit = computed(() => calculateCostPerUnit(r0Price.value, r0PackageSize.value))
const r1PackageSize = computed(() => props.packageSize)
const r1Price = computed(() => props.price)
const r1CostPerUnit = computed(() => calculateCostPerUnit(r1Price.value, r1PackageSize.value))
const r2PackageSize = computed(() => props.packageSize)
const r2Price = computed(() => props.price)
const r2CostPerUnit = computed(() => calculateCostPerUnit(r2Price.value, r2PackageSize.value))

const roundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 2, minor: 4 } as const

// # Private

function calculateCostPerUnit(price: number, packageSize: number): number {
  return price / packageSize
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <h2 class="app-title">
        {{ props.titleText }}
      </h2>
      <form class="app-form">
        <div class="app-product">
          <span>{{ props.priceTitleText }}</span>
          <span>{{ props.packageSizeTitleText }}</span>
          <span>{{ props.costPerUnitTitleText }}</span>
        </div>
        <div class="app-product">
          <label>
            <input
              v-model="r0Price"
              :placeholder="props.priceInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <label>
            <input
              v-model="r0PackageSize"
              :placeholder="packageSizeInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <div class="app-rounded-number-box">
            <RoundedNumber
              :number="r0CostPerUnit"
              :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
            />
          </div>
        </div>
        <div class="app-product">
          <label>
            <input
              v-model="r1Price"
              :placeholder="props.priceInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <label>
            <input
              v-model="r1PackageSize"
              :placeholder="packageSizeInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <div class="app-rounded-number-box">
            <RoundedNumber
              :number="r1CostPerUnit"
              :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
            />
          </div>
        </div>
        <div class="app-product">
          <label>
            <input
              v-model="r2Price"
              :placeholder="props.priceInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <label>
            <input
              v-model="r2PackageSize"
              :placeholder="packageSizeInputPlaceholder"
              class="app-textbox"
              type="number"
            >
          </label>
          <div class="app-rounded-number-box">
            <RoundedNumber
              :number="r2CostPerUnit"
              :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/layout/layout'
@use '../../ui-kit/ui-kit'


$_app-gap: 20px
$_app-padding: $_app-gap


.app-component-independent-root
  @include layout.app-layout_flex-column-mixin($_app-gap * 2)
  @include ui-kit.app-ui-kit_glass-mixin

  border-radius: 4px
  padding: $_app-padding


.app-form
  display: grid
  gap: $_app-gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto auto

.app-product
  display: grid
  gap: $_app-gap
  grid-column: 1 / 4

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-rounded-number-box
  @include ui-kit.app-ui-kit_form-textbox-mixin

  line-height: normal
  text-align: end

.app-textbox
  @include ui-kit.app-ui-kit_form-textbox-mixin

  width: 100%
  font-family: monospace

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
