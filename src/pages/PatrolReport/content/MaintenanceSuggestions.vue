<template>
  <div class="suggestions-card">
    <h3 class="section-title">{{ $t('patrol.maintenanceSuggestionsTitle') }}</h3>
    <div class="suggestion-list">
      <div class="suggestion-item">
        <div class="index-circle">
          <span>1</span>
        </div>
        <p class="text">{{ $t('patrol.suggestion1') }}</p>
      </div>
      <div class="suggestion-item">
        <div class="index-circle">
          <span>2</span>
        </div>
        <p class="text">{{ $t('patrol.suggestion2') }}</p>
      </div>
      <div class="suggestion-item">
        <div class="index-circle">
          <span>3</span>
        </div>
        <p class="text">{{ $t('patrol.suggestion3') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Static content for now as per React code
</script>

<style lang="scss" scoped>
.suggestions-card {
  background: linear-gradient(to right, rgba(0, 122, 255, 0.1), rgba(175, 82, 222, 0.1));
  border: 1px solid rgba(0, 122, 255, 0.2);
  border-radius: 12px;
  padding: 24px;
  
  [data-theme='light'] & {
    background: white;
    border-color: var(--gray-300);
  }
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.index-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;

  span {
    color: var(--color-primary);
    font-size: 14px;
    font-weight: 500;
  }
}

.text {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
}
</style>
