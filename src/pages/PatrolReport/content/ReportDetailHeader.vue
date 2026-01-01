<template>
  <div class="detail-header-card">
    <div class="header-top">
      <div>
        <h2 class="station-title">{{ report.station }} - 巡检报告</h2>
        <p class="report-meta">
          检测时间: {{ report.date }} &nbsp;|&nbsp; 检测员: {{ report.inspector }}
        </p>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="$emit('export', 'pdf')">导出 PDF</button>
        <button class="btn-primary" @click="$emit('export', 'word')">导出 Word</button>
      </div>
    </div>

    <div class="lang-toggle">
      <div class="toggle-group">
        <button class="toggle-btn active">中文</button>
        <button class="toggle-btn">彝文</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value text-danger">{{ report.faults }}</div>
        <div class="stat-label">检测到故障</div>
      </div>
      <div class="stat-card">
        <div class="stat-value text-warning">1</div>
        <div class="stat-label">高优先级</div>
      </div>
      <div class="stat-card">
        <div class="stat-value text-primary">92%</div>
        <div class="stat-label">平均置信度</div>
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

.lang-toggle {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-hover);
  border-radius: 8px;
}

.toggle-group {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;

  &.active {
    background: var(--color-primary);
    color: white;
  }

  &:not(.active) {
    background: var(--bg-card);
    border-color: var(--gray-200);
    color: var(--text-primary);

    &:hover {
      background: var(--gray-50);
    }
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
