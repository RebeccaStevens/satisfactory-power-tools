const project = [
  "./tsconfig.json",
  "./tsconfig.node.json",
  "./tests/tsconfig.json",
];

module.exports = {
  root: true,
  extends: [
    "@rebeccastevens/eslint-config/modern",
    "@rebeccastevens/eslint-config/typescript",
    "@rebeccastevens/eslint-config/common-overrides",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project,
    extraFileExtensions: [".vue"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "/coverage/",
    "/dist/",
    "/images/**/index.ts",
    "/public/",
    "/src/auto-imports.d.ts",
    "/src/components.d.ts",
  ],
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "Footer"],
      },
    ],
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-method-this-argument": "off",
    "import/default": "off",
    "import/no-relative-parent-imports": "off",
    "import/no-unassigned-import": "off",
    "functional/prefer-immutable-types": [
      "warn",
      {
        enforcement: "None",
        ignoreInferredTypes: true,
        parameters: {
          enforcement: "ReadonlyShallow",
        },
        ignoreNamePattern: ["^m_"],
      },
    ],
    "jsdoc/require-jsdoc": "off",
    "unicorn/no-empty-file": "warn",
  },
  overrides: [
    {
      files: ["typings/**", "src/shims.d.ts"],
      extends: ["plugin:functional/off"],
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "jsdoc/require-jsdoc": "off",
        "node/no-extraneous-import": "off",
      },
    },
    {
      files: ["src/**"],
      rules: {
        "node/prefer-global/console": "off",
        "unicorn/prefer-node-protocol": "off",
      },
    },
    {
      files: ["src/main.ts", "src/**/modules/**"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["src/**/layouts/**/*.vue", "src/pages/**/*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
    {
      files: ["src/**/raw/**/*.ts"],
      rules: {
        "import/no-duplicates": "off",
      },
    },
    {
      files: ["**/*.vue", "**/*.tests.ts"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
    {
      files: "scripts/**/*",
      rules: {
        "no-await-in-loop": "off",
      },
    },
    {
      files: "scripts/parse-raw-game-data/**/*",
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "sonarjs/no-identical-functions": "warn",
      },
    },
    {
      files: "raw-collection-parser.ts",
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
      },
    },
    {
      files: ["*.md/**"],
      extends: ["plugin:markdown/recommended"],
    },
    {
      files: ["*.?(m|c)js", "*.md/**"],
      parserOptions: {
        project: null,
      },
      extends: ["plugin:functional/off"],
      rules: {
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "off",
        "@typescript-eslint/no-implied-eval": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/prefer-includes": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/prefer-readonly": "off",
        "@typescript-eslint/prefer-regexp-exec": "off",
        "@typescript-eslint/prefer-string-starts-ends-with": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/switch-exhaustiveness-check": "off",
        "@typescript-eslint/unbound-method": "off",
        "import/no-unresolved": "off",
        "init-declarations": "off",
        "jsdoc/require-jsdoc": "off",
        "no-console": "off",
        "no-empty": "off",
        "no-invalid-this": "off",
        "no-undef": "off",
        "no-useless-return": "off",
        "node/handle-callback-err": "off",
        "prefer-const": "off",
        "prettier/prettier": "off",
        "sonarjs/no-extra-arguments": "off",
        "sonarjs/no-unused-collection": "off",
        "unicorn/prefer-optional-catch-binding": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/switch-case-braces": "off",

        "dot-notation": "error",
        "no-implied-eval": "error",
        "require-await": "error",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "vue-eslint-parser": [".vue"],
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".ts"],
      },
      typescript: {
        project,
      },
    },
    immutability: {
      overrides: [
        {
          name: "Readonly",
          to: "ReadonlyShallow",
          from: "Mutable",
        },
      ],
    },
  },
};
