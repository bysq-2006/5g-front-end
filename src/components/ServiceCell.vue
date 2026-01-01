<template>
  <div class="service-cell">
    <div class="header">
      <h3>服务小区</h3>
      <div class="right-info">
        <span class="icon" @click="isLocationVisible = !isLocationVisible">
          {{ isLocationVisible ? '👁' : '🔒' }}
        </span>
        <span class="location">我的位置: {{ isLocationVisible ? location : '******' }}</span>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup name="ServiceCell">
import { ref } from 'vue'

defineProps({
  location: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  }
})

const isLocationVisible = ref(true)
</script>

<style scoped lang="scss">
.service-cell {
  width: 450px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h3 {
      margin: 0;
      color: var(--text-primary);
      font-size: 18px;
      font-weight: bold;
    }

    .right-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: var(--text-secondary);
      
        cursor: pointer;
        user-select: none;
      .icon {
        font-size: 16px;
      }
    }
  }

  .list {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-color);
      font-size: 14px;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: var(--text-secondary);
      }

      .value {
        color: var(--text-primary);
        font-weight: 500;
      }
    }
  }
}
</style>
