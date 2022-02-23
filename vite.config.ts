import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

const resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default ({mode, command}: ConfigEnv):UserConfig => {
  const {VITE_APP_TITLE} = loadEnv(mode, process.cwd())
  const isBuild = command === 'build';
  return {
    plugins: [
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
      })
    ],
    resolve: {
      alias: {
        "@src": resolve('./src'),
      }
    }
  }
}
