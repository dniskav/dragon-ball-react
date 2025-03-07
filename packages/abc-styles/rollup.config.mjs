import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import swc from '@rollup/plugin-swc'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs' },
    { file: 'dist/index.esm.js', format: 'es' },
  ],
  external: ['react', 'react-dom', 'tslib'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      modules: true,
      extract: false,
      use: ['sass'],
    }),
    copy({
      targets: [{ src: 'src/styles/common.css', dest: 'dist/styles' }], // ✅ Copia el archivo a dist/
    }),
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }),
  ],
}
