<template>
    <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  dataList: number[];
  color?: string;
}>();

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let updateCount = 0;

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const chartColor = props.color || '#5470C6';

  const option: echarts.EChartsOption = {
    animation: true,
    animationDuration: 200,
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        // params[0].axisValue 是 x 轴的值（这里是递增的数字）
        // 我们需要把它转换回相对时间
        // 但由于我们只是为了动画效果使用了递增数字，这里直接显示数值可能不直观
        // 简单起见，我们可以不显示 X 轴的具体值，或者根据索引计算
        const val = params[0].value;
        return `信号强度: ${val}`;
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // 初始数据使用 0-59
      data: Array.from({ length: 60 }, (_, i) => i),
      axisLabel: {
        // 使用 formatter 将递增的数字映射回相对时间标签
        // 这里的逻辑是：当前视窗最右边的索引对应 "现在"
        // 假设视窗总是显示 60 个点
        formatter: (value: string, index: number) => {
          // index 是当前显示的第几个点 (0-59)
          if (index === 59) return '现在';
          if (index === 0) return '1分钟前';
          if (index === 29) return '30秒前';
          return '';
        },
        interval: 0 // 强制执行 formatter 逻辑
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      },
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '信号强度',
        type: 'line',
        showSymbol: false, // 不显示数据点
        data: [],
        lineStyle: {
          width: 0,
          color: chartColor
        },
        areaStyle: {
          origin: 'start',
          color: chartColor,
          opacity: 1
        }
      }
    ]
  };

  chartInstance.setOption(option);
};

const updateChart = () => {
  if (!chartInstance) return;
  if (!props.dataList) return;

  // 只取列表的后六十位元素
  const dataToRender = props.dataList.slice(-60);

  const filledData = new Array(60).fill(-120);
  const startIndex = 60 - dataToRender.length;
  for (let i = 0; i < dataToRender.length; i++) {
    filledData[startIndex + i] = dataToRender[i];
  }
  
  // 为了简单且效果好，我们直接根据 updateCount 偏移 X 轴
  const currentXAxisData = Array.from({ length: 60 }, (_, i) => i + updateCount);
  updateCount++;

  const chartColor = props.color || '#5470C6';

  chartInstance.setOption({
    xAxis: {
      data: currentXAxisData
    },
    series: [
      {
        data: filledData,
        lineStyle: { color: chartColor },
        areaStyle: { color: chartColor }
      }
    ]
  });
};

watch(() => [props.dataList, props.color], () => {
  updateChart();
}, { deep: true });

onMounted(() => {
  initChart();
  updateChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
});

const handleResize = () => {
  chartInstance?.resize();
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
  min-height: 200px;
  /* 给一个最小高度 */
}
</style>
