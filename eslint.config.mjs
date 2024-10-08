// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
).append({
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    '@stylistic/semi': ['error', 'always'],
    '@typescript-eslint/unified-signatures': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
  },
});
