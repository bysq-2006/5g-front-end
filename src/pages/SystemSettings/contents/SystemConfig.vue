<template>
  <div class="settings-content">
    <h2 class="section-title">系统配置</h2>

    <div class="config-group">
      <h3 class="group-title">设备配置</h3>
      <div class="device-list">
        <DeviceCard
          name="5G模块 (FM650-CN)"
          detail="固件版本: v2.3.1"
          status="已连接"
        />
        <DeviceCard
          name="无人机 (DJI M300 RTK)"
          detail="电量: 78% | 信号强度: 优"
          status="就绪"
        />
        <DeviceCard
          name="履带式移动平台"
          detail="电量: 87%"
          status="就绪"
        />
      </div>
    </div>

    <div class="config-group">
      <h3 class="group-title">通知设置</h3>
      <div class="notification-list">
        <ToggleSwitch
          label="故障告警推送"
          description="检测到故障时立即通知"
          v-model="faultNotification"
        />
        <ToggleSwitch
          label="巡检完成提醒"
          description="巡检任务完成后通知"
          v-model="patrolNotification"
        />
      </div>
    </div>

    <div class="config-group">
      <h3 class="group-title">系统信息</h3>
      <div class="system-info-card">
        <div class="info-row">
          <span class="label">系统版本</span>
          <span class="value">v1.2.0</span>
        </div>
        <div class="info-row">
          <span class="label">最后更新</span>
          <span class="value">2024-01-15</span>
        </div>
        <div class="info-row">
          <span class="label">存储使用</span>
          <span class="value">45.2 GB / 128 GB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeviceCard from './DeviceCard.vue';
import ToggleSwitch from './ToggleSwitch.vue';

const faultNotification = ref(true);
const patrolNotification = ref(true);
</script>

<style lang="scss" scoped>
.settings-content {
  padding: 1.5rem;
  background: var(--bg-card);
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

.config-group {
  margin-bottom: 1.5rem;
}

.group-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.device-list, .notification-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.system-info-card {
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;

  .label {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
  .value {
    color: var(--text-primary);
    transition: color 0.3s ease;
  }
}
</style>
