<script lang="ts" setup>
import { computed, shallowRef } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'
import { useNotificationMessagesStore } from '../../data-access/stores/notification-messages-store'
import { usePassengerVehiclesStore } from '../../data-access/stores/passenger-vehicles-store'
import { DevUtility } from '../../dev/dev.utility'
import type { PassengerVehicleForCreate } from '../passenger-vehicles/passenger-vehicles-for-create.type'
import type { PassengerVehicleForDataTable } from '../passenger-vehicles/passenger-vehicles-for-data-table.type'
import type {
  PassengerVehicleForDetails,
  PassengerVehicleForUpdate,
} from '../passenger-vehicles/passenger-vehicles-for-details.type'
import PassengerVehicleDetails from '../passenger-vehicles/PassengerVehicleDetails.vue'
import PassengerVehiclesDataTableVirtual from '../passenger-vehicles/PassengerVehiclesDataTableVirtual.vue'

// # Private configuration

const notificationMessagesStore = useNotificationMessagesStore()
const passengerVehiclesStore = usePassengerVehiclesStore()

// # Uses in the template

const createRouteButtonText = 'Create new vehicle'

const detailDrawerIsOpened = shallowRef(false)
const detailDrawerLocation = 'right'
const detailDrawerVehicle = shallowRef<PassengerVehicleForDetails | null>(null)
const detailDrawerWidth = 900
function detailDrawerCloseButtonClickHandler(): void {
  detailDrawerIsOpened.value = false
}
async function detailDrawerDeleteButtonClickHandler(vehicleID: number): Promise<void> {
  detailDrawerIsOpened.value = false
  const { name } = await passengerVehiclesStore.read(vehicleID)
  await passengerVehiclesStore.delete(vehicleID)
  addToNotificationMessageStoreAboutDelete(name)
}
function detailDrawerUpdateButtonClickHandler(vehicleID: number, parameters: PassengerVehicleForUpdate): void {
  detailDrawerIsOpened.value = false
  passengerVehiclesStore.update(vehicleID, parameters)
  addToNotificationMessageStoreAboutUpdate(parameters.name)
}

const tableList = computed<readonly PassengerVehicleForDataTable[]>(() =>
  convertToPassengerVehiclesForDataTable(passengerVehiclesStore.list),
)
const tableLoading = computed<boolean>(() => passengerVehiclesStore.loading)

async function tableRowClickHandler(vehicleID: number): Promise<void> {
  const vehicle = await passengerVehiclesStore.read(vehicleID)
  DevUtility.collapsedTable(`The vehicle (ID = ${vehicleID}) has been read.`)(vehicle)
  if (!vehicle) return
  detailDrawerVehicle.value = convertToPassengerVehicleForDataTable(vehicle)
  detailDrawerIsOpened.value = true
}

// # Private

function addToNotificationMessageStoreAboutDelete(name: PassengerVehicleForCreate['name']): void {
  const text = `The vehicle with name “${name}” has been deleted.`
  notificationMessagesStore.create({ color: 'success', text })
}

function addToNotificationMessageStoreAboutUpdate(name: PassengerVehicleForCreate['name']): void {
  const text = `The vehicle with name “${name}” has been updated.`
  notificationMessagesStore.create({ color: 'success', text })
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
      <div>
        <RouterLink
          to="/create"
          class="app-control-panel-route-item"
        >
          <VBtn>{{ createRouteButtonText }}</VBtn>
        </RouterLink>
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
            @delete-button-click="detailDrawerDeleteButtonClickHandler"
            @update-button-click="detailDrawerUpdateButtonClickHandler"
          />
        </template>
      </VNavigationDrawer>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@mixin _local-flex-column-mixin($_row-gap)
  display: flex
  flex-direction: column
  row-gap: $_row-gap

.app-component-independent-root
  @include _local-flex-column-mixin(16px)

  padding: 24px
  height: 100%

.app-control-panel-route-item
  display: inline-block
  color: inherit
</style>
