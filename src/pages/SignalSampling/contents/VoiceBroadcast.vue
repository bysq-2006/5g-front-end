<template>
  <div class="voice-broadcast card">
    <div class="header">
      <h3 class="title">{{ t('signal.voiceBroadcast') }}</h3>
      <label class="switch">
        <input type="checkbox" :checked="enabled" @change="toggle">
        <span class="slider round"></span>
      </label>
    </div>
    <p class="description">
      {{ t('signal.voiceBroadcastDesc') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Mock t function
const t = (key: string) => {
  const map: Record<string, string> = {
    'signal.voiceBroadcast': '语音播报',
    'signal.voiceBroadcastDesc': '开启后将实时播报信号异常情况和诊断建议'
  };
  return map[key] || key;
};

const props = defineProps<{
  enabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:enabled', value: boolean): void;
}>();

const toggle = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:enabled', target.checked);
};
</script>

<style scoped lang="scss">
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .title {
    font-weight: 600;
    color: var(--text-primary);
  }
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Switch styles */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-hover); // Default off color
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--accent-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--accent-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
