<template>
  <div class="main">
    <Navigation />
    <div class="content">
      <router-view />
    </div>
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

.content {
  margin-left: 200px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}

</style>