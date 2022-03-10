import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import visualizer from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default ({mode, command}: ConfigEnv):UserConfig => {
  const {VITE_APP_TITLE, VITE_APP_API_URL,VITE_APP_API_URL_PROXY} = loadEnv(mode, process.cwd())
  const isBuild = command === 'build';
  const createVitePlugins = () => {
    // https://github.com/vitejs/awesome-vite#plugins
    // @vitejs/plugin-legacy
    // vite-plugin-pages
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
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve('src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild,
      })
    ]
    const seeVisualizer = false // 如果要看打包后的分析
    if (seeVisualizer) {
      plugins.push(visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }))
    }
    if (isBuild) {
      plugins.push(viteCompression())
      const isSupportBrotli = false // 如果服务器支持 brotli 压缩可以开启，改方式相比 gzip 体积更小
      isSupportBrotli && plugins.push(
        viteCompression({
          ext: '.br',
          algorithm: 'brotliCompress',
        }),
      );
      plugins.push(viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }))
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
      port: 11225,
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
