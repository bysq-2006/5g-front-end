<template>
  <div class="detail-header-card">
    <div class="header-top">
      <div>
        <h2 class="station-title">{{ report.station }} - {{ $t('patrol.reportTitle') }}</h2>
        <p class="report-meta">
          {{ $t('patrol.detectTime') }}: {{ report.date }} &nbsp;|&nbsp; {{ $t('patrol.inspector') }}: {{ report.inspector }}
        </p>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="$emit('export', 'pdf')">{{ $t('patrol.exportPDF') }}</button>
        <button class="btn-primary" @click="$emit('export', 'word')">{{ $t('patrol.exportWord') }}</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value text-danger">{{ report.faults }}</div>
        <div class="stat-label">{{ $t('patrol.faultsDetected') }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value text-warning">1</div>
        <div class="stat-label">{{ $t('patrol.highPriority') }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value text-primary">92%</div>
        <div class="stat-label">{{ $t('patrol.avgConfidence') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Report } from '../types';

defineProps<{
  report: Report;
}>();

defineEmits<{
  (e: 'export', format: 'pdf' | 'word'): void;
}>();
</script>

<style lang="scss" scoped>
.detail-header-card {
  background: var(--bg-card);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  
  [data-theme='dark'] & {
    border-color: var(--gray-800);
  }
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.station-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.report-meta {
  color: var(--text-secondary);
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--color-primary-hover);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--bg-hover);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-value {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 4px;
  
  &.text-danger { color: var(--color-danger); }
  &.text-warning { color: var(--color-warning); }
  &.text-primary { color: var(--color-primary); }
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
