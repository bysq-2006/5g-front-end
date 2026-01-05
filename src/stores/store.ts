import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCCInfo } from '@/api'

export const useStore = defineStore('store', () => {
  const showAlert = ref(false)
  const showMessages = ref(false)
  const messages = ref([
    {
      id: 1,
      title: '系统更新通知',
      content: '系统已更新到最新版本，请重启应用以应用更改。',
      time: '2023-10-01 10:00'
    },
    {
      id: 2,
      title: '巡检任务提醒',
      content: '您有一个新的巡检任务，请及时处理。',
      time: '2023-10-01 09:30'
    },
    {
      id: 3,
      title: '设备告警',
      content: '基站设备出现异常，请检查。',
      time: '2023-10-01 08:45'
    }
  ])

  // SignalSampling 组件相关的状态
  const signalSampling = ref({
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

  // 获取 5G 性能数据并更新 signalSampling
  const fetchCCInfo = async () => {
    try {
      const res = await getCCInfo()
      Object.assign(signalSampling.value, res)
    } catch (error) {
      console.error('获取5G性能信息失败', error)
    }
  }

  return { showAlert, showMessages, messages, signalSampling, fetchCCInfo }
})
