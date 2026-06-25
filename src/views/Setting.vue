<template>
  <!-- 外层：背景 + 遮罩 -->
  <div class="app-wrapper" :style="{ backgroundImage: `url(${bg})` }">
    <div class="app-overlay" />

    <!-- 布局 -->
    <div class="common-layout">
      <el-container direction="vertical" class="full-height">
        <!-- 顶部导航 -->
        <Header />

        <el-container class="flex-1">
          <!-- 侧边栏 -->
          <Sidebar />

          <!-- 主内容 -->
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import bg from '../assets/bg.jpg'

// 组件导入
import BackBtn from '../components/BackBtn.vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
</script>

<style scoped>
/* ===== 外层 ===== */
.app-wrapper {
  min-height: 100vh;
  min-width: 100vw;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.app-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 0;
}

.common-layout {
  position: relative;
  z-index: 1;
  height: 100vh;
}

.full-height {
  height: 100vh;
}

.flex-1 {
  flex: 1;
}

/* ===== Main ===== */
.app-main {
  padding: 0 !important;
  overflow-y: auto;
  background: transparent !important;
  position: relative;
}

/* ===== discuss-page ===== */
.discuss-page {
  min-height: calc(100vh - 64px);
  position: relative;
  padding: 24px 32px 40px;
}

.back-btn-inline {
  margin-bottom: 24px;
}

.content {
  max-width: 900px;
  margin: 0 auto;
}

/* ===== 顶部标题 ===== */
.hero-section {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease;
}

.main-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 200;
  letter-spacing: 0.4em;
  color: #fff;
  margin-bottom: 16px;
  font-family: 'Georgia', serif;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.desc {
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.1em;
  font-size: 0.95rem;
}

/* ===== 操作栏 ===== */
.action-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

.search-input {
  flex: 1;
}

:deep(.search-input .el-input__wrapper) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  box-shadow: none;
}

:deep(.search-input .el-input__inner) {
  color: #fff;
}

:deep(.search-input .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.search-input .el-input__prefix) {
  color: rgba(255, 255, 255, 0.4);
}

.publish-btn {
  background: rgba(168, 197, 176, 0.3) !important;
  border: 1px solid rgba(168, 197, 176, 0.4) !important;
  color: #fff !important;
  height: 40px;
  padding: 0 24px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.publish-btn:hover {
  background: rgba(168, 197, 176, 0.5) !important;
  transform: translateY(-1px);
}

/* ===== 分类标签 ===== */
.category-tabs {
  margin-bottom: 24px;
}

:deep(.category-tabs .el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.category-tabs .el-tabs__item) {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

:deep(.category-tabs .el-tabs__item.is-active) {
  color: #a8c5b0;
}

:deep(.category-tabs .el-tabs__active-bar) {
  background-color: #a8c5b0;
}

/* ===== 文章列表 ===== */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 400px;
}

.article-card {
  padding: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(168, 197, 176, 0.3) !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
}

.publish-time {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

.article-title {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.article-card:hover .article-title {
  color: #c5e0d0;
}

.article-excerpt {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.8;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.article-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
}

.stat-item .el-icon {
  font-size: 1rem;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.mini-tag {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 0.75rem;
}

/* ===== 分页 ===== */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

:deep(.pagination-wrapper .el-pagination) {
  --el-pagination-bg-color: rgba(255, 255, 255, 0.08);
  --el-pagination-text-color: rgba(255, 255, 255, 0.7);
  --el-pagination-button-bg-color: rgba(255, 255, 255, 0.08);
  --el-pagination-button-disabled-bg-color: rgba(255, 255, 255, 0.04);
}

:deep(.pagination-wrapper .el-pager li) {
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.pagination-wrapper .el-pager li.is-active) {
  background: rgba(168, 197, 176, 0.3);
  border-color: rgba(168, 197, 176, 0.4);
  color: #fff;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .discuss-page {
    padding: 16px;
  }

  .action-bar {
    flex-direction: column;
  }

  .publish-btn {
    width: 100%;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-stats {
    gap: 16px;
  }

  .app-main {
    padding: 0 !important;
  }
}

/* ===== 动画 ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
