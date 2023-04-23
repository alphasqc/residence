import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 设置路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@style': resolve(__dirname, './src/style'),
      '@views': resolve(__dirname, './src/views'),
      '@asstes': resolve(__dirname, './src/asstes'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/index.css";'
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: true,
    // 代理端口
    port: 3000,
    // 自动打开浏览器
    open: true,
    proxy: {
      "/api": {
        // 目标地址
        target: "http://127.0.0.1:3001",
        // 允许跨域
        changeOrigin: true,
        // 开启websockets代理
        ws: true,
        // 验证ssl证书
        secure: false,
        // pathRewrite: {
        //   '^/api': '/', // rewrite path
        // },
        // 重写path路径
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
