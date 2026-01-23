<script lang="ts" setup>
import { computed } from 'vue'
import { calculateRoundedNumberParts } from '|logic/rounded-number/rounded-number'

// # API

const props = defineProps<{
  readonly number: number
  readonly numberOfDigitsAfterDecimalPoint: {
    readonly essential: number
    readonly minor: number
  }
}>()

// # Additional calculations not shown in the template

const numberParts = computed(() => {
  const { essential, minor } = props.numberOfDigitsAfterDecimalPoint
  return calculateRoundedNumberParts(props.number, essential, minor)
})

// # Uses in the template

const essential = computed(() => numberParts.value.essential)
const hintText = computed(() => props.number + '')
const minor = computed(() => numberParts.value.minor)
</script>

<template>
  <div>
    <div
      class="app-component-independent-root"
      :title="hintText"
    >
      <span>{{ essential }}</span>
      <span class="app-number-minor">{{ minor }}</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  font-family: monospace

.app-number-minor
  color: color-mix(in display-p3, currentColor, #0000)
</style>
