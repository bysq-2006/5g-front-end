<template>
  <div class="header">
    <!-- 左侧标题内容 -->
    <div class="header-left">
      <h1>{{ $t('dashboard.overview') }}</h1>
      <h3>{{ $t('dashboard.ai5g') }}</h3>
      <h3>{{ $t('dashboard.currentTime') }}{{ currentTime }}</h3>
    </div>

    <!-- 右侧按钮 -->
    <div class="header-right">
      <button class="bell-btn" @click="openMessages">
        <svg t="1767629048020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1693" width="24" height="24">
          <path d="M512 960c49.6 0 88-38.4 88-88H424c0 49.6 38.4 88 88 88z m288.8-286.4V444.8c0-137.6-97.6-252.8-224.8-283.2v-28.8c0-32-17.6-60.8-48-67.2-44-10.4-80 23.2-80 66.4v30.4C320.8 192 223.2 307.2 223.2 444.8v228.8L136 763.2v44.8h752v-44.8l-87.2-89.6z" p-id="1694"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup name="Header">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/stores/store';

const { t } = useI18n();
const store = useStore();
const currentTime = ref(new Date().toLocaleString());

const openMessages = () => {
  store.showMessages = true;
};

// 时间更新
setInterval(() => {
  currentTime.value = new Date().toLocaleString();
}, 1000);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding: 0;
  border-radius: 8px;

  .header-left {
    flex: 1;
    display: flex;
    flex-direction: column;

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

  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .bell-btn {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-primary);
      padding: 0;

      &:hover {
        background: var(--bg-hover);
        border-color: var(--border-focus);
        color: var(--accent-color);
      }

      &:active {
        transform: scale(0.95);
      }

      .icon {
        width: 24px;
        height: 24px;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 16px;

    .header-left h1 {
      font-size: 1.5rem;
    }

    .header-right {
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>