import { RouteRecordRaw } from 'vue-router';
import TasksPage from './pages/TasksPage.vue';

const tasksRoutes: RouteRecordRaw[] = [
  { path: '/tasks', component: TasksPage },
];

export default tasksRoutes;
