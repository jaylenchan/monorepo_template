import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/main.ts'],
  splitting: true,
  clean: false,
  dts: true,
  format: ['cjs'],
  platform: 'node',
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  minify: false,
  external: ['electron'],
  noExternal: [/@jeditor\/*/]
}));
