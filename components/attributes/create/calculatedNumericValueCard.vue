<template>
  <v-form v-model="formValid">
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
              :rules="[validateAllowedCharacters]"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="currentDiceRoll.diceAmount"
              label="Anzahl"
              type="number"
              hide-spin-buttons
              prepend-inner-icon="mdi-dice-multiple"
            />
          </v-col>
          <v-col class="d-flex align-start">
            <v-text-field
              v-model="currentDiceRoll.diceSides"
              label="Seitenanzahl"
              type="number"
              hide-spin-buttons
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
      <v-col cols="12">
        <v-alert
          icon="mdi-information"
          color="info"
          variant="tonal"
        >
          <p>
            Die Formel kann Variablen und Würfel enthalten. Die Würfel werden vor der Berechnung geworfen.
            Variablen werden mit "{ Attributname }" verwendet. Würfel werden mit "[ Würfelname ]" verwendet.
            Eine valide Formel könnte wie folgt aussehen:<br>
          </p>
          <p class="font-weight-black mt-2">
            <v-chip
              label
              density="compact"
              color="primary"
              class="font-weight-black"
            >
              { Attribut 1 }
            </v-chip> + 20 + <v-chip
              label
              density="compact"
              color="primary"
              class="font-weight-black"
            >
              { Attribut 2 }
            </v-chip> + <v-chip
              label
              density="compact"
              color="accent"
              class="font-weight-black"
            >
              [ Würfel 1 ]
            </v-chip>
          </p>
        </v-alert>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="model.formula"
          label="Formel"
          :rules="[validateAllowedCharacters]"
          prepend-inner-icon="mdi-function-variant"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <v-icon
          size="32"
          icon="mdi-arrow-down"
        />
      </v-col>
      <v-col>
        <v-card
          variant="text"
          class="fill-height d-block pa-3 border"
        >
          <div v-html="parsedFormula" />
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import escapeHTML from 'escape-html';
import type {
  CreateAttributeCalculatedNumericValueTemplateDto,
  CreateAttributeDiceRollTemplateDto,
} from '~/composables/dtos/attribute-template/create.post.dto';
import type { PathRegistryEntity } from '~/composables/entities/path-registry.entity';

const snackbar = useSnackbar();

const model = ref<CreateAttributeCalculatedNumericValueTemplateDto>({
  formula: undefined,
  variables: [],
  diceRolls: [],
});
const formValid = ref<boolean>(false);

const parsedFormula = computed(() => {
  if (!model.value.formula) return 'Formel';
  const sanitizedFormula = escapeHTML(model.value.formula);
  const parts = sanitizedFormula.split(/(\{[^}]+\}|\[[^\]]+\])/);
  const renderedParts = parts.map((part) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const variableName = part.slice(1, -1).trim();
      const isValid = model.value.variables.some(v => v.name === variableName);
      return `
        <strong style="color: ${isValid ? 'rgb(var(--v-theme-primary))' : 'rgb(var(--v-theme-error))'}">
          ${variableName}
        </strong>`;
    }
    else if (part.startsWith('[') && part.endsWith(']')) {
      const diceRollName = part.slice(1, -1).trim();
      const isValid = model.value.diceRolls.some(d => d.name === diceRollName);
      return `
        <strong style="color: ${isValid ? 'rgb(var(--v-theme-accent))' : 'rgb(var(--v-theme-error))'}">
          ${diceRollName}
        </strong>`;
    }
    else {
      return part;
    }
  });

  return renderedParts.join('');
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

function validateAllowedCharacters(val: string) {
  // non allowed characters are '= " % < >'
  const valid
      = !val.includes('=')
      && !val.includes('"')
      && !val.includes('%')
      && !val.includes('<')
      && !val.includes('>');
  if (valid) return true;
  return 'Ungültige Zeichen: = " % < >';
}
</script>

<style scoped>

</style>
