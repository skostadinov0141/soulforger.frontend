<template>
  <v-row>
    <v-col cols="4">
      <v-autocomplete
        v-model="currentAttribute"
        :items="paths ?? []"
        item-title="name"
        return-object
        label="Attribut"
      />
    </v-col>
    <v-col
      cols="8"
      class="d-flex align-center"
    >
      <v-text-field
        :value="currentAttribute?.path ?? undefined"
        readonly
        disabled
        label="Pfad"
      />
      <v-btn
        icon="mdi-send"
        class="ml-6"
        rounded
        @click="addVariable()"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type {
  CreateAttributeCalculatedNumericValueTemplateDto,
  CreateAttributeCharacterFieldPathTemplateDto,
} from '~/composables/dtos/attribute-template/create.post.dto';
import type { PathRegistryEntity } from '~/composables/entities/path-registry.entity';

const snackbar = useSnackbar();

const model = defineModel<CreateAttributeCalculatedNumericValueTemplateDto>({
  default: () => ({
    formula: undefined,
    variables: [],
    diceRolls: [],
  }),
  required: true,
});

const props = defineProps<{
  paths: PathRegistryEntity[]
}>();

const currentAttribute = ref<CreateAttributeCharacterFieldPathTemplateDto>();

function addVariable() {
  if (!currentAttribute.value) {
    snackbar.error('Wähle ein Attribut aus');
    return;
  }
  if (model.value.variables.some(variable => variable.name === currentAttribute.value?.name)) {
    snackbar.error('Variable bereits hinzugefügt');
    return;
  }
  const newVariables = [...model.value.variables, currentAttribute.value];
  model.value = {
    ...model.value,
    variables: newVariables as [],
  };
  snackbar.success('Variable hinzugefügt');
}
</script>

<style scoped>

</style>
