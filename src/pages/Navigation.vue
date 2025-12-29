<template>
  <nav class="navigation">
    <div class="logo">测速仪表盘</div>
    <ol>
      <li class="active">概览</li>
      <li>网络设置</li>
      <li>系统日志</li>
    </ol>
  </nav>
</template>

<script setup name="Navigation">
  
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 58px;
  background-color: var(--bg-nav);
  border-bottom: 1px solid var(--border-color);
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;

  .logo {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin-right: 48px;
    white-space: nowrap;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;

    li {
      margin-right: 24px;
      border-radius: 4px;
      color: var(--text-secondary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      white-space: nowrap;

      &:hover {
        color: var(--text-primary);
      }

      &.active {
        color: var(--accent-color);
      }
    }
  }
}
</style>