import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4200/graphql",
  documents: [
    "src/shared/api/**/*.{graphql,ts,tsx}",
    "src/features/**/*.{graphql,ts,tsx}",
  ],
  ignoreNoDocuments: true,
  generates: {
    "./src/shared/api/__generated__/": {
      preset: "client",
    },
  },
};

export default config;
