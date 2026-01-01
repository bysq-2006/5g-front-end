<template>
  <div class="title">
    <h1>系统概览</h1>
    <h3>AI+5G通信基站智能巡检</h3>
    <h3>当前时间：{{ currentTime }}</h3>
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