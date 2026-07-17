<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/">
      <button>Home</button>
    </router-link>
  </nav>
  <h1>Credit For Free Assets</h1>
  <div class="font-awesome-credit">
    <p>Credit for all icons (including favicon which is at the top of your tab)</p>
    <a href="https://fontawesome.com/">Font Awesome</a>
    <ul>
      <li>
        <a href="https://fontawesome.com/icons/cube?f=classic&s=solid">Cube</a>
      </li>
      <li>
        <a href="https://fontawesome.com/icons/bars?f=classic&s=solid">Bars</a>
      </li>
      <li>
        <a href="https://fontawesome.com/icons/window-maximize?f=classic&s=regular"> Window-maximize: </a>
      </li>
      <li>
        <a href="https://fontawesome.com/icons/shield?f=classic&s=solid">Shield</a>
      </li>
      <li>
        <a href="https://fontawesome.com/icons/gears?f=classic&s=solid">Gears</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 1rem;
}

button {
  font-size: 2rem;
}
</style>
