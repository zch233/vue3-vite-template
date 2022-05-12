import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const resolve = (dir: string) => path.resolve(process.cwd(), dir);

export const configSvgIconsPlugin = (isBuild: boolean) =>
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve('src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild,
    });
