<template>
  <v-card
    elevation="2"
    class="border-thin"
  >
    <v-card-text
      style="overflow-y: auto; height: 95.2vh"
      class="pa-0"
    >
      <v-data-table
        class="fill-height"
        density="comfortable"
        :headers="headers"
        :items="attributes ?? []"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { AttributeEntity } from '~/composables/entities/attribute/attribute.entity';

const props = defineProps<{
  attributes: AttributeEntity[] | null
}>();

watch(props, (newValue) => {
  console.log(newValue);
});

const headers = [
  { text: 'Name', value: 'name', sortable: false },
  { text: 'Gruppe', value: 'group', sortable: false },
  { text: 'Tags', value: 'tags', sortable: false },
];
</script>

<style scoped>

</style>
