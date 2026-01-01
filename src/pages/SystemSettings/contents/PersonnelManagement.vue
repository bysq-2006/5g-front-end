<template>
  <div class="settings-content">
    <div class="header">
      <h2 class="section-title">人员管理</h2>
      <button class="btn-primary">添加巡检员</button>
    </div>

    <div class="inspector-list">
      <InspectorCard 
        v-for="inspector in inspectors" 
        :key="inspector.id" 
        :inspector="inspector" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InspectorCard from './InspectorCard.vue';

const inspectors = ref([
  { id: 1, name: '阿木尔', phone: '138****1234', status: '在线', inspections: 156 },
  { id: 2, name: '吉克', phone: '139****5678', status: '离线', inspections: 98 },
  { id: 3, name: '马海', phone: '137****9012', status: '在线', inspections: 132 }
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

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0062CC;
  }
}

.inspector-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
