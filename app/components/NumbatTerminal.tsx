import init, { FormatType, Numbat, setup_panic_hook } from "@nyaacinth/numbat-wasm-precompiled"
import numbatWasmUrl from "@nyaacinth/numbat-wasm-precompiled/numbat_wasm_bg.wasm?url"
import jQuery from "jquery"
import initTerminal from "jquery.terminal"
import "jquery.terminal/css/jquery.terminal.min.css"

initTerminal(window, jQuery)

import type { Component } from "solid-js"
import { onMount } from "solid-js"

let numbat: Numbat

function create_numbat_instance() {
    return Numbat.new(true, true, FormatType.JqueryTerminal)
}

let combined_input = ""
function interpret(input: string) {
    // Skip empty lines or comments
    let input_trimmed = input.trim()
    if (input_trimmed === "" || (input_trimmed[0] === "#" && input_trimmed.indexOf("\n") == -1)) {
        return
    }

    let output = ""
    if (input_trimmed == "clear") {
        output = ""
    } else if (input_trimmed == "reset") {
        numbat = create_numbat_instance()
        combined_input = ""
    } else if (input_trimmed == "list" || input_trimmed == "ls") {
        output = numbat.print_environment()
    } else if (input_trimmed == "list functions" || input_trimmed == "ls functions") {
        output = numbat.print_functions()
    } else if (input_trimmed == "list dimensions" || input_trimmed == "ls dimensions") {
        output = numbat.print_dimensions()
    } else if (input_trimmed == "list variables" || input_trimmed == "ls variables") {
        output = numbat.print_variables()
    } else if (input_trimmed == "list units" || input_trimmed == "ls units") {
        output = numbat.print_units()
    } else if (input_trimmed == "help" || input_trimmed == "?") {
        output = numbat.help()
    } else {
        var result = { is_error: false }
        if (input_trimmed.startsWith("info ")) {
            var keyword = input_trimmed.substring(4).trim()
            output = numbat.print_info(keyword)
        } else {
            result = numbat.interpret(input)
            output = (result as any).output
        }

        if (!result.is_error) {
            combined_input += input.trim() + "⏎"
        }
    }

    return output
}

function setup(div: HTMLDivElement) /* TODO */ {
    jQuery(($) => {
        $(div).terminal(interpret, {
            greetings: "",
            name: "terminal",
            prompt: "[[;;;prompt]>>> ]",
            checkArity: false,
            historySize: 200,
            historyFilter(line) {
                return line.trim() !== ""
            },
            completion(inp, cb) {
                cb(numbat.get_completions_for(inp))
            }
        })
    })
}

async function numbatMain(div: HTMLDivElement) {
    await init(numbatWasmUrl)

    setup_panic_hook()

    numbat = create_numbat_instance()
    combined_input = ""

    setup(div)
}

export const NumbatTerminal: Component = () => {
    let container: HTMLDivElement

    onMount(() => {
        if (!container) return
        numbatMain(container)
    })

    return <div class="terminal w-full h-full" ref={container!} />
}
