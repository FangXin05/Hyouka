<template>
  <aside class="app-sidebar">
    <el-menu
      :default-active="activeMenu"
      class="aside-menu"
      background-color="transparent"
      text-color="rgba(255, 255, 255, 0.6)"
      active-text-color="#a8c5b0"
      @select="handleMenuSelect"
    >
      <el-menu-item index="/users">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <el-icon><Setting /></el-icon>
        <span>系统设置</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <el-icon><Sunny /></el-icon>
        <span>关于网站</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Setting, Sunny } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  }
)

const handleMenuSelect = (index) => {
  router.push(index)
}
</script>

<style scoped>
.app-sidebar {
  width: 220px;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  flex-shrink: 0;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.aside-menu {
  border-right: none !important;
  background: transparent !important;
}

.aside-menu .el-menu-item {
  height: 48px;
  border-radius: 8px;
  margin: 0 12px 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.aside-menu .el-menu-item .el-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.aside-menu .el-menu-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #fff !important;
}

.aside-menu .el-menu-item.is-active {
  background: rgba(168, 197, 176, 0.2) !important;
  color: #a8c5b0 !important;
}

/* 滚动条美化 */
.app-sidebar::-webkit-scrollbar {
  width: 4px;
}

.app-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.app-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.app-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
