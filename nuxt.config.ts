// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    'nuxt-vue3-google-signin',
    'nuxt-mongoose',
    '@nuxt/eslint',
  ],
  runtimeConfig: {
    public: {
      googleClientId: '573857706739-1b2du7fb2grdveig2pigjh3abhdeg6op.apps.googleusercontent.com',
    },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
  },
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/manage-your-assets',
    options: {},
    modelsDir: 'server/models/',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
