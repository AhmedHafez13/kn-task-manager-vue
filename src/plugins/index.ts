/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '../stores';
import router from '../router';

// 3rd Party Components
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia);
  app.use(Vue3Toastify);
}
