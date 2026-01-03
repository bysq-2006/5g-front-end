<template>
  <div class="settings-content">
    <h2 class="section-title">{{ $t('system.languageSettingsTitle') }}</h2>

    <div class="setting-group">
      <h3 class="group-title">{{ $t('system.interfaceLanguage') }}</h3>
      <div class="language-options">
        <LanguageOption
          icon="🇨🇳"
          name="中文"
          :isActive="currentLang === 'zh'"
          :statusText="currentLang === 'zh' ? $t('system.langStatus.current') : $t('system.langStatus.switch')"
          @select="setLanguage('zh')"
        />
        <LanguageOption
          icon="🌿"
          name="ꆈꌠꈌ"
          :isActive="currentLang === 'yi'"
          :statusText="currentLang === 'yi' ? $t('system.langStatus.current') : $t('system.langStatus.switch')"
          @select="setLanguage('yi')"
        />
      </div>
    </div>

    <div class="setting-group">
      <h3 class="group-title">{{ $t('system.voiceBroadcast') }}</h3>
      <div class="toggles">
        <ToggleSwitch
          :label="$t('system.enableVoiceBroadcast')"
          :description="$t('system.voiceBroadcastDesc')"
          v-model="voiceEnabled"
        />
        <ToggleSwitch
          :label="$t('system.bilingualBroadcast')"
          :description="$t('system.bilingualBroadcastDesc')"
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
import { useI18n } from 'vue-i18n';
const locale = useI18n().locale;
const currentLang = ref(locale.value);
const voiceEnabled = ref(true);
const bilingualEnabled = ref(false);

const setLanguage = (lang: string) => {
  currentLang.value = lang;
  locale.value = lang;
};
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
