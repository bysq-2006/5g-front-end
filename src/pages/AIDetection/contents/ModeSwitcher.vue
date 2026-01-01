<template>
  <div class="mode-switcher">
    <router-link
      to="/ai-detection/realtime"
      class="mode-btn"
      active-class="active"
    >
      实时监测
    </router-link>
    <router-link
      to="/ai-detection/offline"
      class="mode-btn"
      active-class="active"
    >
      离线回放
    </router-link>
  </div>
</template>

<script setup lang="ts">
// No props or emits needed anymore
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.mode-switcher {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mode-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  background-color: var(--bg-card);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: var(--bg-hover);
  }

  &.active {
    &:first-child {
      background-color: $color-primary;
      color: $white;
      border-color: $color-primary;
    }
    &:last-child {
      background-color: $color-info; // Using info color for offline/purple equivalent
      color: $white;
      border-color: $color-info;
    }
  }
}
</style>
