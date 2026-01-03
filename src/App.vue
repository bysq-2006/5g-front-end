<template>
  <div class="main">
    <Navigation />
    <div class="content">
      <router-view />
    </div>
    <AlertModal v-model="showAlert" message="您的自定义警告文本" />
  </div>
</template>

<script setup>
import Navigation from '@/pages/Navigation.vue';
import AlertModal from './components/AlertModal.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store';
const { showAlert } = storeToRefs(useStore());
</script>

<style lang="scss" scoped>
.main {
  background: var(--bg-app);
  color: var(--text-primary);
}

.content {
  padding: 24px 36px;
  margin-left: 180px;
}

@media (max-width: 768px) {
  .content {
    padding: 24px 16px;
    margin-left: 0;
    margin-top: 32px;
  }
}
</style>