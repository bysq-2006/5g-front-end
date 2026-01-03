<template>
  <div class="signal-sampling-page">
    <Header carrierName="中国移动" carrierEn="China Mobile" mcc="460" mnc="00" />

    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <SignalDetection
          v-model:signalType="signalType"
          :currentSignalValue="currentSignalValue"
          :signalHistory="signalHistory"
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
        <AIDiagnosis :diagnosis="diagnosis" />
        
        <VoiceBroadcast v-model:enabled="voiceEnabled" />
        
        <ServiceArea :items="serviceAreaItems" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
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

interface DiagnosisResult {
  type: string;
  description: string;
  suggestion: string;
  probability: number;
}

// State
const isSampling = ref(true);
const frequency = ref('5G');
const signalType = ref<'RSRP' | 'RSRQ' | 'SINR'>('RSRP');
const signalHistory = ref<SignalData[]>([]);
const analyzing = ref(false);
const diagnosis = ref<DiagnosisResult[] | null>(null);
const currentSignalValue = ref<SignalData | null>(null);
const voiceEnabled = ref(false);

const serviceAreaItems = ref([
  { label: '当前位置', value: '27.83°N 102.27°E' },
  { label: '数据网络', value: 'CMNET' },
  { label: '小区类型', value: 'NR SA' },
  { label: 'NR-TAC', value: '12345' },
  { label: 'NR-PCI', value: '256' },
  { label: 'NR-CI', value: '65856256' },
  { label: 'NR-ARFCN', value: '636000' },
  { label: 'NR-FREQ', value: '3620 MHz' },
  { label: 'NA-BAND', value: 'n78 (3300-3800 MHz)', fullWidth: true },
]);

const frequencyRanges = [
  { value: '5G', label: '5G (n78)', range: '3.3-3.8 GHz' },
  { value: '4G', label: '4G (B41)', range: '2.496-2.69 GHz' },
  { value: '3G', label: '3G (B1)', range: '1920-1980 MHz' }
];

const selectedRange = computed(() => frequencyRanges.find(f => f.value === frequency.value));

// Logic
let intervalId: number | null = null;

const startSampling = () => {
  intervalId = window.setInterval(() => {
    const now = Date.now();
    const newData: SignalData = {
      rsrp: -85 + Math.random() * 20,
      rsrq: -10 + Math.random() * 5,
      sinr: 15 + Math.random() * 10
    };

    currentSignalValue.value = newData;

    if (isSampling.value) {
      signalHistory.value.push(newData);
      if (signalHistory.value.length > 60) {
        signalHistory.value.shift();
      }
    }
  }, 1000);
};

const stopSampling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const handleAnalyze = async () => {
  analyzing.value = true;
  // Simulate AI analysis
  await new Promise(resolve => setTimeout(resolve, 2000));

  const possibleDiagnoses: DiagnosisResult[] = [
    {
      type: '干扰检测',
      description: 'SINR值偏低，频段存在外部干扰',
      suggestion: '调整天线方向或排查周边干扰源',
      probability: 0.10
    },
    {
      type: '天线异常',
      description: '检测到信号强度波动异常，可能存在物理损伤',
      suggestion: '建议进行AI巡检检查天线连接和腐蚀情况',
      probability: 0.20
    },
    {
      type: '馈线故障',
      description: 'RSRQ指标异常下降，馈线损耗过高',
      suggestion: '检查馈线接头密封性和连接状况',
      probability: 0.12
    },
    {
      type: '设备老化',
      description: '信号整体强度缓慢下降，设备性能衰退',
      suggestion: '建议更换老化设备并重新校准',
      probability: 0.08
    }
  ];

  possibleDiagnoses.sort((a, b) => b.probability - a.probability);
  diagnosis.value = possibleDiagnoses;
  analyzing.value = false;
};

const clearHistory = () => {
  diagnosis.value = null;
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