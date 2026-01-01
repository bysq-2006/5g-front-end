<template>
  <div class="monitor-panel">
    <h2>离线回放</h2>

    <div v-if="offlineVideoUrl" class="video-wrapper">
      <div class="video-aspect-ratio">
        <video ref="offlineVideoRef" :src="offlineVideoUrl" controls class="video-element"></video>
      </div>
    </div>

    <div v-if="offlineVideoUrl" class="controls">
      <button class="btn btn-success" @click="captureFromVideo">截屏</button>
      <button class="btn btn-warning" @click="toggleOfflinePlay">暂停/播放</button>
    </div>

    <div v-if="!offlineVideoUrl" class="placeholder-offline">
      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
      <p>请上传巡检视频进行回放</p>
    </div>

    <div class="upload-section">
      <input type="file" ref="fileInputRef" accept="video/*" class="hidden" @change="handleFileUpload" />
      <button class="btn btn-primary full-width" @click="triggerFileUpload">上传巡检视频</button>
    </div>

    <canvas ref="canvasRef" class="hidden"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'capture', image: { url: string; timestamp: number }): void;
}>();

// State
const offlineVideoUrl = ref<string | null>(null);

// Refs
const offlineVideoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Methods
const triggerFileUpload = () => {
  fileInputRef.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  offlineVideoUrl.value = url;
};

const captureFromVideo = () => {
  if (!offlineVideoRef.value || !canvasRef.value) return;
  const video = offlineVideoRef.value;
  const canvas = canvasRef.value;

  if (video.videoWidth === 0) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const imageData = canvas.toDataURL('image/jpeg', 0.9);

  emit('capture', {
    url: imageData,
    timestamp: Date.now()
  });
};

const toggleOfflinePlay = () => {
  if (offlineVideoRef.value) {
    if (offlineVideoRef.value.paused) {
      offlineVideoRef.value.play();
    } else {
      offlineVideoRef.value.pause();
    }
  }
};

// Cleanup
onUnmounted(() => {
  if (offlineVideoUrl.value) URL.revokeObjectURL(offlineVideoUrl.value);
});
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.monitor-panel {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.video-wrapper {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
}

.video-aspect-ratio {
  position: relative;
  background-color: $black;
  border-radius: 0.75rem;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-offline {
  position: relative;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-secondary);
  
  .icon {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    color: var(--text-tertiary);
  }
}

.controls {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: $white;

  &.btn-primary {
    background-color: $color-primary;
    &:hover { background-color: $color-primary-hover; }
  }
  &.btn-success {
    background-color: $color-success;
    &:hover { background-color: darken($color-success, 10%); }
  }
  &.btn-warning {
    background-color: $color-warning;
    &:hover { background-color: darken($color-warning, 10%); }
  }
  &.full-width {
    width: 100%;
  }
}

.upload-section {
  margin-top: 1rem;
}

.hidden {
  display: none;
}
</style>
