<template>
  <header class="app-header">
    <!-- 导航 -->
    <div class="nav-links">
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
    </div>
    <!-- 头像 登录/注册 -->
    <div class="header-right">
      <!-- 已登录 -->
      <template v-if="userStore.currentUser">
        <el-avatar :size="36" class="avatar">
          {{ userStore.currentUser?.username[0] }}
        </el-avatar>
        <span class="username">{{ userStore.currentUser?.username }}</span>
        <el-button text class="header-btn" @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          退出
        </el-button>
      </template>
      <!-- 未登录 -->
      <template v-else>
        <router-link to="/LoginView" class="login-link">
          <el-button text class="header-btn">
            <el-icon><User /></el-icon>
            登录 / 注册
          </el-button>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>

<style scoped>
.app-header {
  height: 64px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
}

/* 导航容器 */
.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

/* 导航项 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 26px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.nav-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

/* 激活状态 */
.nav-item.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #7c3aed;
  border-radius: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.header-btn {
  color: rgba(255, 255, 255, 0.6) !important;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.header-btn:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

.header-btn .el-icon {
  margin-right: 4px;
}

:deep(.el-divider--vertical) {
  height: 24px;
  border-left-color: rgba(255, 255, 255, 0.15);
  margin: 0 8px;
}

.avatar {
  background: rgba(168, 197, 176, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.username {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 4px;
}
</style>
