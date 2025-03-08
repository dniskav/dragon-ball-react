import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return {
    base: '/dragon-ball-react/', // 🔥 Necesario para GitHub Pages
    plugins: [react()],
    build: {
      minify: isProduction ? 'terser' : false, // ❌ No minifica en desarrollo, ✅ Usa Terser en producción
      sourcemap: !isProduction, // ✅ Mapa de código solo en desarrollo
      rollupOptions: {
        output: {
          manualChunks: isProduction
            ? undefined // ✅ En producción, se concatenan automáticamente
            : (id) => {
                if (id.includes('node_modules')) {
                  return 'vendor' // ❌ En desarrollo, separa dependencias
                }
              },
        },
      },
    },
    define: {
      __DEV__: !isProduction,
      __PROD__: isProduction,
    },
  }
})
