import { createHtmlPlugin } from 'vite-plugin-html';

export const configPluginHtml = (isBuild: boolean, { VITE_APP_TITLE }: ViteEnv) =>
    createHtmlPlugin({
        minify: isBuild,
        inject: {
            // Inject data into ejs template
            data: {
                title: VITE_APP_TITLE,
            },
        },
    });
