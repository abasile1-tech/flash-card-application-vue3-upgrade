import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Routes from './routes';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: Routes,
});

// app.use(router).mount('#app');

app.use(router)
// Note: on Server Side, you need to manually push the initial location
router.isReady().then(() => app.mount('#app'))