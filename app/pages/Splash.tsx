import type { Component } from "solid-js"
import { NumbatTerminal } from "../components/NumbatTerminal"

export const Splash: Component = () => {
    return (
        <div
            data-tauri-drag-region
            class="w-full bg-gradient-to-b from-bluegray-3 to-bluegray-4 h-full flex justify-center items-center"
        >
            <NumbatTerminal />
        </div>
    )
}
