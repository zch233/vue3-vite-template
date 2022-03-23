import { createApp } from 'vue'
import App from './App'
import 'virtual:svg-icons-register' // Here the svg sprite map has been generated
import { router } from '@src/router';
import '@src/router/routerGuard';

createApp(App).use(router).mount('#app')
