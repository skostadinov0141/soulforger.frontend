<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'app-dark',
  },
});
</script>
