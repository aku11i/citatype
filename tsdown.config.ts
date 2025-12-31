import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/ui/client-components/*.ts'],
  outDir: 'public/client-components',
  platform: 'browser',
  format: 'esm',
  target: 'es2022',
})
