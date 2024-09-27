export default {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "jsx-a11y", "import"],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": 2,
    "max-len": [1, 100],
    "max-params": [2, 3],
    'no-console': 'error',
  },
};
