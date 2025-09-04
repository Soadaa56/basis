<script setup lang="ts"></script>

<template>
  <section id="welcome">
    <div class="basis-header">
      <h1>Welcome To Basis</h1>
      <FaIcon class="basis-icon" :icon="['fas', 'cube']" size="5x" />
    </div>
    <div class="welcome-button">
      <button>Dark Mode</button>
      <button>New Game</button>
    </div>
    <div class="load-save-file">
      <h2>Already have a safe file?</h2>
      <p>Load file <a href="#">here</a></p>
    </div>
  </section>
  <footer>
    <div id="footer-copyright">
      <p>Created by Kevin Duffy - © 2025</p>
      <p><a href="https://kevin.duffy.dev">KevinDuffy.dev</a></p>
    </div>
  </footer>
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
#footer-copyright {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
