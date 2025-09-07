<script setup lang="ts"></script>

<template>
  <section id="not-found">
    <div class="header-container">
      <h1>Error 418 - I'm a teapot</h1>
      <FaIcon class="basis-icon" :icon="['fas', 'mugSaucer']" size="3x" />
    </div>
    <p>Sorry, you somehow loaded a page that doesn't exist!</p>
    <router-link to="/">Go Back Home</router-link>
  </section>
</template>

<style scoped lang="scss">
#not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.header-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
