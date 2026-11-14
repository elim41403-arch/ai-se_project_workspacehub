const tseslint = require("typescript-eslint");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh").default;

const clientFiles = ["client/src/**/*.{ts,tsx}"];
const serverFiles = ["server/src/**/*.ts"];

module.exports = [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: clientFiles,
  })),
  {
    files: clientFiles,
    languageOptions: {
      parserOptions: {
        project: "./client/tsconfig.app.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: serverFiles,
  })),
  {
    files: serverFiles,
    languageOptions: {
      parserOptions: {
        project: "./server/tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: [...clientFiles, ...serverFiles],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: clientFiles,
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  require("eslint-config-prettier"),
];
