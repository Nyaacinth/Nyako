import { MetaProvider } from "@solidjs/meta"
import { Route, Router } from "@solidjs/router"
import { render } from "solid-js/web"
import { Splash } from "./pages/Splash"

import "@nyaacinth/webview-nativefy.css"
import "@picocss/pico/css/pico.pumpkin.min.css"
import "virtual:uno.css"

render(
    () => (
        <MetaProvider>
            <Router>
                <Route path="/" component={Splash} />
            </Router>
        </MetaProvider>
    ),
    document.getElementById("app")!
)
