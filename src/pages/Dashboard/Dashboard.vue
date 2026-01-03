<template>
  <div class="dashboard">
    <Title />
    <EmergencyResponse />
    <QuickAccess :items="quickAccessItems" />
    <DashboardCards :baseStationCount="128" baseStationChange="+2" :warningCount="5" warningChange="-1"
      onlineCount="121/128" patrolTime="2小时前" patrolStatus="正常" />
    <AlertList :alerts="alertListDemo" style="margin-top: 32px;" :onHover="handleAlertHover" />
  </div>
</template>


<script setup name="Dashboard">
import Title from './contents/Title.vue';
import EmergencyResponse from './contents/EmergencyResponse.vue';
import DashboardCards from './contents/DashboardCards.vue';
import AlertList from './contents/AlertList.vue';
import QuickAccess from './contents/QuickAccess.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store';
const { showAlert } = storeToRefs(useStore());
function handleAlertHover() {
  showAlert.value = true;
}

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const quickAccessItems = [
  {
    title: t('dashboard.signalSampling'),
    route: '/signal-sampling',
    icon: 'chart',
    color: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)'
  },
  {
    title: t('dashboard.aiDetection'),
    route: '/ai-detection',
    icon: 'eye',
    color: 'linear-gradient(135deg, #5856D6 0%, #C644FC 100%)'
  },
  {
    title: t('dashboard.patrolReport'),
    route: '/patrol-report',
    icon: 'clipboard',
    color: 'linear-gradient(135deg, #FF9500 0%, #FFD200 100%)'
  },
  {
    title: t('dashboard.systemSettings'),
    route: '/system-settings',
    icon: 'settings',
    color: 'linear-gradient(135deg, #8E8E93 0%, #C7C7CC 100%)'
  },
];

const alertListDemo = [
  {
    id: 1,
    level: t('dashboard.alert'),
    title: '凉山基站-032',
    desc: t('dashboard.signalSampling'),
    time: '10:35',
  },
  {
    id: 2,
    level: t('dashboard.alert'),
    title: '美姑基站-018',
    desc: t('dashboard.signalSampling'),
    time: '09:22',
  },
  {
    id: 3,
    level: t('dashboard.alert'),
    title: '昭觉基站-045',
    desc: t('dashboard.signalSampling'),
    time: '08:15',
  },
];
</script>

<style scoped lang="scss">
.dashboard {
  background-color: var(--bg-page);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}
</style>
