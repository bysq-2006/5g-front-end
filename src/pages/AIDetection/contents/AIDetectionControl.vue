<template>
  <div class="ai-control">
    <h2 class="title">AI 识别</h2>
    <button
      class="ai-btn"
      :disabled="isAnalyzing || imageCount === 0"
      @click="$emit('run-detection')"
    >
      {{ isAnalyzing ? '识别中...' : `AI 识别 (${imageCount} 张图片)` }}
    </button>
    <p class="description">
      自动识别所有拍摄和截屏的图片中的故障
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isAnalyzing: boolean;
  imageCount: number;
}>();

defineEmits<{
  (e: 'run-detection'): void;
}>();
</script>

<style scoped lang="scss">
@use '@/styles/theme.scss' as *;

.ai-control {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.ai-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #a855f7, #ec4899); // Purple to Pink
  color: $white;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(to right, darken(#a855f7, 5%), darken(#ec4899, 5%));
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.description {
  font-size: 0.75rem;
  color: $gray-400;
  margin-top: 0.5rem;
}
</style>
