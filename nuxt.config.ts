// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['nuxt-vue3-google-signin', '@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
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
