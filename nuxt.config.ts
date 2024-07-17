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
        }],
        "@nuxtjs/supabase"
    ],

    supabase: {
        redirect: false
    },

    imports: {
        dirs: ['~/types/*.ts'],
    },

    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/style.css'
    ],

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    compatibilityDate: '2024-07-16'
})