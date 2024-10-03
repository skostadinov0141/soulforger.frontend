<template>
  <v-card
    elevation="2"
    class="border-thin d-flex"
  >
    <v-card-text
      class="pa-0"
    >
      <v-data-table
        height="720px"
        fixed-footer
        fixed-header
        density="comfortable"
        :headers="headers"
        :items="attributes ?? []"
        items-per-page="20"
        :items-per-page-options="[20, 50, 100]"
      >
        <template #[`item.name`]="{ item }">
          <span class="text-subtitle-1 font-weight-medium">{{ item.name }}</span>
        </template>
        <template #[`item.group`]="{ item }">
          <v-chip
            color="accent"
            label
            class="my-3"
            density="comfortable"
          >
            {{ item.group.name }}
          </v-chip>
        </template>
        <template #[`item.tags`]="{ item }">
          <v-chip
            v-for="tag in item.tags"
            :key="tag._id"
            class="my-1 mr-2"
            density="compact"
          >
            {{ tag.name }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn
            variant="text"
            icon="mdi-pencil"
            @click="console.log(item)"
          />
          <v-btn
            variant="text"
            icon="mdi-eye"
            @click="console.log(item)"
          />
          <v-btn
            variant="text"
            color="error"
            icon="mdi-delete"
            @click="emit('delete', item)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { AttributeEntity } from '~/composables/entities/attribute/attribute.entity';

defineProps<{
  attributes: AttributeEntity[] | null
}>();

const emit = defineEmits<{
  (e: 'delete', attribute: AttributeEntity): void
}>();

const headers = [
  { title: 'Name', value: 'name', sortable: false },
  { title: 'Gruppe', value: 'group', sortable: false },
  { title: 'Tags', value: 'tags', sortable: false },
  { title: 'Aktionen', value: 'actions', sortable: false },
];
</script>

<style scoped>

</style>
