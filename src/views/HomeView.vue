<template>
  <section class="hero">
    <!-- 全屏轮播背景 -->
    <el-carousel
      class="bg-carousel"
      height="100vh"
      direction="vertical"
      motion-blur
      :autoplay="true"
      :interval="3000"
      arrow="never"
      indicator-position="none"
    >
      <el-carousel-item v-for="item in slides" :key="item.img">
        <div
          class="slide-bg"
          :style="{ backgroundImage: `url(${item.img})` }"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- 蒙版 -->
    <div class="overlay" />
    <Header class="glass-HomeCard HomeHeader" />

    <!-- 文字内容 -->
    <div class="hero-content">
      <p class="subtitle">2012 · 青春 · 推理</p>
      <img src="../assets/logo.png" alt="冰菓logo" class="logo"></img>
      <p class="desc">
        若无必要，无需燃烧青春。<br />可那一天，她的一句话改变了一切。
      </p>
      <router-link to="/LoginView">
        <button class="glass-btn">注册会员 / 登录</button>
      </router-link>
    </div>
    <petal />
  </section>
</template>

<script setup>
import { ElButton } from 'element-plus'
import petal from '../components/petal.vue'
import bg from '../assets/bg.jpg'
import bg1 from '../assets/bg1.webp'
import Header from '../components/Header.vue'

const slides = [{ img: bg }, { img: bg1 }]
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.HomeHeader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.bg-carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
}
/* 蒙版 */
.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none; /* 让点击穿透，不影响轮播交互 */
}
.slide-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 8s ease;
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 2;
  animation: fadeUp 1.2s ease both;
}

.subtitle {
  font-size: clamp(0.5rem, 2vw, 1rem);
  letter-spacing: 0.3em;
  color: #d0e8d8;
  margin-bottom: 26px;
}

.logo{
  margin: 36px;
}

.title {
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 900;
  /* 10vw表示可视区域的百分之10，1rem表示16px */
  letter-spacing: clamp(0.6rem, 10vw, 1rem);
  color: #ffffff;
  line-height: 1.5;
  margin-bottom: 32px;
}

.desc {
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  line-height: 2;
  color: #d0e8d8;
  margin-bottom: 56px;
}
</style>
