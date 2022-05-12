import AutoImport from 'unplugin-auto-import/vite'

export const configPluginUnpluginImport = () => AutoImport({
    include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
    ],
    // global imports to register
    imports: [
        // presets // 个人建议只对一些比较熟悉的API做自动导入，对于一些不大熟悉的像VueUse这种库，还是使用import更好一些，毕竟编辑器都有提示，不易写错。// eslint:vue-global-api
        'vue',
        'vue-router',
    ]
})
