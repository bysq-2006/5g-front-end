<template>
  <div class="fault-details-card">
    <h3 class="section-title">{{ $t('patrol.faultDetailsTitle') }}</h3>
    <div class="fault-list">
      <div v-for="fault in faults" :key="fault.id" class="fault-item">
        <div class="fault-header">
          <div class="fault-tags">
            <div class="type-tag" :class="getTypeClass(fault.type)">
              {{ fault.type }}
            </div>
            <span class="severity-text" :class="getSeverityClass(fault.severity)">
              {{ fault.severity }}{{ $t('patrol.priority') }}
            </span>
          </div>
          <span class="confidence">{{ $t('patrol.confidence') }}: {{ fault.confidence }}%</span>
        </div>

        <div class="fault-info">
          <div class="info-row">
            <span class="label">{{ $t('patrol.location') }}:</span>
            <span class="value">{{ fault.location }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ $t('patrol.suggestion') }}:</span>
            <p class="suggestion">{{ fault.suggestion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { FaultDetail } from '../types';

defineProps<{
  faults: FaultDetail[];
}>();

const getTypeClass = (type: string) => {
  return type === '锈蚀' ? 'tag-warning' : 'tag-orange';
};

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case '高': return 'text-red';
    case '中': return 'text-yellow';
    case '低': return 'text-green';
    default: return 'text-gray';
  }
};
</script>

<style lang="scss" scoped>
.fault-details-card {
  background: var(--bg-card);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  
  [data-theme='dark'] & {
    border-color: var(--gray-800);
  }
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.fault-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fault-item {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 16px;
  transition: background 0.3s;
  
  [data-theme='dark'] & {
    border-color: var(--gray-700);
  }

  &:hover {
    background: var(--bg-hover);
  }
}

.fault-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.fault-tags {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-tag {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid currentColor;

  &.tag-warning {
    background: rgba(255, 149, 0, 0.1);
    color: var(--color-warning);
    border-color: var(--color-warning);
  }

  &.tag-orange {
    background: rgba(255, 59, 48, 0.1); // Using red/orange
    color: #FF9500; // Orange
    border-color: #FF9500;
  }
}

.severity-text {
  font-size: 14px;
  font-weight: 500;

  &.text-red { color: var(--color-danger); }
  &.text-yellow { color: var(--color-warning); }
  &.text-green { color: var(--color-success); }
  &.text-gray { color: var(--text-secondary); }
}

.confidence {
  font-size: 14px;
  color: var(--text-secondary);
}

.fault-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.value {
  color: var(--text-primary);
}

.suggestion {
  font-size: 14px;
  color: var(--text-primary);
  opacity: 0.9;
}
</style>
