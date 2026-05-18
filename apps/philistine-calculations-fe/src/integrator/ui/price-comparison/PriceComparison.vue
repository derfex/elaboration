<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import ConvenientNumberInput from '|ui-kit/form/ConvenientNumberInput.vue'
import RoundedNumber from '|ui-kit/form/RoundedNumber.vue'

// # Private configuration

let _inputGroupExpandedByDefault = true
let _inputGroupKey = 0
const _inputGroupQuantity = 3

// # API

const props = defineProps<{
  readonly clearFormButtonText: string
  readonly collapseInputsButtonText: string
  readonly costPerUnitTitleText: string
  readonly deleteInputGroupButtonHintText: string
  readonly deleteInputGroupTitleText: string
  readonly expandInputsButtonText: string
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
  return inputGroups.value.map(({ packageSize, price }: InputGroupItem) => _calculateCostPerUnit(price, packageSize))
})

watch(props, (): void => {
  inputGroups.value.forEach((group: InputGroupItem): void => {
    group.packageSize = props.packageSize
    group.price = props.price
  })
})

const addInputGroupButtonIconCSSClasses = 'mdi mdi-plus'
const addInputGroupButtonText = 'Add a new row'
function addInputGroupButtonClickHandler(): void {
  inputGroups.value.push(_createInputGroupItem(props.packageSize, props.price))
}
const clearFormButtonIconCSSClasses = 'mdi mdi-eraser'
function clearFormButtonClickHandler(): void {
  _clearInputGroups()
}
const collapseInputsButtonIconCSSClasses = 'mdi mdi-arrow-collapse-vertical'
function collapseInputsButtonClickHandler(): void {
  _inputGroupExpandedByDefault = false
  _syncInputGroupExpanded()
}
const deleteInputGroupButtonIconCSSClasses = 'mdi mdi-delete-forever'
function deleteInputGroupButtonClickHandler(groupKey: number): void {
  inputGroups.value = inputGroups.value.filter(({ key }: InputGroupItem) => key !== groupKey)
}
const expandInputsButtonIconCSSClasses = 'mdi mdi-arrow-expand-vertical'
function expandInputsButtonClickHandler(): void {
  _inputGroupExpandedByDefault = true
  _syncInputGroupExpanded()
}
const packageSizeConvenientNumberInputOperands = [0.01, 0.1] as const
const priceConvenientNumberInputOperands = [0.01, 100] as const
const roundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 2, minor: 4 } as const

// # Private

function _calculateCostPerUnit(price: number, packageSize: number): number {
  return price / packageSize
}

function _clearInputGroups(): void {
  inputGroups.value.forEach((group: InputGroupItem): void => {
    group.packageSizeString = ''
    group.priceString = ''
  })
}

function _createInputGroupItem(packageSize: number, price: number): InputGroupItem {
  const key = ++_inputGroupKey
  const packageSizeExpanded = _inputGroupExpandedByDefault
  const packageSizeString = '' + packageSize
  const priceExpanded = _inputGroupExpandedByDefault
  const priceString = '' + price
  return {
    key,
    packageSize,
    packageSizeExpanded,
    packageSizeString,
    price,
    priceExpanded,
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

function _syncInputGroupExpanded(): void {
  inputGroups.value.forEach((group: InputGroupItem): void => {
    group.packageSizeExpanded = _inputGroupExpandedByDefault
    group.priceExpanded = _inputGroupExpandedByDefault
  })
}

interface InputGroupItem {
  readonly key: number
  packageSize: number
  packageSizeExpanded: boolean
  packageSizeString: string
  price: number
  priceExpanded: boolean
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
        <div class="app-control-panel">
          <button
            class="app-add-input-group-form-button"
            type="button"
            @click="addInputGroupButtonClickHandler"
          >
            <span :class="addInputGroupButtonIconCSSClasses" />
            {{ addInputGroupButtonText }}
          </button>
          <button
            class="app-clear-form-button"
            type="button"
            @click="clearFormButtonClickHandler"
          >
            <span :class="clearFormButtonIconCSSClasses" />
            {{ props.clearFormButtonText }}
          </button>
          <button
            class="app-expand-inputs-button"
            type="button"
            @click="expandInputsButtonClickHandler"
          >
            <span :class="expandInputsButtonIconCSSClasses" />
            {{ props.expandInputsButtonText }}
          </button>
          <button
            class="app-collapse-inputs-button"
            type="button"
            @click="collapseInputsButtonClickHandler"
          >
            <span :class="collapseInputsButtonIconCSSClasses" />
            {{ props.collapseInputsButtonText }}
          </button>
        </div>
        <div class="app-form-table">
          <div class="app-form-table__header-row">
            <span>{{ props.priceTitleText }}</span>
            <span>{{ props.packageSizeTitleText }}</span>
            <span>{{ props.costPerUnitTitleText }}</span>
          </div>
          <template
            v-for="(item, index) in inputGroups"
            :key="item.key"
          >
            <div class="app-form-table__row">
              <label class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.priceTitleText }}</span>
                <ConvenientNumberInput
                  v-model:number="item.price"
                  v-model:string="item.priceString"
                  :expanded="item.priceExpanded"
                  :input-placeholder="props.priceInputPlaceholder"
                  :operands="priceConvenientNumberInputOperands"
                />
              </label>
              <label class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.packageSizeTitleText }}</span>
                <ConvenientNumberInput
                  v-model:number="item.packageSize"
                  v-model:string="item.packageSizeString"
                  :expanded="item.packageSizeExpanded"
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
              <div class="app-form-table__value-container">
                <span class="app-form-table__value-title">{{ props.deleteInputGroupTitleText }}</span>
                <button
                  class="app-delete-input-group-button"
                  :title="props.deleteInputGroupButtonHintText"
                  type="button"
                  @click="deleteInputGroupButtonClickHandler(item.key)"
                >
                  <span :class="deleteInputGroupButtonIconCSSClasses" />
                </button>
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
  $_delete-input-group-button-container-width: 56px

  display: grid
  gap: $_form-table_gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto auto $_delete-input-group-button-container-width

.app-form-table__header-row
  display: none
  align-items: start
  gap: $_form-table_gap
  grid-column: 1 / 5

  @media (layout.$app-device-width-medium <= width)
    display: grid
    grid-template-columns: subgrid

.app-form-table__row
  display: grid
  align-items: start
  gap: $_form-table_gap
  grid-column: 1 / 5

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-form-table__value-container
  @include layout.app-layout_flex-column-mixin(8px)

.app-form-table__value-title
  @media (layout.$app-device-width-medium <= width)
    display: none


.app-control-panel
  display: flex
  flex-wrap: wrap
  gap: 8px


.app-add-input-group-form-button
  @include buttons.app-form-buttons_button-secondary-mixin

.app-clear-form-button
  @include buttons.app-form-buttons_button-secondary-mixin

.app-collapse-inputs-button
  @include buttons.app-form-buttons_button-secondary-mixin

.app-expand-inputs-button
  @include buttons.app-form-buttons_button-secondary-mixin


.app-delete-input-group-button
  @include buttons.app-form-buttons_button-secondary-mixin

  @media (layout.$app-device-width-medium <= width)
    $_cost-per-unit-rounded-number-height: 44px
    $_delete-input-group-button-height: $_cost-per-unit-rounded-number-height

    height: $_delete-input-group-button-height

.app-rounded-number-box
  @include ui-kit.app-ui-kit_form-textbox-mixin

  line-height: normal
  text-align: end
</style>
