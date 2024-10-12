<template>
  <md-preview
    v-model="model"
    :style="{
      height: height,
      // backgroundColor: theme.current.value.colors.surface,
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
    class="rounded bg-surface border-thin"
    :theme="theme.name.value as Themes"
  />
</template>

<script setup lang="ts">
import { MdPreview, type Themes } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const theme = useTheme();

const model = defineModel<string | undefined>({ required: true });

withDefaults(defineProps<{
  height?: string
}>(), {
  height: '600px',
});
</script>
