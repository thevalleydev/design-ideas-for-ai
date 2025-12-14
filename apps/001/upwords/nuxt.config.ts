// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  
  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'warning', 'error'],
      transitions: true
    }
  },

  app: {
    head: {
      title: 'Upwords',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'A word chain puzzle game' }
      ]
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-12-13'
})
