<template>
  <div class="emergency-response">
    <div class="icon-box">
      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
    <div class="info">
      <div class="title">紧急响应</div>
      <div class="desc">快速启动应急响应流程</div>
    </div>
    <button class="action-btn">启动应急流程</button>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.emergency-response {
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #ffeaea 0%, #fff5ee 100%);
  border: 1px solid #ffd6d6;
  border-radius: 12px;
  padding: 10px 28px;
  margin: 24px 0;
  box-sizing: border-box;
  box-shadow: none;
  @media (max-width: 500px) {
    padding: 6px 12px;
  }
}

[data-theme='dark'] .emergency-response {
  background: linear-gradient(90deg, #3a1a1a 0%, #2a1a1a 100%);
  border: 1px solid #5a2a2a;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 59, 48, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 18px;
}
.icon {
  width: 22px;
  height: 22px;
  color: #ff3b30;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
  transition: color 0.3s ease;
}
.desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}
.action-btn {
  background: var(--color-danger);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, background-color 0.3s ease;
  margin-left: 24px;
  @media (max-width: 500px) {
    padding: 8px 24px;
    font-size: 0.95rem;
    margin-left: 10px;
  }
}
.action-btn:hover {
  background: #e22c1a;
}
</style>
