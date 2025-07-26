<template>
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center animate-fadeIn" :style="`animation-delay: ${animationDelay}s`">
        {{ t.howItWorks }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 animate-fadeIn"
          :style="`animation-delay: ${(index + 4) * 0.1}s`"
        >
          <!-- Step Number -->
          <div class="absolute -top-3 -left-3 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            {{ index + 1 }}
          </div>
          <!-- Icon -->
          <div :class="['p-3 rounded-xl mb-4 inline-flex', step.bgColor]">
            <svg class="w-6 h-6" :class="step.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Props
  const props = defineProps({
    animationDelay: {
      type: Number,
      default: 0.3
    }
  })
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // Translations
  const translations = {
    howItWorks: {
      es: '¿Cómo Funciona?',
      en: 'How It Works'
    },
    step1Title: {
      es: 'Compra en línea',
      en: 'Shop Online'
    },
    step1Desc: {
      es: 'Compra en cualquier tienda de EE.UU. usando tu dirección asignada',
      en: 'Shop at any US store using your assigned address'
    },
    step2Title: {
      es: 'Recibimos tus paquetes',
      en: 'We receive your packages'
    },
    step2Desc: {
      es: 'Tus compras llegan a nuestro almacén en California',
      en: 'Your purchases arrive at our California warehouse'
    },
    step3Title: {
      es: 'Consolidamos',
      en: 'We consolidate'
    },
    step3Desc: {
      es: 'Agrupamos todos tus paquetes en un solo envío',
      en: 'We group all your packages into one shipment'
    },
    step4Title: {
      es: 'Enviamos a México',
      en: 'Ship to Mexico'
    },
    step4Desc: {
      es: 'Tu paquete consolidado llega directo a tu puerta',
      en: 'Your consolidated package arrives right to your door'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Steps data
  const steps = computed(() => [
    {
      title: t.value.step1Title,
      description: t.value.step1Desc,
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600'
    },
    {
      title: t.value.step2Title,
      description: t.value.step2Desc,
      icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: t.value.step3Title,
      description: t.value.step3Desc,
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      title: t.value.step4Title,
      description: t.value.step4Desc,
      icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600'
    }
  ])
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
  </style>