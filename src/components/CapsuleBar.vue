<template>
  <div
    class="mobile-nav capsule-wrapper..."
    :class="{ collapsed: isCollapsed }"
  >
    <!-- 展开/收起按钮 -->
    <button class="toggle-btn" @click="toggleCapsule">
      <svg
        viewBox="0 0 24 24"
        class="toggle-icon"
        :class="{ rotated: !isCollapsed }"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <transition name="capsule">
      <nav v-show="!isCollapsed" class="capsule-nav">
        <RouterLink to="/OfficalView" class="nav-item">
          <span class="nav-label">官方</span>
        </RouterLink>
        <RouterLink to="/AssociatedView" class="nav-item">
          <span class="nav-label">衍生</span>
        </RouterLink>
        <RouterLink to="/DiscussView" class="nav-item">
          <span class="nav-label">同好会</span>
        </RouterLink>
        <RouterLink to="/Setting" class="nav-item">
          <span class="nav-label">设置</span>
        </RouterLink>
      </nav>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)

const toggleCapsule = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.capsule-wrapper {
  position: fixed;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* 切换按钮 */
.toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #666;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toggle-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

/* 胶囊导航 */
.capsule-nav {
  display: flex;
  gap: 22px;
  padding: 20px 32px;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

/* 导航项 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  text-decoration: none;
  color: #292929;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #7c3aed;
  transform: translateY(-2px);
}
.nav-item.router-link-active {
  color: #7c3aed;
}
/* 收起/展开动画 */
.capsule-enter-active {
  transition: all 0.3s ease;
}

.capsule-leave-active {
  transition: all 0.3s ease;
}

.capsule-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.capsule-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 响应式 */
@media (max-width: 768px) {
  .capsule-nav {
    gap: 12px;
    padding: 16px 24px;
  }

  .nav-item {
    padding: 10px 16px;
  }
}
</style>
