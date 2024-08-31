<script setup lang="ts">
const items = [
  {
    title: 'GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/ahmedhafez13',
  },
  {
    title: 'LinkedIn',
    icon: `mdi-linkedin`,
    href: 'https://www.linkedin.com/in/ahmed-mo-hafez/',
  },
];
</script>

<template>
  <v-footer height="40" app style="width: 100%">
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="24" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; {{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">AHMED HAFEZ</span>
      –
      <span class="d-none d-sm-inline-block">TASK MANAGER APP</span>
    </div>
  </v-footer>
</template>

<style scoped lang="sass"></style>
