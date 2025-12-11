<script lang="ts" setup>
import { computed, ref } from 'vue'
import AccrualsOnBankDeposits from './AccrualsOnBankDeposits.vue'

// # Private configuration

// # Uses in the template

const amountAtBeginningOfPeriod = ref(50000)
const leapYear = ref(false)
const numberOfDaysInPeriod = ref(1)
const numberOfDaysOfYear = computed<365 | 366>(() => (leapYear.value ? 366 : 365))
const rate = ref(14.5)



// # Life cycle hooks

// # Private

</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <AccrualsOnBankDeposits />
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
