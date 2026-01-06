<template>
  <div class="signal-sampling-page">
    <Header
      :carrierName="sigal.mcc_desc || '中国移动'"
      :carrierEn="sigal.mnc_desc || 'China Mobile'"
      :mcc="sigal.mcc || '460'"
      :mnc="sigal.mnc || '00'"
    />

    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <SignalDetection
          v-model:signalType="signalType"
          :currentSignalValue="signalStore.currentSignalValue"
          :signalHistory="signalStore.signalHistory"
          :frequencyRange="selectedRange?.range || ''"
        />
        
        <ControlPanel
          v-model:frequency="frequency"
          :analyzing="analyzing"
          :frequencyRanges="frequencyRanges"
          @analyze="handleAnalyze"
          @clearHistory="clearHistory"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <AIDiagnosis :diagnosis="signalStore.diagnosis" />
        
        <VoiceBroadcast v-model:enabled="voiceEnabled" />
        
        <ServiceArea :items="serviceAreaItems" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSignalStore } from '@/stores/signalStore';
import Header from './contents/header.vue';
import SignalDetection from './contents/SignalDetection.vue';
import ControlPanel from './contents/ControlPanel.vue';
import AIDiagnosis from './contents/AIDiagnosis.vue';
import VoiceBroadcast from './contents/VoiceBroadcast.vue';
import ServiceArea from './contents/ServiceArea.vue';

// Types
interface SignalData {
  rsrp: number;
  rsrq: number;
  sinr: number;
}

// State
const signalStore = useSignalStore();
const sigal = signalStore.signalSampling;
const isSampling = ref(true);
const frequency = ref('5G');
const signalType = ref<'RSRP' | 'RSRQ' | 'SINR'>('RSRP');
const analyzing = ref(false);
const voiceEnabled = ref(false);

const serviceAreaItems = computed(() => [
  { label: '当前位置', value: sigal.location || '27.83°N 102.27°E' },
  { label: '数据网络', value: sigal.rat_desc || 'CMNET' },
  { label: '小区类型', value: sigal.rat || 'NR SA' },
  { label: 'NR-TAC', value: sigal.tac || '12345' },
  { label: 'NR-PCI', value: sigal.physicalcellId || '256' },
  { label: 'NR-CI', value: sigal.cellid || '65856256' },
  { label: 'NR-ARFCN', value: sigal.narfcn || '636000' },
  { label: 'NR-FREQ', value: sigal.bandwidth || '3620 MHz' },
  { label: 'NA-BAND', value: sigal.band || 'n78 (3300-3800 MHz)', fullWidth: true },
]);

const frequencyRanges = [
  { value: '5G', label: '5G (n78)', range: '3.3-3.8 GHz' },
  { value: '4G', label: '4G (B41)', range: '2.496-2.69 GHz' },
  { value: '3G', label: '3G (B1)', range: '1920-1980 MHz' }
];

const selectedRange = computed(() => frequencyRanges.find(f => f.value === frequency.value));

// Logic
const startSampling = () => {
  signalStore.startSampling();
};

const stopSampling = () => {
  signalStore.stopSampling();
};

const handleAnalyze = async () => {
  analyzing.value = true;
  await signalStore.fetchDiagnosis();
  analyzing.value = false;
};

const clearHistory = () => {
  signalStore.clearDiagnosis();
};

// Lifecycle
onMounted(() => {
  startSampling();
});

onUnmounted(() => {
  stopSampling();
});

watch(isSampling, (newVal) => {
  if (newVal) startSampling();
  else stopSampling();
});
</script>

<style scoped lang="scss">
.signal-sampling-page {
  background-color: var(--bg-app);
  transition: background-color 0.3s ease;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>