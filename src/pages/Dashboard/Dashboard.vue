
<template>
  <div class="dashboard">
    <Title />
    <EmergencyResponse />
    <QuickAccess :items="quickAccessItems" />
    <DashboardCards
      :baseStationCount="128"
      baseStationChange="+2"
      :warningCount="5"
      warningChange="-1"
      onlineCount="121/128"
      onlinePercent="94.5%"
      patrolTime="2小时前"
      patrolStatus="正常"
    />
    <AlertList :alerts="alertListDemo" style="margin-top: 32px;" />
  </div>
</template>


<script setup name="Dashboard">
import Title from './contents/Title.vue';
import EmergencyResponse from './contents/EmergencyResponse.vue';
import DashboardCards from './contents/DashboardCards.vue';
import AlertList from './contents/AlertList.vue';
import QuickAccess from './contents/QuickAccess.vue';

const quickAccessItems = [
  { 
    title: '信号采样', 
    route: '/signal-sampling', 
    icon: 'chart', 
    color: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)' 
  },
  { 
    title: 'AI检测', 
    route: '/ai-detection', 
    icon: 'eye', 
    color: 'linear-gradient(135deg, #5856D6 0%, #C644FC 100%)' 
  },
  { 
    title: '巡检报告', 
    route: '/patrol-report', 
    icon: 'clipboard', 
    color: 'linear-gradient(135deg, #FF9500 0%, #FFD200 100%)' 
  },
  { 
    title: '系统设置', 
    route: '/system-settings', 
    icon: 'settings', 
    color: 'linear-gradient(135deg, #8E8E93 0%, #C7C7CC 100%)' 
  },
];

const alertListDemo = [
  {
    id: 1,
    level: '警告',
    title: '凉山基站-032',
    desc: '信号衰减',
    time: '10:35',
  },
  {
    id: 2,
    level: '严重',
    title: '美姑基站-018',
    desc: '天线异常',
    time: '09:22',
  },
  {
    id: 3,
    level: '警告',
    title: '昭觉基站-045',
    desc: '电源波动',
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
