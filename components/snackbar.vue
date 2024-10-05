<template>
  <v-snackbar
    v-model="store.open"
    :color="store.mode"
    :timeout="store.timeout"
    :text="store.message"
  />
</template>

<script setup lang="ts">
const store = useSnackbarStore();
</script>

<style scoped>

</style>
