<template>
  <div class="inspector-card">
    <div class="left">
      <div class="avatar">
        {{ inspector.name[0] }}
      </div>
      <div class="info">
        <div class="name">{{ inspector.name }}</div>
        <div class="phone">{{ inspector.phone }}</div>
      </div>
    </div>
    <div class="right">
      <div class="stats">
        <div class="count">{{ inspector.inspections }}</div>
        <div class="label">巡检次数</div>
      </div>
      <span class="status-badge" :class="{ online: inspector.status === '在线' }">
        {{ inspector.status }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  inspector: {
    id: number;
    name: string;
    phone: string;
    status: string;
    inspections: number;
  }
}>();
</script>

<style lang="scss" scoped>
.inspector-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: var(--bg-hover);
  }

  .left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-color), #5856D6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  .info {
    .name {
      font-weight: 500;
      color: var(--text-primary);
      transition: color 0.3s ease;
    }
    .phone {
      font-size: 0.875rem;
      color: var(--text-secondary);
      transition: color 0.3s ease;
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .stats {
    text-align: center;
    .count {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      transition: color 0.3s ease;
    }
    .label {
      font-size: 0.75rem;
      color: var(--text-secondary);
      transition: color 0.3s ease;
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--bg-hover);
    color: var(--text-secondary);
    transition: background-color 0.3s ease, color 0.3s ease;

    &.online {
      background: rgba(52, 199, 89, 0.1);
      color: var(--color-success);
    }
  }
}
</style>
