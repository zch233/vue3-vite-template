import Components from 'unplugin-vue-components/vite';
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
import { ComponentResolver } from 'unplugin-vue-components';

export const configPluginUnpluginComponents = ({ VITE_UNPLUGINS_COMPONENTS }: ViteEnv) => {
    const uis = VITE_UNPLUGINS_COMPONENTS.split(',')
    const resolversMap:{[key in ViteEnv_VITE_UNPLUGINS_COMPONENTS]?: () => (ComponentResolver | ComponentResolver[])[]} = {
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
    }
    return Components({
        // https://github.com/antfu/unplugin-vue-components#configuration
        dts: true, // 自动生成 `components.d.ts` 文件
        dirs: ['src/components'], // 要搜索组件的目录的相对路径
        extensions: ['vue', 'tsx', 'jsx'], // 组件的有效文件扩展名
        deep: true, // 搜索子目录
        directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
        globalNamespaces: [], // works when `directoryAsNamespace: true`
        // @ts-ignore
        resolvers: uis.reduce((a,b) => a.concat(resolversMap[b]?.() || []), []),
    });
};
