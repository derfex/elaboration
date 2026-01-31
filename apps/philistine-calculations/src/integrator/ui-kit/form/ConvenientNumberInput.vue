<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

// # API

const numberModel = defineModel<number>('number', { required: true })

const props = defineProps<{
  readonly inputPlaceholder: string
  readonly operands: number[]
}>()

// # Uses in the template

const modifierDecreaseButtonDisabled = ref(false)
function modifierDecreaseButtonClickHandler(operand: number): void {
  const sum = calculateSum(text.value, -operand)
  text.value = '' + sum
  updateModel(sum)
}
const modifierIncreaseButtonDisabled = ref(false)
function modifierIncreaseButtonClickHandler(operand: number): void {
  const sum = calculateSum(text.value, operand)
  text.value = '' + sum
  updateModel(sum)
}
const modifiersAreShown = ref(true)

const text = ref('')
const textInputPattern = '(-)?\\d+(\\.\\d+)?'

watchEffect((): void => {
  text.value = numberModel.value + ''
})

function textInputUpdateHandler(event: InputEvent): void {
  const { value } = event.target as HTMLInputElement
  const [numeric, number] = convertTextToNumber(value)
  if (numeric) {
    updateModel(number)
  }
  modifierDecreaseButtonDisabled.value = !numeric
  modifierIncreaseButtonDisabled.value = !numeric
}

function toggleButtonClickHandler(): void {
  modifiersAreShown.value = !modifiersAreShown.value
}

function clearButtonClickHandler(): void {
  text.value = ''
  modifierDecreaseButtonDisabled.value = true
  modifierIncreaseButtonDisabled.value = true
}

// # Private

function calculateDecimalPlaces(numericString: string): number {
  const decimalIndex = numericString.indexOf('.')
  // (!~x) === (x === -1)
  return !~decimalIndex ? 0 : numericString.length - decimalIndex - 1
}

// `text` should be numeric.
// Dev note: we use `Math.round` because `550.06 * 100 → 55005.99999999999`.
function calculateSum(text: string, addendum: number): number {
  const addendumDecimalPlaces = calculateDecimalPlaces('' + addendum)
  const textDecimalPlaces = calculateDecimalPlaces(text)
  const coefficient = 10 ** Math.max(addendumDecimalPlaces, textDecimalPlaces)
  return Math.round(+text * coefficient + addendum * coefficient) / coefficient
}

function convertTextToNumber(text: string): ConvertTextToNumberReport {
  const trimmedText = text.trim()
  if (trimmedText === '') return [false, null]
  const number = +trimmedText
  // TODO: Handle `Infinity`.
  return !Number.isNaN(number) ? [true, number] : [false, null]
}

type ConvertTextToNumberReport = readonly [true, number] | readonly [false, null]

function updateModel(number: number): void {
  numberModel.value = number
}

// # Notes for the template's development and support

// Note: the `<input>` should be the first (focusable?) element to allow wrapping the component into a `<label>`.
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <input
        :pattern="textInputPattern"
        :placeholder="props.inputPlaceholder"
        :value="text"
        class="app-textbox"
        @input="textInputUpdateHandler($event)"
      >
      <button
        class="app-toggle-button"
        type="button"
        @click="toggleButtonClickHandler"
      >
        <span class="pi pi-pencil" />
      </button>
      <button
        class="app-clear-button"
        type="button"
        @click="clearButtonClickHandler"
      >
        <span class="pi pi-eraser" />
      </button>
      <template v-if="modifiersAreShown">
        <div class="app-modifiers">
          <template
            v-for="operand in props.operands"
            :key="operand"
          >
            <div class="app-modifier">
              <button
                class="app-modifier__button"
                type="button"
                :disabled="modifierDecreaseButtonDisabled"
                @click="modifierDecreaseButtonClickHandler(operand)"
              >
                –
              </button>
              <button
                class="app-modifier__button"
                type="button"
                :disabled="modifierIncreaseButtonDisabled"
                @click="modifierIncreaseButtonClickHandler(operand)"
              >
                +
              </button>
              <div class="app-modifier__label">
                {{ operand }}
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../ui-kit'
@use 'form'

.app-component-independent-root
  display: grid
  align-items: center
  column-gap: 8px
  grid-template-areas: 'toggle clear textbox' 'modifiers modifiers modifiers'
  grid-template-columns: auto auto 1fr

.app-clear-button
  grid-area: clear

.app-modifiers
  grid-area: modifiers

.app-textbox
  grid-area: textbox

.app-toggle-button
  grid-area: toggle


.app-component-independent-root
  @include ui-kit.app-ui-kit_glass-mixin


// # Textbox and its buttons

$_row-height: form.$app-form_textbox_row-height
$_button-size: $_row-height

.app-clear-button
  $_clear-button-size: $_button-size * 0.75

  @include ui-kit.app-ui-kit_button-secondary-custom-mixin

  border-radius: 8px
  width: $_clear-button-size
  height: $_clear-button-size

$_border-radius: form.$app-form_textbox_border-radius

.app-textbox
  @include form.app-form_textbox_numeric-mixin

  position: relative
  border-top-right-radius: $_border-radius
  width: 100%
  height: $_row-height

  &:invalid
    outline: 2px solid var(--app-input--invalid--outline-color)

.app-toggle-button
  @include ui-kit.app-ui-kit_button-secondary-custom-mixin

  border-top-left-radius: $_border-radius
  width: $_button-size
  height: $_button-size


// # Modifiers

$_modifier-border-width: 1px
$_modifier-gap: 2px
$_modifier-padding: $_modifier-gap
$_modifier-button-size: $_row-height - $_modifier-border-width * 4 - $_modifier-padding * 2

.app-modifiers
  border: $_modifier-border-width solid var(--app-decor--border-color)


.app-modifier
  display: flex
  gap: $_modifier-gap
  border: $_modifier-border-width solid var(--app-decor--border-color)
  padding: $_modifier-padding

.app-modifier__button
  @include ui-kit.app-ui-kit_button-secondary-custom-mixin

  width: $_modifier-button-size
  height: $_modifier-button-size

.app-modifier__label
  @include form.app-form_text_numeric-mixin

  flex-grow: 1
</style>
