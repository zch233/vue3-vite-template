/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_TAG: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_VUEX_PERSISTED_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
