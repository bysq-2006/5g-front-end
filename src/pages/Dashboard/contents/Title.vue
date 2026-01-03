<template>
  <div class="title">
    <h1>{{ $t('dashboard.overview') }}</h1>
    <h3>{{ $t('dashboard.ai5g') }}</h3>
    <h3>{{ $t('dashboard.currentTime') }}{{ currentTime }}</h3>
  </div>
</template>

<script setup name="Title">
import { ref } from 'vue';
const currentTime = ref(new Date().toLocaleString());
setInterval(() => {
  currentTime.value = new Date().toLocaleString();
}, 1000);
</script>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
    transition: color 0.3s ease;
  }

  h3 {
    font-size: 1rem;
    font-weight: 400;
    color: var(--text-secondary);
  }
}
</style>