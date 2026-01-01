<template>
  <div class="mobile-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div class="backdrop" v-if="isMenuOpen" @click="isMenuOpen = false"></div>
  <nav class="navigation" :class="{ 'is-open': isMenuOpen }">
    <div class="title">
      <div class="logo">彝巡智检</div>
      <div class="subtitle">山区基站智能巡检系统 </div>
    </div>
    <ol>
      <li :class="{ active: $route.path === '/dashboard' }" @click="navigateTo('/dashboard')">仪表盘</li>
      <li :class="{ active: $route.path === '/signal-sampling' }" @click="navigateTo('/signal-sampling')">信号采样</li>
      <li :class="{ active: $route.path === '/ai-detection' }" @click="navigateTo('/ai-detection')">AI检测</li>
      <li :class="{ active: $route.path === '/patrol-report' }" @click="navigateTo('/patrol-report')">巡检报告</li>
      <li :class="{ active: $route.path === '/system-settings' }" @click="navigateTo('/system-settings')">系统设置</li>
    </ol>
  </nav>
</template>

<script setup name="Navigation">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const isMenuOpen = ref(false);

const navigateTo = (path) => {
  router.push(path);
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="scss" scoped>
.navigation {
  width: 200px;
  height: 100vh;
  background-color: var(--bg-nav);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: background-color 0.3s, border-color 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  .title {
    margin-bottom: 40px;
    margin-left: 32px;

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--nav-text-color);
      white-space: nowrap;
      letter-spacing: 2px;
    }

    .subtitle {
      font-size: 14px;
      color: var(--nav-text-color);
      margin-top: 2px;
      letter-spacing: 1px;
      opacity: 0.8;
    }
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    li {
      width: 100%;
      padding: 12px 32px;
      border-radius: 4px;
      color: var(--nav-text-color);
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      white-space: nowrap;
      margin-bottom: 8px;

      &:hover {
        color: var(--nav-text-hover);
        background: rgba(0, 0, 0, 0.03);
      }

      &.active {
        color: var(--accent-color);
        background: rgba(0, 0, 0, 0.06);
      }
    }
  }
}

.mobile-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 200;
  width: 30px;
  height: 24px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: var(--text-primary, #333);
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  &.active {
      span:nth-child(1) { transform: translateY(10.5px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-10.5px) rotate(-45deg); }
  }
}

.backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 90;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .backdrop {
      display: block;
  }

  .navigation {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.is-open {
      transform: translateX(0);
      box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    }
  }
}
</style>