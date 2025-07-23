<template>
  <header class="min-h-[75vh] flex items-center text-center py-[120px] px-5 bg-white">
    <div class="max-w-[900px] mx-auto animate-fadeIn">
      <img src="/logo.svg" alt="Envios Comerciales TJ" class="w-[100px] h-auto mb-5 mx-auto">
      
      <h1 class="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-extrabold text-gray-900 leading-tight mb-5">
        <span v-html="t.heroTitle"></span>
      </h1>
      
      <p class="text-[1.2rem] md:text-[1.4rem] max-w-[750px] mx-auto mb-[10px] text-gray-800 font-medium">
        {{ t.heroSubtitle }}
      </p>
      
      <p class="text-[1rem] md:text-[1.1rem] max-w-[600px] mx-auto mb-[35px] text-gray-600">
        {{ t.heroDescription }}
      </p>
      
      <div class="flex justify-center gap-[15px] flex-wrap mb-[40px]">
        <a href="/register" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600">
          {{ t.ctaRegister }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </a> 
        <a href="#calculator" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 cursor-pointer transition-all duration-300 border-gray-200 bg-white text-gray-900 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5">
          {{ t.ctaCalculate }}
        </a> 
      </div>
    </div>
  </header>
</template>
  
  <script setup>
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    heroTitle: {
      es: 'Compra en <span class="text-[#2E6BB7]">cualquier tienda</span> del <span class="text-[#2E6BB7]">mundo</span> y recíbelo en <span class="text-[#2E6BB7]">México</span>',
      en: 'Shop from <span class="text-[#2E6BB7]">any store</span> in the <span class="text-[#2E6BB7]">world</span> and receive in <span class="text-[#2E6BB7]">Mexico</span>'
    },
    heroSubtitle: {
      es: 'Tu dirección en USA. Para comprar sin límites',
      en: 'We give you a US address for your online shopping'
    },
    heroDescription: {
      es: 'Junta todas tus compras en una sola caja y recíbelas en México. Facil, seguro y económico.',
      en: 'We receive your packages and consolidate them to ship anywhere in Mexico at the best price'
    },
    ctaRegister: {
      es: 'Regístrate Gratis',
      en: 'Register Free'
    },
    ctaCalculate: {
      es: 'Calcular Envío',
      en: 'Calculate Shipping'
    },
    trustBadge1: {
      es: 'Sin costo de membresía',
      en: 'No membership fees'
    },
    trustBadge2: {
      es: 'Envíos asegurados',
      en: 'Insured shipments'
    },
    trustBadge3: {
      es: '3-5 días de entrega',
      en: '3-5 day delivery'
    }
  }
  
  const t = createTranslations(translations)
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