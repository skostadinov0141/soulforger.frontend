<template>
  <md-editor
    v-model="model"
    :style="{
      height: height,
    }"
    language="en-US"
    :toolbars-exclude="[
      'fullscreen',
      'pageFullscreen',
      'github',
      'task',
      'code',
      'codeRow',
      'mermaid',
      'katex',
      'htmlPreview',
      'save',
    ]"
    editor-id="create-attribute-description-md-editor"
    class="rounded"
    :theme="theme.name.value as Themes"
  />
</template>

<script setup lang="ts">
import { MdEditor, type Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const theme = useTheme();

const model = defineModel<string | undefined>({ required: true });

withDefaults(defineProps<{
  height?: string
}>(), {
  height: '600px',
});
</script>
