<template>
  <div class="official-page" :style="{ backgroundImage: `url(${bg2})` }">
    <BackBtn to="/" />

    <div class="overlay" />
    <div class="content">
      <!-- 顶部标题 -->
      <div class="hero-section">
        <p class="sub-title">2012 · 京都动画</p>
        <h1 class="main-title">关 于 冰 菓</h1>
        <p class="desc">
          若无必要，无需燃烧青春。<br />可那一天，她的一句话改变了一切。
        </p>
      </div>

      <!-- 信息 + 简介 -->
      <div class="info-row">
        <el-card class="glass-card info-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">📋 作品信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="原作" label-align="right">
              <span class="info-value">米泽穗信</span>
            </el-descriptions-item>
            <el-descriptions-item label="导演" label-align="right">
              <span class="info-value">武本康弘</span>
            </el-descriptions-item>
            <el-descriptions-item label="制作" label-align="right">
              <span class="info-value">京都动画</span>
            </el-descriptions-item>
            <el-descriptions-item label="播出" label-align="right">
              <span class="info-value">2012年4月</span>
            </el-descriptions-item>
            <el-descriptions-item label="集数" label-align="right">
              <span class="info-value">全22话 + OVA</span>
            </el-descriptions-item>
            <el-descriptions-item label="类型" label-align="right">
              <el-tag size="small" type="info" class="tag-item">青春</el-tag>
              <el-tag size="small" type="info" class="tag-item">推理</el-tag>
              <el-tag size="small" type="info" class="tag-item">校园</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card class="glass-card story-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">📖 剧情简介</span>
            </div>
          </template>
          <div class="story-content">
            <p class="story-text">
              奉行"节能主义"的高中生折木奉太郎，在姐姐的命令下加入了即将废社的"古典部"。
              在那里，他遇见了好奇心旺盛的千金大小姐千反田爱瑠。
            </p>
            <p class="story-text">
              从"社刊为何停刊"到"Kanya祭的真相"，
              在千反田"我很好奇！"的驱使下，折木不得不动用他那被封印的推理才能，
              揭开一个个校园谜团。这是一部关于青春、成长与"玫瑰色高中生活"的物语。
            </p>
          </div>
        </el-card>
      </div>

      <!-- 标签页 -->
      <el-card class="glass-card tab-card">
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="👥 主要角色" name="characters">
            <div class="char-grid">
              <div
                v-for="char in characters"
                :key="char.name"
                class="char-card"
                @click="goToChar(char.name)"
              >
                <div class="char-img-wrapper">
                  <img :src="char.image" :alt="char.name" class="char-img" />
                  <div class="char-overlay">
                    <span class="view-more">查看详情 →</span>
                  </div>
                </div>
                <div class="char-info">
                  <p class="char-name">{{ char.name }}</p>
                  <span class="char-role">{{ char.role }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="🎵 主题曲" name="music">
            <div class="music-section">
              <el-table
                :data="musicList"
                style="width: 100%"
                :header-cell-style="tableHeaderStyle"
                class="music-table"
              >
                <el-table-column prop="type" label="类型" width="80">
                  <template #default="scope">
                    <el-tag
                      :type="scope.row.type === 'OP' ? 'success' : 'warning'"
                      size="small"
                      effect="dark"
                    >
                      {{ scope.row.type }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="曲目">
                  <template #default="scope">
                    <span class="music-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="artist" label="演唱" />
                <el-table-column prop="ep" label="使用集数" />
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="⭐ 观众评价" name="review">
            <div class="review-grid">
              <div v-for="r in reviews" :key="r.platform" class="review-card">
                <div class="review-header">
                  <span class="platform-icon">{{
                    getPlatformIcon(r.platform)
                  }}</span>
                  <p class="platform">{{ r.platform }}</p>
                </div>
                <div class="review-score">
                  <span class="score-number">{{ r.score }}</span>
                  <span class="score-unit">/10</span>
                </div>
                <el-rate
                  :model-value="r.score / 2"
                  disabled
                  show-score
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
                <p class="review-desc">{{ r.desc }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { characters } from '../data/OfficalView/characters.js'
import { musicList } from '../data/OfficalView/music.js'
import bg2 from '../assets/OfficalView-bg.jpg'
import BackBtn from '../components/BackBtn.vue'

const router = useRouter()
const activeTab = ref('characters')

function goToChar(name) {
  router.push({ name: 'character', params: { name } })
}

function getPlatformIcon(platform) {
  const icons = {
    Bilibili: '📺',
    MAL: '🌍',
    豆瓣: '📚'
  }
  return icons[platform] || '⭐'
}

const tableHeaderStyle = {
  background: 'rgba(255, 255, 255, 0.08)',
  color: '#fff',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
}

const reviews = [
  {
    platform: 'Bilibili',
    score: 9.8,
    desc: '京都动画的巅峰之作，细腻的演出和人物刻画令人惊叹。'
  },
  {
    platform: 'MAL',
    score: 8.2,
    desc: 'Slow-paced mystery with beautiful animation and character development.'
  },
  {
    platform: '豆瓣',
    score: 9.0,
    desc: '节能主义者的青春推理物语，每一帧都值得细细品味。'
  }
]
</script>

<style scoped>
.official-page {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 32px 80px;
}

/* 顶部标题优化 */
.hero-section {
  text-align: center;
  margin-bottom: 56px;
  animation: fadeInUp 0.8s ease;
}

.sub-title {
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: #c5e0d0;
  margin-bottom: 16px;
  text-transform: uppercase;
  font-weight: 300;
}

.main-title {
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 200;
  letter-spacing: 0.5em;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 2px 20px rgba(168, 197, 176, 0.3);
  font-family: 'Georgia', serif;
}

.desc {
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.15em;
  font-size: 1rem;
  line-height: 2;
}

/* 信息+简介并排优化 */
.info-row {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.info-card {
  flex: 0 0 300px;
}

.story-card {
  flex: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-value {
  color: #e0e0e0;
  font-weight: 500;
}

.tag-item {
  margin-right: 4px;
}

.story-content {
  padding: 4px 0;
}

.story-text {
  color: rgba(255, 255, 255, 0.85);
  line-height: 2;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-indent: 2em;
}

.story-text:last-child {
  margin-bottom: 0;
}

/* 磨砂卡片优化 */
.glass-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  margin-bottom: 24px;
  border-radius: 12px !important;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.tab-card {
  overflow: hidden;
}

.card-title {
  color: #fff;
  letter-spacing: 0.15em;
  font-size: 1rem;
  font-weight: 500;
}

/* 标签页样式 */
:deep(.custom-tabs .el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.custom-tabs .el-tabs__item) {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  padding: 0 20px;
}

:deep(.custom-tabs .el-tabs__item.is-active) {
  color: #a8c5b0;
}

:deep(.custom-tabs .el-tabs__active-bar) {
  background-color: #a8c5b0;
}

/* 角色网格优化 */
.char-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 8px 0;
}

.char-card {
  text-align: center;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.char-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.char-img-wrapper {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.char-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.char-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.char-card:hover .char-overlay {
  opacity: 1;
}

.char-card:hover .char-img {
  transform: scale(1.05);
}

.view-more {
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

.char-info {
  padding: 12px;
}

.char-name {
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 6px;
  font-weight: 500;
}

.char-role {
  font-size: 0.75rem;
  color: #a8c5b0;
  background: rgba(168, 197, 176, 0.15);
  padding: 2px 12px;
  border-radius: 999px;
  display: inline-block;
}

/* 音乐表格优化 */
.music-section {
  padding: 8px 0;
}

.music-table {
  background: transparent !important;
}

:deep(.music-table .el-table__body-wrapper) {
  background: transparent;
}

:deep(.music-table tr) {
  background: rgba(255, 255, 255, 0.03);
}

:deep(.music-table td) {
  border-bottom: 1px solid rgba(40, 39, 39, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

:deep(.music-table .el-table__row:hover > td) {
  background: rgba(255, 255, 255, 0.08) !important;
}

.music-title {
  color: #a8c5b0;
  font-weight: 500;
}

/* 评价网格优化 */
.review-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 8px 0;
}

.review-card {
  text-align: center;
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.review-header {
  margin-bottom: 12px;
}

.platform-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

.platform {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 500;
}

.review-score {
  margin-bottom: 12px;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #a8c5b0;
  line-height: 1;
}

.score-unit {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 2px;
}

.review-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 12px;
  line-height: 1.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    padding: 40px 20px 60px;
  }

  .info-row {
    flex-direction: column;
  }

  .info-card {
    flex: 1;
  }

  .char-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .review-grid {
    grid-template-columns: 1fr;
  }
}

/* 动画 */
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
