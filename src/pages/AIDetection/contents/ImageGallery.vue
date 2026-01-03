<template>
  <div class="image-gallery">
    <div class="header">
      <h2>{{ $t('ai.captureGallery') }} ({{ images.length }})</h2>
    </div>

    <div class="gallery-list">
      <div v-if="images.length === 0" class="empty-state">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>{{ $t('ai.noImage') }}</p>
      </div>
      
      <div
        v-for="image in images"
        :key="image.id"
        class="gallery-item"
        @click="$emit('select', image)"
      >
        <img :src="image.url" alt="captured" class="thumbnail" />
        
        <div v-if="image.detections && image.detections.length > 0" class="tags">
          <span
            v-for="detection in image.detections"
            :key="detection.id"
            class="tag"
            :class="getTypeClass(detection.type)"
          >
            {{ detection.type }}
          </span>
        </div>

        <button class="delete-btn" @click.stop="$emit('delete', image.id)">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="timestamp-overlay">
          <span>{{ formatTime(image.timestamp) }}</span>
        </div>
      </div>
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
  images: CapturedImage[];
}>();

defineEmits<{
  (e: 'select', image: CapturedImage): void;
  (e: 'delete', id: number): void;
}>();

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN');
};

const getTypeClass = (type: string) => {
  switch (type) {
    case '锈蚀': return 'tag-yellow';
    case '断裂': return 'tag-red';
    case '松动': return 'tag-orange';
    default: return 'tag-gray';
  }
};
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.image-gallery {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.gallery-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-secondary);

  .icon {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    color: var(--text-tertiary);
  }
  
  p {
    font-size: 0.875rem;
  }
}

.gallery-item {
  position: relative;
  background-color: var(--bg-hover);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bg-card-blue);
  }
}

.thumbnail {
  width: 100%;
  height: 8rem;
  object-fit: cover;
}

.tags {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.tag {
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid;

  &.tag-yellow {
    background-color: rgba($color-warning, 0.2);
    border-color: $color-warning;
    color: lighten($color-warning, 10%);
  }
  &.tag-red {
    background-color: rgba($color-danger, 0.2);
    border-color: $color-danger;
    color: lighten($color-danger, 10%);
  }
  &.tag-orange {
    background-color: rgba(#F97316, 0.2); // Orange
    border-color: #F97316;
    color: lighten(#F97316, 10%);
  }
  &.tag-gray {
    background-color: rgba($gray-500, 0.2);
    border-color: $gray-500;
    color: $gray-400;
  }
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: $color-danger;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($color-danger, 10%);
  }

  .icon-sm {
    width: 1rem;
    height: 1rem;
    color: $white;
  }
}

.timestamp-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 0.5rem;
  
  span {
    font-size: 0.75rem;
    color: $gray-300;
  }
}
</style>
