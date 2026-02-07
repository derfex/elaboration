<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import ConvenientNumberInput from '|ui-kit/form/ConvenientNumberInput.vue'
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

const r0PackageSize = ref(props.packageSize)
const r0PackageSizeString = ref('' + props.packageSize)
const r0Price = ref(props.price)
const r0PriceString = ref('' + props.price)
const r0CostPerUnit = computed(() => calculateCostPerUnit(r0Price.value, r0PackageSize.value))
const r1PackageSize = ref(props.packageSize)
const r1PackageSizeString = ref('' + props.packageSize)
const r1Price = ref(props.price)
const r1PriceString = ref('' + props.price)
const r1CostPerUnit = computed(() => calculateCostPerUnit(r1Price.value, r1PackageSize.value))
const r2PackageSize = ref(props.packageSize)
const r2PackageSizeString = ref('' + props.packageSize)
const r2Price = ref(props.price)
const r2PriceString = ref('' + props.price)
const r2CostPerUnit = computed(() => calculateCostPerUnit(r2Price.value, r2PackageSize.value))

watch(props, (): void => {
  r0PackageSize.value = props.packageSize
  r0Price.value = props.price
  r1PackageSize.value = props.packageSize
  r1Price.value = props.price
  r2PackageSize.value = props.packageSize
  r2Price.value = props.price
})

const clearFormButtonText = 'Clear all “Price” and “Package size”'
function clearFormButtonClickHandler(): void {
  r0PackageSizeString.value = ''
  r0PriceString.value = ''
  r1PackageSizeString.value = ''
  r1PriceString.value = ''
  r2PackageSizeString.value = ''
  r2PriceString.value = ''
}
const packageSizeConvenientNumberInputOperands = [0.01, 0.1] as const
const priceConvenientNumberInputOperands = [0.01, 100] as const
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
        <div>
          <button
            class="app-clear-form-button"
            type="button"
            @click="clearFormButtonClickHandler"
          >
            <span class="pi pi-eraser"></span>
            {{ clearFormButtonText }}
          </button>
        </div>
        <div class="app-form-table">
          <div class="app-form-table__header-row">
            <span>{{ props.priceTitleText }}</span>
            <span>{{ props.packageSizeTitleText }}</span>
            <span>{{ props.costPerUnitTitleText }}</span>
          </div>
          <div class="app-form-table__row">
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.priceTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r0Price"
                v-model:string="r0PriceString"
                :input-placeholder="props.priceInputPlaceholder"
                :operands="priceConvenientNumberInputOperands"
              />
            </label>
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.packageSizeTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r0PackageSize"
                v-model:string="r0PackageSizeString"
                :input-placeholder="props.packageSizeInputPlaceholder"
                :operands="packageSizeConvenientNumberInputOperands"
              />
            </label>
            <div class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.costPerUnitTitleText }}</span>
              <div class="app-rounded-number-box">
                <RoundedNumber
                  :number="r0CostPerUnit"
                  :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
                />
              </div>
            </div>
          </div>
          <div class="app-form-table__row">
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.priceTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r1Price"
                v-model:string="r1PriceString"
                :input-placeholder="props.priceInputPlaceholder"
                :operands="priceConvenientNumberInputOperands"
              />
            </label>
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.packageSizeTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r1PackageSize"
                v-model:string="r1PackageSizeString"
                :input-placeholder="props.packageSizeInputPlaceholder"
                :operands="packageSizeConvenientNumberInputOperands"
              />
            </label>
            <div class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.costPerUnitTitleText }}</span>
              <div class="app-rounded-number-box">
                <RoundedNumber
                  :number="r1CostPerUnit"
                  :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
                />
              </div>
            </div>
          </div>
          <div class="app-form-table__row">
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.priceTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r2Price"
                v-model:string="r2PriceString"
                :input-placeholder="props.priceInputPlaceholder"
                :operands="priceConvenientNumberInputOperands"
              />
            </label>
            <label class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.packageSizeTitleText }}</span>
              <ConvenientNumberInput
                v-model:number="r2PackageSize"
                v-model:string="r2PackageSizeString"
                :input-placeholder="props.packageSizeInputPlaceholder"
                :operands="packageSizeConvenientNumberInputOperands"
              />
            </label>
            <div class="app-form-table__value-container">
              <span class="app-form-table__value-title">{{ props.costPerUnitTitleText }}</span>
              <div class="app-rounded-number-box">
                <RoundedNumber
                  :number="r2CostPerUnit"
                  :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/form/buttons'
@use '../../ui-kit/layout/layout'
@use '../../ui-kit/ui-kit'


$_form_gap: 24px
$_form-table_gap: 20px
$_root_gap: $_form-table_gap * 2
$_root_padding: $_form-table_gap


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


.app-form-table
  display: grid
  gap: $_form-table_gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto auto

.app-form-table__header-row
  display: none
  align-items: start
  gap: $_form-table_gap
  grid-column: 1 / 4

  @media (layout.$app-device-width-medium <= width)
    display: grid
    grid-template-columns: subgrid

.app-form-table__row
  display: grid
  align-items: start
  gap: $_form-table_gap
  grid-column: 1 / 4

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-form-table__value-container
  @include layout.app-layout_flex-column-mixin(8px)

.app-form-table__value-title
  @media (layout.$app-device-width-medium <= width)
    display: none


.app-clear-form-button
  @include buttons.app-form-buttons_button-secondary-mixin

.app-rounded-number-box
  @include ui-kit.app-ui-kit_form-textbox-mixin

  line-height: normal
  text-align: end
</style>
