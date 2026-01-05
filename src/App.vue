<template>
  <div class="main">
    <Navigation v-if="isLoggedIn" />
    <div class="content" :class="{ 'no-nav': !isLoggedIn }">
      <router-view />
    </div>
    <AlertModal v-model="showAlert" message="您的自定义警告文本" />
    <MessageModal v-model="showMessages" :messages="messages" />
  </div>
</template>

<script setup>
import Navigation from '@/pages/Navigation.vue';
import AlertModal from './components/AlertModal.vue';
import MessageModal from './components/MessageModal.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const { showAlert, showMessages, messages } = storeToRefs(useStore());
const route = useRoute();

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

// 监听路由变化，更新登录状态
watch(route, () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
});
</script>

<style lang="scss" scoped>
.main {
  background: var(--bg-app);
  color: var(--text-primary);
}

.content {
  padding: 24px 36px;
  margin-left: 180px;
  transition: margin-left 0.3s ease;

  &.no-nav {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 24px 16px;
    margin-left: 0;
    margin-top: 32px;
  }
}
</style>