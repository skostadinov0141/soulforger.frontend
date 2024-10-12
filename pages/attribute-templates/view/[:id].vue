<template>
  <v-container
    fluid
    class="fill-height"
    min-height="100vh"
  >
    <v-row
      align="center"
      justify="start"
      class="pa-10"
    >
      <v-col
        cols="12"
        class="d-flex align-center"
      >
        <div class="d-flex flex-column">
          <p
            class="text-truncate text-h4"
            style="width: 900px"
          >
            {{ attributeTemplate!.name }}
          </p>
          <p class="text-caption-1 text-medium-emphasis">
            {{ attributeTemplate!.rulebook.name }}
          </p>
        </div>
        <v-spacer />
        <v-btn-group
          variant="plain"
        >
          <v-btn icon="mdi-pencil" />
          <v-btn
            icon="mdi-flag"
            color="warning"
          />
          <v-btn
            icon="mdi-delete"
            color="error"
          />
        </v-btn-group>
      </v-col>
      <v-col cols="12">
        <markdown-viewer
          v-model="attributeTemplate!.description"
          :transparent="false"
          height="auto"
        />
      </v-col>
      <v-col
        v-if="attributeTemplate?.attributeType === 'CalculatedNumericValue'"
        cols="4"
      >
        <v-card
          class="border-thin"
          variant="text"
          title="Zusammenhängende Attribute"
        >
          <v-divider />
          <v-card-text
            style="height: 300px"
            class="overflow-y-auto d-flex flex-column"
          >
            <a
              v-for="variable in (attributeTemplate.attributeValue as CalculatedNumericValueEntity).variables"
              :key="variable._id"
              class="text-body-1"
            >
              {{ variable.name }}
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { CalculatedNumericValueEntity } from '~/composables/entities/attribute/calculated-numeric-value.entity';

const route = useRoute();
const attributeTemplateService = useAttributeTemplateService();

const { data: attributeTemplate } = await useAsyncData(
  'attributeTemplate',
  () => attributeTemplateService.getAttributeTemplate(route.params.id as string),
  { server: true },
);
</script>

<style scoped>

</style>
