<template>
  <div class="device-card">
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="detail">{{ detail }}</div>
    </div>
    <span class="status-badge" :class="statusClass">{{ $t('system.deviceStatus.' + status) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  detail: string;
  status: string;
}>();

const statusClass = computed(() => {
  if (props.status === '已连接') return 'connected';
  if (props.status === '就绪') return 'ready';
  return '';
});
</script>

<style lang="scss" scoped>
.device-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.info {
  .name {
    font-weight: 500;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }
  .detail {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(52, 199, 89, 0.1);
  color: var(--color-success);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
