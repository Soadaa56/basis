<script setup lang="ts">
import { useRouter } from 'vue-router'
import { newGameFile } from '@/utils/saveFile'
import FooterLayout from '@/components/layouts/FooterLayout.vue'

const router = useRouter()

function newGameButton() {
  newGameFile('Basis')
  router.push('/')
}
</script>

<template>
  <section id="welcome">
    <div class="basis-header">
      <h1>Welcome To Basis</h1>
      <FaIcon class="basis-icon" :icon="['fas', 'cube']" size="5x" />
    </div>
    <div class="welcome-buttons">
      <button>Dark Mode</button>
      <router-link to="/"><button @click="newGameButton">New Game</button></router-link>
    </div>
    <div class="load-save-file">
      <h2>Already have a safe file?</h2>
      <p>Load file <a href="#">here</a></p>
    </div>
  </section>
  <FooterLayout />
</template>

<style scoped lang="scss">
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  text-align: center;
  margin: 1rem;
}

.welcome-buttons {
  button {
    min-width: 100px;
    min-height: 100px;
    margin: 0rem 4rem 1rem 4rem;
    outline: 5px solid black;
  }
}
.basis-header {
  display: flex;
  align-items: center;
  margin: 2rem;
  margin: 10rem;
  .basis-icon {
    padding: 1rem;
    margin: 1rem;
    min-height: 64px;
  }
}
</style>
