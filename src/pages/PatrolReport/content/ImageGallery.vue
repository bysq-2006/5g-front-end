<template>
  <div class="image-gallery-card">
    <div class="header">
      <h3 class="section-title">故障图像</h3>
      <button v-if="faults.length > 0" class="clear-btn" @click="$emit('clear')">
        清除数据
      </button>
    </div>

    <div v-if="faults.length === 0" class="empty-state">
      <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p>暂无故障图像，请先在 AI 检测页面进行识别</p>
    </div>

    <div v-else class="gallery-grid">
      <div v-for="fault in faults" :key="fault.id" class="gallery-item">
        <div class="image-wrapper">
          <img :src="fault.image" :alt="`故障: ${fault.type}`" />
          <div class="overlay">
            <div class="overlay-content">
              <div class="tag" :class="getTypeClass(fault.type)">{{ fault.type }}</div>
              <div class="position">{{ fault.position }}</div>
              <div class="confidence">置信度: {{ fault.confidence.toFixed(0) }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InspectionFault } from '../types';

defineProps<{
  faults: InspectionFault[];
}>();

defineEmits<{
  (e: 'clear'): void;
}>();

const getTypeClass = (type: string) => {
  switch (type) {
    case '锈蚀': return 'bg-warning';
    case '断裂': return 'bg-danger';
    default: return 'bg-orange';
  }
};
</script>

<style lang="scss" scoped>
.image-gallery-card {
  background: var(--bg-card);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  
  [data-theme='dark'] & {
    border-color: var(--gray-800);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.clear-btn {
  font-size: 12px;
  color: var(--color-danger);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff6b6b;
  }
}

.empty-state {
  text-align: center;
  padding: 32px 0;
  color: var(--text-secondary);

  .empty-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 12px;
    color: var(--gray-400);
  }
  
  p {
    font-size: 14px;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.gallery-item {
  position: relative;
}

.image-wrapper {
  aspect-ratio: 1;
  background: var(--gray-800);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border: 1px solid var(--gray-200);
  
  [data-theme='dark'] & {
    border-color: var(--gray-700);
  }

  &:hover {
    box-shadow: 0 0 0 2px var(--color-primary);
    
    .overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent, transparent);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: flex-end;
}

.overlay-content {
  padding: 8px;
  width: 100%;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  margin-bottom: 4px;

  &.bg-warning { background: var(--color-warning); }
  &.bg-danger { background: var(--color-danger); }
  &.bg-orange { background: #FF9500; }
}

.position {
  font-size: 12px;
  color: white;
  margin-bottom: 4px;
}

.confidence {
  font-size: 12px;
  color: var(--gray-300);
}
</style>
