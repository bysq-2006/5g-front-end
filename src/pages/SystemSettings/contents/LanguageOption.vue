<template>
  <button class="lang-card" :class="{ active: isActive }" @click="$emit('select')">
    <div class="icon">{{ icon }}</div>
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="status" :class="{ 'text-secondary': !isActive }">{{ statusText }}</div>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  name: string;
  isActive: boolean;
  statusText: string;
}>();

defineEmits(['select']);
</script>

<style lang="scss" scoped>
.lang-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);

  &:hover {
    border-color: var(--border-focus);
  }

  &.active {
    background: rgba(0, 122, 255, 0.2);
    border: 2px solid var(--accent-color);
    
    .status {
      color: var(--accent-color);
    }
  }

  .icon {
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  .status {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
  
  .text-secondary {
    color: var(--text-secondary);
  }
}
</style>
