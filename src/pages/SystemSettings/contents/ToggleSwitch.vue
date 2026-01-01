<template>
  <div class="toggle-item">
    <div class="info">
      <div class="label">{{ label }}</div>
      <div class="desc">{{ description }}</div>
    </div>
    <label class="switch">
      <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  description: string;
  modelValue: boolean;
}>();

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;

  .label {
    font-weight: 500;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  .desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
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
  background-color: var(--bg-hover);
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
}

input:checked + .slider {
  background-color: var(--accent-color);
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
