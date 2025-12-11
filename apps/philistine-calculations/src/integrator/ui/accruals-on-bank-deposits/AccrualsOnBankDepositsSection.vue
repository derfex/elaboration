<script lang="ts" setup>
import AccrualsOnBankDeposits from './AccrualsOnBankDeposits.vue'

// # Uses in the template

const accrualLabelText = 'Начисление'
const amountAtBeginningOfPeriod = 50000
const amountAtBeginningOfPeriodLabelText = 'Начальная сумма'
const leapYear = checkIfCurrentYearLeap()
const leapYearLabelText = 'Високосный год'
const numberOfDaysInPeriod = 1
const numberOfDaysInPeriodLabelText = 'Срок в днях'
const numberOfDaysOfYearLabelText = 'Количество дней в году'
const rate = 14.5
const rateLabelText = 'Ставка'

// # Private

function checkIfCurrentYearLeap(): boolean {
  const year = new Date().getFullYear()
  return new Date(year, 2, 0).getDate() === 29
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <AccrualsOnBankDeposits
          :accrual-label-text="accrualLabelText"
          :amount-at-beginning-of-period="amountAtBeginningOfPeriod"
          :amount-at-beginning-of-period-label-text="amountAtBeginningOfPeriodLabelText"
          :leap-year="leapYear"
          :leap-year-label-text="leapYearLabelText"
          :number-of-days-in-period="numberOfDaysInPeriod"
          :number-of-days-in-period-label-text="numberOfDaysInPeriodLabelText"
          :number-of-days-of-year-label-text="numberOfDaysOfYearLabelText"
          :rate="rate"
          :rate-label-text="rateLabelText"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/layout/layout'

//.app-component-independent-root

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin
</style>
