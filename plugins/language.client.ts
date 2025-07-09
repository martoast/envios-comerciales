// plugins/language.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const { initializeLanguage } = useLanguage()
    
    // Initialize language when the app is mounted
    nuxtApp.hook('app:mounted', () => {
      initializeLanguage()
    })
  })