<template>
  <div class="model-card">
    <div class="top">
      <div class="info">
        <h3 class="name">{{ model.name }}</h3>
        <div class="version">{{ $t('system.modelVersion') }}: {{ model.version }}</div>
      </div>
      <span class="status-badge" :class="getStatusClass(model.status)">
        {{ model.status }}
      </span>
    </div>

    <div class="bottom">
      <div class="metric">
        <div class="label">{{ $t('system.modelAccuracy') }}</div>
        <div class="value">{{ model.accuracy }}</div>
      </div>
      <div class="actions">
        <button class="btn-secondary">{{ $t('system.test') }}</button>
        <button class="btn-primary">{{ $t('system.deploy') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  model: {
    id: number;
    name: string;
    version: string;
    accuracy: string;
    status: string;
  }
}>();

const getStatusClass = (status: string) => {
  if (status === '已部署') return 'deployed';
  if (status === '测试中') return 'testing';
  return '';
};
</script>

<style lang="scss" scoped>
.model-card {
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: var(--bg-hover);
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .name {
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  .version {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

    &.deployed {
      background: rgba(52, 199, 89, 0.1);
      border-color: var(--color-success);
      color: var(--color-success);
    }

    &.testing {
      background: rgba(255, 149, 0, 0.1);
      border-color: var(--color-warning);
      color: var(--color-warning);
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .metric {
    .label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      transition: color 0.3s ease;
    }
    .value {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-success);
      transition: color 0.3s ease;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-secondary {
    padding: 0.375rem 0.75rem;
    background: var(--bg-hover);
    color: var(--text-secondary);
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background: var(--border-color);
    }
  }

  .btn-primary {
    padding: 0.375rem 0.75rem;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #0062CC;
    }
  }
}
</style>
