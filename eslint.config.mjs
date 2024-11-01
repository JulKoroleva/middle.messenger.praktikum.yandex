import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    ignores: [
      "eslint.config.js",
      "stylelint.config.js",
      "loader-css.js",
      "mochaSetup.js",
    ],
    globals: {
      ...globals.browser, 
      describe: "readonly",
      it: "readonly",
      beforeEach: "readonly",
      afterEach: "readonly",
      global: "readonly",
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "error",
      "max-len": ["warn", 100],
      "max-params": ["error", 3],
      "no-console": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
