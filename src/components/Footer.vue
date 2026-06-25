<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-logo">HYouka</div>

      <p class="footer-quote">"若无必要，无需燃烧青春。"</p>

      <p class="footer-copy">© 2012 米澤穂信 / KADOKAWA · 京都动画</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2e3d32;
  color: #a8bfac;
  padding: 60px 48px 40px;
  text-align: center;
}

.footer-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.4em;
  color: #d0e0d4;
}

.footer-quote {
  font-size: 0.88rem;
  letter-spacing: 0.15em;
  color: #7a9980;
  font-style: italic;
}

.footer-links {
  list-style: none;
  display: flex;
  gap: 32px;
}

.footer-links a {
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  color: #8aaa8e;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #d0e0d4;
}

.footer-copy {
  font-size: 0.72rem;
  color: #556659;
  letter-spacing: 0.08em;
}
</style>
