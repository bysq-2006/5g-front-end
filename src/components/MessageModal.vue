<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">消息通知</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      <div class="messages-list">
        <div v-for="message in messages" :key="message.id" class="message-item">
          <div class="message-header">
            <h3 class="message-title">{{ message.title }}</h3>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <p class="message-content">{{ message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  messages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--bg-secondary, #ffffff);
  border-radius: 24px;
  padding: 0;
  text-align: left;
  width: 90%;
  max-width: 700px;
  min-height: 60vh;
  max-height: 80vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

[data-theme='dark'] .modal-content {
  background: #1e1e1e;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: var(--bg-hover);
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.message-item {
  padding: 20px 32px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.message-item:hover {
  background-color: var(--bg-hover);
}

.message-item:last-child {
  border-bottom: none;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.message-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.message-time {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 16px;
  white-space: nowrap;
}

.message-content {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}
</style>