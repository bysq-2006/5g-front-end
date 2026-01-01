<template>
  <div class="ai-diagnosis card">
    <div class="header">
      <div class="icon-box">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h2 class="title">{{ t('signal.aiDiagnosis') }}</h2>
    </div>

    <div v-if="diagnosis" class="results-container">
      <div :class="['top-result', isNormal ? 'normal' : 'warning']">
        <div class="result-header">
          <div class="result-type">
            <svg v-if="isNormal" class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ topResult.type }}</span>
          </div>
          <div class="probability">{{ (topResult.probability * 100).toFixed(0) }}%</div>
        </div>
        <p class="description">{{ topResult.description }}</p>
        <p class="suggestion">{{ t('signal.suggestion') }}: {{ topResult.suggestion }}</p>
      </div>

      <div v-if="otherResults.length > 0" class="other-results">
        <div class="other-label">其他可能原因：</div>
        <div v-for="(result, index) in otherResults" :key="index" class="other-item">
          <div class="other-header">
            <div class="other-type">{{ result.type }}</div>
            <div class="other-prob">{{ (result.probability * 100).toFixed(0) }}%</div>
          </div>
          <p class="other-desc">{{ result.description }}</p>
          <p class="other-sugg">{{ t('signal.suggestion') }}: {{ result.suggestion }}</p>
        </div>
      </div>

      <button class="generate-btn">
        {{ t('signal.generateReport') }}
      </button>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="empty-text">{{ t('signal.startAnalysis') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Mock t function
const t = (key: string) => {
  const map: Record<string, string> = {
    'signal.aiDiagnosis': 'AI 智能诊断',
    'signal.suggestion': '建议',
    'signal.generateReport': '生成诊断报告',
    'signal.startAnalysis': '点击左侧"开始分析"进行诊断'
  };
  return map[key] || key;
};

interface DiagnosisResult {
  type: string;
  description: string;
  suggestion: string;
  probability: number;
}

const props = defineProps<{
  diagnosis: string | null;
}>();

const parsedDiagnosis = computed(() => {
  if (!props.diagnosis) return [];
  try {
    return JSON.parse(props.diagnosis) as DiagnosisResult[];
  } catch (e) {
    return [];
  }
});

const topResult = computed(() => parsedDiagnosis.value[0]);
const otherResults = computed(() => parsedDiagnosis.value.slice(1));
const isNormal = computed(() => topResult.value?.type === '正常');

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
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  .icon-box {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 24px;
      height: 24px;
      color: white;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-result {
  border: 1px solid;
  border-radius: 8px;
  padding: 16px;

  &.normal {
    background-color: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
    
    .result-type { color: #4ade80; }
  }

  &.warning {
    background-color: rgba(234, 179, 8, 0.1);
    border-color: rgba(234, 179, 8, 0.2);

    .result-type { color: #facc15; }
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .result-type {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      .status-icon {
        width: 20px;
        height: 20px;
      }
    }

    .probability {
      font-size: 14px;
      font-weight: 700;
      color: #60a5fa;
    }
  }

  .description {
    font-size: 14px;
    color: var(--text-primary); // Or slightly lighter
    margin-bottom: 8px;
  }

  .suggestion {
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.other-results {
  .other-label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .other-item {
    background-color: var(--bg-hover);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 8px;

    .other-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      .other-type {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .other-prob {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }

    .other-desc {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .other-sugg {
      font-size: 12px;
      color: var(--text-secondary);
      opacity: 0.8;
    }
  }
}

.generate-btn {
  width: 100%;
  padding: 8px 16px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }
}

.empty-state {
  text-align: center;
  padding: 32px 0;

  .empty-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--bg-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;

    .icon {
      width: 32px;
      height: 32px;
      color: var(--text-secondary);
    }
  }

  .empty-text {
    font-size: 14px;
    color: var(--text-secondary);
  }
}
</style>
