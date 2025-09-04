<script setup lang="ts"></script>

<template>
  <section id="welcome">
    <h1>Welcome To Basis</h1>
    <div class="welcome-button">
      <button>Dark Mode</button>
      <button>New Game</button>
    </div>
    <div class="load-save-file">
      <h2>Already have a safe file?</h2>
      <p>Load file <a href="#">here</a></p>
    </div>
  </section>
</template>

<style scoped>
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  text-align: center;
}
</style>
