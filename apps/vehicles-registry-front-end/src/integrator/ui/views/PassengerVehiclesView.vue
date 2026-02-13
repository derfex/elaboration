<script lang="ts" setup>
import { computed, onBeforeMount, shallowRef } from 'vue'
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer'
import { VTextField } from 'vuetify/components/VTextField'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { usePassengerVehiclesStore } from '../../data-access/stores/passenger-vehicles-store'
import { DevUtility } from '../../dev.utility'
import type { PassengerVehicleForDataTable } from '../passenger-vehicles/passenger-vehicles-for-data-table.type'
import type { PassengerVehicleForDetails } from '../passenger-vehicles/passenger-vehicles-for-details.type'
import PassengerVehicleDetails from '../passenger-vehicles/PassengerVehicleDetails.vue'
import PassengerVehiclesDataTableVirtual from '../passenger-vehicles/PassengerVehiclesDataTableVirtual.vue'

// # Private configuration

const passengerVehiclesStore = usePassengerVehiclesStore()

// # Uses in the template

const detailDrawerIsOpened = shallowRef(false)
const detailDrawerLocation = 'right'
const detailDrawerVehicle = shallowRef<PassengerVehicleForDetails | null>(null)
const detailDrawerWidth = 900
function detailDrawerCloseButtonClickHandler(): void {
  detailDrawerIsOpened.value = false
}

const searchFieldPlaceholder = 'Vehicle name'
const tableList = computed<readonly PassengerVehicleForDataTable[]>(() =>
  convertToPassengerVehiclesForDataTable(passengerVehiclesStore.list),
)
const tableLoading = shallowRef(true)

function tableRowClickHandler(vehicleID: number): void {
  const vehicle = passengerVehiclesStore.read(vehicleID)
  DevUtility.collapsedTable(`The vehicle (ID = ${vehicleID}) has been read.`)(vehicle)
  if (!vehicle) return
  detailDrawerVehicle.value = convertToPassengerVehicleForDataTable(vehicle)
  detailDrawerIsOpened.value = true
}

// # Life cycle hooks

onBeforeMount((): void => {
  readList()
})

// # Private

async function readList(): Promise<void> {
  // TODO: Implement.
  tableLoading.value = true
  tableLoading.value = false
}

function convertToPassengerVehiclesForDataTable(
  list: readonly PassengerVehicle[],
): readonly PassengerVehicleForDataTable[] {
  return list.map(
    ({ id, model, name, price, year }: PassengerVehicle): PassengerVehicleForDataTable => ({
      id,
      model,
      name,
      price,
      year,
    }),
  )
}

function convertToPassengerVehicleForDataTable({
  id,
  model,
  name,
  price,
  year,
}: PassengerVehicle): PassengerVehicleForDetails {
  return {
    id,
    model,
    name,
    price,
    year,
  }
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-filters-container">
        <div class="app-search-container">
          <VTextField
            :placeholder="searchFieldPlaceholder"
            density="compact"
            variant="outlined"
          />
        </div>
      </div>
      <PassengerVehiclesDataTableVirtual
        :list="tableList"
        :loading="tableLoading"
        @click:row="tableRowClickHandler"
      />

      <VNavigationDrawer
        v-model="detailDrawerIsOpened"
        :location="detailDrawerLocation"
        :width="detailDrawerWidth"
        temporary
      >
        <template v-if="detailDrawerVehicle">
          <PassengerVehicleDetails
            :vehicle="detailDrawerVehicle"
            @close-button-click="detailDrawerCloseButtonClickHandler"
          />
        </template>
      </VNavigationDrawer>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  padding: 24px 24px 0
  height: 100%

.app-filters-container
  display: flex
  justify-content: space-between

.app-search-container
  width: 285px
</style>
