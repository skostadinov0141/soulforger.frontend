<template>
  <DataTable
    :value="data"
    paginator
    :rows="10"
    :rows-per-page-options="[10, 20, 50]"
    scrollable
    scroll-height="flex"
  >
    <template #header>
      <div class="flex">
        <div class="grow" />
        <Button
          :label="t('common.add')"
          icon="pi pi-plus"
        />
      </div>
    </template>
    <Column
      name="_id"
      :header="t('common.id')"
    />
    <Column
      name="name"
      :header="t('common.name')"
    />
    <Column
      class="w-64"
      :header="t('common.actions')"
    />
  </DataTable>
</template>

<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  data: CharacterModel[]
}>();
</script>
