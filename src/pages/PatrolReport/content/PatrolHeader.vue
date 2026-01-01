<template>
  <header class="patrol-header">
    <div class="logo">
      <div class="logo-icon">ꒊ</div>
      <div class="logo-text">
        <h1>彝路迅瞳 <span class="yi-text">ꒊꇐꑓꄸ</span></h1>
        <p>山区基站智能巡检系统 | ꁧꁱꈬꇐꃅꎭꄉꁧꁱꏳꍏ</p>
      </div>
    </div>
    <div class="language-controls">
      <button 
        class="language-btn" 
        :class="{ active: currentLang === 'yi' }" 
        @click="setLang('yi')"
      >
        彝语 ꆈꌠꉙ
      </button>
      <button 
        class="language-btn" 
        :class="{ active: currentLang === 'zh' }" 
        @click="setLang('zh')"
      >
        普通话
      </button>
      <button class="language-btn" @click="startVoiceInput">
        <i class="fas fa-microphone"></i> 语音输入
      </button>
      <button class="language-btn" @click="triggerEmergency">
        <i class="fas fa-exclamation-triangle"></i> 应急模式
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentLang = ref('yi');

const setLang = (lang: string) => {
  currentLang.value = lang;
  // In a real app, you might emit an event or use a store
  if (lang === 'yi') {
    alert('已切换至彝语界面 | ꆈꌠꉙꀋꐚꌠ');
  } else {
    alert('已切换至普通话界面');
  }
};

const startVoiceInput = () => {
  // Placeholder for voice input logic
  console.log('Voice input started');
};

const triggerEmergency = () => {
  alert('应急模式已启动！已通知最近维修团队，预计30分钟内到达。\n\nꈬꇐꃅꄉꁧꁱꀋꐚꌠꀐ！ꈬꇐꃅꄉꁧꁱꀋꐚꌠꀐꈬꇐꃅꄉꁧꁱꀋꐚꌠꀐ。');
  document.body.style.animation = 'emergencyPulse 1s infinite';
  setTimeout(() => {
      document.body.style.animation = '';
  }, 5000);
};
</script>

<style scoped lang="scss">
.patrol-header {
  background: linear-gradient(to right, #0d47a1, #1565c0);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px 15px 0 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0d47a1;
  font-weight: bold;
}

.logo-text {
  h1 {
    font-size: 24px;
    margin-bottom: 5px;
    margin: 0;
  }
  p {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }
}

.language-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.language-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;

  &.active {
    background: white;
    color: #0d47a1;
    font-weight: bold;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.yi-text {
  font-family: "SimSun", "Microsoft YaHei", sans-serif;
}
</style>

<style>
@keyframes emergencyPulse {
    0% { background-color: #1a237e; }
    50% { background-color: #b71c1c; }
    100% { background-color: #1a237e; }
}
</style>
