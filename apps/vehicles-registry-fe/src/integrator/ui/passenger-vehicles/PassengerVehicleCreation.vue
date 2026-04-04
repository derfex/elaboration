<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VNumberInput } from 'vuetify/components/VNumberInput'
import { VTextField } from 'vuetify/components/VTextField'
import type { PassengerVehicleForCreate } from './passenger-vehicles-for-create.type'

// # API

const emit = defineEmits<{
  createButtonClick: [parameters: PassengerVehicleForCreate]
}>()
const props = defineProps<{
  color: PassengerVehicleForCreate['color']
  colorLabelText: string
  createButtonText: string
  model: PassengerVehicleForCreate['model']
  modelLabelText: string
  name: PassengerVehicleForCreate['name']
  nameLabelText: string
  price: PassengerVehicleForCreate['price']
  priceLabelText: string
  year: PassengerVehicleForCreate['year']
  yearLabelText: string
}>()

// # Uses in the template

const color = shallowRef(props.color)
const model = shallowRef(props.model)
const name = shallowRef(props.name)
const price = shallowRef(props.price)
const year = shallowRef(props.year)

watch(props, (): void => {
  color.value = props.color
  model.value = props.model
  name.value = props.name
  price.value = props.price
  year.value = props.year
})

function createButtonClickHandler(): void {
  const parameters: PassengerVehicleForCreate = {
    color: color.value,
    model: model.value,
    name: name.value,
    price: price.value,
    year: year.value,
  }
  emit('createButtonClick', parameters)
}
</script>

<template>
  <div>
    <form class="app-component-independent-root">
      <VTextField
        v-model="name"
        :label="nameLabelText"
      />
      <VTextField
        v-model="model"
        :label="modelLabelText"
      />
      <VNumberInput
        v-model="year"
        :label="yearLabelText"
      />
      <VTextField
        v-model="color"
        :label="colorLabelText"
      />
      <VNumberInput
        v-model="price"
        :label="priceLabelText"
      />
      <div>
        <VBtn @click="createButtonClickHandler">
          {{ createButtonText }}
        </VBtn>
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  height: 100%
</style>
