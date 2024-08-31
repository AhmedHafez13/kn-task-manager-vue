<script setup lang="ts">
import STORAGE_KEYS from '@/const/storage-keys';
import AppStorage from '@/utils/app.storage';
import { useRouter } from 'vue-router';

const userData = ref();

const router = useRouter();

onMounted(() => {
  userData.value = AppStorage.getData(STORAGE_KEYS.USER);
});

const handleLogout = () => {
  AppStorage.removeData(STORAGE_KEYS.USER);
  router.push({ name: 'login' });
};
</script>

<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-icon icon="mdi-checkbox-marked-circle-auto-outline" class="ms-5 me-2" />
    </template>

    <v-app-bar-title>{{ $route.meta.title || 'Task Manager App' }}</v-app-bar-title>

    <template #append>
      <div v-if="userData" class="mx-5 d-flex align-center ga-4">
        <div>
          Hello, <b>{{ userData.name }}</b>
        </div>
        <v-btn @click="handleLogout" text="logout" size="small" variant="outlined" />
      </div>
    </template>
  </v-app-bar>
</template>
