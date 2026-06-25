<template>
  <div class="login-page" :style="{ backgroundImage: `url(${bg})` }">
    <div class="overlay" />
    <BackBtn to="/" />
    <petal />
    <div class="login-container">
      <brand />
      <!-- 右侧表单区 -->
      <div class="form-side">
        <LoginAndRegist />
      </div>
    </div>
  </div>
</template>

<script setup>
import bg from '../assets/bg.jpg'
import BackBtn from '../components/BackBtn.vue'
import petal from '../components/petal.vue'
import brand from '../components/brand.vue'
import LoginAndRegist from '../components/LoginAndRegist.vue'
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.52) 50%,
    rgba(0, 0, 0, 0.72) 100%
  );
  z-index: 0;
}

/* ===== 主布局 ===== */
.login-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 80px;
  max-width: 1000px;
  width: 90%;
  padding: 40px 0;
}

/* ===== 右侧卡片 ===== */
.form-side {
  flex: 0 0 380px;
  animation: fadeInRight 0.8s ease both;
}

/* 加载动画三点 */
.loading-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}
.loading-dots i {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: bounce 0.8s ease infinite;
}
.loading-dots i:nth-child(2) {
  animation-delay: 0.15s;
}
.loading-dots i:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* ===== 底部提示 ===== */
.switch-hint {
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.35);
}

.switch-link {
  color: #a8c5b0;
  cursor: pointer;
  transition: color 0.3s;
}
.switch-link:hover {
  color: #c5e0d0;
}

/* ===== 过渡动画 ===== */
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 0.25s ease;
}
.form-fade-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.form-fade-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    gap: 40px;
    padding: 60px 0 40px;
  }
  .brand-side {
    text-align: center;
  }
  .brand-divider {
    margin: 0 auto 24px;
  }
  .form-side {
    flex: unset;
    width: 100%;
  }
}
</style>
