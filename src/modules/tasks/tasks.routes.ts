import { RouteRecordRaw } from 'vue-router';
import TasksPage from './pages/TasksPage.vue';

const tasksRoutes: RouteRecordRaw[] = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksPage,
    meta: {
      title: 'Tasks',
      layout: 'MainLayout',
      requiresAuth: true,
    },
  },
];

export default tasksRoutes;
