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
const r0Price = ref(props.price)
const r0CostPerUnit = computed(() => calculateCostPerUnit(r0Price.value, r0PackageSize.value))
const r1PackageSize = ref(props.packageSize)
const r1Price = ref(props.price)
const r1CostPerUnit = computed(() => calculateCostPerUnit(r1Price.value, r1PackageSize.value))
const r2PackageSize = ref(props.packageSize)
const r2Price = ref(props.price)
const r2CostPerUnit = computed(() => calculateCostPerUnit(r2Price.value, r2PackageSize.value))

watch(props, (): void => {
  r0PackageSize.value = props.packageSize
  r0Price.value = props.price
  r1PackageSize.value = props.packageSize
  r1Price.value = props.price
  r2PackageSize.value = props.packageSize
  r2Price.value = props.price
})

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
      <form class="app-form-table">
        <div class="app-form-table__header-row">
          <span>{{ props.priceTitleText }}</span>
          <span>{{ props.packageSizeTitleText }}</span>
          <span>{{ props.costPerUnitTitleText }}</span>
        </div>
        <div class="app-form-table__row">
          <ConvenientNumberInput
            v-model="r0Price"
            :input-placeholder="props.priceInputPlaceholder"
            :operands="priceConvenientNumberInputOperands"
          />
          <ConvenientNumberInput
            v-model="r0PackageSize"
            :input-placeholder="props.packageSizeInputPlaceholder"
            :operands="packageSizeConvenientNumberInputOperands"
          />
          <div class="app-rounded-number-box">
            <RoundedNumber
              :number="r0CostPerUnit"
              :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
            />
          </div>
        </div>
        <div class="app-form-table__row">
          <ConvenientNumberInput
            v-model="r1Price"
            :input-placeholder="props.priceInputPlaceholder"
            :operands="priceConvenientNumberInputOperands"
          />
          <ConvenientNumberInput
            v-model="r1PackageSize"
            :input-placeholder="props.packageSizeInputPlaceholder"
            :operands="packageSizeConvenientNumberInputOperands"
          />
          <div class="app-rounded-number-box">
            <RoundedNumber
              :number="r1CostPerUnit"
              :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
            />
          </div>
        </div>
        <div class="app-form-table__row">
          <ConvenientNumberInput
            v-model="r2Price"
            :input-placeholder="props.priceInputPlaceholder"
            :operands="priceConvenientNumberInputOperands"
          />
          <ConvenientNumberInput
            v-model="r2PackageSize"
            :input-placeholder="props.packageSizeInputPlaceholder"
            :operands="packageSizeConvenientNumberInputOperands"
          />
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


$_form_gap: 20px
$_root_gap: $_form_gap * 2
$_root_padding: $_form_gap


.app-component-independent-root
  @include layout.app-layout_flex-column-mixin($_root_gap)
  @include ui-kit.app-ui-kit_glass-mixin

  border-radius: 4px
  padding: $_root_padding


.app-form-table
  display: grid
  gap: $_form_gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto auto

.app-form-table__header-row
  display: grid
  align-items: start
  gap: $_form_gap
  grid-column: 1 / 4

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-form-table__row
  display: grid
  align-items: start
  gap: $_form_gap
  grid-column: 1 / 4

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-rounded-number-box
  @include ui-kit.app-ui-kit_form-textbox-mixin

  line-height: normal
  text-align: end

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
