<template>
  <div class="ai-detection-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('ai.pageTitle') }}</h1>
      <p class="page-subtitle">{{ $t('ai.pageSubtitle') }}</p>
    </div>

    <ModeSwitcher />

    <div class="grid-layout">
      <div class="left-column">
        <router-view v-slot="{ Component }">
          <component :is="Component" @capture="handleCapture" />
        </router-view>
      </div>

      <div class="right-column">
        <AIDetectionControl
          :is-analyzing="isAnalyzing"
          :image-count="capturedImages.length"
          @run-detection="runAIDetection"
        />
        
        <ImageGallery
          :images="capturedImages"
          @select="selectedImage = $event"
          @delete="deleteImage"
        />

        <ImageDetail :image="selectedImage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModeSwitcher from './contents/ModeSwitcher.vue';
import AIDetectionControl from './contents/AIDetectionControl.vue';
import ImageGallery from './contents/ImageGallery.vue';
import ImageDetail from './contents/ImageDetail.vue';

// Types
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

// State
const capturedImages = ref<CapturedImage[]>([]);
const selectedImage = ref<CapturedImage | null>(null);
const isAnalyzing = ref(false);

// Methods
const handleCapture = (image: { url: string; timestamp: number }) => {
  const newImage: CapturedImage = {
    id: Date.now(),
    url: image.url,
    timestamp: image.timestamp
  };
  capturedImages.value = [newImage, ...capturedImages.value];
  selectedImage.value = newImage;
};

const deleteImage = (id: number) => {
  capturedImages.value = capturedImages.value.filter(img => img.id !== id);
  if (selectedImage.value?.id === id) {
    selectedImage.value = null;
  }
};

const runAIDetection = async () => {
  if (capturedImages.value.length === 0) {
    alert('请先拍摄或截屏图片');
    return;
  }

  isAnalyzing.value = true;

  // Simulate AI processing
  const detectionPromises = capturedImages.value.map(async (image) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Randomly generate faults
    const hasFault = Math.random() > 0.3;
    if (!hasFault) return null;

    const faultTypes = ['锈蚀', '断裂', '松动'] as const;
    const positions = [
      '东南侧天线接口',
      '西南侧支架连接处',
      '北侧馈线接头',
      '东侧设备箱门',
      '顶部避雷针基座'
    ];

    const detections: DetectionResult[] = [
      {
        id: Date.now() + Math.random() * 1000,
        type: faultTypes[Math.floor(Math.random() * faultTypes.length)],
        confidence: 75 + Math.random() * 20,
        position: positions[Math.floor(Math.random() * positions.length)],
        image: image.url,
        timestamp: Date.now()
      }
    ];

    return {
      ...image,
      detections
    };
  });

  const results = await Promise.all(detectionPromises);

  // Update images with results
  capturedImages.value = capturedImages.value.map((img, index) => ({
    ...img,
    detections: results[index]?.detections || undefined
  }));

  // Update selected image view if needed
  if (selectedImage.value) {
    const updatedSelected = capturedImages.value.find(img => img.id === selectedImage.value?.id);
    if (updatedSelected) {
      selectedImage.value = updatedSelected;
    }
  }

  // Save to localStorage for report page
  const allFaults = results
    .filter(result => result?.detections && result.detections.length > 0)
    .flatMap(result => result!.detections!.map(detection => ({
      ...detection,
      imageId: result!.id
    })));

  localStorage.setItem('inspectionFaults', JSON.stringify(allFaults));

  isAnalyzing.value = false;
  alert('AI 识别完成！故障已保存到巡检报告');
};
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.ai-detection-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--bg-app);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.page-subtitle {
  color: var(--text-secondary);
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>

<style scoped lang="scss">
.ai-detection {
  padding: 24px;
}
</style>
