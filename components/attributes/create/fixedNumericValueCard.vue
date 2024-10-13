<template>
  <v-row>
    <v-col cols="12">
      <p class="text-medium-emphasis">
        Eine einfache Zahl, die nicht berechnet wird. Diese benötigt keine zusätzliche Konfiguration.
      </p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { CreateAttributeFixedNumericValueTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';

defineModel<CreateAttributeFixedNumericValueTemplateDto>({
  default: () => ({
    value: undefined,
  }),
});
</script>

<style scoped>

</style>
