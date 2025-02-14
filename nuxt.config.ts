// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: '573857706739-1b2du7fb2grdveig2pigjh3abhdeg6op.apps.googleusercontent.com',
  }
})