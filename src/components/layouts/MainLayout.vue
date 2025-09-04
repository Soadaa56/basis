<script setup lang="ts"></script>

<template>
  <header>
    <nav id="navbar">
      <ul>
        <li>Town</li>
        <li>Idk</li>
        <li>Settings</li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer></footer>
</template>

<style scoped>
#navbar {
  display: flex;
  flex-direction: row;
}
</style>
