import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'UniversalDesignSystem',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: false,
      extract: 'index.css'
    }),
    terser(),
    copy({
      targets: [
        { src: 'src/components/button/*.html', dest: 'dist/components/button' }
      ]
    })
  ]
};