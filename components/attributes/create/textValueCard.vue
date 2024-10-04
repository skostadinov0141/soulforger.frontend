<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-text-field
        v-model="option"
        variant="outlined"
        class="mt-4"
        label="Option"
        @keydown.enter.prevent="createOption"
      />
      <p class="text-medium-emphasis mt-2 text-caption">
        <v-chip
          label
          density="compact"
          class="text-caption"
        >
          Enter
        </v-chip> drücken um Option hinzuzufügen.
      </p>
      <v-card
        v-if="model!.options.length > 0"
        class="border-thin mt-4"
        elevation="0"
      >
        <v-list
          max-height="300px"
          density="comfortable"
          class="py-0"
        >
          <template
            v-for="(optionItem, index) in model!.options"
            :key="index"
          >
            <v-divider v-if="index !== 0" />
            <v-list-item>
              {{ optionItem }}
              <template #append>
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  color="error"
                  density="compact"
                  @click="model!.options.splice(index, 1)"
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
import type { ModelRef } from 'vue';
import type { CreateAttributeTextValueTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';

const option: Ref<string> = ref<string>('');

const model: ModelRef<CreateAttributeTextValueTemplateDto | undefined>
    = defineModel<CreateAttributeTextValueTemplateDto>();

function createOption() {
  if (option.value === '') {
    return;
  }
  if (model.value!.options.some(o => o === option.value)) {
    return;
  }
  model.value!.options.push(option.value);
  option.value = '';
}
</script>

<style scoped>

</style>
