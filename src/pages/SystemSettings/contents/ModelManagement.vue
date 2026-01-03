<template>
  <div class="settings-content">
    <div class="header">
      <h2 class="section-title">{{ $t('system.modelManagementTitle') }}</h2>
      <button class="btn-purple">{{ $t('system.uploadModel') }}</button>
    </div>

    <div class="model-list">
      <ModelCard 
        v-for="model in models" 
        :key="model.id" 
        :model="model" 
      />
    </div>

    <div class="training-section">
      <h3 class="section-subtitle">{{ $t('system.modelTraining') }}</h3>
      <div class="training-status">
        <div class="progress-header">
          <span class="label">{{ $t('system.trainingProgress') }}</span>
          <span class="percent">78%</span>
        </div>
        <div class="progress-bar">
          <div class="fill" style="width: 78%"></div>
        </div>
        <p class="desc">{{ $t('system.trainingDesc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import ModelCard from './ModelCard.vue';

const models = ref([
  { id: 1, name: '锈蚀检测模型 v2.1', version: '2.1.0', accuracy: '92%', status: '已部署' },
  { id: 2, name: '天线异常检测 v1.5', version: '1.5.0', accuracy: '88%', status: '已部署' },
  { id: 3, name: '通用缺陷检测 v3.0', version: '3.0.0', accuracy: '95%', status: '测试中' }
]);
</script>

<style lang="scss" scoped>
.settings-content {
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.btn-purple {
  padding: 0.5rem 1rem;
  background-color: #AF52DE; // Purple
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9F42CE;
  }
}

.model-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.training-section {
  padding: 1rem;
  background: linear-gradient(to right, rgba(175, 82, 222, 0.1), rgba(255, 45, 85, 0.1));
  border: 1px solid rgba(175, 82, 222, 0.2);
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.section-subtitle {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.training-status {
  .progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;

    .label {
      color: var(--text-secondary);
      transition: color 0.3s ease;
    }
    .percent {
      color: #AF52DE;
    }
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    background: var(--bg-hover);
    border-radius: 9999px;
    overflow: hidden;
    margin-bottom: 0.5rem;
    transition: background-color 0.3s ease;

    .fill {
      height: 100%;
      background: linear-gradient(to right, #AF52DE, #FF2D55);
      border-radius: 9999px;
    }
  }

  .desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
}
</style>
