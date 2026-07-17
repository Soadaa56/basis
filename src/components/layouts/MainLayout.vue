<script setup lang="ts">
import { markRaw, shallowRef } from 'vue'
import VillagePage from '@/pages/Village/VillagePage.vue'
import HeaderLayout from './HeaderLayout.vue'

// Use shallowRed/markRaw for Vue performance warning
const activePage = shallowRef(markRaw(VillagePage))
// eslint-disable-next-line
function switchPage(page: any) {
  activePage.value = markRaw(page)
}
</script>

<template>
  <header-layout :active-page="activePage" @switch-page="switchPage" />
  <main>
    <component :is="activePage" />
  </main>
</template>

<style scoped lang="scss">
</style>
