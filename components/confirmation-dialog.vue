<template>
  <v-dialog
    v-model="store.isOpen"
    max-width="480"
  >
    <v-card
      :title="store.title"
      prepend-icon="mdi-alert"
      :text="store.message"
    >
      <v-divider />
      <v-card-actions>
        <v-btn
          variant="text"
          prepend-icon="mdi-close"
          @click="store.onCancel"
        >
          Abbrechen
        </v-btn>
        <v-btn
          color="warning"
          variant="elevated"
          prepend-icon="mdi-check"
          @click="store.onConfirm"
        >
          Bestätigen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const store = useConfirmationDialogStore();
</script>

<style scoped>

</style>
