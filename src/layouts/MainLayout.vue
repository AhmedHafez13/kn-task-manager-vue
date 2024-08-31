<script lang="ts" setup>
import { vuetifyDefaults } from '../settings/vuetify-defaults';
</script>

<template>
  <v-defaults-provider :defaults="vuetifyDefaults">
    <v-app style="max-width: 1000px; margin: auto">
      <AppHeader style="border-radius: 0 0 1rem 1rem" />

      <v-main>
        <router-view />
      </v-main>

      <AppFooter />
    </v-app>
  </v-defaults-provider>
</template>
