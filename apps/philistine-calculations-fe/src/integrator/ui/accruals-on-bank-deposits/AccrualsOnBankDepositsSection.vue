<script lang="ts" setup>
import { checkIfCurrentYearIsLeap } from '|logic/accruals-on-bank-deposits'
import AccrualsOnBankDeposits from './AccrualsOnBankDeposits.vue'

// # Uses in the template

const accrualLabelText = 'Accrual'
const amountAtBeginningOfPeriod = 50000
const amountAtBeginningOfPeriodInputPlaceholder = '' + amountAtBeginningOfPeriod
const amountAtBeginningOfPeriodLabelText = 'Amount at the beginning of the period'
const leapYear = checkIfCurrentYearIsLeap()
const leapYearLabelText = 'Leap year'
const numberOfDaysInPeriod = 1
const numberOfDaysInPeriodInputPlaceholder = '' + numberOfDaysInPeriod
const numberOfDaysInPeriodLabelText = 'Number of days in the period'
const numberOfDaysOfYearLabelText = 'Number of days of the year'
const rate = 14.5
const rateInputPlaceholder = '' + rate
const rateLabelText = 'Rate, %'
const titleText = 'Accruals on a bank deposit'
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <AccrualsOnBankDeposits
          :accrual-label-text="accrualLabelText"
          :amount-at-beginning-of-period="amountAtBeginningOfPeriod"
          :amount-at-beginning-of-period-input-placeholder="amountAtBeginningOfPeriodInputPlaceholder"
          :amount-at-beginning-of-period-label-text="amountAtBeginningOfPeriodLabelText"
          :leap-year="leapYear"
          :leap-year-label-text="leapYearLabelText"
          :number-of-days-in-period="numberOfDaysInPeriod"
          :number-of-days-in-period-input-placeholder="numberOfDaysInPeriodInputPlaceholder"
          :number-of-days-in-period-label-text="numberOfDaysInPeriodLabelText"
          :number-of-days-of-year-label-text="numberOfDaysOfYearLabelText"
          :rate="rate"
          :rate-input-placeholder="rateInputPlaceholder"
          :rate-label-text="rateLabelText"
          :title-text="titleText"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../../ui-kit/layout/layout'

.app-component-independent-root
  padding-block: 20px

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin
</style>
