// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  imports: {
    dirs: [
      'interfaces',
    ],
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
