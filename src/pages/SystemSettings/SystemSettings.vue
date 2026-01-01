<template>
  <div class="system-settings-page">
    <div class="page-header">
      <h1 class="title">系统设置</h1>
      <p class="subtitle">配置系统参数，管理巡检员和AI模型</p>
    </div>

    <div class="content-layout">
      <div class="sidebar">
        <SideNavigation />
      </div>
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNavigation from './contents/SideNavigation.vue';
</script>

<style lang="scss" scoped>
.system-settings-page {
  min-height: 100vh;
  background-color: var(--bg-app);
  padding: 2rem;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-header {
  margin-bottom: 2rem;

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  .subtitle {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 250px 1fr;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
