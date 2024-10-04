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
            <v-textarea
              v-model="createPayload.description"
              label="Beschreibung"
              variant="outlined"
              rows="10"
            />
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
            />
            <v-expand-transition>
              <component
                :is="attributeTypeComponents[createPayload.attributeType]"
                v-if="createPayload.attributeType"
              />
            </v-expand-transition>
          </v-card-text>
        </v-card>
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

const rulebookService = useRulebookService();
const attributeTemplateService = useAttributeTemplateService();
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

function addTag() {
  if (tagAutocompleteSearchValue.value === '') {
    return;
  }
  if (selectedTags.value.some(tag => tag.name === tagAutocompleteSearchValue.value)) {
    tagAutocompleteSearchValue.value = '';
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
    return;
  }
  if (selectedGroup.value !== undefined && selectedGroup.value.name === groupAutocompleteSearchValue.value) {
    groupAutocompleteSearchValue.value = '';
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
</script>

<style scoped>

</style>
