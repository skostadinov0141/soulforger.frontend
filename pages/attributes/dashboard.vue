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
          :tags="tags!"
          :groups="groups!"
          @search="console.log(searchPayload)"
        />
      </v-col>
      <v-col cols="9">
        <attributes-dashboard-results />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';

const attributeService = useAttributeService();

const { data: tags } = await attributeService.getAllTagsServer();
const { data: groups } = await attributeService.getAllGroupsServer();
const searchPayload: Ref<SearchAttributeTemplateDto> = ref({
  sortBy: 'name',
  sortOrder: 1,
  page: 0,
  limit: 20,
  excludeTags: [],
  includeTags: [],
  excludeGroups: [],
});
</script>

<style scoped>

</style>
