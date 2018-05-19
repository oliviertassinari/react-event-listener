import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

const external = id => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [babel({ runtimeHelpers: true })],
  },

  {
    input,
    output: { file: pkg.module, format: 'es', exports: 'named' },
    external,
    plugins: [babel({ runtimeHelpers: true }), sizeSnapshot()],
  },
];
