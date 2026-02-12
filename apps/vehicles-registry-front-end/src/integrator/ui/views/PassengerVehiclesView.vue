<script lang="ts" setup>
import { onBeforeMount, shallowRef } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import PassengerVehiclesDataTableVirtual from '../passenger-vehicles/PassengerVehiclesDataTableVirtual.vue'

// # Uses in the template

const searchFieldPlaceholder = 'Vehicle name'
const tableLoading = shallowRef(true)

const list = shallowRef([])

// # Life cycle hooks

onBeforeMount((): void => {
  readList()
})

// # Private

async function readList(): Promise<void> {
  tableLoading.value = true
  try {
  } finally {
    tableLoading.value = false
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
        :loading="tableLoading"
        :list="list"
      />
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
