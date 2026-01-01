<template>
  <div class="patrol-report-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">巡检报告</h1>
        <p class="page-subtitle">彝汉双语巡检报告，图文标注，一键导出</p>
      </div>
      <button
        class="generate-btn"
        :disabled="isGenerating"
        @click="handleGenerateReport"
      >
        {{ isGenerating ? '生成中...' : '生成新报告' }}
      </button>
    </div>

    <div class="content-grid">
      <!-- Left: List -->
      <div class="left-col">
        <ReportList
          :reports="reports"
          :selected-id="selectedReport?.id"
          @select="setSelectedReport"
        />
      </div>

      <!-- Right: Details -->
      <div class="right-col">
        <div v-if="selectedReport" class="details-container">
          <ReportDetailHeader
            :report="selectedReport"
            @export="handleExport"
          />
          <FaultDetails :faults="faultDetails" />
          <ImageGallery
            :faults="inspectionFaults"
            @clear="clearFaultData"
          />
          <MaintenanceSuggestions />
        </div>
        <div v-else class="empty-selection">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="empty-title">选择一份报告</h3>
          <p class="empty-desc">从左侧列表中选择报告以查看详细信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Report, InspectionFault, FaultDetail } from './types';
import ReportList from './content/ReportList.vue';
import ReportDetailHeader from './content/ReportDetailHeader.vue';
import FaultDetails from './content/FaultDetails.vue';
import ImageGallery from './content/ImageGallery.vue';
import MaintenanceSuggestions from './content/MaintenanceSuggestions.vue';

// State
const selectedReport = ref<Report | null>(null);
const isGenerating = ref(false);
const inspectionFaults = ref<InspectionFault[]>([]);

// Mock Data
const reports = ref<Report[]>([
  {
    id: 1,
    station: '凉山基站-032',
    date: '2024-01-15',
    status: '已完成',
    faults: 2,
    inspector: '阿木尔'
  },
  {
    id: 2,
    station: '美姑基站-018',
    date: '2024-01-15',
    status: '进行中',
    faults: 1,
    inspector: '吉克'
  },
  {
    id: 3,
    station: '昭觉基站-045',
    date: '2024-01-14',
    status: '已完成',
    faults: 3,
    inspector: '阿木尔'
  }
]);

const faultDetails = ref<FaultDetail[]>([
  {
    id: 1,
    type: '锈蚀',
    location: '东南侧天线接口',
    severity: '中',
    confidence: 92,
    suggestion: '更换锈蚀部件，做好防腐处理'
  },
  {
    id: 2,
    type: '松动',
    location: '西南侧支架连接处',
    severity: '低',
    confidence: 85,
    suggestion: '紧固连接螺栓，添加防松垫片'
  }
]);

// Methods
const setSelectedReport = (report: Report) => {
  selectedReport.value = report;
};

const handleGenerateReport = async () => {
  isGenerating.value = true;
  // Simulate report generation
  await new Promise(resolve => setTimeout(resolve, 2000));
  isGenerating.value = false;
  alert('报告生成成功！');
};

const handleExport = (format: 'pdf' | 'word') => {
  alert(`正在导出 ${format.toUpperCase()} 格式报告...`);
};

const clearFaultData = () => {
  if (confirm('确定要清除所有 AI 检测的故障数据吗？')) {
    localStorage.removeItem('inspectionFaults');
    inspectionFaults.value = [];
    alert('故障数据已清除');
  }
};

// Lifecycle
onMounted(() => {
  const faults = localStorage.getItem('inspectionFaults');
  if (faults) {
    try {
      inspectionFaults.value = JSON.parse(faults);
    } catch (error) {
      console.error('Failed to parse inspection faults:', error);
    }
  }
});
</script>

<style lang="scss" scoped>
.patrol-report-page {
  min-height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 16px;
}

.generate-btn {
  padding: 12px 24px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }
}

.left-col {
  // Sticky behavior if needed, but simple for now
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.details-container {
  animation: fadeIn 0.3s ease;
}

.empty-selection {
  background: var(--bg-card);
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  
  [data-theme='dark'] & {
    border-color: var(--gray-800);
  }
}

.empty-icon-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  
  [data-theme='light'] & {
    background: var(--gray-200);
  }
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--gray-600);
  
  [data-theme='light'] & {
    color: var(--gray-400);
  }
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-desc {
  color: var(--text-secondary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
