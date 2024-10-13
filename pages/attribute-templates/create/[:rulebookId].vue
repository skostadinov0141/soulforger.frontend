<template>
  <v-container
    min-height="100vh"
    fluid
    class="pa-10"
  >
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="rulebook!.name"
          readonly
          disabled
          label="Regelwerk"
        />
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="payload.name"
          label="Attributname"
        />
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="payload.tags"
          v-model:search="tagsSearchValue"
          prepend-inner-icon="mdi-tag"
          label="Tags"
          chips
          multiple
          item-title="name"
          return-object
          :items="attributeTags ?? []"
          @keydown.enter="createTag(tagsSearchValue)"
        />
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="payload.group"
          v-model:search="groupSearchValue"
          prepend-inner-icon="mdi-account-group"
          label="Gruppe"
          item-title="name"
          return-object
          :items="attributeGroups ?? []"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type {
  CreateAttributeTag,
  CreateAttributeTemplateDto,
} from '~/composables/dtos/attribute-template/create.post.dto';

const rulebookService = useRulebookService();
const attributeTemplateService = useAttributeTemplateService();
const route = useRoute();
const snackbar = useSnackbar();

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
const tagsSearchValue: Ref<string> = ref('');
const groupSearchValue: Ref<string> = ref('');
// </editor-fold>

// <editor-fold desc="Methods">
function createTag(tag: string) {
  if (attributeTags.value!.some(t => t.name === tag)) {
    tagsSearchValue.value = '';
    return;
  }
  // ensure that the tag is not already present
  if (payload.value.tags.some(t => t.name === tag)) {
    tagsSearchValue.value = '';
    snackbar.error('Tag bereits vorhanden oder reserviert');
    return;
  }
  const tagPaload: CreateAttributeTag = {
    name: tag,
    for: 'attribute',
  };
  payload.value.tags.push(tagPaload);
  tagsSearchValue.value = '';
}
// </editor-fold>
</script>

<style scoped>

</style>
