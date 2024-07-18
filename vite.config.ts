import uno from "@unocss/vite"
import vue from "@vitejs/plugin-vue"
import autoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        vue(),
        autoImport({ imports: ["vue"], vueTemplate: true, dts: "types/auto-imports.d.ts" }),
        uno({ mode: "vue-scoped" })
    ]
})
