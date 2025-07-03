<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'dark',
  },
  bodyAttrs: {
    class: 'm-0',
  },
});
</script>
