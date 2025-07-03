<template>
  <character-model-list-table :data="data || []" />
</template>

<script setup lang="ts">
const { data } = await useAsyncData<CharacterModel[]>(() => useCharacterModelService().getAllCharacterModels());
</script>
