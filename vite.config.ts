import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteRestart from 'vite-plugin-restart'
import viteCompression from 'vite-plugin-compression';

const resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default ({mode, command}: ConfigEnv):UserConfig => {
  const {VITE_APP_TITLE, VITE_APP_API_URL,VITE_APP_API_URL_PROXY} = loadEnv(mode, process.cwd())
  const isBuild = command === 'build';
  const createVitePlugins = () => {
    const plugins = [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          // Inject data into ejs template
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
      viteRestart({
        restart: [
          '*.config.[jt]s',
          '**/config/*.[jt]s'
        ]
      }),
    ]
    if (isBuild) {
      plugins.push(viteCompression())
      const isSupportBrotli = false // 如果服务器支持 brotli 压缩可以开启，改方式相比 gzip 体积更小
      isSupportBrotli && plugins.push(
        viteCompression({
          ext: '.br',
          algorithm: 'brotliCompress',
        }),
      );
    }
    return plugins
  }
  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        "@src": resolve('./src'),
      }
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: isBuild,
        },
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [],
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
    },
    server: {
      port: 11224,
      host: true,
      proxy: {
        [VITE_APP_API_URL]: {
          target: VITE_APP_API_URL_PROXY,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_APP_API_URL}`), ''),
        },
      },
    },
  }
}
