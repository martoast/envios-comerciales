<template>
    <header class="min-h-[75vh] flex items-center text-center py-[120px] px-5 bg-white">
      <div class="max-w-[900px] mx-auto animate-fadeIn">
        <svg class="w-[100px] h-auto mb-5 mx-auto" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <g stroke="#0d2c4f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
            <line x1="0" y1="35" x2="40" y2="35" />
            <line x1="5" y1="50" x2="45" y2="50" />
            <line x1="0" y1="65" x2="40" y2="65" />
            <path fill="#FFC107" d="M 55,25 L 105,25 L 125,45 L 75,45 Z" />
            <path fill="#FFA000" d="M 55,25 L 55,75 L 75,95 L 75,45 Z" />
            <path fill="#FF8F00" d="M 75,95 L 125,95 L 125,45 L 75,45 Z" />
          </g>
        </svg>
        
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
          <a href="#how-it-works" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600">
            {{ t.ctaRegister }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a href="#calculator" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 cursor-pointer transition-all duration-300 border-gray-200 bg-white text-gray-900 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5">
            {{ t.ctaCalculate }}
          </a>
        </div>
        
        <!-- Trust badges -->
        <div class="flex flex-wrap justify-center gap-8 items-center text-gray-600">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">{{ t.trustBadge1 }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">{{ t.trustBadge2 }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">{{ t.trustBadge3 }}</span>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    heroTitle: {
      es: 'Compra en <span class="text-[#2E6BB7]">USA</span>, <span class="text-[#2E6BB7]">Canadá</span>, <span class="text-[#2E6BB7]">Europa</span> o <span class="text-[#2E6BB7]">China</span> y recibe en México',
      en: 'Shop in the <span class="text-[#2E6BB7]">USA</span>, <span class="text-[#2E6BB7]">Canada</span>, <span class="text-[#2E6BB7]">Europe</span> or <span class="text-[#2E6BB7]">China</span> and receive in Mexico'
    },
    heroSubtitle: {
      es: 'Te damos un domicilio en USA para tus compras online',
      en: 'We give you a US address for your online shopping'
    },
    heroDescription: {
      es: 'Nosotros recibimos tus paquetes y los consolidamos para enviártelos a cualquier lugar de México al mejor precio',
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