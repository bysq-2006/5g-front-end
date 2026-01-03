<template>
  <div class="report-list-card">
    <h2 class="title">{{ $t('patrol.reportListTitle') }}</h2>
    <div class="list">
      <div
        v-for="report in reports"
        :key="report.id"
        class="report-item"
        :class="{ active: selectedId === report.id }"
        @click="$emit('select', report)"
      >
        <div class="item-header">
          <h3 class="station-name" :class="{ 'active-text': selectedId === report.id }">
            {{ report.station }}
          </h3>
          <span class="status-badge" :class="getStatusClass(report.status)">
            {{ $t('patrol.status.' + report.status) }}
          </span>
        </div>
        <div class="item-date">{{ report.date }}</div>
        <div class="item-footer">
          <span>{{ report.inspector }}</span>
          <span>{{ report.faults }} {{ $t('patrol.faultCount') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Report } from '../types';

defineProps<{
  reports: Report[];
  selectedId: number | undefined;
}>();

defineEmits<{
  (e: 'select', report: Report): void;
}>();

const getStatusClass = (status: string) => {
  switch (status) {
    case '已完成':
      return 'status-success';
    case '进行中':
      return 'status-processing';
    case '待处理':
      return 'status-pending';
    default:
      return 'status-default';
  }
};
</script>

<style lang="scss" scoped>
.report-list-card {
  background: var(--bg-card);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  
  [data-theme='dark'] & {
    border-color: var(--gray-800);
  }
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-item {
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-hover);
  border: 1px solid transparent;

  &:hover {
    background: var(--bg-card-blue);
    [data-theme='dark'] & {
      background: var(--gray-700);
    }
  }

  &.active {
    background: var(--bg-card-blue);
    border-color: var(--color-primary-light);
    
    [data-theme='dark'] & {
      background: rgba(0, 122, 255, 0.2);
      border-color: rgba(0, 122, 255, 0.5);
    }
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.station-name {
  font-weight: 500;
  color: var(--text-primary);
  
  &.active-text {
    color: var(--color-primary);
  }
}

.status-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid currentColor;
  
  &.status-success {
    background: rgba(52, 199, 89, 0.1);
    color: var(--color-success);
    border-color: var(--color-success);
  }
  
  &.status-processing {
    background: rgba(0, 122, 255, 0.1);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  
  &.status-pending {
    background: rgba(255, 149, 0, 0.1);
    color: var(--color-warning);
    border-color: var(--color-warning);
  }
  
  &.status-default {
    background: rgba(142, 142, 147, 0.1);
    color: var(--gray-500);
    border-color: var(--gray-500);
  }
}

.item-date {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
