import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 1. 引入 createPinia
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './styles/glass.css'
// 2. 创建 Pinia 实例 (如果后续需要配置 store 里的 user 逻辑，只需在对应 store 文件里引入 defineStore 即可)
const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.use(pinia) // 挂载 pinia
app.mount('#app')
