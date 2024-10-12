<template>
  <md-preview
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
    :class="`rounded ${transparent ? 'bg-transparent' : 'border-thin bg-transparent'}`"
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
  transparent?: boolean
}>(), {
  height: '600px',
  transparent: false,
});
</script>
