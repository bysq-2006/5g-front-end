<template>
  <div class="report-section">
    <div class="report-header">
      <div class="report-tabs">
        <button 
          class="report-tab" 
          :class="{ active: activeTab === 'yi' || activeTab === 'compare' }" 
          @click="setTab('yi')"
        >
          彝文报告 | ꆈꌠꉙꀋꐚ
        </button>
        <button 
          class="report-tab" 
          :class="{ active: activeTab === 'zh' || activeTab === 'compare' }" 
          @click="setTab('zh')"
        >
          中文报告
        </button>
        <button 
          class="report-tab" 
          :class="{ active: activeTab === 'compare' }" 
          @click="setTab('compare')"
        >
          对比报告
        </button>
      </div>
      <div style="font-size: 14px; color: #666;">
        <i class="fas fa-clock"></i> 报告时间: {{ currentTime }}
      </div>
    </div>
    
    <div class="report-content yi" v-show="activeTab === 'yi' || activeTab === 'compare'">
      <p class="yi-text">ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠ：</p>
      <p class="yi-text">1. ꈬꇐꎭꄉꌋꊐꁧꁱꀋꐚꀐꌠ，ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠꈬꇐꎭꄉꌋꊐꁧꁱꀋꐚꀐꌠ。</p>
      <p class="yi-text">2. ꈬꇐꄮꒉꎭꄉꀧꁱꀋꐚꀐꌠ，ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠꈬꇐꄮꒉꎭꄉꀧꁱꀋꐚꀐꌠ。</p>
      <p class="yi-text">3. ꈬꇐꅉꄉꁧꁱꀋꐚꀐꌠ，ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠꈬꇐꅉꄉꁧꁱꀋꐚꀐꌠ。</p>
      <p class="yi-text">4. ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠ，ꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠꈬꇐꃅꄉꁧꁱꀋꐚꀐꌠ。</p>
      <p class="yi-text" style="margin-top: 20px; color: #c62828; font-weight: bold;">ꈬꇐꎭꄉꌋꊐꁧꁱꀋꐚꀐꌠ：ꈬꇐꎭꄉꌋꊐꁧꁱꀋꐚꀐꌠꈬꇐꎭꄉꌋꊐꁧꁱꀋꐚꀐꌠ。</p>
      
      <div class="translation" style="margin-top: 20px; background: #f0f7ff; padding: 15px; border-radius: 8px;">
        <strong>报告翻译：</strong><br>
        1. 基站天线锈蚀检测结果：东南侧接口发现严重锈蚀，置信度92%<br>
        2. 基站实时监控结果：检测到结构异常，建议立即检查<br>
        3. 基站结构完整性检测：整体结构基本完好，局部需加固<br>
        4. 基站连接稳定性检测：连接不稳定，存在信号中断风险<br>
        <br>
        <strong>紧急建议：</strong>立即更换东南侧天线接口，预计修复时间2小时
      </div>
    </div>
    
    <div class="report-content" v-show="activeTab === 'zh' || activeTab === 'compare'">
      <h3>基站智能巡检报告</h3>
      <p><strong>检测时间：</strong>2025年4月15日 14:30-14:45</p>
      <p><strong>检测地点：</strong>凉山彝族自治州昭觉县基站#A03</p>
      
      <h4>一、故障诊断结果</h4>
      <ul>
        <li><strong>故障类型：</strong>天线物理损坏（锈蚀）</li>
        <li><strong>故障位置：</strong>东南侧天线接口</li>
        <li><strong>影响范围：</strong>半径2公里通信中断</li>
        <li><strong>置信度：</strong>92%</li>
      </ul>
      
      <h4>二、检测详情</h4>
      <ul>
        <li>视觉检测准确率：92%（优化后）</li>
        <li>5G信号异常频段：Band 3</li>
        <li>结构完整性：87%</li>
        <li>连接稳定性：65%</li>
      </ul>
      
      <h4>三、维修建议</h4>
      <p>1. 立即更换东南侧天线接口组件</p>
      <p>2. 检查并加固所有连接螺栓</p>
      <p>3. 对基站整体进行防锈处理</p>
      <p>4. 修复后进行全面信号测试</p>
      
      <p><strong>预计修复时间：</strong>2小时内</p>
      <p><strong>所需材料：</strong>天线接口组件、防锈漆、工具包</p>
    </div>
    
    <div class="report-actions">
      <button class="action-btn primary">
        <i class="fas fa-save"></i> 保存至本地库 | ꈬꇐꃅꄉꁧꁱ
      </button>
      <button class="action-btn secondary">
        <i class="fas fa-cloud-upload-alt"></i> 上传云端 | ꈬꇐꎭꄉ
      </button>
      <button class="action-btn secondary">
        <i class="fas fa-print"></i> 打印报告 | ꈬꇐꅉꄉ
      </button>
      <button class="action-btn secondary">
        <i class="fas fa-share-alt"></i> 分享 | ꈬꇐꃅꄉ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref('yi');
const currentTime = ref('');
let timer: number | undefined;

const setTab = (tab: string) => {
  activeTab.value = tab;
};

const updateTime = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('zh-CN', {hour12: false, hour: '2-digit', minute: '2-digit'});
  currentTime.value = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${timeString}`;
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped lang="scss">
.report-section {
  padding: 0 25px 25px 25px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.report-tabs {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
}

.report-tab {
  padding: 12px 20px;
  background: #f5f5f5;
  border: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-right: 5px;
  cursor: pointer;
  font-weight: bold;
  
  &.active {
    background: #0d47a1;
    color: white;
  }
}

.report-content {
  background: #f8fdff;
  border-radius: 10px;
  padding: 25px;
  min-height: 200px;
  border: 1px solid #bbdefb;
  margin-bottom: 20px;
  
  &.yi {
    font-size: 18px;
    line-height: 1.8;
    direction: ltr;
    text-align: left;
  }
}

.report-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  
  &.primary {
    background: linear-gradient(to right, #0d47a1, #1565c0);
    color: white;
  }
  
  &.secondary {
    background: #e3f2fd;
    color: #1565c0;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.yi-text {
  font-family: "SimSun", "Microsoft YaHei", sans-serif;
  color: #1a237e;
}

.translation {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  padding-left: 10px;
  border-left: 3px solid #bbdefb;
}
</style>
