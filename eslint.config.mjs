import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: ['.next/**/*.*'],
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLine: true,
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'es5',
          semi: true,
          jsxSingleQuote: false,
          printWidth: 100,
          tabWidth: 2,
          endOfLine: 'auto',
        },
        {
          usePrettierrc: true,
        },
      ],
    },
  }),
];

export default eslintConfig;
