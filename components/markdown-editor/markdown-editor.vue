<template>
  <v-card
    class="border-thin"
  >
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet
            class="d-flex w-100"
            rounded
          >
            <v-select
              v-model="currentHeading"
              v-tooltip:top="'Überschrift einfügen (Strg + H)'"
              :disabled="preview"
              :items="headingOptions"
              label="Überschrift"
              density="compact"
              max-width="240px"
              class="mr-4"
              @update:model-value="addHeadingToBottom"
            />
            <v-btn-group
              variant="outlined"
              :disabled="preview"
              density="comfortable"
              divided
              class="mr-4"
            >
              <v-btn
                v-tooltip:top="'Fetter Text (Strg + B)'"
                :disabled="preview"
                icon="mdi-format-bold"
                @click.prevent="wrapTextInMarkdown('**')"
              />
              <v-btn
                v-tooltip:top="'Kursiver Text (Strg + I)'"
                :disabled="preview"
                icon="mdi-format-italic"
                @click.prevent="wrapTextInMarkdown('_')"
              />
            </v-btn-group>
            <v-btn-toggle
              variant="outlined"
              :disabled="preview"
              density="comfortable"
              class="mr-4"
              divided
            >
              <v-btn
                v-tooltip:top="'Ungeordnete Liste (Strg + U) (Strg + Enter für eingerückte Liste)'"
                icon="mdi-format-list-bulleted"
              />
              <v-btn
                v-tooltip:top="'Geordnete Liste (Strg + O) (Strg + Enter für eingerückte Liste)'"
                icon="mdi-format-list-numbered"
              />
            </v-btn-toggle>
            <v-btn-group
              variant="outlined"
              :disabled="preview"
              density="comfortable"
              divided
              class="mr-4"
            >
              <v-btn
                v-tooltip:top="'Link einfügen (Strg + L)'"
                :disabled="preview"
                icon="mdi-link"
              />
              <v-btn
                v-tooltip:top="'Trennlinie einfügen (Strg + D)'"
                :disabled="preview"
                icon="mdi-minus"
                @click="insertDivider"
              />
              <v-btn
                v-tooltip:top="'Tabelle einfügen (Strg + T)'"
                :disabled="preview"
                icon="mdi-table"
                @click="insertTable"
              />
            </v-btn-group>
            <v-spacer />
            <v-btn-group
              variant="outlined"
              density="comfortable"
              divided
            >
              <v-btn
                v-tooltip:top="preview ? 'bearbeiten' : 'Vorschau'"
                :icon="preview ? 'mdi-pencil' : 'mdi-eye'"
                @click="preview = !preview"
              />
            </v-btn-group>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-if="!preview"
            ref="mdTextarea"
            v-model="content"
            label="Inhalt"
            :disabled="preview"
            rows="10"
            class="mt-4"
            @blur.prevent
            @keydown.ctrl="applyMdOnKeydown"
          />
          <v-sheet
            v-else
            class="mt-4 py-2 px-4 border-thin overflow-y-auto markdown-preview"
            height="320px"
            rounded
            v-html="parsedContent"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import markdownit from 'markdown-it';

const mdTextarea = ref();

const preview = ref(false);
const content = ref('');
const parsedContent = computed(() => {
  const md = markdownit();
  const parsed = md.render(content.value);
  return `${parsed}`;
});
const currentHeading = ref('#');

function applyMdOnKeydown(event: KeyboardEvent) {
  switch (event.key.toLowerCase()) {
    case 'b':
      event.preventDefault();
      wrapTextInMarkdown('**');
      break;
    case 'i':
      event.preventDefault();
      wrapTextInMarkdown('_');
      break;
    case 'l':
      event.preventDefault();
      insertLink();
      break;
    case 'u':
      event.preventDefault();
      insertUnorderedList();
      break;
    case 'o':
      event.preventDefault();
      insertOrderedList();
      break;
    case 'enter':
      event.preventDefault();
      insertIndentedList();
      break;
    case 'h':
      event.preventDefault();
      addHeadingToBottom(currentHeading.value);
      break;
    case 'd':
      event.preventDefault();
      insertDivider();
      break;
    case 't':
      event.preventDefault();
      insertTable();
      break;
  }
}

function insertTable() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const wrappedText = `| Spalte 1 | Spalte 2 |\n| --- | --- |\n| Zelle 1 | Zelle 2 |`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function insertDivider() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const wrappedText = `\n***\n`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function getListType() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const startOfLine = content.value.lastIndexOf('\n', start - 1) + 1;
  let endOfLine = content.value.indexOf('\n', end);
  if (endOfLine === -1) {
    endOfLine = content.value.length;
  }
  const currentLine = content.value.substring(startOfLine, endOfLine);
  const startsWithDashRegex = /^(\s*-\s)/;
  return startsWithDashRegex.test(currentLine) ? 'unordered' : 'ordered';
}

function insertIndentedList() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const selectedText = content.value.substring(start, end);
  const listType = getListType();
  const wrappedText = `\n  ${listType === 'ordered' ? '1.1' : '-'} ${selectedText}`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function insertOrderedList() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const selectedText = content.value.substring(start, end);
  const wrappedText = `\n1. ${selectedText}`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function insertUnorderedList() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const selectedText = content.value.substring(start, end);
  const wrappedText = `\n- ${selectedText}`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function insertLink() {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const selectedText = content.value.substring(start, end);
  const wrappedText = `[${selectedText}](url)`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + wrappedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function addHeadingToBottom(heading: string) {
  if (content.value === '') {
    content.value = `${heading} `;
  }
  else {
    content.value += `\n${heading} `;
  }
  mdTextarea.value.focus();
}

function wrapTextInMarkdown(markdown: string) {
  const start = mdTextarea.value.selectionStart;
  const end = mdTextarea.value.selectionEnd;
  const selectedText = content.value.substring(start, end);
  const wrappedText = `${markdown}${selectedText}${markdown}`;
  content.value = `${content.value.substring(0, start)}${wrappedText}${content.value.substring(end)}`;
  // Set new cursor position
  const newCursorPos = start + markdown.length + selectedText.length;

  // Use nextTick to ensure the textarea has been updated
  nextTick(() => {
    mdTextarea.value.focus();
    mdTextarea.value.setSelectionRange(newCursorPos, newCursorPos);
  });
}

const headingOptions = [
  { title: 'Titel', value: '#' },
  { title: 'Kapitel', value: '##' },
  { title: 'Unterkapitel', value: '###' },
  { title: 'Abschnitt', value: '####' },
  { title: 'Unterabschnitt', value: '#####' },
  { title: 'Unterunterabschnitt', value: '######' },
];
</script>

<style scoped>
.markdown-preview :deep(ul) {
  list-style-position: inside;
}

.markdown-preview :deep(ol) {
  list-style-position: inside;
}

.markdown-preview :deep(li) {
  margin-left: 16px;
}

.markdown-preview :deep(h1) {
  margin-top: 24px;
}

.markdown-preview :deep(h2) {
  margin-top: 16px;
}

.markdown-preview :deep(h3) {
  margin-top: 12px;
}

.markdown-preview :deep(h4) {
  margin-top: 8px;
}

.markdown-preview :deep(h5) {
  margin-top: 4px;
}

.markdown-preview :deep(table) {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}

.markdown-preview :deep(th),
.markdown-preview :deep(td) {
  border: 1px solid #e0e0e0;
  padding: 8px;
}
</style>
