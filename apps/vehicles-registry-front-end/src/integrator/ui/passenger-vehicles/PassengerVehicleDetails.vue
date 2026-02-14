<script lang="ts" setup>
import { computed, ref } from 'vue'
import { VNumberInput } from 'vuetify/components/VNumberInput'
import { VBtn } from 'vuetify/components/VBtn'
import { VTextField } from 'vuetify/components/VTextField'
import type { PassengerVehicleForDetails, PassengerVehicleForUpdate } from './passenger-vehicles-for-details.type'

// # API

const emit = defineEmits<{
  closeButtonClick: []
  updateButtonClick: [vehicleID: number, parameters: PassengerVehicleForUpdate]
}>()
const props = defineProps<{
  vehicle: PassengerVehicleForDetails
}>()

// # Uses in the template

const vehicle = computed<PassengerVehicleForDetails>(() => props.vehicle)

// ## Read

const headerText = 'Details'
const modelTitleText = 'Model'
const priceTitleText = 'Price'
const yearTitleText = 'Year'

function closeButtonClickHandler(): void {
  emit('closeButtonClick')
}

// ## Update

const editSectionTitleText = 'Edit'
const updateButtonText = 'Update'
const name = ref(vehicle.value.name)
const nameLabelText = 'Name'
const price = ref(vehicle.value.price)
const priceLabelText = priceTitleText

function updateButtonClickHandler(): void {
  const parameters: PassengerVehicleForUpdate = {
    name: name.value,
    price: price.value,
  }
  emit('updateButtonClick', vehicle.value.id, parameters)
}
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <header class="app-header-container">
        <h1>{{ headerText }}</h1>
        <div>
          <VBtn
            icon="$close"
            size="large"
            variant="text"
            @click="closeButtonClickHandler"
          />
        </div>
      </header>
      <section class="app-title-container">
        <div>
          <h2 class="app-vehicle-title">
            {{ name }}
          </h2>
        </div>
      </section>
      <section class="app-model-and-price-and-year-container">
        <section>
          <h3 class="app-detail__key">
            {{ modelTitleText }}
          </h3>
          <p class="app-detail__value">
            {{ vehicle.model }}
          </p>
        </section>
        <section>
          <h3 class="app-detail__key">
            {{ yearTitleText }}
          </h3>
          <p class="app-detail__value">
            {{ vehicle.year }}
          </p>
        </section>
        <section>
          <h3 class="app-detail__key">
            {{ priceTitleText }}
          </h3>
          <p class="app-detail__value">
            {{ price }}
          </p>
        </section>
      </section>
      <section class="app-update-section">
        <h3>{{ editSectionTitleText }}</h3>
        <form>
          <VTextField
            v-model="name"
            :label="nameLabelText"
          />
          <VNumberInput
            v-model="price"
            :label="priceLabelText"
          />

          <VBtn @click="updateButtonClickHandler">
            {{ updateButtonText }}
          </VBtn>
        </form>
      </section>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@mixin _local-block-padding-inline-mixin
  $padding-x: 24px

  padding-inline: $padding-x

@mixin _local-flex-column-mixin($row-gap)
  display: flex
  flex-direction: column
  row-gap: $row-gap

.app-component-independent-root
  @include _local-flex-column-mixin(24px)

.app-header-container
  display: flex
  align-items: center
  justify-content: space-between
  @include _local-block-padding-inline-mixin
  padding-block: 8px

.app-title-container
  @include _local-block-padding-inline-mixin

.app-model-and-price-and-year-container
  display: flex
  column-gap: 40px
  @include _local-block-padding-inline-mixin

.app-vehicle-title
  // TODO?: Apply `styleName: v-text/h5`.
  font-size: 23px
  font-weight: 400
  line-height: 32px

  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))

.app-detail__key
  font-size: 12px
  font-weight: 700
  line-height: 20px
  letter-spacing: 0.4px

  color: #777

.app-detail__value
  // TODO?: Apply `styleName: v-text/body-1`.
  font-size: 16px
  font-weight: 400
  line-height: 24px
  letter-spacing: 0.5px

  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))

.app-update-section
  @include _local-flex-column-mixin(16px)
  @include _local-block-padding-inline-mixin
</style>
