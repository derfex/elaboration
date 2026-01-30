<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { calculateAccrual } from '|logic/accruals-on-bank-deposits'
import ConvenientNumberInput from '|ui-kit/form/ConvenientNumberInput.vue'
import RoundedNumber from '|ui-kit/form/RoundedNumber.vue'

// # API

const props = defineProps<{
  readonly accrualLabelText: string
  readonly amountAtBeginningOfPeriod: number
  readonly amountAtBeginningOfPeriodInputPlaceholder: string
  readonly amountAtBeginningOfPeriodLabelText: string
  readonly leapYear: boolean
  readonly leapYearLabelText: string
  readonly numberOfDaysInPeriod: number
  readonly numberOfDaysInPeriodInputPlaceholder: string
  readonly numberOfDaysInPeriodLabelText: string
  readonly numberOfDaysOfYearLabelText: string
  readonly rate: number
  readonly rateInputPlaceholder: string
  readonly rateLabelText: string
  readonly titleText: string
}>()

// # Uses in the template

const amountAtBeginningOfPeriod = ref(props.amountAtBeginningOfPeriod)
const leapYear = ref(props.leapYear)
const numberOfDaysInPeriod = ref(props.numberOfDaysInPeriod)
const rate = ref(props.rate)

watch(props, (): void => {
  amountAtBeginningOfPeriod.value = props.amountAtBeginningOfPeriod
  leapYear.value = props.leapYear
  numberOfDaysInPeriod.value = props.numberOfDaysInPeriod
  rate.value = props.rate
})

const accrual = computed(() => {
  return calculateAccrual(
    amountAtBeginningOfPeriod.value,
    numberOfDaysInPeriod.value,
    rate.value,
    numberOfDaysOfYear.value,
  )
})
const accrualRoundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 2, minor: 2 } as const
const amountAtBeginningOfPeriodConvenientNumberInputOperands = [1000, 10000] as const
const numberOfDaysInPeriodConvenientNumberInputOperands = [10, 30] as const
const numberOfDaysOfYear = computed<365 | 366>(() => (leapYear.value ? 366 : 365))
const numberOfDaysOfYearRoundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 0, minor: 0 } as const
const rateConvenientNumberInputOperands = [0.5, 1] as const
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <h2 class="app-title">
        {{ props.titleText }}
      </h2>
      <form class="app-form">
        <label class="app-control-container">
          <span>{{ props.amountAtBeginningOfPeriodLabelText }}</span>
          <ConvenientNumberInput
            v-model="amountAtBeginningOfPeriod"
            :input-placeholder="props.amountAtBeginningOfPeriodInputPlaceholder"
            :operands="amountAtBeginningOfPeriodConvenientNumberInputOperands"
          />
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysInPeriodLabelText }}</span>
          <ConvenientNumberInput
            v-model="numberOfDaysInPeriod"
            :input-placeholder="props.numberOfDaysInPeriodInputPlaceholder"
            :operands="numberOfDaysInPeriodConvenientNumberInputOperands"
          />
        </label>
        <label class="app-control-container">
          <span>{{ props.rateLabelText }}</span>
          <ConvenientNumberInput
            v-model="rate"
            :input-placeholder="props.rateInputPlaceholder"
            :operands="rateConvenientNumberInputOperands"
          />
        </label>
        <label class="app-control-container">
          <span>{{ props.leapYearLabelText }}</span>
          <input
            v-model="leapYear"
            class="app-checkbox"
            type="checkbox"
          >
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysOfYearLabelText }}</span>
          <div class="app-number-of-days-of-year-textbox">
            <RoundedNumber
              :number="numberOfDaysOfYear"
              :number-of-digits-after-decimal-point="
                numberOfDaysOfYearRoundedNumberComponentNumberOfDigitsAfterDecimalPoint
              "
            />
          </div>
        </label>
        <label class="app-control-container">
          <span>{{ props.accrualLabelText }}</span>
          <RoundedNumber
            class="app-accrual-textbox"
            :number="accrual"
            :number-of-digits-after-decimal-point="accrualRoundedNumberComponentNumberOfDigitsAfterDecimalPoint"
          />
        </label>
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


.app-accrual-textbox
  @include ui-kit.app-ui-kit_form-textbox-mixin

  font-family: monospace
  line-height: normal
  text-align: end
  color: var(--app-color--accent--brand)

.app-checkbox
  @include ui-kit.app-ui-kit_form-checkbox-mixin

.app-control-container
  display: grid
  gap: $_app-gap
  grid-column: 1 / 3

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: subgrid

.app-number-of-days-of-year-textbox
  @include ui-kit.app-ui-kit_form-textbox-mixin

  font-family: monospace
  line-height: normal
  text-align: end
  color: var(--app-text--disabled--color)

.app-form
  display: grid
  gap: $_app-gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
