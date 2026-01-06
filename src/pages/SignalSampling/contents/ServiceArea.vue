<template>
  <div class="service-area card">
    <h2 class="title">{{ $t('signal.serviceArea') }}</h2>
    <div class="grid">
      <div v-for="(item, index) in displayItems" :key="index" :class="['grid-item', { 'col-span-2': item.fullWidth }]">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface ServiceItem {
  label: string;
  value: string;
  fullWidth?: boolean;
}

const props = defineProps<{
  items: ServiceItem[];
}>();

const displayItems = props.items;
</script>

<style scoped lang="scss">
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  .grid-item {
    background-color: var(--bg-hover);
    border-radius: 8px;
    padding: 12px;
    transition: background-color 0.3s ease;

    &.col-span-2 {
      grid-column: span 2;
    }

    .label {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .value {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }
}
</style>
