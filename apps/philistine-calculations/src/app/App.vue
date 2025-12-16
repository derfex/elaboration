<script lang="ts" setup>
import { RouterView } from 'vue-router'

// # Uses in the template

const titleText = 'Philistine calculations'
</script>

<template>
  <div>
    <div class="app-component-independent-root">
      <div class="app-section__wrapper">
        <div class="app-section__content">
          <h1 class="app-title">{{ titleText }}</h1>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style lang="sass" scoped>
@use '../integrator/ui-kit/layout/layout'
@use '../integrator/ui-kit/ui-kit'

//.app-component-independent-root

.app-section__content
  padding: 20px

.app-section__wrapper
  @include layout.app-layout_section-wrapper-mixin

.app-title
  @include ui-kit.app-ui-kit_h2-mixin
</style>
