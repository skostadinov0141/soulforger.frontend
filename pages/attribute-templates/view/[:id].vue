<template>
  <pre>
    {{ JSON.stringify(attributeTemplate, undefined, 2) }}
  </pre>
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
