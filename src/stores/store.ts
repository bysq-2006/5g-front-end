import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  return { showAlert, showMessages, messages }
})
