<script lang="ts" setup>
import { RouterView } from 'vue-router'

// # Uses in the template

const navLinks = [
  {
    captionText: 'Accruals on a bank deposit',
    routeName: 'accruals-on-bank-deposits',
  },
]
</script>

<template>
  <main>
    <nav>
      <ul>
        <template
          v-for="item in navLinks"
          :key="item.routeName"
        >
          <li>
            <RouterLink
              class="app-nav-link"
              :to="{ name: item.routeName }"
              exact-active-class="app-nav-link--exact-active"
            >
              {{ item.captionText }}
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
    <RouterView />
  </main>
</template>

<style lang="sass" scoped>
@use '../ui-kit/ui-kit'

.app-nav-link
  color: var(--app-color--accent--brand)

  &:hover
    @include ui-kit.app-ui-kit_neon-mixin

.app-nav-link--exact-active::before
  content: '→ '

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
