<!-- components/Landing/Expats/HeroSection.vue -->
<template>
    <header class="min-h-[85vh] flex items-center text-center py-[100px] px-5 bg-gradient-to-br from-primary-50 to-white">
      <div class="max-w-[1000px] mx-auto animate-fadeIn">
        <div class="mb-4">
          <span class="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
            {{ t.expatBadge }}
          </span>
        </div>
        
        <h1 class="text-[2.5rem] md:text-[3rem] lg:text-[4.5rem] font-extrabold text-gray-900 leading-tight mb-6">
          <span v-html="t.expatHeroTitle"></span>
        </h1>
        
        <p class="text-[1.3rem] md:text-[1.5rem] max-w-[800px] mx-auto mb-[15px] text-gray-800 font-medium">
          {{ t.expatHeroSubtitle }}
        </p>
        
        <p class="text-[1.1rem] md:text-[1.2rem] max-w-[700px] mx-auto mb-[40px] text-gray-600">
          {{ t.expatHeroDescription }}
        </p>
        
        <div class="flex justify-center gap-[15px] flex-wrap mb-[30px]">
          <NuxtLink
            :to="registerLink"
            class="px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 font-bold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl hover:bg-primary-600"
          >
            {{ t.expatCTA }}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
        
       
      </div>
    </header>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    expatBadge: {
      es: 'SOLUCIÓN PARA EXPATRIADOS',
      en: 'SOLUTION FOR EXPATS'
    },
    expatHeroTitle: {
      es: 'Compra en tus <span class="text-primary-500">tiendas favoritas</span> y recibe en México',
      en: 'Shop from your <span class="text-primary-500">favorite stores</span> and receive in Mexico'
    },
    expatHeroSubtitle: {
      es: 'Amazon, Walmart, Target, Best Buy y miles de tiendas más ahora envían a tu puerta en México',
      en: 'Amazon, Walmart, Target, Best Buy and thousands more now ship to your door in Mexico'
    },
    expatHeroDescription: {
      es: 'Te damos una dirección personal en USA. Compra como si vivieras allá y nosotros nos encargamos de traértelo a México de forma rápida y segura.',
      en: 'We give you a personal US address. Shop like you live there and we\'ll bring it to Mexico quickly and safely.'
    },
    expatCTA: {
        es: 'Empieza a Recibir en México',
        en: 'Start Shipping to Mexico'
    },
    trustPoint1: {
      es: 'Sin membresías ni cuotas ocultas',
      en: 'No memberships or hidden fees'
    },
    trustPoint2: {
      es: 'Atención bilingüe 24/7',
      en: 'Bilingual support 24/7'
    },
    trustPoint3: {
      es: 'Entrega en 3-5 días',
      en: 'Delivery in 3-5 days'
    }
  }
  
  const t = createTranslations(translations)
  
  // Get current route to preserve existing UTM parameters
  const route = useRoute()
  
  // Create register link preserving UTM parameters and adding our tracking
  const registerLink = computed(() => {
    const params = new URLSearchParams()
    
    // Preserve existing UTM parameters from the current URL
    if (route.query.utm_source) params.set('utm_source', route.query.utm_source)
    if (route.query.utm_medium) params.set('utm_medium', route.query.utm_medium)
    if (route.query.utm_campaign) params.set('utm_campaign', route.query.utm_campaign)
    if (route.query.utm_term) params.set('utm_term', route.query.utm_term)
    if (route.query.utm_content) params.set('utm_content', route.query.utm_content)
    
    // Preserve any other tracking parameters
    if (route.query.fbclid) params.set('fbclid', route.query.fbclid)
    if (route.query.gclid) params.set('gclid', route.query.gclid)
    if (route.query.ref) params.set('ref', route.query.ref)
    
    // Add our internal tracking
    params.set('source', 'landing_page_expats')
    params.set('preselect', 'expat')
    
    return `/register?${params.toString()}`
  })
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  </style>