import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';

const resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default ({mode}: ConfigEnv):UserConfig => {
  const env = loadEnv(mode, process.cwd())
  console.log(env);
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@src": resolve('./src'),
      }
    }
  }
}
