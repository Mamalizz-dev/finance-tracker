const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, addUtilities, theme }) {
            addUtilities({
                ".flex-center": {
                    display: 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                },
                ".flex-col-center": {
                    display: 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'align-items': 'center'
                },
            })
        })
    ],
}