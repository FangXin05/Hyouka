#  Hyouka 
 
 
一个基于 Vue 3 构建的《冰菓》动漫主题粉丝网站，涵盖官方资讯、衍生内容、角色介绍与同好交流等板块。
 
---
 
##  功能特性
 
-  **全屏轮播首页** — 沉浸式背景轮播 + 花瓣飘落动画
-  **注册 / 登录系统** — 基于 localStorage 的本地用户系统，含路由守卫拦截
-  **官方内容页** — 剧集列表、角色介绍、OST 音乐列表
-  **衍生内容页** — 周边、漫画等相关资讯
-  **同好会页面** — 粉丝交流讨论区
-  **设置页面** — 个人设置入口
-  **胶囊导航栏** — 底部浮动导航，适配移动端
-  **页面切换动画** — 全局淡入淡出过渡效果
---
 
## 🛠 技术栈
 
| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架（Composition API + `<script setup>`） |
| [Vue Router 4](https://router.vuejs.org/) | 路由管理 + 路由守卫 |
| [Pinia](https://pinia.vuejs.org/) | 全局状态管理（用户登录状态） |
| [Element Plus](https://element-plus.org/) | UI 组件库 |
| [Vite](https://vitejs.dev/) | 构建工具 |
 
---
 
##  项目结构
 
```
src/
├── assets/          # 图片、背景等静态资源
├── components/      # 公共组件
│   ├── BackBtn.vue      # 返回按钮
│   ├── CapsuleBar.vue   # 底部胶囊导航
│   ├── Footer.vue       # 页脚
│   ├── Header.vue       # 顶部栏
│   └── Sidebar.vue      # 侧边栏
├── data/            # 静态数据
│   ├── OfficalView/
│   │   ├── characters.js    # 角色数据
│   │   └── music.js         # 音乐数据
│   └── AssociatedView/
├── router/
│   └── index.js     # 路由配置 + 守卫
├── store/
│   └── user.js      # Pinia 用户状态
├── views/           # 页面组件
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── OfficalView.vue
│   ├── AssociatedView.vue
│   ├── DiscussView.vue
│   └── Setting.vue
├── App.vue
└── main.js
```
 
---
 
##  快速开始
 
**环境要求：** Node.js >= 16
 
```bash
# 克隆项目
git clone https://github.com/FangXin05/Hyouka.git
cd Hyouka
 
# 安装依赖
npm install
 
# 启动开发服务器
npm run dev
 
# 构建生产版本
npm run build
```
 
启动后访问 `http://localhost:5173`
 
---
 
##  登录说明
 
本项目使用 **localStorage** 模拟用户系统，数据存储在本地浏览器中，无需后端服务。
 
- 注册账号后即可访问全部页面
- 未登录状态下点击受保护页面会弹出提示
- 用户数据仅存储在当前浏览器，清除浏览器数据后需重新注册
---
 
##  页面预览
 
| 页面 | 说明 |
|------|------|
| `/` | 首页，全屏背景轮播 |
| `/LoginView` | 登录 / 注册页 |
| `/OfficalView` | 官方内容（剧集、角色、音乐） |
| `/AssociatedView` | 衍生内容 |
| `/DiscussView` | 同好会讨论区 |
| `/Setting` | 个人设置 |
 
---
 
##  License
 
本项目仅供学习与个人展示使用，动漫相关内容版权归原作者及京都动画所有。
 
