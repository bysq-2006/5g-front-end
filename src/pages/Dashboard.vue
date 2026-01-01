<template>
  <div class="dashboard">
    <nav class="tab-bar">
      <button
        v-for="item in tabs"
        :key="item.path"
        class="tab"
        :class="{ active: $route.path === item.path }"
        @click="navigateTo(item.path)"
      >
        {{ item.label }}
      </button>
    </nav>
    <section class="content">
      <h1>仪表盘</h1>
      <p>这里可以放置总览数据或快捷入口。</p>
    </section>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { label: '仪表盘', path: '/dashboard' },
  { label: '信号采样', path: '/signal-sampling' },
  { label: 'AI检测', path: '/ai-detection' },
  { label: '巡检报告', path: '/patrol-report' },
  { label: '系统设置', path: '/system-settings' }
]

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
.dashboard {
  padding: 24px;
}

.tab-bar {
  display: flex;
  gap: 12px;
  background: #f2f7ff;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab {
  border: none;
  background: #eef3fb;
  color: #4b5563;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);

  &.active {
    background: linear-gradient(120deg, #4f8bff, #7fb1ff);
    color: #fff;
    box-shadow: 0 6px 18px rgba(79, 139, 255, 0.25);
  }

  &:hover {
    transform: translateY(-1px);
  }
}

.content {
  margin-top: 24px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}
</style>
