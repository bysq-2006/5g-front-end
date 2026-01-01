<template>
  <div class="service-area card">
    <h2 class="title">{{ t('signal.serviceArea') }}</h2>
    <div class="grid">
      <div v-for="(item, index) in items" :key="index" :class="['grid-item', { 'col-span-2': item.fullWidth }]">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Mock t function
const t = (key: string) => {
  const map: Record<string, string> = {
    'signal.serviceArea': '服务小区信息',
    'signal.myLocation': '当前位置',
    'signal.dataNetwork': '数据网络',
    'signal.cellType': '小区类型'
  };
  return map[key] || key;
};

const items = computed(() => [
  { label: t('signal.myLocation'), value: '27.83°N 102.27°E' },
  { label: t('signal.dataNetwork'), value: 'CMNET' },
  { label: t('signal.cellType'), value: 'NR SA' },
  { label: 'NR-TAC', value: '12345' },
  { label: 'NR-PCI', value: '256' },
  { label: 'NR-CI', value: '65856256' },
  { label: 'NR-ARFCN', value: '636000' },
  { label: 'NR-FREQ', value: '3620 MHz' },
  { label: 'NA-BAND', value: 'n78 (3300-3800 MHz)', fullWidth: true },
]);
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
