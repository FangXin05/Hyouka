<template>
  <!-- 左侧品牌区 -->
  <div class="brand-side">
    <p class="brand-sub">2012 · 京都动画</p>
    <h1 class="brand-title">Hyouka</h1>
    <p class="brand-quote">
      若无必要，无需燃烧青春。<br />
      可那一天，她的一句话改变了一切。
    </p>
    <div class="brand-divider" />
    <p class="brand-desc">
      加入同好会，与更多冰菓爱好者一起探讨这部青春推理物语。
    </p>
  </div>
</template>
<style scoped>
/* ===== 左侧品牌 ===== */
.brand-side {
  flex: 1;
  animation: fadeInLeft 0.8s ease both;
}

.brand-sub {
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  color: #c5e0d0;
  margin-bottom: 16px;
  font-weight: 300;
}

.brand-title {
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 200;
  letter-spacing: 0.5em;
  color: #fff;
  margin-bottom: 24px;
  font-family: 'Georgia', serif;
  text-shadow: 0 2px 20px rgba(168, 197, 176, 0.3);
  line-height: 1.1;
}

.brand-quote {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 2;
  letter-spacing: 0.1em;
  margin-bottom: 32px;
}

.brand-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #a8c5b0, transparent);
  margin-bottom: 24px;
}

.brand-desc {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  line-height: 1.8;
  letter-spacing: 0.05em;
}
</style>
