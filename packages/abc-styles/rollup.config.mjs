import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import swc from '@rollup/plugin-swc';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs' },
    { file: 'dist/index.esm.js', format: 'es' }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      modules: true, // Activa CSS Modules
      extract: false, // No genera archivos CSS separados
      use: ['sass'], // Opcional: Para usar Sass
    }),
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true
        },
        transform: {
          react: {
            runtime: "automatic"
          }
        }
      }
    })
  ]
};