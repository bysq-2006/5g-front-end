<template>
  <div class="main">
    <h1 style="margin-bottom: 24px;"> 信号采样页面 </h1>
    <div class="cards-container">
      <OperatorInformation 
        class="card" 
        :imgSrc="'/电信.png'"
        :operator="operatorInfo.operator"
        :mcc="operatorInfo.mcc"
        :mnc="operatorInfo.mnc"
      />
      <ServiceCell class="card" :location="serviceCellLocation" :list="serviceCellList" />
      <div class="card">
        <h3>信号强度</h3>
        <ButtonGroup 
          v-model="currentMode" 
          :items="modes" 
          class="mb-4"
        />
        <SignalStrengthChart :dataList="testlist" />
      </div>
    </div>
  </div>
</template>

<script setup name="SignalSampling">
import { ref } from 'vue';
import { useSignalDetectionStore } from '@/stores/SignalDetectionStore';
import OperatorInformation from '@/components/OperatorInformation.vue';
import ServiceCell from '@/components/ServiceCell.vue';
import SignalStrengthChart from '@/components/SignalStrengthChart.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';

const modes = ref(['SS RSRP', 'SS SINR', 'SS RSRQ']);
const currentMode = ref(modes.value[0]);
const operatorInfo = ref({
  operator: '中国电信',
  mcc: '460',
  mnc: '11'
});

const serviceCellLocation = ref('104.11812/30.648');
const serviceCellList = ref([
  { label: '数据网', value: 'NR' },
  { label: '小区类型', value: 'NR' },
  { label: 'NR-TAC', value: '1519616' },
  { label: 'NR-PCI', value: '168' },
  { label: 'NR-CI', value: '6187786496(1510690-256)' },
  { label: 'NR-ARFCN', value: '633984' },
  { label: 'NR-FREQ', value: '3509.76 MHz' },
]);
const testlist = ref([
]);

setInterval(() => {
  // 模拟信号强度变化
  if (testlist.value.length > 60) {
    testlist.value.shift();
  }
  const newValue = -60 - Math.floor(Math.random() * 20); // -60 到 -79 之间
  testlist.value.push(newValue);
}, 1000);
</script>

<style scoped lang="scss">

.cards-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.card {
  position: relative;
  background-color: var(--bg-card);
  box-shadow:0 1px 6px var(--shadow);
  border-radius: 12px;
  padding: 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.mb-4 {
  margin-bottom: 16px;
  position: absolute;
  z-index: 2;
  top: 30px;
  right: 54px;
}
</style>