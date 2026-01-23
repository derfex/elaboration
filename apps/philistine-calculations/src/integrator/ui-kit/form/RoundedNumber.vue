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
const hintText = computed(() => props.number + '')
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
  const minus = '–'
  const wholeSign = number >= 0 ? '' : minus
  const absValue = Math.abs(number)
  const afterPointCount = afterPointEssentialCount + afterPointMinorCount
  const coefficient = 10 ** afterPointCount
  const roundedAbsValueAsString = '' + Math.round(absValue * coefficient)
  const wholeMinCount = 1
  const text = roundedAbsValueAsString.padStart(wholeMinCount + afterPointCount, '0')
  const wholeCount = text.length - afterPointCount
  const whole = wholeCount > 0 ? text.substring(0, wholeCount) : '0'
  const whole = text.substring(0, wholeCount)
  const essentialAfterPoint = text.substring(wholeCount, text.length - afterPointMinorCount)
  const minor = text.substring(text.length - afterPointMinorCount)
  const essential = `${wholeSign}${whole}${point}${essentialAfterPoint}`
  return { essential, minor }
}
</script>

<template>
  <div>
    <div class="app-component-independent-root" :title="hintText">
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
