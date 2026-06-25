import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 初始化时从 localStorage 恢复登录状态
  const currentUser = ref(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  )
  const isLoggedIn = ref(!!currentUser.value)

  function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      currentUser.value = { username }
      isLoggedIn.value = true
      localStorage.setItem('currentUser', JSON.stringify({ username }))
      return true
    }
    return false
  }

  function register(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find((u) => u.username === username)) return false
    users.push({ username, password })
    localStorage.setItem('users', JSON.stringify(users))
    // 注册成功后自动登录
    currentUser.value = { username }
    isLoggedIn.value = true
    localStorage.setItem('currentUser', JSON.stringify({ username }))
    return true
  }

  function logout() {
    currentUser.value = null
    isLoggedIn.value = false
    localStorage.removeItem('currentUser')
  }

  return { currentUser, isLoggedIn, login, register, logout }
})
