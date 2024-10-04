<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-select
        v-model="selectedFieldPathName"
        class="mt-4 mr-3"
        :items="fieldPaths ?? []"
        label="Feld"
        item-title="name"
        item-value="_id"
      />
    </v-col>
    <v-col
      class="d-flex"
      cols="9"
    >
      <v-text-field
        v-model="selectedFieldPath"
        disabled
        class="mt-4 mr-3"
        :items="fieldPaths ?? []"
        label="Pfad"
      />
      <v-btn
        icon="mdi-plus"
        color="primary"
        variant="outlined"
        rounded
        class="mt-4"
        @click="createVariable"
      />
    </v-col>
    <v-col cols="12">
      <v-card
        v-if="model?.variables.length! > 0"
        elevation="0"
        class="border-thin mt-4"
      >
        <v-list class="py-0">
          <template
            v-for="(variable, index) in model?.variables"
            :key="index"
          >
            <v-divider v-if="index !== 0" />
            <v-list-item
              density="comfortable"
            >
              <template #title>
                <p class="d-flex align-center">
                  {{ variable.name }}<v-icon
                    size="sm"
                    icon="mdi-arrow-right"
                    class="mx-3"
                  /><span class="text-disabled">{{ variable.path }}</span>
                </p>
              </template>
              <template #append>
                <v-btn
                  icon="mdi-delete"
                  density="compact"
                  variant="text"
                  color="error"
                  @click="removeVariable(index)"
                />
              </template>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { CreateAttributeCharacterFieldPathTemplateDto,
  CreateAttributeCalculatedNumericValueTemplateDto,
} from '~/composables/dtos/attribute-template/create.post.dto';

const attributeTemplateService = useAttributeTemplateService();

const model
    = defineModel<CreateAttributeCalculatedNumericValueTemplateDto | undefined>();

const props = defineProps<{
  rulebookId: string
}>();

const { data: fieldPaths }
    = useAsyncData('fieldPaths', () => attributeTemplateService.getPathRegistries(props.rulebookId));

const selectedFieldPathName = ref<string | undefined>(undefined);
const selectedFieldPath = computed<string | undefined>(() => {
  const searchResult = fieldPaths?.value?.find(fp => fp.name === selectedFieldPathName.value);
  if (searchResult) return searchResult.path;
  return undefined;
});

function createVariable() {
  if (!selectedFieldPathName.value || !selectedFieldPath.value) return;
  const variable: CreateAttributeCharacterFieldPathTemplateDto = {
    name: selectedFieldPathName.value!,
    path: selectedFieldPath.value!,
  };
  if (model.value?.variables.some(v => v.name === variable.name)) return;
  model.value?.variables.push(variable);
  selectedFieldPathName.value = undefined;
}

function removeVariable(index: number) {
  model.value?.variables.splice(index, 1);
}
</script>

<style scoped>

</style>
