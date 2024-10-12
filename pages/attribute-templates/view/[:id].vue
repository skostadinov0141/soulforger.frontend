<template>
  <div>
    <h1>Attribute Template</h1>
    <p>{{ attributeTemplate?.name }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const attributeTemplateService = useAttributeTemplateService();

const { data: attributeTemplate } = useAsyncData(
  'attributeTemplate',
  () => attributeTemplateService.getAttributeTemplate(route.params.id as string),
);
</script>

<style scoped>

</style>
