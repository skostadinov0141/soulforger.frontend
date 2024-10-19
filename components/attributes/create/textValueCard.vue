<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="option"
        variant="outlined"
        label="Option"
        @keydown.enter="createOption"
      />
      <p class="text-medium-emphasis mt-2 text-caption">
        <v-chip
          label
          density="compact"
          class="text-caption"
          prepend-icon="mdi-keyboard-return"
        >
          Enter
        </v-chip> drücken um Option hinzuzufügen.
      </p>
    </v-col>
    <v-col
      v-if="modelValue.options.length > 0"
      cols="12"
    >
      <v-list
        class="py-0 border-thin"
        rounded
        bg-color="transparent"
      >
        <template
          v-for="(optionItem, index) in modelValue.options"
          :key="index"
        >
          <v-divider v-if="index !== 0" />
          <v-list-item>
            {{ optionItem }}
            <template #append>
              <v-btn
                icon="mdi-delete"
                color="error"
                density="compact"
                variant="text"
                @click="removeOption(index)"
              />
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { CreateAttributeTextValueTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';

const snackbar = useSnackbar();

const option = ref<string>('');

const modelValue = defineModel<CreateAttributeTextValueTemplateDto>({
  default: () => ({
    options: [],
  }),
  required: true,
});

function createOption() {
  if (option.value === '') {
    snackbar.error('Option darf nicht leer sein.');
    return;
  }
  if (modelValue.value.options.some(o => o === option.value)) {
    snackbar.error('Option existiert bereits.');
    return;
  }
  const newOptions = [...modelValue.value.options, option.value];
  modelValue.value = {
    ...modelValue.value,
    options: newOptions,
  };
  option.value = '';
}

function removeOption(index: number) {
  const newOptions = [...modelValue.value.options];
  newOptions.splice(index, 1);
  modelValue.value = {
    ...modelValue.value,
    options: newOptions,
  };
}
</script>

<style scoped>

</style>
