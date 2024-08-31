<script lang="ts" setup>
//
</script>

<template>
  <v-app style="max-width: 1000px; margin: auto;">
    <AppHeader style="border-radius: 0 0 1rem 1rem;" />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>
