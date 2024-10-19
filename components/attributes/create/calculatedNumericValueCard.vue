<template>
  <v-row>
    <v-col cols="4">
      <v-autocomplete
        v-model="currentAttribute"
        :items="paths ?? []"
        item-title="name"
        prepend-inner-icon="mdi-tag"
        return-object
        label="Attribut"
      />
    </v-col>
    <v-col
      cols="8"
      class="d-flex align-center"
    >
      <v-text-field
        :model-value="currentAttribute?.path || undefined"
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
    <v-col
      v-if="model.variables.length > 0"
      cols="12"
    >
      <v-row dense>
        <v-col
          v-for="(variable, index) in model.variables"
          :key="`variable-chip-${index}`"
          cols="auto"
        >
          <v-chip
            closable
            @click:close="removeVariable(index)"
          >
            {{ variable.name }}
            <template #close>
              <v-icon color="error">
                mdi-delete
              </v-icon>
            </template>
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col>
          <v-text-field
            v-model="currentDiceRoll.name"
            label="Würfelname"
            prepend-inner-icon="mdi-tag"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="currentDiceRoll.diceAmount"
            label="Anzahl"
            prepend-inner-icon="mdi-dice-multiple"
          />
        </v-col>
        <v-col class="d-flex align-center">
          <v-text-field
            v-model="currentDiceRoll.diceSides"
            label="Seitenanzahl"
            prepend-inner-icon="mdi-dice-d20"
          />
          <v-btn
            icon
            class="ml-6"
            rounded
            @click="addDiceRoll()"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      v-if="model.diceRolls.length > 0"
      cols="12"
    >
      <v-row dense>
        <v-col
          v-for="(diceRoll, index) in model.diceRolls"
          :key="`dice-roll-chip-${index}`"
          cols="auto"
        >
          <v-chip
            closable
            @click:close="removeDiceRoll(index)"
          >
            {{ diceRoll.name }}
            <template #close>
              <v-icon color="error">
                mdi-delete
              </v-icon>
            </template>
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { CreateAttributeDiceRollTemplateDto,
  CreateAttributeCalculatedNumericValueTemplateDto,
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

defineProps<{
  paths: PathRegistryEntity[]
}>();

const currentAttribute = ref<PathRegistryEntity>();
const currentDiceRoll = ref<CreateAttributeDiceRollTemplateDto>({
  name: undefined,
  diceAmount: undefined,
  diceSides: undefined,
});

function removeVariable(index: number) {
  const newVariables = model.value.variables.filter((_, i) => i !== index);
  model.value = {
    ...model.value,
    variables: newVariables as [],
  };
}

function removeDiceRoll(index: number) {
  const newDiceRolls = model.value.diceRolls.filter((_, i) => i !== index);
  model.value = {
    ...model.value,
    diceRolls: newDiceRolls as [],
  };
}

function addDiceRoll() {
  if (!currentDiceRoll.value.name) {
    snackbar.error('Wähle einen Namen für den Würfel');
    return;
  }
  if (!currentDiceRoll.value.diceAmount) {
    snackbar.error('Wähle eine Anzahl für den Würfel');
    return;
  }
  if (!currentDiceRoll.value.diceSides) {
    snackbar.error('Wähle eine Seitenanzahl für den Würfel');
    return;
  }
  const newDiceRolls = [...model.value.diceRolls, currentDiceRoll.value];
  model.value = {
    ...model.value,
    diceRolls: newDiceRolls as [],
  };
  resetDiceRoll();
  snackbar.success('Würfel hinzugefügt');
}

function resetDiceRoll() {
  currentDiceRoll.value = {
    name: undefined,
    diceAmount: undefined,
    diceSides: undefined,
  };
}

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
