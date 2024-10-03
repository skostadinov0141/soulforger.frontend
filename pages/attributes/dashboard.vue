<template>
  <v-container
    fluid
    height="100vh"
    class="d-flex align-center px-8"
  >
    <v-row
      align="stretch"
      justify="center"
      no-gutters
    >
      <v-col
        cols="3"
      >
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
          @reset-filters="resetFilters"
        />
      </v-col>
      <v-col
        cols="9"
        class="pl-4"
      >
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
const route = useRoute();
const router = useRouter();

const searchPayload: Ref<SearchAttributeTemplateDto> = ref({
  searchString: route.query.searchString as string ?? '',
  sortBy: route.query.sortBy as string ?? 'name',
  sortOrder: parseInt(route.query.sortOrder ?? 1),
  excludeTags: route.query.excludeTags as string[] ?? [],
  includeTags: route.query.includeTags as string[] ?? [],
  excludeGroups: route.query.excludeGroups as string[] ?? [],
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

function resetFilters() {
  searchPayload.value = {
    searchString: '',
    sortBy: 'name',
    sortOrder: 1,
    excludeTags: [],
    includeTags: [],
    excludeGroups: [],
    includeGroups: [],
  };
  search();
}

watch(searchPayload, (newSearch) => {
  router.push({
    query: {
      ...newSearch,
    },
  });
}, { deep: true });
</script>

<style scoped>

</style>
