import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import solidPlugin from "eslint-plugin-solid"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ["app/**/*.{ts,tsx}"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            ["@typescript-eslint"]: typescriptPlugin,
            ["solid"]: solidPlugin
        },
        rules: {
            "@typescript-eslint/adjacent-overload-signatures": "warn",
            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/no-extra-non-null-assertion": "warn",
            "@typescript-eslint/no-inferrable-types": "warn",
            "@typescript-eslint/no-loss-of-precision": "warn",
            "@typescript-eslint/no-misused-new": "warn",
            "@typescript-eslint/no-this-alias": "warn",
            "@typescript-eslint/prefer-as-const": "warn",
            "@typescript-eslint/prefer-namespace-keyword": "warn",
            "@typescript-eslint/ban-types": "warn",
            "solid/components-return-once": "warn",
            "solid/event-handlers": "warn",
            "solid/imports": "warn",
            "solid/jsx-no-script-url": "warn",
            "solid/no-destructure": "warn",
            "solid/no-innerhtml": "warn",
            "solid/no-react-deps": "warn",
            "solid/no-react-specific-props": "warn",
            "solid/prefer-for": "warn",
            "solid/prefer-show": "warn",
            "solid/reactivity": "warn",
            "solid/self-closing-comp": "warn",
            "solid/style-prop": "warn"
        }
    }
]
