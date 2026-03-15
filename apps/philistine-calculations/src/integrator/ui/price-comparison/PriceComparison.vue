<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import ConvenientNumberInput from '|ui-kit/form/ConvenientNumberInput.vue'
import RoundedNumber from '|ui-kit/form/RoundedNumber.vue'

// # Private configuration

let _inputGroupKey = 0
const _inputGroupQuantity = 3

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

const inputGroups = ref<InputGroupItem[]>(
  _createInputGroups(props.packageSize, props.price, _inputGroupQuantity) as InputGroupItem[],
)
const costPerUnitList = computed<readonly number[]>(() => {
  return inputGroups.value.map(({ packageSize, price }: InputGroupItem) => calculateCostPerUnit(price, packageSize))
})

watch(props, (): void => {
  inputGroups.value.forEach((group: InputGroupItem): void => {
    group.packageSize = props.packageSize
    group.price = props.price
  })
})

const clearFormButtonText = 'Clear all “Price” and “Package size”'
function clearFormButtonClickHandler(): void {
  inputGroups.value.forEach((group: InputGroupItem): void => {
    group.packageSizeString = ''
    group.priceString = ''
  })
}
const packageSizeConvenientNumberInputOperands = [0.01, 0.1] as const
const priceConvenientNumberInputOperands = [0.01, 100] as const
const roundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 2, minor: 4 } as const

// # Private

function calculateCostPerUnit(price: number, packageSize: number): number {
  return price / packageSize
}

function _createInputGroupItem(packageSize: number, price: number): InputGroupItem {
  const key = ++_inputGroupKey
  const packageSizeString = '' + packageSize
  const priceString = '' + price
  return {
    key,
    packageSize,
    packageSizeString,
    price,
    priceString,
  }
}

function _createInputGroups(packageSize: number, price: number, quantity: number): readonly InputGroupItem[] {
  const groups = []
  for (let i = 0; i < quantity; i++) {
    groups.push(_createInputGroupItem(packageSize, price))
  }
  return groups
}

interface InputGroupItem {
  readonly key: number
  packageSize: number
  packageSizeString: string
  price: number
  priceString: string
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
            <span class="mdi mdi-eraser" />
            {{ clearFormButtonText }}
          </button>
        </div>
        <div class="app-form-table">
          <div class="app-form-table__header-row">
            <span>{{ props.priceTitleText }}</span>
            <span>{{ props.packageSizeTitleText }}</span>
            <span>{{ props.costPerUnitTitleText }}</span>
          </div>
          <template v-for="(item, index) in inputGroups" :key="item.key">
            <div class="app-form-table__row">
              <label class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.priceTitleText }}</span>
                <ConvenientNumberInput
                  v-model:number="item.price"
                  v-model:string="item.priceString"
                  :input-placeholder="props.priceInputPlaceholder"
                  :operands="priceConvenientNumberInputOperands"
                />
              </label>
              <label class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.packageSizeTitleText }}</span>
                <ConvenientNumberInput
                  v-model:number="item.packageSize"
                  v-model:string="item.packageSizeString"
                  :input-placeholder="props.packageSizeInputPlaceholder"
                  :operands="packageSizeConvenientNumberInputOperands"
                />
              </label>
              <div class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.costPerUnitTitleText }}</span>
                <div class="app-rounded-number-box">
                  <RoundedNumber
                    :number="costPerUnitList[index]"
                    :number-of-digits-after-decimal-point="roundedNumberComponentNumberOfDigitsAfterDecimalPoint"
                  />
                </div>
              </div>
            </div>
          </template>
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
