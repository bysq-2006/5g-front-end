<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9V14M12 17.01L12.01 16.998M10.29 3.86L1.82 18C1.64531 18.3024 1.55299 18.645 1.55219 18.9939C1.55139 19.3427 1.64215 19.6851 1.81544 19.9871C1.98874 20.289 2.23811 20.5401 2.53873 20.7154C2.83935 20.8907 3.1805 20.9835 3.527 20.984H20.473C20.8195 20.9835 21.1607 20.8907 21.4613 20.7154C21.7619 20.5401 22.0113 20.289 22.1846 19.9871C22.3579 19.6851 22.4486 19.3427 22.4478 18.9939C22.447 18.645 22.3547 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32319 12.9812 3.15449C12.6817 2.98579 12.3438 2.89728 12 2.89728C11.6562 2.89728 11.3183 2.98579 11.0188 3.15449C10.7193 3.32319 10.4683 3.56611 10.29 3.86Z" stroke="#ff3b30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="modal-text">{{ message }}</div>
      <button class="modal-btn" @click="closeModal">确认</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: '警告信息'
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
  padding: 40px;
  text-align: center;
  width: 90%;
  max-width: 380px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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

.modal-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 59, 48, 0.1);
  border-radius: 50%;
}

.modal-icon svg {
  width: 48px;
  height: 48px;
}

.modal-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 32px;
  line-height: 1.4;
}

.modal-btn {
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 14px 0;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
}

.modal-btn:hover {
  background: #e0352a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 59, 48, 0.4);
}

.modal-btn:active {
  transform: translateY(0);
}
</style>
