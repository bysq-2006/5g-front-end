<template>
  <div class="panel-right">
    <div class="panel-title">
      <i class="fas fa-satellite"></i>
      <span>5G信号分析 | 5G ꈬꇐꃅꄉꁧꁱ</span>
    </div>
    
    <div class="signal-graph">
      <div style="color: white; font-weight: bold;">5G信号波形图 | 5G ꈬꇐꃅꄉꁧꁱ</div>
      <div class="signal-wave">
        <div class="wave-line"></div>
        <div class="wave-line"></div>
        <div class="wave-line"></div>
        <div class="signal-anomaly">异常 | ꀋꐚ</div>
      </div>
      <div style="color: #64b5f6; margin-top: 10px; display: flex; justify-content: space-between;">
        <span>Band 3 (1800MHz)</span>
        <span>SNR: 12dB (Low)</span>
      </div>
    </div>
    
    <div class="diagnosis-results">
      <div class="diagnosis-item">
        <span>信号强度 (RSRP) | ꈬꇐꃅ</span>
        <span class="status-badge status-warning">-95 dBm (弱)</span>
      </div>
      <div class="diagnosis-item">
        <span>信号质量 (RSRQ) | ꈬꇐꎭ</span>
        <span class="status-badge status-critical">-15 dB (差)</span>
      </div>
      <div class="diagnosis-item">
        <span>信噪比 (SINR) | ꈬꇐꅉ</span>
        <span class="status-badge status-warning">5 dB (低)</span>
      </div>
      <div class="diagnosis-item">
        <span>上行速率 | ꈬꇐꃅ</span>
        <span class="status-badge status-normal">25 Mbps (正常)</span>
      </div>
      <div class="diagnosis-item">
        <span>下行速率 | ꈬꇐꎭ</span>
        <span class="status-badge status-warning">150 Mbps (波动)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.panel-right {
  padding-left: 20px;
}

.panel-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #0d47a1;
  font-size: 18px;
  font-weight: bold;
  
  i {
    margin-right: 10px;
    font-size: 20px;
  }
}

.signal-graph {
  background: #000;
  border-radius: 10px;
  padding: 20px;
  height: 280px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.signal-wave {
  position: relative;
  height: 200px;
  width: 100%;
  margin-top: 30px;
}

.wave-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(100, 181, 246, 0.7);
  animation: wave 3s infinite linear;
  
  &:nth-child(2) {
    animation-delay: 0.5s;
    opacity: 0.6;
  }
  
  &:nth-child(3) {
    animation-delay: 1s;
    opacity: 0.4;
  }
}

@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.signal-anomaly {
  position: absolute;
  top: 50px;
  left: 40%;
  width: 80px;
  height: 60px;
  background: rgba(239, 83, 80, 0.7);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.diagnosis-results {
  background: #f5f9ff;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #1565c0;
}

.diagnosis-item {
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
}

.status-badge {
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

.status-normal {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-warning {
  background: #fff3e0;
  color: #ef6c00;
}

.status-critical {
  background: #ffebee;
  color: #c62828;
}

@media (max-width: 768px) {
  .panel-right {
      padding: 0;
      border: none;
  }
  
  .signal-graph {
      height: 220px;
  }
}
</style>
