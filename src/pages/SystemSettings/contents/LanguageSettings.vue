<template>
  <div class="settings-content">
    <h2 class="section-title">语言设置</h2>

    <div class="setting-group">
      <h3 class="group-title">界面语言</h3>
      <div class="language-options">
        <LanguageOption
          icon="🇨🇳"
          name="中文"
          :isActive="currentLang === 'zh'"
          :statusText="currentLang === 'zh' ? '当前使用' : '点击切换'"
          @select="currentLang = 'zh'"
        />
        <LanguageOption
          icon="🌿"
          name="彝文"
          :isActive="currentLang === 'yi'"
          :statusText="currentLang === 'yi' ? '当前使用' : '点击切换'"
          @select="currentLang = 'yi'"
        />
      </div>
    </div>

    <div class="setting-group">
      <h3 class="group-title">语音播报</h3>
      <div class="toggles">
        <ToggleSwitch
          label="启用语音播报"
          description="检测结果将以语音形式播报"
          v-model="voiceEnabled"
        />
        <ToggleSwitch
          label="双语播报"
          description="同时使用中文和彝语播报"
          v-model="bilingualEnabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageOption from './LanguageOption.vue';
import ToggleSwitch from './ToggleSwitch.vue';

const currentLang = ref('zh');
const voiceEnabled = ref(true);
const bilingualEnabled = ref(false);
</script>

<style lang="scss" scoped>
.settings-content {
  padding: 1.5rem;
  background: var(--bg-card); // $gray-900 with opacity
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.group-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.setting-group {
  margin-bottom: 1.5rem;
}

.language-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.toggles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
