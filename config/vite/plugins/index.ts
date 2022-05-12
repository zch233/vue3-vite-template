import { configPluginVue } from './pluginVue';
import { configPluginVueJsx } from './pluginVueJsx';
import { ConfigEnv } from 'vite';
import { configPluginHtml } from './vitePluginHtml';
import { configSvgIconsPlugin } from './vitePluginSvgIcons';
import { configPluginLegacy } from './vitePluginLegacy';
import { configPluginImagemin } from './vitePluginImagemin';
import { configPluginVisualizer } from './rollupPluginVisualizer';
import { configPluginCompression } from './vitePluginCompression';
import { configPluginWindicss } from './vitePluginWindicss';
import { configPluginCertificate } from './vitePluginMkcert';
import { configPluginUnpluginComponents } from './unpluginVueComponents';
import { configPluginUnpluginImport } from './unpluginAutoImport';
import { configPluginVueSetupExtend } from './vitePluginVueSetupExtend';

export const createVitePlugins = ({ mode, command }: ConfigEnv, viteEnv: ViteEnv) => {
    const isBuild = command === 'build';
    const { VITE_WINDICSS, VITE_SEE_VISUALIZER, VITE_LEGACY, VITE_USE_IMAGEMIN, VITE_LISTEN_HTTPS, VITE_UNPLUGINS_COMPONENTS, VITE_UNPLUGINS_IMPORTS } =
        viteEnv;
    // https://github.com/vitejs/awesome-vite#plugins
    // vite-plugin-pages // 自动根据目录生成路由
    const plugins = [
        configPluginVue(viteEnv),
        configPluginVueJsx(),
        configPluginVueSetupExtend(), // 支持在 setup 上使用组件 name
        configPluginHtml(isBuild, viteEnv),
        configSvgIconsPlugin(isBuild),
    ];

    if (VITE_UNPLUGINS_COMPONENTS) plugins.push(configPluginUnpluginComponents(viteEnv));

    if (VITE_UNPLUGINS_IMPORTS) plugins.push(configPluginUnpluginImport());

    if (VITE_LISTEN_HTTPS) plugins.push(configPluginCertificate());

    if (VITE_WINDICSS) plugins.push(configPluginWindicss());

    if (VITE_SEE_VISUALIZER) plugins.push(configPluginVisualizer());

    if (isBuild) {
        plugins.push(configPluginCompression(viteEnv));
        if (VITE_LEGACY) plugins.push(configPluginLegacy());
        if (VITE_USE_IMAGEMIN) plugins.push(configPluginImagemin());
    }
    return plugins;
};
