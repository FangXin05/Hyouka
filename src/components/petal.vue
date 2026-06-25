<template>
  <div class="petals">
    <span v-for="n in 12" :key="n" class="petal" :style="petalStyle(n)" />
  </div>
</template>
<script setup>
function petalStyle(n) {
  return {
    left: `${(n * 137.5) % 100}%`,
    animationDelay: `${(n * 0.7) % 6}s`,
    animationDuration: `${6 + (n % 4)}s`,
    fontSize: `${0.8 + (n % 3) * 0.4}rem`,
    opacity: 0.4 + (n % 3) * 0.15
  }
}
</script>
<style scoped>
.petal {
  position: absolute;
  top: -10%;
  z-index: 3;
  animation: fall linear infinite;
  user-select: none;
}

.petal::before {
  content: '✿';
  color: #c8a8b8;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes fadeUp {
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
