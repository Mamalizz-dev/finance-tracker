// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        ['@nuxtjs/google-fonts', {
            families: {
                'Inter': true,
                download: true,
                inject: false
            },
            display: 'swap'
        }]
    ],
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/style.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    }
})