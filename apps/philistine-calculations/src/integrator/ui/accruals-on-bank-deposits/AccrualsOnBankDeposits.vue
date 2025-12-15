<script lang="ts" setup>
import { computed, ref } from 'vue'

// # API

const props = defineProps<{
  readonly accrualLabelText: string
  readonly amountAtBeginningOfPeriod: number
  readonly amountAtBeginningOfPeriodLabelText: string
  readonly leapYear: boolean
  readonly leapYearLabelText: string
  readonly numberOfDaysInPeriod: number
  readonly numberOfDaysInPeriodLabelText: string
  readonly numberOfDaysOfYearLabelText: string
  readonly rate: number
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
  return roundAccrual(
    calculateAccrual(amountAtBeginningOfPeriod.value, numberOfDaysInPeriod.value, rate.value, numberOfDaysOfYear.value),
  )
})

// # Private

function calculateAccrual(
  amountAtBeginningOfPeriod: number,
  numberOfDaysInPeriod: number,
  rate: number,
  numberOfDaysOfYear: number,
): number {
  return (amountAtBeginningOfPeriod * numberOfDaysInPeriod * rate) / 100 / numberOfDaysOfYear
}

function roundAccrual(accrual: number): number {
  const coefficient = 1000
  return Math.round(accrual * coefficient) / coefficient
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <h2 class="app-title">{{ props.titleText }}</h2>
      <form class="app-form">
        <label class="app-control-container">
          <span>{{ props.amountAtBeginningOfPeriodLabelText }}</span>
          <input class="app-textbox" v-model="amountAtBeginningOfPeriod" placeholder="50000" type="number" />
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysInPeriodLabelText }}</span>
          <input class="app-textbox" v-model="numberOfDaysInPeriod" placeholder="1" type="number" />
        </label>
        <label class="app-control-container">
          <span>{{ props.rateLabelText }}</span>
          <input class="app-textbox" v-model="rate" placeholder="14.5" type="number" />
        </label>
        <label class="app-control-container">
          <span>{{ props.leapYearLabelText }}</span>
          <input v-model="leapYear" type="checkbox" />
        </label>
        <label class="app-control-container">
          <span>{{ props.numberOfDaysOfYearLabelText }}</span>
          <input class="app-textbox" v-model="numberOfDaysOfYear" disabled type="number" />
        </label>
        <label class="app-control-container">
          <span>{{ props.accrualLabelText }}</span>
          <input class="app-textbox" v-model="accrual" disabled type="number" />
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
  @include layout.app-layout_flex-column-mixin($_app-gap)
  @include ui-kit.app-ui-kit_glass-mixin

  border-radius: 4px
  padding: $_app-padding


.app-control-container
  display: grid
  gap: $_app-gap
  grid-column: 1 / 3
  grid-template-columns: subgrid

.app-form
  display: grid
  gap: $_app-gap
  grid-template-columns: auto auto

.app-textbox
  @include ui-kit.app-ui-kit_textbox-mixin

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
