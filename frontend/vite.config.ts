import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_DEV_PORT || 5173)
  const apiBase = env.VITE_API_BASE || '/api'

  const proxy = {
    [apiBase]: {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      // No rewrite needed - Go proxy handles /api prefix
    }
  }

  return {
    plugins: [react()],
    server: {
      port,
      proxy
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 将React相关库拆分为一个单独的chunk
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // Ant Design拆分
            'antd-vendor': ['antd', '@ant-design/icons'],
            // 图表库拆分
            'chart-vendor': ['recharts'],
            // React Query拆分
            'query-vendor': ['@tanstack/react-query'],
            // Axios拆分
            'http-vendor': ['axios'],
          },
        },
      },
      // 提高chunk大小警告阈值
      chunkSizeWarningLimit: 600,
      // 使用esbuild压缩(更快)
      minify: 'esbuild',
    },
  }
})
