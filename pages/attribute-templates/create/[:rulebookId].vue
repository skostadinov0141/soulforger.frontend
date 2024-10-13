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
        >
          <template #no-data>
            <v-list-item
              class="d-flex"
              density="compact"
            >
              <v-chip
                density="compact"
                label
                class="mr-1"
                prepend-icon="mdi-keyboard-return"
                text="Enter"
              />
              drücken um Tag zu erstellen
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          ref="groupSearch"
          v-model="payload.group"
          v-model:search="groupSearchValue"
          prepend-inner-icon="mdi-account-group"
          label="Gruppe"
          item-title="name"
          return-object
          :items="attributeGroups ?? []"
          @keydown.enter.prevent="createGroup(groupSearchValue)"
        >
          <template #no-data>
            <v-list-item
              class="d-flex"
              density="compact"
            >
              <v-chip
                density="compact"
                label
                class="mr-1"
                prepend-icon="mdi-keyboard-return"
                text="Enter"
              />
              drücken um Gruppe zu erstellen
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12">
        <markdown-editor
          v-model="payload.description"
          height="600px"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="payload.attributeType"
          label="Attributtyp"
          :items="valueTypeOptions"
          prepend-inner-icon="mdi-format-list-numbered"
        />
      </v-col>
      <v-col cols="12">
        <component
          :is="currentComponent as any"
          v-model="payload.attributeValue"
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
import CalculatedNumericValueCard from '~/components/attributes/create/calculatedNumericValueCard.vue';
import FixedNumericValueCard from '~/components/attributes/create/fixedNumericValueCard.vue';
import TextValueCard from '~/components/attributes/create/textValueCard.vue';

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

// <editor-fold desc="Template Refs">
const groupSearch = ref<HTMLElement>();
// </editor-fold>

// <editor-fold desc="Static Values">
const valueTypeOptions = [
  { title: 'Einfache Zahl', value: 'FixedNumericValue' },
  { title: 'Berechnete Zahl', value: 'CalculatedNumericValue' },
  { title: 'Text', value: 'TextValue' },
];
// </editor-fold>

// <editor-fold desc="Methods">
function createTag(tag: string) {
  if (attributeTags.value!.some(t => t.name === tag)) {
    tagsSearchValue.value = '';
    return;
  }
  if (tag.length < 4) {
    tagsSearchValue.value = '';
    snackbar.error('Tag muss mindestens 4 Zeichen lang sein');
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
};

function createGroup(group: string) {
  if (attributeGroups.value!.some(g => g.name === group)) {
    groupSearchValue.value = '';
    return;
  }
  if (group.length < 4) {
    groupSearchValue.value = '';
    snackbar.error('Gruppe muss mindestens 4 Zeichen lang sein');
    return;
  }
  // ensure that the group is not already present
  if (payload.value.group?.name === group) {
    groupSearchValue.value = '';
    snackbar.error('Gruppe bereits vorhanden oder reserviert');
    return;
  }
  payload.value.group = {
    name: group,
    for: 'attribute',
  };
  groupSearch.value!.blur();
}
// </editor-fold>

// <editor-fold desc="Computed Refs">
const currentComponent = computed(() => {
  switch (payload.value.attributeType) {
    case 'FixedNumericValue':
      return FixedNumericValueCard;
    case 'CalculatedNumericValue':
      return CalculatedNumericValueCard;
    case 'TextValue':
      return TextValueCard;
    default:
      return undefined;
  }
});
// </editor-fold>
</script>

<style scoped>

</style>
