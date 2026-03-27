import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4200/graphql",
  // This assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: [
    "src/shared/api/**/*.{graphql,ts,tsx}",
    "src/features/**/*.{graphql,ts,tsx}",
  ],

  // Don't exit with non-zero status when there are no documents
  ignoreNoDocuments: true,
  generates: {
    // Use a path that works the best for the structure of your application
    "./src/shared/api/__generated__/": {
      preset: "client-preset",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        avoidOptionals: {
          // Use `null` for nullable fields instead of optionals
          field: true,
          // Allow nullable input fields to remain unspecified
          inputValue: false,
        },
        // Use `unknown` instead of `any` for unconfigured scalars
        defaultScalarType: "unknown",
        // Apollo Client always includes `__typename` fields
        nonOptionalTypename: true,
        // Apollo Client doesn't add the `__typename` field to root types so
        // don't generate a type for the `__typename` for root operation types.
        skipTypeNameForRoot: true,
        enumsAsConst: true,
      },
    },
  },
};

export default config;
