import init, { FormatType, Numbat, setup_panic_hook } from "@nyaacinth/numbat-wasm-precompiled"
import type { Component } from "solid-js"
import { onMount } from "solid-js"

let numbat: Numbat

function create_numbat_instance() {
    return Numbat.new(true, true, FormatType.Html)
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
        numbat.interpret("use units::currencies")
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

function setup(input: HTMLInputElement, div: HTMLDivElement) /* TODO */ {
    input.focus()
    input.value = combined_input
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            div.innerHTML = interpret(input.value) ?? ""
            input.value = ""
        }
    })
}

async function numbatMain(input: HTMLInputElement, div: HTMLDivElement) {
    await init()

    setup_panic_hook()

    numbat = create_numbat_instance()
    combined_input = ""

    setup(input, div)
}

export const NumbatTerminal: Component = () => {
    let container: HTMLDivElement
    let input: HTMLInputElement

    onMount(() => {
        if (input && container) numbatMain(input, container)
    })

    return (
        /* Material Card, Tailwind Classes */
        <div class="w-min m-4 p-4 bg-white rounded-lg shadow border border-gray-3">
            <input
                type="text"
                class="w-96 p-2 m-0 rounded-t-lg border border-b-0.5 border-solid border-gray-3 text-lg"
                placeholder="Enter Command..."
                ref={input!}
            />
            <div
                class="w-96 h-76 overflow-scroll bg-black bg-opacity-3 text-wrap p-2 m-0 rounded-b-lg border border-t-0.5 border-solid border-gray-3 text-lg"
                ref={container!}
            />
        </div>
    )
}
