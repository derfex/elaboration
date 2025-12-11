<script lang="ts" setup>
import { computed, ref } from 'vue'

// # API

const props = defineProps<{
  accrualLabelText: string
  amountAtBeginningOfPeriod: number
  amountAtBeginningOfPeriodLabelText: string
  leapYear: boolean
  leapYearLabelText: string
  numberOfDaysInPeriod: number
  numberOfDaysInPeriodLabelText: string
  numberOfDaysOfYearLabelText: string
  rate: number
  rateLabelText: string
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
      <form>
        <label>
          <span>{{ props.amountAtBeginningOfPeriodLabelText }}</span>
          <input v-model="amountAtBeginningOfPeriod" placeholder="50000" type="number" />
        </label>
        <label>
          <span>{{ props.numberOfDaysInPeriodLabelText }}</span>
          <input v-model="numberOfDaysInPeriod" placeholder="1" type="number" />
        </label>
        <label>
          <span>{{ props.rateLabelText }}</span>
          <input v-model="rate" placeholder="14.5" type="number" />
        </label>
        <label>
          <span>{{ props.leapYearLabelText }}</span>
          <input v-model="leapYear" type="checkbox" />
        </label>
        <label>
          <span>{{ props.numberOfDaysOfYearLabelText }}</span>
          <input v-model="numberOfDaysOfYear" disabled type="number" />
        </label>
        <label>
          <span>{{ props.accrualLabelText }}</span>
          <input v-model="accrual" disabled type="number" />
        </label>
      </form>
    </div>
  </div>
</template>

<style scoped>
.app-component-independent-root {
}

form {
  display: grid;
  grid-template-columns: auto auto;
}

label {
  display: grid;
  grid-column: 1 / 3;
  grid-template-columns: subgrid;
}
</style>
