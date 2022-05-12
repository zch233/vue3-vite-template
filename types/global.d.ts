import type { VNodeChild, PropType as VuePropType } from 'vue';

declare global {
    const __APP_INFO__: {
        pkg: {
            name: string;
            version: string;
            dependencies: Recordable<string>;
            devDependencies: Recordable<string>;
        };
        lastBuildTime: string;
    };

    // vue
    type PropType<T> = VuePropType<T>;
    type VueNode = VNodeChild | JSX.Element;

    export type Writable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    type Nullable<T> = T | null;
    type Recordable<T = any> = Record<string, T>;
    type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
    };
    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
    type TimeoutHandle = ReturnType<typeof setTimeout>;
    type IntervalHandle = ReturnType<typeof setInterval>;

    interface ChangeEvent extends Event {
        target: HTMLInputElement;
    }

    interface WheelEvent {
        path?: EventTarget[];
    }
    interface ImportMetaEnv extends ViteEnv {
        __: unknown;
    }
    type ViteEnv_VITE_UNPLUGINS_COMPONENTS =
        | 'VueUseComponents'
        | 'ElementPlus'
        | 'NaiveUi'
        | 'Vant'
        | 'AntDesign'
        | 'Arco'
        | 'DevUi'
        | 'ElementUi'
        | 'HeadlessUi'
        | 'Idux'
        | 'Inkline'
        | 'LayuiVue'
        | 'PrimeVue'
        | 'Quasar'
        | 'TDesign'
        | 'Varlet'
        | 'Veui'
        | 'Vuetify3'
        | 'Vuetify';
    interface ViteEnv {
        VITE_APP_TITLE: string;
        VITE_APP_TAG: string;
        VITE_APP_API_URL: string;
        VITE_APP_VUEX_PERSISTED_KEY: string;
        VITE_PORT: number;
        VITE_PUBLIC_PATH: string;
        VITE_USE_CDN: boolean;
        VITE_WINDICSS: boolean;
        VITE_SEE_VISUALIZER: boolean;
        VITE_DROP_CONSOLE: boolean;
        VITE_LISTEN_HTTPS: boolean;
        VITE_DROP_DEBUG: boolean;
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
        VITE_LEGACY: boolean;
        VITE_USE_IMAGEMIN: boolean;
        VITE_UNPLUGINS_COMPONENTS: ViteEnv_VITE_UNPLUGINS_COMPONENTS;
        VITE_UNPLUGINS_IMPORTS: boolean;
        VITE_VUE_REACTIVITY_TRANSFORM: boolean;
    }

    function parseInt(s: string | number, radix?: number): number;

    function parseFloat(string: string | number): number;
}
