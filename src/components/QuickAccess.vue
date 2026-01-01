<template>
  <div class="quick-access">
    <h3 class="section-title">快速入口</h3>
    <div class="access-grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="access-card"
        @click="navigateTo(item.route)"
      >
        <div class="icon-wrapper" :style="{ background: item.color }">
          <!-- 如果传入的是 SVG 字符串，可以使用 v-html，或者使用组件 -->
          <!-- 这里为了简单通用，假设 icon 是一个简单的 emoji 或者我们根据名字匹配内置 SVG，
               或者更灵活的方式是让父组件传 icon 组件。
               为了演示效果，这里我先写死几个内置 SVG，根据 item.icon 名字来显示 -->
          <component :is="getIcon(item.icon)" class="icon-svg" />
        </div>
        <div class="text-content">
          <span class="access-title">{{ item.title }}</span>
          <span class="access-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { h } from 'vue';

// 简单的 SVG 图标组件定义
const IconChart = {
  render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M18 20V10' }),
    h('path', { d: 'M12 20V4' }),
    h('path', { d: 'M6 20V14' })
  ])
};

const IconEye = {
  render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    h('circle', { cx: 12, cy: 12, r: 3 })
  ])
};

const IconClipboard = {
  render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
    h('rect', { x: 8, y: 2, width: 8, height: 4, rx: 1, ry: 1 })
  ])
};

const IconSettings = {
  render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: 12, cy: 12, r: 3 }),
    h('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })
  ])
};

const props = defineProps<{
  items: Array<{
    title: string
    route: string
    icon: string // 'chart', 'eye', 'clipboard', 'settings'
    color: string
  }>
}>();

const router = useRouter();

const navigateTo = (route: string) => {
  router.push(route);
};

const getIcon = (name: string) => {
  switch (name) {
    case 'chart': return IconChart;
    case 'eye': return IconEye;
    case 'clipboard': return IconClipboard;
    case 'settings': return IconSettings;
    default: return IconSettings;
  }
};
</script>

<style scoped lang="scss">
.quick-access {
  margin-top: 32px;
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-left: 4px;
}

.access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.access-card {
  background-color: var(--bg-card);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent;
  box-shadow: var(--shadow);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    border-color: var(--border-focus);
    
    .access-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  .icon-svg {
    width: 24px;
    height: 24px;
  }
}

.text-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.access-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.access-arrow {
  color: var(--text-tertiary);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}
</style>
