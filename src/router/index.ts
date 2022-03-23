import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[]  = [
  { path: '/', meta: {title: '首页'}, component: () => import('@src/views/Demo/TSX') },
  { path: '/about', meta: {title: '关于'}, component: () => import('@src/views/Demo/Normal.vue') },
  { path: '/homeAgain', component: () => {} },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
