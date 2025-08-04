<template>
  <div class="mb-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
      {{ t.howItWorks }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="group relative"
      >
        <!-- Connecting Line (hidden on mobile and last item) -->
        <div 
          v-if="index < steps.length - 1" 
          class="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"
        >
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-200"></div>
        </div>

        <!-- Card -->
        <div class="relative bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
          <!-- Icon Circle -->
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300"
               :class="[step.bgColor, 'group-hover:scale-110']">
            <svg class="w-8 h-8" :class="step.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon"/>
            </svg>
          </div>
          
          <!-- Step Number -->
          <div class="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center">
            {{ index + 1 }}
          </div>
          
          <!-- Title Only -->
          <h3 class="font-semibold text-gray-900">{{ step.title }}</h3>
        </div>
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

// Simplified translations
const translations = {
  howItWorks: {
    es: '¿Cómo funciona?',
    en: 'How it works'
  },
  step1Title: {
    es: 'Compra',
    en: 'Shop'
  },
  step2Title: {
    es: 'Envía a nustro almacen',
    en: 'Ship to our warehouse'
  },
  step3Title: {
    es: 'Consolidamos',
    en: 'We Consolidate'
  },
  step4Title: {
    es: 'Recibe',
    en: 'Receive'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Steps data - much simpler
const steps = computed(() => [
  {
    title: t.value.step1Title,
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600'
  },
  {
    title: t.value.step2Title,
    icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: t.value.step3Title,
    icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    title: t.value.step4Title,
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  }
])
</script>