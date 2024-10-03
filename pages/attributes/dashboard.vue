<template>
  <v-container
    height="100vh"
    fluid
    class="pa-6"
  >
    <v-row
      align="center"
      class="fill-height"
    >
      <v-col cols="3">
        <attributes-dashboard-search-sidebar
          v-model:sort-by="searchPayload.sortBy"
          v-model:sort-order="searchPayload.sortOrder"
          v-model:include-tags="searchPayload.includeTags"
          v-model:exclude-tags="searchPayload.excludeTags"
          v-model:exclude-groups="searchPayload.excludeGroups"
          v-model:include-groups="searchPayload.includeGroups"
          v-model:search-string="searchPayload.searchString"
          :tags="tags"
          :groups="groups"
          @search="search"
        />
      </v-col>
      <v-col cols="9">
        <attributes-dashboard-results
          :attributes="attributes"
          @delete="deleteAttribute"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';
import type { AttributeEntity } from '~/composables/entities/attribute/attribute.entity';

const attributeService = useAttributeService();
const confirmationDialog = useConfirmationDialog();

const searchPayload: Ref<SearchAttributeTemplateDto> = ref({
  sortBy: 'name',
  sortOrder: 1,
  excludeTags: [],
  includeTags: [],
  excludeGroups: [],
});

const { data: tags } = await useAsyncData('tags', () => attributeService.getAllTags());
const { data: groups } = await useAsyncData('groups', () => attributeService.getAllGroups());
const { data: attributes, refresh: refreshAttributes } = await useAsyncData<AttributeEntity[]>(
  'attributes',
  () => attributeService.search(searchPayload.value),
  { server: true },
);

async function search() {
  await refreshAttributes();
}

async function deleteAttribute(attribute: AttributeEntity) {
  confirmationDialog.open(
    'Bestätigung',
    'Möchtest du dieses Attribut wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
    async () => {
      await attributeService.deleteAttribute(attribute._id);
      await refreshAttributes();
      confirmationDialog.close();
    },
    () => {
      confirmationDialog.close();
    },
  );
}
</script>

<style scoped>

</style>
