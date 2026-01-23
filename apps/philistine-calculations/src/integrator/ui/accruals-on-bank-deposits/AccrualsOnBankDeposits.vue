<script lang="ts" setup>
import { computed, ref } from 'vue'
import { calculateAccrual } from '|logic/accruals-on-bank-deposits'
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
const numberOfDaysOfYear = computed<365 | 366>(() => (leapYear.value ? 366 : 365))
const rate = ref(props.rate)

const accrual = computed(() => {
  return calculateAccrual(
    amountAtBeginningOfPeriod.value,
    numberOfDaysInPeriod.value,
    rate.value,
    numberOfDaysOfYear.value,
  )
})
const accrualRoundedNumberComponentNumberOfDigitsAfterDecimalPoint = { essential: 2, minor: 2 } as const
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
          <input
            v-model="amountAtBeginningOfPeriod"
            :placeholder="amountAtBeginningOfPeriodInputPlaceholder"
            class="app-textbox"
            type="number"
          />
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysInPeriodLabelText }}</span>
          <input
            v-model="numberOfDaysInPeriod"
            :placeholder="numberOfDaysInPeriodInputPlaceholder"
            class="app-textbox"
            type="number"
          />
        </label>
        <label class="app-control-container">
          <span>{{ props.rateLabelText }}</span>
          <input v-model="rate" :placeholder="rateInputPlaceholder" class="app-textbox" type="number" />
        </label>
        <label class="app-control-container">
          <span>{{ props.leapYearLabelText }}</span>
          <input v-model="leapYear" class="app-checkbox" type="checkbox" />
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysOfYearLabelText }}</span>
          <input v-model="numberOfDaysOfYear" class="app-textbox" disabled />
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

.app-form
  display: grid
  gap: $_app-gap
  grid-template-columns: auto

  @media (layout.$app-device-width-medium <= width)
    grid-template-columns: auto auto

.app-textbox
  @include ui-kit.app-ui-kit_form-textbox-mixin

  font-family: monospace

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
