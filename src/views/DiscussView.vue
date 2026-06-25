<template>
  <!-- 外层：背景 + 遮罩 -->
  <div class="app-wrapper" :style="{ backgroundImage: `url(${bg})` }">
    <div class="app-overlay" />

    <!-- 布局 -->
    <div class="common-layout">
      <el-container direction="vertical" class="full-height">
        <el-container class="flex-1">
          <!-- 主内容 -->
          <el-main class="app-main">
            <div class="discuss-page">
              <BackBtn to="/" class="back-btn-inline" />

              <div class="content">
                <!-- 顶部标题 -->
                <div class="hero-section">
                  <h1 class="main-title">Hyouka同好会</h1>
                  <p class="desc">关于Hyouka的一切</p>
                </div>

                <!-- 搜索 -->
                <div class="action-bar">
                  <el-input
                    v-model="searchKeyword"
                    placeholder="对Hyouka深度求索..."
                    class="search-input"
                    clearable
                    :prefix-icon="Search"
                  />
                  <el-button
                    type="success"
                    class="publish-btn"
                    @click="publishArticle"
                  >
                    搜索
                  </el-button>
                </div>

                <!-- 分类标签 -->
                <div class="category-tabs">
                  <el-tabs
                    v-model="activeCategory"
                    @tab-change="handleCategoryChange"
                  >
                    <el-tab-pane label="全部" name="all" />
                    <el-tab-pane label="剧情分析" name="analysis" />
                    <el-tab-pane label="角色讨论" name="character" />
                    <el-tab-pane label="细节考据" name="detail" />
                    <el-tab-pane label="同人创作" name="fanwork" />
                    <el-tab-pane label="动画赏析" name="appreciation" />
                  </el-tabs>
                </div>

                <!-- 文章列表 -->
                <div class="article-list" v-loading="loading">
                  <div
                    v-for="article in paginatedArticles"
                    :key="article.id"
                    class="article-card glass-card"
                    @click="goToArticle(article.id)"
                  >
                    <div class="article-header">
                      <div class="author-info">
                        <el-avatar :size="40" :src="article.avatar">
                          {{ article.author[0] }}
                        </el-avatar>
                        <div class="author-meta">
                          <span class="author-name">{{ article.author }}</span>
                          <span class="publish-time">{{ article.time }}</span>
                        </div>
                      </div>
                      <el-tag
                        :type="getCategoryType(article.category)"
                        size="small"
                        effect="plain"
                      >
                        {{ article.category }}
                      </el-tag>
                    </div>

                    <h3 class="article-title">{{ article.title }}</h3>
                    <p class="article-excerpt">{{ article.excerpt }}</p>

                    <div class="article-footer">
                      <div class="article-stats">
                        <span class="stat-item">
                          <el-icon><View /></el-icon>
                          {{ formatNumber(article.views) }}
                        </span>
                        <span class="stat-item">
                          <el-icon><ChatDotRound /></el-icon>
                          {{ article.comments }}
                        </span>
                        <span class="stat-item">
                          <el-icon><Star /></el-icon>
                          {{ formatNumber(article.likes) }}
                        </span>
                      </div>
                      <div class="article-tags">
                        <el-tag
                          v-for="tag in article.tags"
                          :key="tag"
                          size="small"
                          class="mini-tag"
                        >
                          #{{ tag }}
                        </el-tag>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 分页 -->
                <div class="pagination-wrapper" v-if="total > pageSize">
                  <el-pagination
                    v-model:current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    background
                    layout="prev, pager, next"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, View, ChatDotRound, Star } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import bg from '../assets/bg.jpg'

// 组件导入
import BackBtn from '../components/BackBtn.vue'

const router = useRouter()

// ===== 响应式数据 =====
const searchKeyword = ref('')
const activeCategory = ref('all')
const currentPage = ref(1)
const pageSize = ref(6)
const loading = ref(false)

// ===== 模拟文章数据 =====
const articles = ref([])

// ===== 计算属性 =====

// 筛选后的文章
const filteredArticles = computed(() => {
  let result = articles.value

  if (activeCategory.value !== 'all') {
    const categoryMap = {
      analysis: '剧情分析',
      character: '角色讨论',
      detail: '细节考据',
      fanwork: '同人创作',
      appreciation: '动画赏析'
    }
    result = result.filter(
      (a) => a.category === categoryMap[activeCategory.value]
    )
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(keyword) ||
        a.excerpt.toLowerCase().includes(keyword) ||
        a.tags.some((t) => t.toLowerCase().includes(keyword))
    )
  }

  return result
})

// 分页后的文章
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredArticles.value.slice(start, end)
})

// 总数
const total = computed(() => filteredArticles.value.length)

// ===== 方法 =====

function getCategoryType(category) {
  const typeMap = {
    剧情分析: 'primary',
    角色讨论: 'success',
    细节考据: 'warning',
    同人创作: 'danger',
    动画赏析: 'info'
  }
  return typeMap[category] || 'info'
}

function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

function goToArticle(id) {
  router.push({ name: 'article', params: { id } })
}

function publishArticle() {
  ElMessage.info('发布文章功能开发中...')
}

function handleCategoryChange() {
  currentPage.value = 1
}

function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
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
