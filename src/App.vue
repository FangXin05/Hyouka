<template>
  <div id="app">
    <DesktopNav />
    <MobileNav />
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import NavBar from './components/CapsuleBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面切换淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
html {
  overflow-y: stable; /* 滚动条始终存在，不够滚就显示灰色轨道 */
}
/* PC端 */
.desktop-nav {
  display: block;
}
.mobile-nav {
  display: none;
}
/* 移动端 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
}
</style>
