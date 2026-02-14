<script lang="ts" setup>
import { ref } from 'vue'
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
const vNavigationDrawerVisible = ref(false)

const navigationItems = [
  {
    icon: 'mdi-table-large',
    path: '/',
    title: 'Registry',
    value: 'registry',
  },
]
</script>

<template>
  <div>
    <div class="app-component-independent-root">
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
            <VListItem
              v-for="(item, i) of navigationItems"
              :key="i"
              :to="item.path"
              :value="item"
              color="primary"
            >
              <template #prepend>
                <VIcon :icon="item.icon" />
              </template>

              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </VList>
        </VNavigationDrawer>

        <VMain>
          <RouterView />
        </VMain>
      </VApp>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-component-independent-root
  height: 100%
</style>
