<template>
  <div class="signal-detection card">
    <div class="header">
      <h2 class="title">{{ $t('signal.realtimeDetection') }}</h2>
      <div class="status">
        <span class="status-dot"></span>
        <span class="status-text">{{ $t('signal.running') }}</span>
      </div>
    </div>

    <div class="controls">
      <div class="type-buttons">
        <button
          v-for="type in ['RSRP', 'RSRQ', 'SINR']"
          :key="type"
          :class="['type-btn', { active: signalType === type }, type.toLowerCase()]"
          @click="setSignalType(type)"
        >
          {{ type }}
        </button>
      </div>

      <div class="current-value">
        <span class="label">{{ $t('signal.currentValue') }} ({{ signalType }})</span>
        <div class="value-display">
          <span :class="['value', signalType.toLowerCase()]">
            {{ formattedValue }}
          </span>
          <span class="unit">{{ unit }}</span>
        </div>
      </div>
    </div>

    <div class="chart-wrapper">
      <SignalStrengthChart 
        :dataList="chartData" 
        :color="chartColor"
      />
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value text-blue">{{ frequencyRange }}</div>
        <div class="stat-label">{{ $t('signal.frequency') }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value text-green">1.2ms</div>
        <div class="stat-label">{{ $t('signal.delay') }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value text-purple">{{ duration }}s</div>
        <div class="stat-label">{{ $t('signal.duration') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import SignalStrengthChart from '@/components/SignalStrengthChart.vue';


const props = defineProps<{
  signalType: 'RSRP' | 'RSRQ' | 'SINR';
  currentSignalValue: { rsrp: number; rsrq: number; sinr: number } | null;
  signalHistory: any[];
  frequencyRange: string;
}>();

const emit = defineEmits<{
  (e: 'update:signalType', value: string): void;
}>();

const setSignalType = (type: string) => {
  emit('update:signalType', type);
};

const chartData = computed(() => {
  if (!props.signalHistory) return [];
  const key = props.signalType.toLowerCase();
  return props.signalHistory.map(item => item[key]);
});

const chartColor = computed(() => {
  switch (props.signalType) {
    case 'RSRP': return '#3b82f6';
    case 'RSRQ': return '#8b5cf6';
    case 'SINR': return '#10b981';
    default: return '#3b82f6';
  }
});

const formattedValue = computed(() => {
  if (!props.currentSignalValue) return '--';
  const val = props.currentSignalValue[props.signalType.toLowerCase() as keyof typeof props.currentSignalValue];
  return typeof val === 'number' ? val.toFixed(1) : '--';
});

const unit = computed(() => {
  return props.signalType === 'RSRP' ? 'dBm' : 'dB';
});

const duration = computed(() => {
  return props.signalHistory.length;
});
</script>

<style scoped lang="scss">
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;

    .status-dot {
      width: 12px;
      height: 12px;
      background-color: var(--color-success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .status-text {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  .type-buttons {
    display: flex;
    gap: 8px;

    .type-btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      background-color: var(--bg-hover);
      color: var(--text-secondary);

      &:hover {
        background-color: var(--border-color);
      }

      &.active {
        color: #fff;
        &.rsrp { background-color: #3b82f6; }
        &.rsrq { background-color: #8b5cf6; }
        &.sinr { background-color: #10b981; }
      }
    }
  }

  .current-value {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .value-display {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      &.rsrp { color: #3b82f6; }
      &.rsrq { color: #8b5cf6; }
      &.sinr { color: #10b981; }
    }

    .unit {
      font-size: 16px;
      color: var(--text-secondary);
    }
  }
}

.chart-wrapper {
  width: 100%;
  height: 300px;
  margin-bottom: 16px;
  background-color: var(--bg-app); // Slightly different bg for chart area if needed
  border-radius: 8px;
  overflow: hidden;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;

  .stat-item {
    background-color: var(--bg-hover);
    border-radius: 8px;
    padding: 12px;
    transition: background-color 0.3s ease;

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;

      &.text-blue { color: #60a5fa; }
      &.text-green { color: #4ade80; }
      &.text-purple { color: #c084fc; }
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-secondary);
    }
  }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(52, 199, 89, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0); }
}
</style>
