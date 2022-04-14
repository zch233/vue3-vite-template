import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import path from 'path';
import { wrapperEnv } from './config/utils';
import { createVitePlugins } from './config/vite/plugins';

const resolve = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
    const viteEnv = wrapperEnv(loadEnv(configEnv.mode, process.cwd()));
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_DROP_DEBUG, VITE_LISTEN_HTTPS } = viteEnv;
    return {
        base: VITE_PUBLIC_PATH,
        root: process.cwd(),
        plugins: createVitePlugins(configEnv, viteEnv),
        resolve: {
            alias: {
                '@src': resolve('./src'),
            },
        },
        esbuild: {
            pure: [VITE_DROP_CONSOLE && 'console.log', VITE_DROP_DEBUG && 'debugger'].filter(Boolean) as string[],
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            // 关掉 brotliSize 可略微减少打包时间
            // brotliSize: false,
            chunkSizeWarningLimit: 2000,
            // minify: 'terser',
            // 当 minify=“minify:'terser'” 解开注释
            // terserOptions: {
            //   compress: {
            //     keep_infinity: true,
            //     drop_debugger: VITE_DROP_DEBUG,
            //     drop_console: VITE_DROP_CONSOLE,
            //   },
            // },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: [],
                output: {
                    manualChunks: {},
                },
                // https://rollupjs.org/guide/en/#big-list-of-options
            },
        },
        server: {
            https: VITE_LISTEN_HTTPS,
            port: VITE_PORT,
            host: true,
        },
    };
};
