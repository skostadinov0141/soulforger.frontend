<template>
  <p class="text-medium-emphasis mt-4">
    Eine einfache Zahl, die nicht berechnet wird. Diese benötigt keine zusätzliche Konfiguration.
  </p>
</template>

<script setup lang="ts">
import type { CreateAttributeFixedNumericValueTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';

defineModel<CreateAttributeFixedNumericValueTemplateDto>();
</script>

<style scoped>

</style>
