<template>
  <div class="intelligent-patrol-page">
    <div class="container">
      <PatrolHeader />
      
      <div class="main-content">
        <VisualDetectionPanel />
        <SignalAnalysisPanel />
      </div>
      
      <PatrolReport />
    </div>
  </div>
</template>

<script setup name="PatrolReport">
import PatrolHeader from '@/pages/PatrolReport/content/PatrolHeader.vue';
import VisualDetectionPanel from '@/pages/PatrolReport/content/VisualDetectionPanel.vue';
import SignalAnalysisPanel from '@/pages/PatrolReport/content/SignalAnalysisPanel.vue';
import PatrolReport from '@/pages/PatrolReport/content/PatrolReport.vue';
</script>

<style lang="scss" scoped>
.intelligent-patrol-page {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: #333;
  min-height: 100vh;
  padding: 20px;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 25px;
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>
