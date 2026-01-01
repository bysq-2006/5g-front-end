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
  padding: 42px 64px;
  margin-left: 200px;
}

@media (max-width: 768px) {
  .content {
    padding: 24px 16px;
    margin-left: 0;
    margin-top: 32px;
  }
}

</style>