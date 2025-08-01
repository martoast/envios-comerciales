// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Envios Comerciales TJ - Compra en cualquier parte del mundo y recibe en México',
      meta: [
        // Essential SEO tags
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=1'
        },
        { 
          name: 'description', 
          content: 'Compra en cualquier parte del mundo y recibe en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.'
        },
        // Open Graph / Facebook
        { 
          property: 'og:type', 
          content: 'website'
        },
        { 
          property: 'og:url', 
          content: 'https://envioscomercialestj.com/'
        },
        { 
          property: 'og:title', 
          content: 'Envios Comerciales TJ - Compra en cualquier tienda del mundo y recíbelo en México'
        },
        { 
          property: 'og:description', 
          content: 'Compra en cualquier tienda del mundo y recíbelo en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.'
        },
        { 
          property: 'og:image', 
          content: 'https://envioscomercialestj.com/logo.jpeg'
        },
        { 
          property: 'og:image:width', 
          content: '1200'
        },
        { 
          property: 'og:image:height', 
          content: '630'
        },
        // Twitter
        { 
          name: 'twitter:card', 
          content: 'summary_large_image'
        },
        { 
          name: 'twitter:title', 
          content: 'Envios Comerciales TJ - Compra en cualquier tienda del mundo y recíbelo en México'
        },
        { 
          name: 'twitter:description', 
          content: 'Compra en cualquier tienda del mundo y recíbelo en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.'
        },
        { 
          name: 'twitter:image', 
          content: 'https://envioscomercialestj.com/logo.jpeg'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      cookieDomain: process.env.COOKIE_DOMAIN,
    }
  }
})