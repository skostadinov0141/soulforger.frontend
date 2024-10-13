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
    <v-col
      v-if="model.variables.length > 0"
      cols="12"
    >
      <v-list
        variant="text"
        max-height="300px"
        class="my-0"
        bg-color="transparent"
        rounded
      >
        <template
          v-for="(variable, index) in model.variables"
          :key="`variable-list-item-${index}`"
        >
          <v-divider v-if="index !== 0" />
          <v-list-item>
            {{ variable.name }}
            <template #append>
              <v-btn
                icon
                variant="text"
                density="compact"
                color="error"
                @click="removeVariable(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </v-list>
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
      <v-list
        class="py-0 border-thin"
        rounded
        variant="text"
        max-height="300px"
        bg-color="transparent"
      >
        <template
          v-for="(diceRoll, index) in model.diceRolls"
          :key="`dice-roll-list-item-${index}`"
        >
          <v-divider v-if="index !== 0" />
          <v-list-item>
            {{ diceRoll.name }}
            <template #append>
              <v-btn
                icon="mdi-delete"
                variant="text"
                density="compact"
                color="error"
                @click="removeDiceRoll(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { CreateAttributeDiceRollTemplateDto,
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

defineProps<{
  paths: PathRegistryEntity[]
}>();

const currentAttribute = ref<CreateAttributeCharacterFieldPathTemplateDto>();
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
