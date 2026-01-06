import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCCInfo } from '@/api'

interface DiagnosisResult {
  type: string
  description: string
  suggestion: string
  probability: number
}

export const useSignalStore = defineStore('signalStore', () => {
  // ---------------------SignalSampling 组件相关的状态---------------------
  const signalSampling = ref({
    location: '',
    IsServiceCell: '',
    band: '',
    bandwidth: '',
    cellid: '',
    mcc: '',
    mcc_desc: '',
    mnc: '',
    mnc_desc: '',
    narfcn: '',
    physicalcellId: '',
    rat: '',
    rat_desc: '',
    rxlev: '',
    'ss-rsrp': 0,
    'ss-rsrq': 0,
    'ss-sinr': 0,
    tac: '',
    timestamp: ''
  })

  // ---------------------SignalDetection 相关状态---------------------
  const currentSignalValue = ref<{ rsrp: number; rsrq: number; sinr: number }>({
    rsrp: 0,
    rsrq: 0,
    sinr: 0
  })
  const signalHistory = ref<{ rsrp: number; rsrq: number; sinr: number }[]>([])
  const diagnosis = ref<DiagnosisResult[] | null>(null)
  // 获取 5G 性能数据并更新 signalSampling
  const fetchCCInfo = async () => {
    try {
      const res = await getCCInfo()
      Object.assign(signalSampling.value, res)
      updateHistory() // 新增：每次获取后自动同步
    } catch (error) {
      console.error('获取5G性能信息失败', error)
    }
  }

  // ---------------------AI诊断相关方法---------------------
  const fetchDiagnosis = async () => {
    // 这里可改为后端请求
    await new Promise(resolve => setTimeout(resolve, 2000))
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
    ]
    possibleDiagnoses.sort((a, b) => b.probability - a.probability)
    diagnosis.value = possibleDiagnoses
  }

  const clearDiagnosis = () => {
    diagnosis.value = null
  }

  // ---------------------定时采样逻辑---------------------
  let intervalId: number | null = null
  const isSampling = ref(false)

  const startSampling = () => {
    if (intervalId) return
    isSampling.value = true
    // 立即执行一次
    fetchCCInfo()

    intervalId = window.setInterval(async () => {
      await fetchCCInfo()
    }, 1000)
  }

  const updateHistory = () => {
    const newData = {
      rsrp: Number(signalSampling.value['ss-rsrp']) || 0,
      rsrq: Number(signalSampling.value['ss-rsrq']) || 0,
      sinr: Number(signalSampling.value['ss-sinr']) || 0
    }

    signalHistory.value.push(newData)
    if (signalHistory.value.length > 60) {
      signalHistory.value.shift()
    }
  }

  const stopSampling = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isSampling.value = false
  }

  return {
    signalSampling,
    currentSignalValue,
    signalHistory,
    diagnosis,
    isSampling,
    fetchCCInfo,
    fetchDiagnosis,
    clearDiagnosis,
    startSampling,
    stopSampling
  }
})