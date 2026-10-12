import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5263/swagger/v1/swagger.json'
    },
    output: {
      mode: 'tags-split', // tags-split ele em especifico, separa os endpoints por tags
      target: './src/api/generated/hooks', // Onde vão os hooks
      schemas: './src/api/generated/interfaces',   // Onde vão as interfaces
      client: 'fetch',
      clean: true, // remove arquivos antigos ao regerar
      indexFiles:true,
      

      override: {
        mutator: {
          path: './src/api/custom-fetch.ts', 
          name: 'customFetch',                 
        },
      },
    },
  },
});