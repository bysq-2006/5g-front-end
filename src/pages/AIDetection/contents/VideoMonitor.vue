<template>
  <div class="video-monitor">
    <!-- Realtime Mode -->
    <div v-if="mode === 'realtime'" class="monitor-panel">
      <div class="panel-header">
        <div class="header-left">
          <h2>实时画面</h2>
          <div class="status-indicator">
            <button
              class="connect-btn"
              :class="{
                'connected': isStreaming,
                'offline': isOffline,
                'connecting': !isStreaming && !isOffline
              }"
              @click="toggleConnection"
            >
              {{ isStreaming ? '断开' : '连接' }}
            </button>
            <span class="status-dot" :class="{ 'active': isStreaming, 'error': isOffline, 'standby': !isStreaming && !isOffline }"></span>
            <span class="status-text">
              {{ isStreaming ? '运行中' : isOffline ? '设备离线' : '未连接' }}
            </span>
          </div>
        </div>
      </div>

      <div class="video-wrapper">
        <div class="video-aspect-ratio">
          <video ref="videoRef" autoplay playsinline muted class="video-element"></video>
          <div v-if="!isStreaming" class="placeholder">
            <div class="placeholder-content">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p>设备未连接</p>
            </div>
          </div>
          <div v-if="isRecording" class="recording-badge">
            <span class="recording-dot"></span>
            <span>录制中</span>
          </div>
        </div>
      </div>

      <div class="controls">
        <template v-if="!isStreaming">
          <button class="btn btn-primary" @click="startCamera">启动画面</button>
        </template>
        <template v-else>
          <button class="btn btn-success" @click="captureImage">拍照</button>
          <button class="btn btn-warning" @click="disconnectDevice">暂停</button>
          <button
            class="btn"
            :class="isRecording ? 'btn-danger' : 'btn-purple'"
            @click="toggleRecording"
          >
            {{ isRecording ? '停止录制' : '开始录制' }}
          </button>
        </template>
      </div>

      <div v-if="recordedVideoUrl" class="download-panel">
        <div class="file-info">
          <div class="label">已录制视频</div>
          <div class="filename">{{ recordedVideoName }}</div>
        </div>
        <button class="btn btn-primary btn-sm" @click="downloadRecording">下载录像</button>
      </div>
    </div>

    <!-- Offline Mode -->
    <div v-if="mode === 'offline'" class="monitor-panel">
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
    </div>

    <canvas ref="canvasRef" class="hidden"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';

const props = defineProps<{
  mode: 'realtime' | 'offline';
}>();

const emit = defineEmits<{
  (e: 'capture', image: { url: string; timestamp: number }): void;
}>();

// State
const isStreaming = ref(false);
const isOffline = ref(false);
const isRecording = ref(false);
const recordedVideoUrl = ref<string | null>(null);
const recordedVideoName = ref('');
const offlineVideoUrl = ref<string | null>(null);

// Refs
const videoRef = ref<HTMLVideoElement | null>(null);
const offlineVideoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const streamRef = ref<MediaStream | null>(null);
const mediaRecorderRef = ref<MediaRecorder | null>(null);

// Methods
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: 'environment'
      }
    });

    streamRef.value = stream;
    isOffline.value = false;

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      videoRef.value.onloadedmetadata = () => {
        videoRef.value?.play();
        isStreaming.value = true;
      };
    }
  } catch (error) {
    console.error('Camera error:', error);
    isOffline.value = true;
    alert('无法访问摄像头，请检查权限设置');
  }
};

const disconnectDevice = () => {
  streamRef.value?.getTracks().forEach(track => track.stop());
  isStreaming.value = false;
  isRecording.value = false;
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
};

const toggleConnection = () => {
  if (isStreaming.value) {
    disconnectDevice();
  } else {
    startCamera();
  }
};

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
};

const startRecording = () => {
  if (!streamRef.value) return;

  const mediaRecorder = new MediaRecorder(streamRef.value, {
    mimeType: 'video/webm'
  });

  mediaRecorderRef.value = mediaRecorder;
  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    recordedVideoUrl.value = url;
    recordedVideoName.value = `录像_${Date.now()}.webm`;
  };

  mediaRecorder.start(1000);
  isRecording.value = true;
};

const stopRecording = () => {
  if (mediaRecorderRef.value && mediaRecorderRef.value.state !== 'inactive') {
    mediaRecorderRef.value.stop();
    isRecording.value = false;
  }
};

const downloadRecording = () => {
  if (!recordedVideoUrl.value) return;
  const a = document.createElement('a');
  a.href = recordedVideoUrl.value;
  a.download = recordedVideoName.value;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const captureImage = () => {
  if (!videoRef.value || !canvasRef.value) return;
  const video = videoRef.value;
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
  disconnectDevice();
  if (recordedVideoUrl.value) URL.revokeObjectURL(recordedVideoUrl.value);
  if (offlineVideoUrl.value) URL.revokeObjectURL(offlineVideoUrl.value);
});

watch(() => props.mode, (newMode) => {
  if (newMode === 'offline') {
    disconnectDevice();
  }
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

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.connect-btn {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: $white;
  background-color: $color-primary;

  &.connected {
    background-color: $color-success;
    &:hover { background-color: darken($color-success, 10%); }
  }
  &.offline {
    background-color: $gray-600;
    cursor: not-allowed;
  }
  &.connecting {
    background-color: $color-primary;
    &:hover { background-color: $color-primary-hover; }
  }
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: $gray-600;

  &.active {
    background-color: $color-success;
    animation: pulse 2s infinite;
  }
  &.error {
    background-color: $color-danger;
  }
  &.standby {
    background-color: $color-warning;
  }
}

.status-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
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

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .placeholder-content {
    text-align: center;
  }

  .icon {
    width: 4rem;
    height: 4rem;
    color: var(--text-tertiary);
    margin: 0 auto 1rem;
  }

  p {
    color: var(--text-secondary);
  }
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

.recording-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: $color-danger;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  
  .recording-dot {
    width: 0.75rem;
    height: 0.75rem;
    background-color: $white;
    border-radius: 50%;
    animation: pulse 1s infinite;
  }
  
  span {
    color: $white;
    font-size: 0.875rem;
    font-weight: 500;
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
  &.btn-danger {
    background-color: $color-danger;
    &:hover { background-color: darken($color-danger, 10%); }
  }
  &.btn-purple {
    background-color: $color-info;
    &:hover { background-color: darken($color-info, 10%); }
  }
  &.btn-sm {
    padding: 0.5rem 1rem;
    flex: 0 0 auto;
  }
  &.full-width {
    width: 100%;
  }
}

.download-panel {
  margin-top: 1rem;
  padding: 1rem;
  background-color: $gray-800;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label {
    font-size: 0.875rem;
    color: $gray-400;
    margin-bottom: 0.25rem;
  }
  .filename {
    color: $white;
    font-size: 0.875rem;
  }
}

.upload-section {
  margin-bottom: 1rem;
}

.hidden {
  display: none;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
