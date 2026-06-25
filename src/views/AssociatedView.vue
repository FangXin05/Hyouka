<template>
  <div class="associated-page" :style="{ backgroundImage: `url(${bg2})` }">
    <BackBtn to="/" />

    <div class="overlay" />

    <div class="content">
      <!-- 顶部标题 -->
      <div class="hero-section">
        <p class="sub-title">古典部系列 · 衍生作品</p>
        <h1 class="main-title">衍生世界</h1>
        <p class="desc">
          从轻小说到漫画，从动画到同人创作<br />
          探索《冰菓》的多元宇宙
        </p>
      </div>

      <!-- 原作小说系列 -->
      <el-card class="glass-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">📚 古典部系列小说</span>
            <el-tag type="success" size="small">米泽穗信</el-tag>
          </div>
        </template>

        <el-timeline>
          <el-timeline-item
            v-for="novel in novels"
            :key="novel.title"
            :timestamp="novel.date"
            placement="top"
            :color="novel.animated ? '#a8c5b0' : '#909399'"
          >
            <div class="novel-item">
              <div class="novel-header">
                <h3 class="novel-title">{{ novel.title }}</h3>
                <el-tag
                  v-if="novel.animated"
                  type="success"
                  size="small"
                  effect="plain"
                >
                  已动画化
                </el-tag>
                <el-tag v-else type="info" size="small" effect="plain">
                  原作
                </el-tag>
              </div>
              <p class="novel-desc">{{ novel.desc }}</p>
              <div class="novel-meta">
                <span>📖 {{ novel.pages }}</span>
                <span>🏷️ {{ novel.isbn }}</span>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <!-- 漫画改编 -->
      <el-card class="glass-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">🎨 漫画改编作品</span>
            <el-tag type="warning" size="small">漫画</el-tag>
          </div>
        </template>

        <div class="comic-grid">
          <div v-for="comic in comics" :key="comic.title" class="comic-card">
            <div class="comic-cover">
              <span class="comic-icon">📘</span>
            </div>
            <div class="comic-info">
              <h4 class="comic-title">{{ comic.title }}</h4>
              <p class="comic-author">✏️ {{ comic.artist }}</p>
              <p class="comic-volumes">📚 {{ comic.volumes }}</p>
              <p class="comic-serial">{{ comic.serialization }}</p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 同人作品推荐 -->
      <el-card class="glass-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">💫 同人作品推荐</span>
            <el-tag type="danger" size="small">同人</el-tag>
          </div>
        </template>

        <el-tabs v-model="doujinTab" class="doujin-tabs">
          <el-tab-pane label="🎨 插画集" name="illustration">
            <div class="doujin-grid">
              <div
                v-for="item in illustrations"
                :key="item.title"
                class="doujin-card"
              >
                <div class="doujin-preview">
                  <span class="preview-icon">🎨</span>
                </div>
                <div class="doujin-info">
                  <h4 class="doujin-title">{{ item.title }}</h4>
                  <p class="doujin-artist">by {{ item.artist }}</p>
                  <p class="doujin-desc">{{ item.desc }}</p>
                  <div class="doujin-tags">
                    <el-tag
                      v-for="tag in item.tags"
                      :key="tag"
                      size="small"
                      class="doujin-tag"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="✍️ 同人文" name="fanfic">
            <div class="fanfic-list">
              <div v-for="fic in fanfics" :key="fic.title" class="fanfic-item">
                <div class="fanfic-header">
                  <h4 class="fanfic-title">{{ fic.title }}</h4>
                  <span class="fanfic-rating">⭐ {{ fic.rating }}</span>
                </div>
                <p class="fanfic-author">✍️ {{ fic.author }}</p>
                <p class="fanfic-desc">{{ fic.desc }}</p>
                <div class="fanfic-meta">
                  <span>{{ fic.words }}</span>
                  <span>·</span>
                  <span>{{ fic.pairing }}</span>
                  <span>·</span>
                  <span>{{ fic.status }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="🎵 音乐/ MAD" name="music">
            <div class="mad-grid">
              <div v-for="mad in mads" :key="mad.title" class="mad-card">
                <div class="mad-thumbnail">🎬</div>
                <h4 class="mad-title">{{ mad.title }}</h4>
                <p class="mad-creator">by {{ mad.creator }}</p>
                <p class="mad-platform">{{ mad.platform }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 米泽穗信其他作品 -->
      <el-card class="glass-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">✒️ 米泽穗信其他作品</span>
            <el-tag type="info" size="small">作者</el-tag>
          </div>
        </template>

        <div class="other-works">
          <div v-for="work in otherWorks" :key="work.title" class="work-item">
            <div class="work-header">
              <h3 class="work-title">{{ work.title }}</h3>
              <span class="work-year">{{ work.year }}</span>
            </div>
            <p class="work-series">{{ work.series }}</p>
            <p class="work-desc">{{ work.desc }}</p>
            <div class="work-awards" v-if="work.awards">
              <span class="award-icon">🏆</span>
              <span class="award-text">{{ work.awards }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 相关链接 -->
      <el-card class="glass-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">🔗 相关链接</span>
          </div>
        </template>

        <div class="links-grid">
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-card"
          >
            <span class="link-icon">{{ link.icon }}</span>
            <span class="link-name">{{ link.name }}</span>
            <span class="link-arrow">→</span>
          </a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import bg2 from '../assets/AssociatedView-bg.jpg'
import BackBtn from '../components/BackBtn.vue'

const doujinTab = ref('illustration')

// 原作小说数据
const novels = [
  {
    title: '氷菓',
    date: '2001年10月',
    desc: '古典部系列第一部。奉行"节能主义"的折木奉太郎加入古典部，与千反田爱瑠相遇，揭开了33年前社刊之谜。',
    pages: '256页',
    isbn: 'ISBN 4-04-427101-1',
    animated: true
  },
  {
    title: '愚者のエンドロール',
    date: '2002年7月',
    desc: '古典部系列第二部。文化祭上映的自主电影未完成，折木被卷入电影结局的推理中，却发现了剧本背后隐藏的真相。',
    pages: '288页',
    isbn: 'ISBN 4-04-427102-X',
    animated: true
  },
  {
    title: 'クドリャフカの順番',
    date: '2005年6月',
    desc: '古典部系列第三部。文化祭"Kanya祭"上，围绕社刊《氷菓》的盗窃事件，折木展现了惊人的推理才能。',
    pages: '352页',
    isbn: 'ISBN 4-04-427103-8',
    animated: true
  },
  {
    title: '遠まわりする雏',
    date: '2007年10月',
    desc: '古典部系列第四部。短篇集，收录了折木与千反田相识前的故事，以及动画中经典的"巧克力事件"。',
    pages: '304页',
    isbn: 'ISBN 978-4-04-427104-6',
    animated: true
  },
  {
    title: 'ふたりの距離の概算',
    date: '2010年6月',
    desc: '古典部系列第五部。新学期的马拉松大赛，折木与千反田的关系有了微妙的变化。',
    pages: '288页',
    isbn: 'ISBN 978-4-04-427105-3',
    animated: false
  },
  {
    title: 'いまさら翼といわれても',
    date: '2016年11月',
    desc: '古典部系列第六部。短篇集，包括动画化的"已无法再进入箱中"和讲述折木中学时代的故事。',
    pages: '320页',
    isbn: 'ISBN 978-4-04-427106-0',
    animated: false
  }
]

// 漫画改编
const comics = [
  {
    title: '氷菓',
    artist: 'タスクオーナ',
    volumes: '全14卷',
    serialization: '月刊少年エース (2012-2022)'
  },
  {
    title: '氷菓 アンソロジー',
    artist: '多位作者',
    volumes: '全2卷',
    serialization: 'アンソロジーコミック'
  }
]

// 同人插画
const illustrations = [
  {
    title: '蔷薇色の日々',
    artist: '桜井春',
    desc: '以千反田和折木的日常为主题的温馨插画集',
    tags: ['日常', '温馨', '全年龄']
  },
  {
    title: '古典部の四季',
    artist: '明石',
    desc: '描绘古典部四人组四季活动的唯美画集',
    tags: ['四季', '风景', '治愈']
  },
  {
    title: 'I scream',
    artist: '藤原',
    desc: '以冰菓主题为核心的黑白插画集',
    tags: ['黑白', '艺术', '文艺']
  },
  {
    title: '神山高校案内',
    artist: '佐藤太郎',
    desc: '神山高中校园背景设定集风格的插画',
    tags: ['设定集', '校园', '资料']
  }
]

// 同人文
const fanfics = [
  {
    title: 'その后の古典部',
    author: '雪ノ下',
    desc: '动画结局后续，折木与千反田的恋爱故事',
    rating: '9.2',
    words: '12万字',
    pairing: '折木×千反田',
    status: '已完结'
  },
  {
    title: '里志の選択',
    author: '秋月',
    desc: '福部里志视角的故事，探讨他对伊原的感情',
    rating: '8.8',
    words: '8万字',
    pairing: '里志×伊原',
    status: '连载中'
  },
  {
    title: '节能主义者的忧郁',
    author: '春風',
    desc: '折木奉太郎的日常推理短篇集',
    rating: '9.0',
    words: '6万字',
    pairing: '无CP',
    status: '已完结'
  },
  {
    title: 'Kanya祭の夜に',
    author: '流星',
    desc: '文化祭背景下的群像剧同人',
    rating: '8.5',
    words: '15万字',
    pairing: '多CP',
    status: '连载中'
  }
]

// MAD/音乐作品
const mads = [
  {
    title: '【氷菓MAD】優しさの理由',
    creator: 'MAD制作委员会',
    platform: 'Bilibili · 播放量50万+'
  },
  {
    title: '古典部の日常 AMV',
    creator: 'AnimeMusic',
    platform: 'YouTube · 播放量30万+'
  },
  {
    title: '【钢琴】氷菓BGM串烧',
    creator: '琴鍵上的猫',
    platform: 'Bilibili · 播放量20万+'
  },
  {
    title: '冰菓 × 米津玄师 Mashup',
    creator: '音乐工坊',
    platform: 'Niconico · 播放量15万+'
  }
]

// 米泽穗信其他作品
const otherWorks = [
  {
    title: 'さよなら妖精',
    year: '2004',
    series: '独立作品',
    desc: '一部关于青春与告别的小说，讲述高中生在毕业前夕的故事。',
    awards: '2005年 本格ミステリ大賞 候补'
  },
  {
    title: '王とサーカス',
    year: '2015',
    series: '独立作品',
    desc: '以尼泊尔为舞台的推理小说，获得多项推理小说大奖。',
    awards: '2016年 本格ミステリ大賞'
  },
  {
    title: '満愿',
    year: '2014',
    series: '短篇集',
    desc: '收录6篇短篇推理小说，展现作者多样化的写作风格。',
    awards: '2014年 ミステリが読みたい! 第1位'
  },
  {
    title: '黒牢城',
    year: '2021',
    series: '时代小说',
    desc: '以战国时代为背景的历史推理小说，获得直木奖。',
    awards: '2022年 直木三十五賞'
  },
  {
    title: '儚い羊たちの祝宴',
    year: '2011',
    series: '独立作品',
    desc: '关于五个少女的连作短篇集，充满黑暗与悬疑。',
    awards: null
  }
]

// 相关链接
const links = [
  {
    name: '京都动画官网',
    url: 'https://www.kyotoanimation.co.jp/',
    icon: '🏢'
  },
  {
    name: '角川书店古典部系列',
    url: 'https://www.kadokawa.co.jp/',
    icon: '📚'
  },
  { name: 'Bilibili冰菓专题', url: 'https://www.bilibili.com/', icon: '📺' },
  {
    name: 'MyAnimeList',
    url: 'https://myanimelist.net/anime/12189/Hyouka',
    icon: '🌍'
  },
  {
    name: '豆瓣冰菓',
    url: 'https://movie.douban.com/subject/10534533/',
    icon: '📝'
  },
  { name: '冰菓Wiki', url: 'https://hyouka.fandom.com/', icon: '📖' }
]
</script>

<style scoped>
.associated-page {
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
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.55) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 32px 100px;
}

/* 顶部标题 */
.hero-section {
  text-align: center;
  margin-bottom: 56px;
  animation: fadeInUp 0.8s ease;
}

.sub-title {
  font-size: 0.85rem;
  letter-spacing: 0.4em;
  color: #c5e0d0;
  margin-bottom: 16px;
  font-weight: 300;
}

.main-title {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 200;
  letter-spacing: 0.5em;
  color: #fff;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
}

.desc {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.1em;
  font-size: 1rem;
  line-height: 2;
}

/* 磨砂卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  margin-bottom: 24px;
  border-radius: 12px !important;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: #fff;
  letter-spacing: 0.15em;
  font-size: 1rem;
  font-weight: 500;
}

/* 小说时间线 */
.novel-item {
  padding: 8px 0;
}

.novel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.novel-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.novel-desc {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.novel-meta {
  display: flex;
  gap: 16px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

/* 漫画网格 */
.comic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 8px 0;
}

.comic-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.comic-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.comic-cover {
  width: 80px;
  height: 110px;
  background: rgba(168, 197, 176, 0.15);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.comic-icon {
  font-size: 2rem;
}

.comic-info {
  flex: 1;
}

.comic-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.comic-author,
.comic-volumes,
.comic-serial {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin-bottom: 4px;
}

/* 同人标签页 */
:deep(.doujin-tabs .el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.doujin-tabs .el-tabs__item) {
  color: rgba(255, 255, 255, 0.6);
}

:deep(.doujin-tabs .el-tabs__item.is-active) {
  color: #a8c5b0;
}

:deep(.doujin-tabs .el-tabs__active-bar) {
  background-color: #a8c5b0;
}

/* 同人网格 */
.doujin-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 8px 0;
}

.doujin-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.doujin-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.doujin-preview {
  width: 100px;
  height: 100px;
  background: rgba(168, 197, 176, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.preview-icon {
  font-size: 2.5rem;
}

.doujin-info {
  flex: 1;
}

.doujin-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.doujin-artist {
  color: #a8c5b0;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.doujin-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.doujin-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.doujin-tag {
  background: rgba(168, 197, 176, 0.15) !important;
  border-color: rgba(168, 197, 176, 0.3) !important;
  color: #a8c5b0 !important;
}

/* 同人文列表 */
.fanfic-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.fanfic-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.fanfic-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.fanfic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.fanfic-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.fanfic-rating {
  color: #f7ba2a;
  font-weight: 600;
}

.fanfic-author {
  color: #a8c5b0;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.fanfic-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.fanfic-meta {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  display: flex;
  gap: 8px;
}

/* MAD网格 */
.mad-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 8px 0;
}

.mad-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  transition: all 0.3s ease;
}

.mad-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.mad-thumbnail {
  font-size: 3rem;
  margin-bottom: 12px;
}

.mad-title {
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.mad-creator {
  color: #a8c5b0;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.mad-platform {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

/* 其他作品 */
.other-works {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.work-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.work-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.work-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.work-year {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.work-series {
  color: #a8c5b0;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.work-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.8;
  margin-bottom: 10px;
}

.work-awards {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #f7ba2a;
  font-size: 0.85rem;
}

.award-icon {
  font-size: 1rem;
}

/* 链接网格 */
.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 8px 0;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  border-color: rgba(168, 197, 176, 0.3);
}

.link-icon {
  font-size: 1.5rem;
}

.link-name {
  flex: 1;
  font-size: 0.9rem;
}

.link-arrow {
  color: rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
  color: #a8c5b0;
}

/* 响应式 */
@media (max-width: 768px) {
  .content {
    padding: 60px 20px 80px;
  }

  .comic-grid,
  .doujin-grid,
  .mad-grid,
  .links-grid {
    grid-template-columns: 1fr;
  }

  .doujin-card {
    flex-direction: column;
  }

  .doujin-preview {
    width: 100%;
    height: 120px;
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
