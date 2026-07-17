<script setup lang="ts"></script>

<template>
  <footer>
    <div id="footer-copyright">
      <p>Created by Kevin Duffy - © 2026</p>
      <p class="links">
        <router-link to="/credits">Credits</router-link>
        <a href="https://kevinduffy.dev">KevinDuffy.dev</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
}

#footer-copyright {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.links {
  display: flex;
  gap: 1rem;
}
</style>
