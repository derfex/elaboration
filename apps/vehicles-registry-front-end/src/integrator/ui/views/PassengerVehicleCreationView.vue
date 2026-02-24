<script lang="ts" setup>
import { usePassengerVehiclesStore } from '../../data-access/stores/passenger-vehicles-store'
import { DevUtility } from '../../dev/dev.utility'
import type { PassengerVehicleForCreate } from '../passenger-vehicles/passenger-vehicles-for-create.type'
import PassengerVehicleCreation from '../passenger-vehicles/PassengerVehicleCreation.vue'

// # Private configuration

const passengerVehiclesStore = usePassengerVehiclesStore()

// # Uses in the template

const color = 'yellow'
const colorLabelText = 'Color'
const createButtonText = 'Create the vehicle'
const model = ''
const modelLabelText = 'Model'
const name = ''
const nameLabelText = 'Name'
const price = 0
const priceLabelText = 'Price'
const year = 2000
const yearLabelText = 'Year'

async function createButtonClickHandler(vehicleParameters: PassengerVehicleForCreate): Promise<void> {
  DevUtility.collapsedTable(`The vehicle parameters have been specified.`)(vehicleParameters)
  passengerVehiclesStore.create(vehicleParameters)
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <PassengerVehicleCreation
        :color="color"
        :color-label-text="colorLabelText"
        :create-button-text="createButtonText"
        :model="model"
        :model-label-text="modelLabelText"
        :name="name"
        :name-label-text="nameLabelText"
        :price="price"
        :price-label-text="priceLabelText"
        :year="year"
        :year-label-text="yearLabelText"
        @create-button-click="createButtonClickHandler"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  padding: 24px
  height: 100%
</style>
