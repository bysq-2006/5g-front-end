<template>
  <div class="button-group">
    <button
      v-for="(item, index) in items"
      :key="index"
      :class="['group-btn', { active: isSelected(item) }]"
      @click="handleClick(item)"
    >
      {{ getLabel(item) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { on } from 'events';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  // 按钮列表数据
  items: any[];
  // 当前选中的值 (v-model)
  modelValue?: any;
  // 如果 items 是对象，指定显示的属性名，默认为 'label'
  labelField?: string;
  // 如果 items 是对象，指定值的属性名，默认为 'value'。如果不指定，选中时返回整个对象
  valueField?: string;
  // 可选的点击回调函数
  callback?: Function;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'change', item: any): void;
}>();

// 获取显示的标签
const getLabel = (item: any) => {
  if (typeof item === 'object' && item !== null) {
    const field = props.labelField || 'label';
    return item[field];
  }
  return item;
};

// 获取用于比较和返回的值
const getValue = (item: any) => {
  if (props.valueField && typeof item === 'object' && item !== null) {
    return item[props.valueField];
  }
  // 如果没有指定 valueField，且 item 是对象，通常我们可能希望比较引用或者某个默认值，
  // 但为了简单起见，如果没指定 valueField，我们认为整个 item 就是值
  return item;
};

// 判断是否选中
const isSelected = (item: any) => {
  return getValue(item) === props.modelValue;
};

// 处理点击
const handleClick = (item: any) => {
  if (props.callback) {
    props.callback(item);
  }
  const val = getValue(item);
  emit('update:modelValue', val);
  emit('change', item); // change 事件返回完整的 item 对象，方便获取其他信息
};
</script>

<style scoped lang="scss">
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .group-btn {
    padding: 8px 16px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s;
    outline: none;
    user-select: none;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }

    &.active {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }
}
</style>
