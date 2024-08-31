import { RouteRecordRaw } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';

const authRoutes: RouteRecordRaw[] = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];

export default authRoutes;
