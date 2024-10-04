module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  plugins: ["@typescript-eslint", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/no-unescaped-entities": "off",
    semi: [2, "always", { omitLastInOneLineBlock: true }],
    "max-lines": ["error", 1000],
    "jsx-quotes": ["error", "prefer-double"],
    "react/jsx-newline": ["error"],
    "lines-between-class-members": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "object-shorthand": ["error", "always"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      { blankLine: "always", prev: ["if"], next: "*" },
      { blankLine: "always", prev: ["*"], next: "if" },
    ],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
};
