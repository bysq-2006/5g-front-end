<template>
  <div class="control-panel card">
    <h2 class="title">{{ $t('signal.control') }}</h2>
    
    <div class="frequency-ranges">
      <button
        v-for="freq in frequencyRanges"
        :key="freq.value"
        :class="['freq-btn', { active: frequency === freq.value }]"
        @click="setFrequency(freq.value)"
      >
        <div class="freq-label">{{ freq.label }}</div>
        <div class="freq-range">{{ freq.range }}</div>
      </button>
    </div>

    <div class="action-buttons">
      <button
        class="action-btn analyze-btn"
        :disabled="analyzing"
        @click="emit('analyze')"
      >
        {{ analyzing ? $t('signal.analyzing') : $t('signal.analysis') }}
      </button>
      <button
        class="action-btn clear-btn"
        @click="emit('clearHistory')"
      >
        {{ $t('signal.clearHistory') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  frequency: string;
  analyzing: boolean;
  frequencyRanges: Array<{ value: string; label: string; range: string }>;
}>();

const emit = defineEmits<{
  (e: 'update:frequency', value: string): void;
  (e: 'analyze'): void;
  (e: 'clearHistory'): void;
}>();

const setFrequency = (val: string) => {
  emit('update:frequency', val);
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

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.frequency-ranges {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;

  .freq-btn {
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    min-width: 140px;

    .freq-label {
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .freq-range {
      font-size: 12px;
      color: var(--text-secondary);
    }

    &:hover {
      border-color: var(--text-secondary);
    }

    &.active {
      background-color: rgba(0, 122, 255, 0.1);
      border-color: var(--accent-color);
      
      .freq-label {
        color: var(--accent-color);
      }
    }
  }
}

.action-buttons {
  display: flex;
  gap: 16px;

  .action-btn {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    font-size: 16px;

    &.analyze-btn {
      background-color: #a855f7; // Purple
      color: white;

      &:hover {
        background-color: #9333ea;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    &.clear-btn {
      background-color: var(--bg-hover);
      color: var(--text-primary);

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}
</style>
