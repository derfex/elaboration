<script lang="ts" setup>
import { computed } from 'vue'

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
const minor = computed(() => numberParts.value.minor)

// # Private

interface RoundedNumberParts {
  readonly essential: string
  readonly minor: string
}

function calculateRoundedNumberParts(
  number: number,
  afterPointEssentialCount: number,
  afterPointMinorCount: number,
): RoundedNumberParts {
  const point = '.'
  if (number === 0) {
    const essential = `0${point}${'0'.repeat(afterPointEssentialCount)}`
    const minor = '0'.repeat(afterPointMinorCount)
    return { essential, minor }
  }
  const afterPointCount = afterPointEssentialCount + afterPointMinorCount
  const coefficient = 10 ** afterPointCount
  const text = '' + Math.round(number * coefficient)
  const wholeCount = text.length - afterPointCount
  const whole = wholeCount > 0 ? text.substring(0, wholeCount) : '0'
  const essentialAfterPoint = text.substring(wholeCount, text.length - afterPointMinorCount)
  const minor = text.substring(text.length - afterPointMinorCount)
  const essential = `${whole}${point}${essentialAfterPoint}`
  return { essential, minor }
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
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
