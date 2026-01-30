<script lang="ts" setup>
import { RouterView } from 'vue-router'

// # Uses in the template

const navLinks = [
  {
    captionText: 'Accruals on a bank deposit',
    routeName: 'accruals-on-bank-deposits',
  },
  {
    captionText: 'Price comparison',
    routeName: 'price-comparison',
  },
]
</script>

<template>
  <main>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <div class="app-section__content">
          <nav>
            <ul class="app-nav-list">
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
        </div>
      </div>
    </div>
    <RouterView />
  </main>
</template>

<style lang="sass" scoped>
@use '../ui-kit/layout/layout'
@use '../ui-kit/reset'
@use '../ui-kit/ui-kit'

.app-component-independent-root
  padding-block: 20px

.app-section__content
  padding-inline: 20px

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin


.app-nav-link
  color: var(--app-color--accent--brand)

  @media (hover: hover)
    &:hover
      @include ui-kit.app-ui-kit_neon-mixin

.app-nav-link--exact-active::before
  content: '→ '

.app-nav-list
  @include reset.app-reset_ul-mixin

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
  @include ui-kit.app-ui-kit_neon-mixin
</style>
