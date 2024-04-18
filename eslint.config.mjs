import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

import path from 'path';
import pluginJs from '@eslint/js';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Menirukan Variabel dari commonJS -- tidak perlu menggunakan CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  pluginReactConfig,
  ...tseslint.configs.recommended,
  ...compat.extends('standard-with-typescript'),
  { languageOptions: { globals: globals.browser } },
];
