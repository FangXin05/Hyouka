<template>
  <button class="back-btn" @click="goBack" :class="{ 'is-fixed': fixed }">
    <span class="back-text">{{ text }}</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: '返回'
  },
  fixed: {
    type: Boolean,
    default: true
  },
  to: {
    type: [String, Object],
    default: ''
  }
})

const router = useRouter()

function goBack() {
  if (props.to) {
    router.push(props.to)
  } else {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  height: 44px;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  font-family: inherit;
  white-space: nowrap;
  user-select: none;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.back-btn:active {
  transform: translateX(-2px) scale(0.96);
}

.back-btn:hover {
  transform: translateX(-3px);
}

.back-text {
  font-weight: 400;
  line-height: 1;
}

.is-fixed {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
}

@media (max-width: 768px) {
  .is-fixed {
    top: 16px;
    left: 16px;
  }

  .back-btn {
    min-width: 100px;
    height: 38px;
    padding: 0 18px;
    font-size: 0.85rem;
  }
}
</style>
