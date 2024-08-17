// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ['@nuxt/ui', ['@nuxtjs/google-fonts', {
        families: {
            'Inter': true,
            download: true,
            inject: false
        },
        display: 'swap'
    }], '@nuxtjs/supabase', '@pinia/nuxt', "nuxt-marquee"],

    imports: {
        dirs: ['~/types/*.ts'],
    },

    supabase: {
        redirect: false
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

    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL ?? 'http://localhost:3000'
        }
    },

    compatibilityDate: '2024-07-16'
})