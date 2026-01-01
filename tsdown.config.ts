import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/ui/client-components/*.ts', 'src/ui/client-components/*.tsx'],
  outDir: 'public/client-components',
  platform: 'browser',
  format: 'esm',
  target: 'es2022',
  tsconfig: './tsconfig.client.json',
  noExternal: [/^hono(\/|$)/, /^typengine(\/|$)/],
})
