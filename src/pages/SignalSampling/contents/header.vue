<template>
<div class="main">
  <div class="header-left">
    <div class="title">
      <h1>5G信号采样分析</h1>
      <h3>基于5G通信模块的智能信号采样与AI实时诊断</h3>
    </div>
  </div>
  <div class="header-right">
    <div class="carrier">
      <div class="carrier-logo">
        <div class="logo-bg">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#FF5C2B"/>
            <polyline points="10,17 15,22 22,11" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="carrier-info">
          <div class="carrier-name">{{ carrierName }}</div>
          <div class="carrier-en">{{ carrierEn }}</div>
        </div>
      </div>
      <div class="carrier-codes">
        <div class="code-block">
          <div class="code-label">MCC</div>
          <div class="code-value">{{ mcc }}</div>
        </div>
        <div class="code-block">
          <div class="code-label">MNC</div>
          <div class="code-value">{{ mnc }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup name="Header" lang="ts">
const props = defineProps<{
  carrierName: string, // 运营商中文名
  carrierEn: string,   // 运营商英文名
  mcc: string,         // MCC
  mnc: string          // MNC
}>();
</script>

<style scoped lang="scss">

.main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 19px;
}
.header-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title h1 {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 6px 0;
  transition: color 0.3s ease;
}
.title h3 {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s ease;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0;
}
.carrier {
  display: flex;
  align-items: center;
  gap: 13px;
}
.carrier-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-card);
  border-radius: 13px;
  padding: 10px 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.logo-bg {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff7e5f, #ff5c2b);
  border-radius: 10px;
}
.carrier-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.carrier-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
}
.carrier-en {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 2px;
  transition: color 0.3s ease;
}
.carrier-codes {
  display: flex;
  gap: 10px;
  margin-left: 6px;
}
.code-block {
  background: var(--bg-card-blue);
  border-radius: 8px;
  padding: 8px 16px 6px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 51px;
  transition: background-color 0.3s ease;
}
.code-label {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 2px;
  font-weight: 500;
  transition: color 0.3s ease;
}
.code-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
  transition: color 0.3s ease;
}
</style>