<script lang="ts" setup>
import { computed, ref } from 'vue'

// # Private configuration

// # Uses in the template

const amountAtBeginningOfPeriod = ref(50000)
const leapYear = ref(false)
const numberOfDaysInPeriod = ref(1)
const numberOfDaysOfYear = computed<365 | 366>(() => (leapYear.value ? 366 : 365))
const rate = ref(14.5)

const accrual = computed(() => {
  return roundAccrual(
    calculateAccrual(amountAtBeginningOfPeriod.value, numberOfDaysInPeriod.value, rate.value, numberOfDaysOfYear.value),
  )
})

// # Life cycle hooks

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
          <span>Минимум за сутки</span>
          <input v-model="amountAtBeginningOfPeriod" placeholder="50000" type="number" />
        </label>
        <label>
          <span>Дни</span>
          <input v-model="numberOfDaysInPeriod" placeholder="1" type="number" />
        </label>
        <label>
          <span>Ставка</span>
          <input v-model="rate" placeholder="14.5" type="number" />
        </label>
        <label>
          <span>Високосный год</span>
          <input v-model="leapYear" type="checkbox" />
        </label>
        <label>
          <span>Дни в году</span>
          <input v-model="numberOfDaysOfYear" disabled type="number" />
        </label>
        <label>
          <span>Начисление</span>
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
