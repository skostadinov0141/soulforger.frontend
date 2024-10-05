<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col cols="12">
        <v-card
          elevation="2"
          class="border-thin"
          title="Schritt 1: Regelwerk auswählen"
          subtitle="Wähle das Regelwerk, für das du ein Attribut erstellen möchtest."
        >
          <v-divider />
          <v-card-text>
            <v-select
              v-model="createPayload.rulebook"
              label="Regelwerk"
              variant="outlined"
              :items="rulebooks ?? []"
              item-title="name"
              item-value="_id"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          elevation="2"
          class="border-thin"
          title="Schritt 2: Basisdaten"
          subtitle="Setze die Basisdaten, wie Name und Beschreibung, für das Attribut."
        >
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model="createPayload.name"
              label="Name"
              variant="outlined"
              class="mb-4"
            />
            <markdown-editor v-model="createPayload.description" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          :disabled="createPayload.name === '' || createPayload.description === ''"
          elevation="2"
          class="border-thin"
          title="Schritt 3: Tags"
          subtitle="Füge Tags hinzu, um das Attribut zu kategorisieren."
        >
          <v-divider />
          <v-card-text>
            <v-autocomplete
              v-model:search="tagAutocompleteSearchValue"
              v-model="selectedTags"
              return-object
              multiple
              chips
              closable-chips
              label="Tags"
              variant="outlined"
              :items="tags ?? []"
              item-title="name"
              @keydown.enter.prevent="addTag"
            >
              <template #no-data>
                <v-list-item>
                  <span>
                    <v-chip
                      label
                      density="compact"
                    >Enter</v-chip> drücken um Tag zu erstellen.
                  </span>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          :disabled="createPayload.name === '' || createPayload.description === ''"
          elevation="2"
          class="border-thin"
          title="Schritt 4: Gruppe"
          subtitle="Wähle eine Gruppe, um das Attribut zu kategorisieren."
        >
          <v-divider />
          <v-card-text>
            <v-autocomplete
              ref="groupAutocomplete"
              v-model:search="groupAutocompleteSearchValue"
              v-model="selectedGroup"
              return-object
              label="Gruppe"
              variant="outlined"
              :items="groups ?? []"
              item-title="name"
              @keydown.enter.prevent="addGroup"
            >
              <template #no-data>
                <v-list-item>
                  <span>
                    <v-chip
                      label
                      density="compact"
                    >Enter</v-chip> drücken um Gruppe zu erstellen.
                  </span>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          :disabled="createPayload.name === '' || createPayload.description === ''"
          elevation="2"
          class="border-thin"
          title="Schritt 5: Attributwert"
          subtitle="Wähle den Typ und den Wert des Attributs."
        >
          <v-divider />
          <v-card-text>
            <v-select
              v-model="createPayload.attributeType"
              label="Attributtyp"
              variant="outlined"
              :items="attributeOptions"
              @update:model-value="createValue()"
            />
            <v-expand-transition>
              <component
                :is="attributeTypeComponents[createPayload.attributeType]"
                v-if="createPayload.attributeType"
                v-model="createPayload.attributeValue"
                :rulebook-id="createPayload.rulebook"
              />
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn
          :disabled="createPayload.name === '' || createPayload.description === ''"
          color="primary"
          block
          prepend-icon="mdi-plus"
          @click="createAttributeTemplate"
        >
          Attribut erstellen
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type {
  CreateAttributeTag,
  CreateAttributeTemplateDto,
} from '~/composables/dtos/attribute-template/create.post.dto';
import type { TagEntity } from '~/composables/entities/attribute/tag.entity';
import type { GroupEntity } from '~/composables/entities/attribute/group.entity';
import TextValueCard from '~/components/attributes/create/textValueCard.vue';
import FixedNumericValueCard from '~/components/attributes/create/fixedNumericValueCard.vue';
import CalculatedNumericValueCard from '~/components/attributes/create/calculatedNumericValueCard.vue';
import MarkdownEditor from '~/components/markdown-editor/markdown-editor.vue';

const rulebookService = useRulebookService();
const attributeTemplateService = useAttributeTemplateService();
const snackbar = useSnackbar();
const route = useRoute();

const createPayload: Ref<CreateAttributeTemplateDto> = ref<CreateAttributeTemplateDto>({
  rulebook: route.params.rulebookId as string,
  name: '',
  description: '',
  tags: [],
  group: undefined,
  attributeType: undefined,
  attributeValue: undefined,
});

const { data: rulebooks } = useAsyncData('rulebooks', () => rulebookService.getAll());
const { data: tags } = useAsyncData('tags', () => attributeTemplateService.getAllTags());
const { data: groups } = useAsyncData('groups', () => attributeTemplateService.getAllGroups());

const selectedTags: Ref<TagEntity[]> = ref([]);
const tagAutocompleteSearchValue: Ref<string> = ref('');

const selectedGroup: Ref<GroupEntity | undefined> = ref(undefined);
const groupAutocompleteSearchValue: Ref<string> = ref('');
const groupAutocomplete = ref();

const attributeTypeComponents = {
  TextValue: TextValueCard,
  FixedNumericValue: FixedNumericValueCard,
  CalculatedNumericValue: CalculatedNumericValueCard,
};

const attributeOptions = [
  { title: 'Text', value: 'TextValue' },
  { title: 'Einfache Zahl', value: 'FixedNumericValue' },
  { title: 'Berechnete Zahl', value: 'CalculatedNumericValue' },
];

watch(selectedTags, (newTags) => {
  createPayload.value.tags = newTags.map((tag) => {
    const tagPayload: CreateAttributeTag = {
      _id: tag._id,
      name: tag.name,
      for: tag.for ?? 'attribute',
    };
    return tagPayload;
  });
});

watch(selectedGroup, (newGroup) => {
  if (newGroup === undefined) {
    createPayload.value.group = undefined;
    return;
  }
  createPayload.value.group = {
    _id: newGroup._id,
    name: newGroup.name,
    for: newGroup.for ?? 'attribute',
  };
});

function createValue() {
  switch (createPayload.value.attributeType) {
    case 'TextValue':
      createPayload.value.attributeValue = {
        value: undefined,
        options: [],
      };
      break;
    case 'FixedNumericValue':
      createPayload.value.attributeValue = {
        value: undefined,
      };
      break;
    case 'CalculatedNumericValue':
      createPayload.value.attributeValue = {
        formula: undefined,
        variables: [],
        diceRolls: [],
      };
      break;
  }
}

watch(selectedTags.value, (newTags) => {
  createPayload.value.tags = newTags.map((tag) => {
    const tagPayload: CreateAttributeTag = {
      _id: tag._id,
      name: tag.name,
      for: tag.for ?? 'attribute',
    };
    return tagPayload;
  });
});

function addTag() {
  if (tagAutocompleteSearchValue.value === '') {
    snackbar.error('Bitte gib einen Tag-Namen ein.');
    return;
  }
  if (selectedTags.value.some(tag => tag.name === tagAutocompleteSearchValue.value)) {
    tagAutocompleteSearchValue.value = '';
    snackbar.error('Dieser Tag wurde bereits hinzugefügt.');
    return;
  }
  const newTag: TagEntity = {
    _id: undefined,
    name: tagAutocompleteSearchValue.value,
    for: 'attribute',
    rulebook: undefined,
    description: undefined,
  };
  selectedTags.value.push(newTag);
  tagAutocompleteSearchValue.value = '';
}

function addGroup() {
  if (groupAutocompleteSearchValue.value === '') {
    snackbar.error('Bitte gib einen Gruppen-Namen ein.');
    return;
  }
  if (selectedGroup.value !== undefined && selectedGroup.value.name === groupAutocompleteSearchValue.value) {
    groupAutocompleteSearchValue.value = '';
    snackbar.error('Diese Gruppe wurde bereits hinzugefügt.');
    return;
  }
  selectedGroup.value = {
    _id: undefined,
    name: groupAutocompleteSearchValue.value,
    for: 'attribute',
    rulebook: undefined,
    description: undefined,
  };
  groupAutocomplete.value.blur();
}

async function createAttributeTemplate() {
  await attributeTemplateService.create(createPayload.value);
  snackbar.success('Attribut erfolgreich erstellt.');
  navigateTo({ path: `/attribute-templates/dashboard` });
}
</script>

<style scoped>

</style>
