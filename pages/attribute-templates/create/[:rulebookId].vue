<template>
  <pre>
    {{ rulebook }}
  </pre>
  <pre>
    {{ attributeTags }}
  </pre>
  <pre>
    {{ attributeGroups }}
  </pre>
  <pre>
    {{ attributePaths }}
  </pre>
</template>

<script setup lang="ts">
import type { CreateAttributeTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';

const rulebookService = useRulebookService();
const attributeTemplateService = useAttributeTemplateService();
const route = useRoute();

// <editor-fold desc="Async Data declarations">
const { data: rulebook } = await useAsyncData(
  'rulebook',
  () => rulebookService.getOne(route.params.rulebookId as string),
  { server: true },
);
const { data: attributeTags } = await useAsyncData(
  'attributeTags',
  () => attributeTemplateService.getAllTags(rulebook.value!._id),
  { server: true },
);
const { data: attributeGroups } = await useAsyncData(
  'attributeGroups',
  () => attributeTemplateService.getAllGroups(rulebook.value!._id),
  { server: true },
);
const { data: attributePaths, execute: getAttributePaths } = await useAsyncData(
  'attributePaths',
  () => attributeTemplateService.getPathRegistries(rulebook.value!._id),
  { immediate: false },
);
// </editor-fold>

// <editor-fold desc="Refs">
const payload: Ref<CreateAttributeTemplateDto> = ref<CreateAttributeTemplateDto>({
  rulebook: rulebook.value!._id,
  name: undefined,
  description: undefined,
  tags: [],
  group: undefined,
  attributeType: undefined,
  attributeValue: undefined,
});
// </editor-fold>
</script>

<style scoped>

</style>
