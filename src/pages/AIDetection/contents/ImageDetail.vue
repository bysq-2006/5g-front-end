<template>
  <div v-if="image" class="image-detail">
    <h3 class="title">图片详情</h3>
    <img :src="image.url" alt="selected" class="detail-image" />
    
    <div v-if="image.detections && image.detections.length > 0" class="detections-list">
      <div class="label">检测结果：</div>
      <div
        v-for="detection in image.detections"
        :key="detection.id"
        class="detection-item"
        :class="getTypeClass(detection.type)"
      >
        <div class="detection-header">
          <span class="type">{{ detection.type }}</span>
          <span class="confidence">{{ detection.confidence.toFixed(0) }}%</span>
        </div>
        <div class="position">{{ detection.position }}</div>
      </div>
    </div>
    <div v-else class="no-detections">
      点击上方“AI 识别”按钮进行故障检测
    </div>
  </div>
</template>

<script setup lang="ts">
interface DetectionResult {
  id: number;
  type: '锈蚀' | '断裂' | '松动';
  confidence: number;
  position: string;
  image: string;
  timestamp: number;
}

interface CapturedImage {
  id: number;
  url: string;
  timestamp: number;
  detections?: DetectionResult[];
}

defineProps<{
  image: CapturedImage | null;
}>();

const getTypeClass = (type: string) => {
  switch (type) {
    case '锈蚀': return 'border-yellow';
    case '断裂': return 'border-red';
    case '松动': return 'border-orange';
    default: return 'border-gray';
  }
};
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.image-detail {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.detail-image {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.detections-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detection-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;

  &.border-yellow {
    border-color: $color-warning;
    background-color: rgba($color-warning, 0.1);
    .type { color: lighten($color-warning, 10%); }
  }
  &.border-red {
    border-color: $color-danger;
    background-color: rgba($color-danger, 0.1);
    .type { color: lighten($color-danger, 10%); }
  }
  &.border-orange {
    border-color: #F97316;
    background-color: rgba(#F97316, 0.1);
    .type { color: lighten(#F97316, 10%); }
  }
  &.border-gray {
    border-color: $gray-500;
    background-color: rgba($gray-500, 0.1);
    .type { color: $gray-400; }
  }
}

.detection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.type {
  font-weight: 500;
}

.confidence {
  font-size: 0.875rem;
  color: $gray-300;
}

.position {
  font-size: 0.875rem;
  color: rgba($white, 0.8);
}

.no-detections {
  font-size: 0.875rem;
  color: $gray-400;
}
</style>
