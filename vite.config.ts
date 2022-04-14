import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import visualizer from 'rollup-plugin-visualizer';
import viteLegacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { wrapperEnv } from './config/utils';

const resolve = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
    const {
        VITE_APP_TITLE,
        VITE_PORT,
        VITE_PUBLIC_PATH,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
        VITE_LEGACY,
        VITE_USE_IMAGEMIN,
        VITE_DROP_CONSOLE,
        VITE_DROP_DEBUG,
    } = wrapperEnv(loadEnv(mode, process.cwd()));
    const isBuild = command === 'build';
    const createVitePlugins = () => {
        // https://github.com/vitejs/awesome-vite#plugins
        // vite-plugin-pages // 自动根据目录生成路由
        // unplugin-vue-components // 组件自动按需导入
        // unplugin-auto-import // 依赖按需自动导入
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
            }),
        ];
        const seeVisualizer = false; // 如果要看打包后的分析
        if (seeVisualizer) {
            plugins.push(
                visualizer({
                    filename: './node_modules/.cache/visualizer/stats.html',
                    open: true,
                    gzipSize: true,
                    brotliSize: true,
                })
            );
        }
        if (isBuild) {
            const compressList = VITE_BUILD_COMPRESS.split(',');
            const deleteOriginFile = VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE;
            if (compressList.includes('gzip')) {
                plugins.push(
                    viteCompression({
                        ext: '.gz',
                        deleteOriginFile,
                    })
                );
            }
            if (compressList.includes('brotli')) {
                plugins.push(
                    viteCompression({
                        ext: '.br',
                        algorithm: 'brotliCompress',
                        deleteOriginFile,
                    })
                );
            }
            if (VITE_LEGACY) {
                plugins.push(viteLegacy());
            }
            if (VITE_USE_IMAGEMIN) {
                plugins.push(
                    viteImagemin({
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
                    })
                );
            }
        }
        return plugins;
    };
    return {
        base: VITE_PUBLIC_PATH,
        root: process.cwd(),
        plugins: createVitePlugins(),
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
            port: VITE_PORT,
            host: true,
        },
    };
};
