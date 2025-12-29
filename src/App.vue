<template>
  <div class="main">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
  import Navigation from '@/pages/Navigation.vue';
</script>

<style lang="scss">
.main {
  min-height: 100vh;
  background: var(--bg-app);
  color: var(--text-primary);
}
</style>