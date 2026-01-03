<template>
  <div class="mobile-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div class="backdrop" v-if="isMenuOpen" @click="isMenuOpen = false"></div>
  <nav class="navigation" :class="{ 'is-open': isMenuOpen }">
    <div class="title">
      <div class="logo">{{ $t('nav.logo') }}</div>
      <div class="subtitle">{{ $t('nav.subtitle') }}</div>
    </div>
    <ol>
      <li :class="{ active: $route.path.startsWith('/dashboard') }" @click="navigateTo('/dashboard')">{{ $t('nav.dashboard') }}</li>
      <li :class="{ active: $route.path.startsWith('/signal-sampling') }" @click="navigateTo('/signal-sampling')">{{ $t('nav.signalSampling') }}</li>
      <li :class="{ active: $route.path.startsWith('/ai-detection') }" @click="navigateTo('/ai-detection')">{{ $t('nav.aiDetection') }}</li>
      <li :class="{ active: $route.path.startsWith('/patrol-report') }" @click="navigateTo('/patrol-report')">{{ $t('nav.patrolReport') }}</li>
      <li :class="{ active: $route.path.startsWith('/system-settings') }" @click="navigateTo('/system-settings')">{{ $t('nav.systemSettings') }}</li>
    </ol>
    <div class="theme-toggle-box">
      <button class="theme-toggle-btn" @click="toggleTheme">
        <span v-if="isDark">
          <!-- 月亮图标（暗色） -->
          <svg class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
        <span v-else>
          <!-- 太阳图标（亮色） -->
          <svg class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </button>
    </div>
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
const isDark = ref(false);
// 检查当前主题
if (typeof window !== 'undefined') {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark';
}

const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.removeAttribute('data-theme');
    isDark.value = false;
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    isDark.value = true;
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  width: 190px;
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
    margin-left: 24px;

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--nav-text-color);
      white-space: nowrap;
      letter-spacing: 2px;
      transition: color 0.3s ease;
    }

    .subtitle {
      font-size: 14px;
      color: var(--nav-text-color);
      margin-top: 2px;
      letter-spacing: 1px;
      opacity: 0.8;
      transition: color 0.3s ease;
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
      padding: 12px 24px;
      border-radius: 4px;
      color: var(--nav-text-color);
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s ease, color 0.3s ease;
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
  .theme-toggle-box {
    margin-top: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 24px 20px;
  }
  .theme-toggle-btn {
    background: none;
    color: var(--nav-text-color);
    border: none;
    border-radius: 0;
    padding: 0;
    font-size: 15px;
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(.4,1.4,.6,1), color 0.2s, color 0.3s ease;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .theme-icon {
      width: 22px;
      height: 22px;
      display: block;
      color: var(--nav-text-color);
      transition: color 0.3s ease;
    }
    &:hover {
      transform: scale(1.13);
      color: var(--accent-color);
    }
    &:active {
      transform: scale(1.0);
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
    transition: all 0.3s ease, background-color 0.3s ease;
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