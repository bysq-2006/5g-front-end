<template>
  <div class="alert-list-container">
    <div class="alert-list-header">
      <span class="alert-list-title">{{ $t('dashboard.realtimeAlert') }}</span>
      <span class="alert-list-view-all" @click="goToAll">{{ $t('dashboard.viewAll') }}</span>
    </div>
    <div v-for="item in alerts" :key="item.id" class="alert-list-item" @mouseover="onHover && onHover(item)">
      <div class="alert-list-item-left">
        <span :class="['alert-tag', item.level === '严重' ? 'alert-tag-danger' : 'alert-tag-warning']">
          {{ item.level }}
        </span>
        <span class="alert-list-item-title">{{ item.title }}</span>
        <div class="alert-list-item-desc">{{ item.desc }}</div>
      </div>
      <div class="alert-list-item-time">{{ item.time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  alerts: Array<{
    id: string | number
    level: string // "警告" | "严重"
    title: string
    desc: string
    time: string
  }>
  onHover?: (item: any) => void
}>()

const router = useRouter()

function goToAll() {
  router.push('/patrol-report')
}
</script>

<style scoped>
.alert-list-container {
  background: var(--bg-card-blue, #f6f9fd);
  border-radius: 16px;
  padding: 24px 20px 20px 20px;
  transition: background 0.3s;
}
.alert-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.alert-list-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary, #222);
  transition: color 0.3s;
}
.alert-list-view-all {
  color: var(--accent-color, #409eff);
  cursor: pointer;
  font-size: 15px;
  user-select: none;
  transition: color 0.3s;
}
.alert-list-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #eaf2fb;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 14px;
  transition: background 0.3s;
}
[data-theme='dark'] .alert-list-item {
  background: #202023;
}
.alert-list-item:last-child {
  margin-bottom: 0;
}
.alert-list-item-left {
  display: flex;
  flex-direction: column;
}
.alert-tag {
  display: inline-block;
  font-size: 14px;
  border-radius: 6px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 4px;
  font-weight: 500;
  transition: background 0.3s, color 0.3s;
}
.alert-tag-warning {
  background: #fff7e6;
  color: var(--color-warning, #e6a23c);
}
.alert-tag-danger {
  background: #ffeaea;
  color: var(--color-danger, #f56c6c);
}
[data-theme='dark'] .alert-tag-warning {
  background: rgba(255, 149, 0, 0.12);
  color: var(--color-warning, #ff9500);
}
[data-theme='dark'] .alert-tag-danger {
  background: rgba(255, 59, 48, 0.12);
  color: var(--color-danger, #ff3b30);
}
.alert-list-item-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-primary, #222);
  margin-bottom: 2px;
  transition: color 0.3s;
}
.alert-list-item-desc {
  font-size: 14px;
  color: var(--text-secondary, #888);
  transition: color 0.3s;
}
.alert-list-item-time {
  font-size: 15px;
  color: var(--text-secondary, #888);
  margin-left: 16px;
  white-space: nowrap;
  transition: color 0.3s;
}
</style>
