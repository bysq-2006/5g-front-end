<template>
  <div class="dashboard-cards">
    <div class="card">
      <div class="card-header">
        <span class="card-label">{{ $t('dashboard.baseStation') }}</span>
        <span class="card-tag add">{{ baseStationChange }}</span>
      </div>
      <div class="card-value">{{ baseStationCount }}</div>
      <div class="card-desc">{{ $t('dashboard.baseStationCount') }}</div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label warn">{{ $t('dashboard.alert') }}</span>
        <span class="card-tag warn">{{ warningChange }}</span>
      </div>
      <div class="card-value">{{ warningCount }}</div>
      <div class="card-desc">{{ $t('dashboard.pendingAlert') }}</div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">{{ $t('dashboard.online') }}</span>
        <span class="card-tag add">{{ computedOnlinePercent }}</span>
      </div>
      <div class="card-value">{{ onlineCount }}</div>
      <div class="card-desc">{{ $t('dashboard.online') }}</div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">{{ $t('dashboard.patrol') }}</span>
        <span class="card-tag add">{{ patrolStatus }}</span>
      </div>
      <div class="card-value">{{ patrolTime }}</div>
      <div class="card-desc">{{ $t('dashboard.lastPatrol') }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  baseStationCount: Number,      // 基站数量
  baseStationChange: String,     // 基站变化（如+2）
  warningCount: Number,          // 告警数量
  warningChange: String,         // 告警变化（如-1）
  onlineCount: String,           // 在线数量（如21/23）
  patrolTime: String,            // 上次巡检时间（如2小时前）
  patrolStatus: String           // 巡检状态（如正常）
});

const computedOnlinePercent = computed(() => {
  const [online, total] = props.onlineCount.split('/').map(Number);
  if (total === 0) return '0%';
  return ((online / total) * 100).toFixed(1) + '%';
});
</script>

<style scoped lang="scss">
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
.card {
  background: var(--bg-card-blue);
  border-radius: 16px;
  padding: 28px 24px 18px 24px;
  box-sizing: border-box;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  transition: background-color 0.3s ease;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.card-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 600;
  transition: color 0.3s ease;
}
.card-label.warn {
  color: var(--color-warning);
  transition: color 0.3s ease;
}
.card-tag {
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 12px;
  padding: 2px 14px;
  background: #e6fff5;
  color: #2ecc71;
  margin-left: 8px;
}
.card-tag.warn {
  background: #fffbe6;
  color: #e6c200;
}
.card-value {
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  transition: color 0.3s ease;
}
.card-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}
</style>
