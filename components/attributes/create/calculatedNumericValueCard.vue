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
    <v-col cols="6">
      <v-text-field
        ref="diceRollInput"
        v-model="createdDiceRoll.name"
        class="mt-4 mr-3"
        label="Name"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model.number="createdDiceRoll.diceAmount"
        inputmode="numeric"
        pattern="[0-9]*"
        class="mt-4 mr-3"
        label="Würfel"
      />
    </v-col>
    <v-col
      cols="3"
      class="d-flex"
    >
      <v-text-field
        v-model.number="createdDiceRoll.diceSides"
        inputmode="numeric"
        pattern="[0-9]*"
        class="mt-4 mr-3"
        label="Würfelseiten"
      />
      <v-btn
        icon="mdi-plus"
        color="primary"
        variant="outlined"
        rounded
        class="mt-4"
        @click="addDiceRoll"
      />
    </v-col>
    <v-col cols="12">
      <v-card
        v-if="model?.diceRolls.length! > 0"
        elevation="0"
        class="border-thin mt-4"
      >
        <v-list class="py-0">
          <template
            v-for="(diceRoll, index) in model?.diceRolls"
            :key="index"
          >
            <v-divider v-if="index !== 0" />
            <v-list-item
              density="comfortable"
              :title="diceRoll.name"
            >
              <template #append>
                <v-btn
                  icon="mdi-delete"
                  density="compact"
                  variant="text"
                  color="error"
                  @click="removeDiceRoll(index)"
                />
              </template>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="formula"
        class="mt-4"
        label="Formel"
        hint="Verwende Variablen in geschweiften Klammern, um Werte zu referenzieren."
      />
    </v-col>
    <v-col cols="12">
      <v-card
        v-if="parsedFormula"
        class="border-thin mt-3"
        elevation="0"
      >
        <v-card-text
          class="text-body-1"
          v-html="parsedFormula"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type {
  CreateAttributeCalculatedNumericValueTemplateDto,
  CreateAttributeCharacterFieldPathTemplateDto,
  CreateAttributeDiceRollTemplateDto,
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

const createdDiceRoll = ref<CreateAttributeDiceRollTemplateDto>({
  name: undefined,
  diceAmount: undefined,
  diceSides: undefined,
});
const diceRollInput = ref();

const formula = ref<string | undefined>(undefined);
const parsedFormula = computed(() => {
  if (!formula.value) return;
  const variableRegex = /\{([^}]+)}/g;
  const diceRollRegex = /\[([^\]]+)]/g;

  const firstPass: string = formula.value.replace(variableRegex, (match, variableName) => {
    const variable = model.value?.variables.find(v => v.name === variableName);

    if (variable) {
      return `<strong class="text-info font-weight-bold"> ${variableName} </strong>`;
    }
    else {
      return `<strong class="text-error font-weight-bold"> ${variableName} </strong>`;
    }
  });
  return firstPass.replace(diceRollRegex, (match, diceRollName) => {
    const diceRoll = model.value?.diceRolls.find(s => s.name === diceRollName);

    if (diceRoll) {
      return `<strong class="text-accent font-weight-bold"> ${diceRollName} </strong>`;
    }
    else {
      return `<strong class="text-error font-weight-bold"> ${diceRollName} </strong>`;
    }
  });
});

watch(formula, () => {
  if (!formula.value) return;
  if (!model.value) return;
  model.value.formula = formula.value;
});

function resetDiceRoll() {
  createdDiceRoll.value = {
    name: undefined,
    diceAmount: undefined,
    diceSides: undefined,
  };
}

function addDiceRoll() {
  if (!createdDiceRoll.value.name || !createdDiceRoll.value.diceAmount || !createdDiceRoll.value.diceSides) return;
  if (model.value?.diceRolls.some(dr => dr.name === createdDiceRoll.value.name)) return;
  model.value?.diceRolls.push(createdDiceRoll.value);
  resetDiceRoll();
  diceRollInput.value.focus();
}

function removeDiceRoll(index: number) {
  model.value?.diceRolls.splice(index, 1);
}

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
