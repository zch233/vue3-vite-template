import VitePluginCertificate from 'vite-plugin-mkcert';

export const configPluginCertificate = () =>
    VitePluginCertificate({
        source: 'coding',
    });
