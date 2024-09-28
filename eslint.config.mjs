
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
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "prettier": prettierPlugin,
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
