import { RouteRecordRaw } from 'vue-router';
import HomePage from './pages/HomePage.vue';

const homeRoutes: RouteRecordRaw[] = [
  { path: '/', component: HomePage, meta: { layout: 'MainLayout' } },
];

export default homeRoutes;
