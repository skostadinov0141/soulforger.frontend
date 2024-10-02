<template>
  <div />
</template>

<script setup lang="ts">
const attributeService = useAttributeService();

const { data: tags } = await attributeService.getAllTagsServer();
</script>

<style scoped>

</style>
