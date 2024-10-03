<template>
  <v-sheet
    elevation="2"
    rounded
    color="surface"
    class="border-thin"
  >
    <v-card-text style="overflow-y: auto; height:90vh">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="searchString"
            prepend-inner-icon="mdi-magnify"
            label="Suchbegriff"
            variant="outlined"
            @keydown.enter="emit('search')"
            @blur="searchString = ''"
          />
        </v-col>
        <v-row
          no-gutters
          class="mt-16"
        >
          <v-col>
            <v-select
              v-model="sortBy"
              label="Sortieren nach"
              prepend-inner-icon="mdi-sort"
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
            prepend-inner-icon="mdi-tag-plus"
            :items="tags ?? []"
            item-title="name"
            item-value="_id"
            label="Tags hinzufügen"
            multiple
            color="success"
            clearable
            variant="outlined"
            class="mt-5"
            chips
          />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="excludeTags"
            prepend-inner-icon="mdi-tag-remove"
            :items="tags ?? []"
            item-title="name"
            item-value="_id"
            label="Tags ausschließen"
            multiple
            class="mt-5"
            color="error"
            chips
            clearable
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="includeGroups"
            prepend-inner-icon="mdi-account-plus"
            :items="groups ?? []"
            item-title="name"
            item-value="_id"
            label="Gruppen hinzufügen"
            multiple
            color="success"
            clearable
            variant="outlined"
            class="mt-5"
            chips
          />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="excludeGroups"
            prepend-inner-icon="mdi-account-remove"
            :items="groups ?? []"
            item-title="name"
            item-value="_id"
            label="Gruppen ausschließen"
            multiple
            class="mt-5"
            color="error"
            chips
            clearable
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="secondary"
        block
        variant="elevated"
        text="Suchen"
        prepend-icon="mdi-magnify"
        @click="emit('search')"
      />
    </v-card-actions>
  </v-sheet>
</template>

<script setup lang="ts">
import type { ModelRef } from 'vue';
import type { TagEntity } from '~/composables/entities/attribute/tag.entity';
import type { GroupEntity } from '~/composables/entities/attribute/group.entity';

const searchString: ModelRef<string | undefined> = defineModel<string | undefined>('searchString', {
  required: true,
  type: String,
});

const sortBy: ModelRef<string> = defineModel<string>('sortBy', {
  required: true,
  type: String,
});

const sortOrder: ModelRef<number> = defineModel<number>('sortOrder', {
  required: true,
});

const excludeTags: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('excludeTags', {
  required: true,
});

const includeTags: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('includeTags', {
  required: true,
});

const excludeGroups: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('excludeGroups', {
  required: true,
});

const includeGroups: ModelRef<string[] | undefined> = defineModel<string[] | undefined>('includeGroups', {
  required: true,
});

defineProps<{
  tags: TagEntity[] | null
  groups: GroupEntity[] | null
}>();

const emit = defineEmits(['search']);

const sortByOptions = [
  { title: 'Name', value: 'name' },
  { title: 'Erstellungsdatum', value: 'createdAt' },
  { title: 'Änderungsdatum', value: 'updatedAt' },
];
</script>

<style scoped>

</style>
