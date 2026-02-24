<script lang="ts" setup>
import { shallowRef } from 'vue'
import { VApp } from 'vuetify/components/VApp'
import { VAppBar, VAppBarNavIcon } from 'vuetify/components/VAppBar'
import { VIcon } from 'vuetify/components/VIcon'
import { VList, VListItem, VListItemTitle } from 'vuetify/components/VList'
import { VMain } from 'vuetify/components/VMain'
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer'
import { VToolbarTitle } from 'vuetify/components/VToolbar'

// # Uses in the template

const appTitle = 'Vehicles registry application'

function vAppBarNavIconClickHandler(): void {
  vNavigationDrawerVisible.value = !vNavigationDrawerVisible.value
}
const vNavigationDrawerVisible = shallowRef(false)

const navigationItems = [
  {
    icon: 'mdi-table-large',
    path: '/',
    title: 'Registry',
    value: 'registry',
  },
  {
    icon: 'mdi-table-row-plus-after',
    path: '/create',
    title: 'Create new vehicle',
    value: 'create',
  },
] as const
</script>

<template>
  <div>
    <VApp>
      <VAppBar app>
        <VAppBarNavIcon @click="vAppBarNavIconClickHandler" />

        <VToolbarTitle>{{ appTitle }}</VToolbarTitle>
      </VAppBar>

      <VNavigationDrawer
        v-model="vNavigationDrawerVisible"
        app
      >
        <VList nav>
          <template
            v-for="item of navigationItems"
            :key="item.value"
          >
            <VListItem
              :to="item.path"
              :value="item"
              color="primary"
            >
              <template #prepend>
                <VIcon :icon="item.icon" />
              </template>

              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VNavigationDrawer>

      <VMain>
        <RouterView class="app-router-view-component-instance" />
      </VMain>
    </VApp>
  </div>
</template>

<style lang="sass" scoped>
// Note about height.
// `.app-component-independent-root` with `height: 100%` is not used.
// A private `<div>` inside `VApp` has `min-height: 100dvh`.

.app-router-view-component-instance
  height: 100%
</style>
