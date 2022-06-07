import AutoImport from 'unplugin-auto-import/vite';
import { ComponentResolver } from 'unplugin-vue-components';
import Components from 'unplugin-vue-components/vite';
/* eslint-disable no-unused-vars*/
import {
    AntDesignVueResolver,
    AntDesignVueResolverOptions,
    ArcoResolver,
    ArcoResolverOptions,
    DevResolverOptions,
    DevUiResolver,
    ElementPlusResolver,
    ElementPlusResolverOptions,
    ElementUiResolver,
    ElementUiResolverOptions,
    HeadlessUiResolver,
    HeadlessUiResolverOptions,
    IduxResolver,
    IduxResolverOptions,
    InklineResolver,
    LayuiVueResolver,
    LayuiVueResolverOptions,
    NaiveUiResolver,
    PrimeVueResolver,
    PrimeVueResolverOptions,
    QuasarResolver,
    TDesignResolver,
    TDesignResolverOptions,
    VantResolver,
    VantResolverOptions,
    VarletUIResolver,
    VarletUIResolverOptions,
    VeuiResolver,
    VeuiResolverOptions,
    ViewUiResolver,
    VueUseComponentsResolver,
    Vuetify3Resolver,
    VuetifyResolver,
    getResolved,
} from 'unplugin-vue-components/resolvers';
/* eslint-enable no-unused-vars*/

export const configPluginUnpluginImport = ({ VITE_UNPLUGINS_IMPORTS }: ViteEnv) => {
    const uis = VITE_UNPLUGINS_IMPORTS.split(',');
    const resolversMap: { [key in ViteEnv_VITE_UNPLUGINS_COMPONENTS]?: () => (ComponentResolver | ComponentResolver[])[] } = {
        AntDesign: () => [AntDesignVueResolver()],
        Arco: () => [ArcoResolver()],
        DevUi: () => [DevUiResolver()],
        ElementPlus: () => [ElementPlusResolver()],
        ElementUi: () => [ElementUiResolver()],
        HeadlessUi: () => [HeadlessUiResolver()],
        Idux: () => [IduxResolver()],
        Inkline: () => [InklineResolver()],
        LayuiVue: () => [LayuiVueResolver()],
        NaiveUi: () => [NaiveUiResolver()],
        PrimeVue: () => [PrimeVueResolver()],
        Quasar: () => [QuasarResolver()],
        TDesign: () => [TDesignResolver()],
        Vant: () => [VantResolver()],
        Varlet: () => [VarletUIResolver()],
        Veui: () => [VeuiResolver({})],
        VueUseComponents: () => [VueUseComponentsResolver()],
        Vuetify3: () => [Vuetify3Resolver()],
        Vuetify: () => [VuetifyResolver()],
    };
    const resolvers = uis.reduce((a, b) => a.concat((resolversMap as any)[b]?.() || []), []);
    return [
        AutoImport({
            // https://github.com/antfu/unplugin-auto-import#configuration
            resolvers,
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            // global imports to register
            imports: [
                // presets // 个人建议只对一些比较熟悉的API做自动导入，对于一些不大熟悉的像VueUse这种库，还是使用import更好一些，毕竟编辑器都有提示，不易写错。// eslint:vue-global-api
                'vue',
                'vue-router',
            ],
        }),
        Components({
            // https://github.com/antfu/unplugin-vue-components#configuration
            resolvers,
            dts: true, // 自动生成 `components.d.ts` 文件
            dirs: ['src/components'], // 要搜索组件的目录的相对路径
            extensions: ['vue', 'tsx', 'jsx'], // 组件的有效文件扩展名
            deep: true, // 搜索子目录
            directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
            globalNamespaces: [], // works when `directoryAsNamespace: true`
        }),
    ];
};
