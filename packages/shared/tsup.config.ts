import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/index.ts'],
  splitting: true,
  clean: true,
  dts: true,
  format: ['esm'],
  platform: 'node',
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  minify: true
}));
