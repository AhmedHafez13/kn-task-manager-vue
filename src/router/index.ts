// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import homeRoutes from '@/modules/home/home.routes';
import authRoutes from '@/modules/auth/auth.routes';
import tasksRoutes from '@/modules/tasks/tasks.routes';
import AppStorage from '@/utils/app.storage';
import STORAGE_KEYS from '@/const/storage-keys';

const routes = [...tasksRoutes, ...authRoutes, ...homeRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

router.beforeEach((to, _from, next) => {
  const hadUserData = AppStorage.hasKey(STORAGE_KEYS.USER);

  // If the user is already authenticated redirect to home if targets `login` page
  if ((to.name === 'login' || to.name === 'register') && hadUserData) {
    next({ path: '/' });
  }

  // Check if the route requires authentication
  // redirect to `login` if user is not authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (hadUserData) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
