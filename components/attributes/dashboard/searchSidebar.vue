<template>
  <v-card
    elevation="2"
    rounded
    color="surface"
    class="border-thin fill-height d-flex flex-column"
  >
    <v-card-text
      class="overflow-y-auto fill-height"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="searchString"
            prepend-inner-icon="mdi-magnify"
            label="Suchbegriff"
            variant="outlined"
            @keydown.enter="emit('search')"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="rulebook"
            label="Regelwerk"
            variant="outlined"
            :items="rulebooks ?? []"
            item-title="name"
            item-value="_id"
            class="mt-5"
          />
        </v-col>
        <v-row
          no-gutters
          class="mt-5"
        >
          <v-col>
            <v-select
              v-model="sortBy"
              label="Sortieren nach"
              class="mr-3"
              variant="outlined"
              :items="sortByOptions"
              item-text="title"
              item-value="value"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn-toggle
              v-model="sortOrder"
              mandatory
              variant="outlined"
              divided
            >
              <v-btn
                color="primary"
                :value="1"
                icon="mdi-sort-descending"
              />
              <v-btn
                color="primary"
                :value="-1"
                icon="mdi-sort-ascending"
              />
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="includeTags"
            :items="tags ?? []"
            item-title="name"
            item-value="_id"
            label="Tag"
            multiple
            clearable
            variant="outlined"
            class="mt-5"
            chips
          />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="includeGroups"
            :items="groups ?? []"
            item-title="name"
            item-value="_id"
            label="Gruppe"
            multiple
            clearable
            variant="outlined"
            class="mt-5"
            chips
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            block
            variant="flat"
            class="mb-3"
            text="Filter zurücksetzen"
            prepend-icon="mdi-filter-remove"
            @click="emit('resetFilters')"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            block
            variant="flat"
            class="mb-3"
            text="Attribut erstellen"
            prepend-icon="mdi-plus"
            @click="navigateTo('/attribute-templates/create')"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            color="secondary"
            block
            variant="elevated"
            text="Suchen"
            prepend-icon="mdi-magnify"
            @click="emit('search')"
          />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { TagEntity } from '~/composables/entities/attribute/tag.entity';
import type { GroupEntity } from '~/composables/entities/attribute/group.entity';
import type { RulebookEntity } from '~/composables/entities/rulebook/rulebook.entity';

const searchString: ModelRef<string | undefined> = defineModel<string | undefined>('searchString', {
  required: true,
});

const sortBy: ModelRef<string> = defineModel<string>('sortBy', {
  required: true,
  type: String,
});

const sortOrder: ModelRef<number> = defineModel<number>('sortOrder', {
  required: true,
});

const includeTags: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('includeTags', {
  required: true,
});

const includeGroups: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('includeGroups', {
  required: true,
});

const rulebook: ModelRef<string | undefined> = defineModel<string | undefined>('rulebook', {
  required: true,
});

defineProps<{
  tags: TagEntity[] | null
  groups: GroupEntity[] | null
  rulebooks: RulebookEntity[] | null
}>();

const emit = defineEmits<{
  (e: 'search'): void
  (e: 'resetFilters'): void
}>();

const sortByOptions = [
  { title: 'Name', value: 'name' },
  { title: 'Erstellungsdatum', value: 'createdAt' },
  { title: 'Änderungsdatum', value: 'updatedAt' },
];
</script>

<style scoped>

</style>
