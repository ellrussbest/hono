import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'app',
    typescript: true,
    formatters: true,
  },
  {
    rules: {
      'ts/no-redeclare': 'off',
      'style/semi': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],

      'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],

      'unicorn/filename-case': [
        'error',
        { case: 'kebabCase', ignore: ['README.md'] },
      ],
    },
  },

  {
    files: ['**/*.{ts,tsx,js,jsx,mts,cts}'],
    rules: {
      'ts/naming-convention': [
        'error',

        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
    },
  },
);
