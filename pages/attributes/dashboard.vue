<template>
  <div>
    {{ JSON.stringify(tags, null, 2) }}
  </div>
</template>

<script setup lang="ts">
const attributeService = useAttributeService();

const { data: tags } = await attributeService.getAllTags(true);
</script>

<style scoped>

</style>
