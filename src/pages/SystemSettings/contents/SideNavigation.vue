<template>
  <div class="side-nav">
    <router-link 
      v-for="tab in tabs" 
      :key="tab.id" 
      :to="{ name: tab.routeName }"
      class="nav-item"
      active-class="active"
    >
      <span class="icon">{{ tab.icon }}</span>
      <span class="label">{{ $t('system.sideNav.' + tab.id) }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">

const tabs = [
  { id: 'language', label: '语言设置', icon: '🌐', routeName: 'LanguageSettings' },
  { id: 'personnel', label: '人员管理', icon: '👥', routeName: 'PersonnelManagement' },
  { id: 'model', label: '模型管理', icon: '🤖', routeName: 'ModelManagement' },
  { id: 'system', label: '系统配置', icon: '⚙️', routeName: 'SystemConfig' }
];
</script>

<style lang="scss" scoped>
.side-nav {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  &.active {
    background: rgba(0, 122, 255, 0.2);
    color: var(--accent-color);
  }

  .icon {
    font-size: 1.25rem;
  }

  .label {
    font-weight: 500;
  }
}
</style>
