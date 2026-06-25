<template>
  <div class="glass-card">
    <!-- Tab 切换 -->
    <div class="tab-bar">
      <button
        class="tab-btn"
        :class="{ active: mode === 'login' }"
        @click="switchMode('login')"
      >
        登录
      </button>
      <button
        class="tab-btn"
        :class="{ active: mode === 'register' }"
        @click="switchMode('register')"
      >
        注册
      </button>
      <div class="tab-indicator" :class="{ right: mode === 'register' }" />
    </div>

    <Transition name="form-fade" mode="out-in">
      <!-- 登录表单 -->
      <div v-if="mode === 'login'" key="login" class="form-body">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <div
            class="input-wrapper"
            :class="{ focused: focus.username, error: errors.username }"
          >
            <el-icon class="input-icon"><User /></el-icon>
            <input
              v-model="loginForm.username"
              class="form-input"
              placeholder="请输入用户名"
              @focus="focus.username = true"
              @blur="focus.username = false"
              @keyup.enter="handleLogin"
            />
          </div>
          <p v-if="errors.username" class="error-msg">
            {{ errors.username }}
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">密码</label>
          <div
            class="input-wrapper"
            :class="{ focused: focus.password, error: errors.password }"
          >
            <el-icon class="input-icon"><Lock /></el-icon>
            <input
              v-model="loginForm.password"
              class="form-input"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              @focus="focus.password = true"
              @blur="focus.password = false"
              @keyup.enter="handleLogin"
            />
            <el-icon
              class="input-icon-right"
              @click="showPassword = !showPassword"
            >
              <View v-if="showPassword" />
              <Hide v-else />
            </el-icon>
          </div>
          <p v-if="errors.password" class="error-msg">
            {{ errors.password }}
          </p>
        </div>

        <p v-if="errors.global" class="global-error">
          {{ errors.global }}
        </p>

        <button
          class="submit-btn"
          :class="{ loading: isLoading }"
          @click="handleLogin"
        >
          <span v-if="!isLoading">登 录</span>
          <span v-else class="loading-dots"> <i /><i /><i /> </span>
        </button>

        <p class="switch-hint">
          还没有账号？
          <span class="switch-link" @click="switchMode('register')"
            >立即注册</span
          >
        </p>
      </div>

      <!-- 注册表单 -->
      <div v-else key="register" class="form-body">
        <div class="form-group">
          <label class="form-label">用户名</label>
          <div
            class="input-wrapper"
            :class="{
              focused: focus.regUsername,
              error: errors.regUsername
            }"
          >
            <el-icon class="input-icon"><User /></el-icon>
            <input
              v-model="registerForm.username"
              class="form-input"
              placeholder="4~16位字符"
              @focus="focus.regUsername = true"
              @blur="focus.regUsername = false"
            />
          </div>
          <p v-if="errors.regUsername" class="error-msg">
            {{ errors.regUsername }}
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">密码</label>
          <div
            class="input-wrapper"
            :class="{
              focused: focus.regPassword,
              error: errors.regPassword
            }"
          >
            <el-icon class="input-icon"><Lock /></el-icon>
            <input
              v-model="registerForm.password"
              class="form-input"
              :type="showPassword ? 'text' : 'password'"
              placeholder="至少6位"
              @focus="focus.regPassword = true"
              @blur="focus.regPassword = false"
            />
            <el-icon
              class="input-icon-right"
              @click="showPassword = !showPassword"
            >
              <View v-if="showPassword" />
              <Hide v-else />
            </el-icon>
          </div>
          <p v-if="errors.regPassword" class="error-msg">
            {{ errors.regPassword }}
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">确认密码</label>
          <div
            class="input-wrapper"
            :class="{ focused: focus.confirm, error: errors.confirm }"
          >
            <el-icon class="input-icon"><Lock /></el-icon>
            <input
              v-model="registerForm.confirm"
              class="form-input"
              :type="showPassword ? 'text' : 'password'"
              placeholder="再次输入密码"
              @focus="focus.confirm = true"
              @blur="focus.confirm = false"
              @keyup.enter="handleRegister"
            />
          </div>
          <p v-if="errors.confirm" class="error-msg">
            {{ errors.confirm }}
          </p>
        </div>

        <p v-if="errors.global" class="global-error">
          {{ errors.global }}
        </p>

        <button
          class="submit-btn"
          :class="{ loading: isLoading }"
          @click="handleRegister"
        >
          <span v-if="!isLoading">注 册</span>
          <span v-else class="loading-dots"> <i /><i /><i /> </span>
        </button>

        <p class="switch-hint">
          已有账号？
          <span class="switch-link" @click="switchMode('login')">直接登录</span>
        </p>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
const router = useRouter()
const userStore = useUserStore()

const mode = ref('login')
const isLoading = ref(false)
const showPassword = ref(false)

const loginForm = reactive({ username: '', password: '' })
const registerForm = reactive({ username: '', password: '', confirm: '' })

const focus = reactive({
  username: false,
  password: false,
  regUsername: false,
  regPassword: false,
  confirm: false
})

const errors = reactive({
  username: '',
  password: '',
  global: '',
  regUsername: '',
  regPassword: '',
  confirm: ''
})
function clearErrors() {
  Object.keys(errors).forEach((k) => (errors[k] = ''))
}

function switchMode(m) {
  mode.value = m
  showPassword.value = false
  clearErrors()
}

async function handleLogin() {
  clearErrors()
  let valid = true
  if (!loginForm.username.trim()) {
    errors.username = '请输入用户名'
    valid = false
  }
  if (!loginForm.password) {
    errors.password = '请输入密码'
    valid = false
  }
  if (!valid) return

  isLoading.value = true
  await new Promise((r) => setTimeout(r, 600)) // 模拟请求延迟

  const ok = userStore.login(loginForm.username.trim(), loginForm.password)
  isLoading.value = false

  if (ok) {
    ElMessage.success(`欢迎回来，${loginForm.username}！`)
    router.push('/')
  } else {
    errors.global = '用户名或密码错误'
  }
}

async function handleRegister() {
  clearErrors()
  let valid = true
  if (
    !registerForm.username.trim() ||
    registerForm.username.length < 4 ||
    registerForm.username.length > 16
  ) {
    errors.regUsername = '用户名需为 4~16 位字符'
    valid = false
  }
  if (!registerForm.password || registerForm.password.length < 6) {
    errors.regPassword = '密码至少 6 位'
    valid = false
  }
  if (registerForm.password !== registerForm.confirm) {
    errors.confirm = '两次密码输入不一致'
    valid = false
  }
  if (!valid) return

  isLoading.value = true
  await new Promise((r) => setTimeout(r, 600))

  const ok = userStore.register(
    registerForm.username.trim(),
    registerForm.password
  )
  isLoading.value = false

  if (ok) {
    ElMessage.success('注册成功，欢迎加入同好会！')
    router.push('/')
  } else {
    errors.global = '该用户名已被注册'
  }
}
</script>

<style scoped>
/* ===== 表单 ===== */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0 14px;
  height: 48px;
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
}

.input-wrapper.focused {
  border-color: rgba(168, 197, 176, 0.6);
  background: rgba(255, 255, 255, 0.1);
}

.input-wrapper.error {
  border-color: rgba(255, 120, 120, 0.6);
}

.input-icon {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  flex-shrink: 0;
}
.input-icon-right {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.3s;
  margin-left: auto;
}
.input-icon-right:hover {
  color: rgba(255, 255, 255, 0.7);
}

.form-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  letter-spacing: 0.05em;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.error-msg {
  margin-top: 6px;
  font-size: 0.78rem;
  color: rgba(255, 130, 130, 0.9);
  letter-spacing: 0.05em;
}

.global-error {
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 130, 130, 0.9);
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(255, 80, 80, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 80, 80, 0.15);
}
</style>
