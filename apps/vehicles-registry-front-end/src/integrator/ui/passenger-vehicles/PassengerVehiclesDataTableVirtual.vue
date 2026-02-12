<script lang="ts" setup>
import { computed } from 'vue'
import { VDataTableVirtual } from 'vuetify/components/VDataTable'
import type { PassengerVehicle } from '../../../architecture/entities/passenger-vehicles/passenger-vehicles.type'

// # API

const emit = defineEmits<{
  'click:row': [itemID: number]
}>()
const props = defineProps<{
  loading: boolean
  list: readonly PassengerVehicleForDataTable[]
}>()

// # Uses in the template

const list = computed<readonly PassengerVehicleForDataTable[]>(() => props.list)
const tableLoading = computed<boolean>(() => props.loading)
const tableHeaders: VuetifyVDataTableHeaders = [
  {
    key: 'name',
    sortable: false,
    title: 'Name',
  },
  {
    align: 'end',
    key: 'price',
    sortable: true,
    title: 'Price',
  },
  {
    align: 'end',
    key: 'year',
    sortable: true,
    title: 'Year',
  },
]

function tableRowClickHandler(event: PointerEvent, { item }: VuetifyVDataTableRow): void {
  emit('click:row', item.id)
}

// # Private

type VuetifyVDataTableHeaders = VuetifyVDataTableHeader[] | undefined
type VuetifyVDataTableHeader = Readonly<{
  readonly key?: (string & {}) | 'data-table-group' | 'data-table-select' | 'data-table-expand' | undefined
  // readonly value?: SelectItemKey<ItemType$2<T>>;
  readonly title?: string | undefined
  readonly fixed?: boolean | undefined
  readonly align?: 'end' | 'center' | 'start' | undefined
  readonly width?: string | number | undefined
  readonly minWidth?: string | undefined
  readonly maxWidth?: string | undefined
  readonly nowrap?: boolean | undefined
  // readonly headerProps?:
  //   | {
  //       readonly [x: string]: any
  //     }
  //   | undefined
  // readonly cellProps?: ((data: Pick<ItemKeySlot<any>, 'value' | 'item' | 'index' | 'internalItem'>) => Record<string, any>) | {
  //   readonly [x: string]: any;
  // } | undefined;
  readonly sortable?: boolean | undefined
  // readonly sort?: DataTableCompareFunction<any> | undefined;
  // readonly sortRaw?: DataTableCompareFunction<any> | undefined;
  // readonly filter?: FilterFunction | undefined;
  readonly mobile?: boolean | undefined
  // readonly children?: readonly any[] | undefined
}>

// Partial.
interface VuetifyVDataTableRow {
  item: PassengerVehicleForDataTable
}

type PassengerVehicleForDataTable = PassengerVehicle
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-table-container">
        <VDataTableVirtual
          :headers="tableHeaders"
          :items="list"
          :loading="tableLoading"
          hide-default-footer
          @click:row="tableRowClickHandler"
        >
          <template #item.name="{ value }">
            {{ value ?? '—' }}
          </template>
        </VDataTableVirtual>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  // TODO: Use or delete.

.app-table-container
  $border-color: rgba(0, 0, 0, .12)
  $border-radius: 8px

  border-color: $border-color
  border-style: solid
  border-width: 1px 1px 0
  border-top-left-radius: $border-radius
  border-top-right-radius: $border-radius
</style>
