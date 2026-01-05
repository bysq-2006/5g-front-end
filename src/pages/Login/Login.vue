<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">{{ t('login.title') }}</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">{{ t('login.username') }}</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            :placeholder="t('login.usernamePlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t('login.password') }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            :placeholder="t('login.passwordPlaceholder')"
            required
          />
        </div>
        <button type="submit" class="login-button">{{ t('login.loginButton') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup name="Login">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const username = ref('');
const password = ref('');

onMounted(() => {
  // 检查 localStorage 是否已登录
  if (localStorage.getItem('isLoggedIn') === 'true') {
    router.push('/dashboard');
  }
});

const handleLogin = () => {
  // 假登录：设置 localStorage 并跳转
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/dashboard');
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-app);
  padding: 20px;
}

.login-card {
  background-color: var(--bg-card);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s ease;
}

.login-title {
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    color: var(--text-primary);
    margin-bottom: 8px;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--bg-card);
    color: var(--text-primary);
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.login-button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>