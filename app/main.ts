import { createApp } from "vue"
import MainApp from "./MainApp.vue"
import router from "./router"

createApp(MainApp).use(router).mount("#root")
