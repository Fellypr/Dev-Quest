import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5263/swagger/v1/swagger.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated/hooks',
      schemas: './src/api/generated/interfaces',
      client: 'react-query',
      clean: true,
      indexFiles: true,
      override: {
        header: () => ['"use client";\n'],
        mutator: {
          path: './src/api/custom-fetch.ts',
          name: 'customFetch',
        },
        query: {
          version: 5,
          useMutation: true,
          shouldExportQueryKey: true,
        },
      },
    },
  },
});
