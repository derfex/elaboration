<script lang="ts" setup>
import { ref } from 'vue'
import AccrualsOnBankDepositsSection from '|ui/accruals-on-bank-deposits/AccrualsOnBankDepositsSection.vue'

// # Uses in the template

const accrualsOnBankDepositsSectionIsShown = ref(false)
function accrualsOnBankDepositsSectionTitleContainerClickHandler(): void {
  accrualsOnBankDepositsSectionIsShown.value = true
}
const accrualsOnBankDepositsSectionTitleText = 'Accruals on a bank deposit'
</script>

<template>
  <main>
    <template v-if="accrualsOnBankDepositsSectionIsShown">
      <AccrualsOnBankDepositsSection />
    </template>
    <template v-else>
      <div class="app-title-container" @click="accrualsOnBankDepositsSectionTitleContainerClickHandler">
        <h2 class="app-title">
          {{ accrualsOnBankDepositsSectionTitleText }}
        </h2>
      </div>
    </template>
  </main>
</template>

<style lang="sass" scoped>
@use '../ui-kit/ui-kit'


$_app-padding: 20px


.app-title-container
  @include ui-kit.app-ui-kit_glass-mixin

  margin-block: $_app-padding
  border-radius: 4px
  padding: $_app-padding
  cursor: pointer

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
