<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData<CharacterModel[]>(() => useCharacterModelService().getAllCharacterModels());
</script>

<style scoped>

</style>
