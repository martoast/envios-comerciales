<!-- components/Landing/Expats/PainPointsSection.vue -->
<template>
  <section class="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <span class="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          {{ t.badge }}
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {{ t.painPointsTitle }}
        </h2>
        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t.painPointsSubtitle }}
        </p>
      </div>
      
      <!-- Pain Points Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div v-for="(point, index) in painPoints" :key="index" 
             class="group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          
          <!-- Problem Section -->
          <div class="mb-6">
            <!-- Icon -->
            <div class="w-12 h-12 bg-red-50 text-red-500 rounded-xl inline-flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
              <component :is="point.icon" class="w-6 h-6" />
            </div>
            
            <!-- Problem Title -->
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ point.problem }}
            </h3>
            
            <!-- Problem Description -->
            <p class="text-sm text-gray-500 leading-relaxed">
              {{ point.description }}
            </p>
          </div>
          
          <!-- Solution Section -->
          <div class="pt-6 border-t border-gray-100">
            <div class="flex items-start gap-3">
              <!-- Check Icon -->
              <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon class="w-3 h-3 text-green-600" />
              </div>
              
              <!-- Solution Text -->
              <div class="flex-1">
                <p class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">
                  {{ t.ourSolution }}
                </p>
                <p class="text-sm text-gray-700 font-medium">
                  {{ point.solution }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Hover Effect Border -->
          <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-100 transition-colors pointer-events-none"></div>
        </div>
      </div>
      
      <!-- Bottom CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">{{ t.bottomText }}</p>
        <NuxtLink 
          to="/register" 
          class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
        >
          {{ t.bottomCTA }}
          <ArrowRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { 
  NoSymbolIcon, 
  ComputerDesktopIcon, 
  CurrencyDollarIcon,
  CheckIcon,
  ArrowRightIcon 
} from "@heroicons/vue/24/outline"

const { t: createTranslations, language } = useLanguage()

const translations = {
  badge: {
    es: 'Problemas comunes',
    en: 'Common problems'
  },
  painPointsTitle: {
    es: 'Los retos de comprar desde México',
    en: 'The challenges of shopping from Mexico'
  },
  painPointsSubtitle: {
    es: 'Entendemos tu frustración. Por eso creamos la solución perfecta.',
    en: 'We understand your frustration. That\'s why we created the perfect solution.'
  },
  ourSolution: {
    es: 'Solucionado',
    en: 'Solved'
  },
  bottomText: {
    es: '¿Cansado de estas limitaciones?',
    en: 'Tired of these limitations?'
  },
  bottomCTA: {
    es: 'Empieza a comprar sin límites',
    en: 'Start shopping without limits'
  }
}

const t = createTranslations(translations)

const painPoints = computed(() => {
  return language.value === 'es' ? [
    {
      icon: NoSymbolIcon,
      problem: '"Este producto no está disponible"',
      description: 'Tu marca favorita no existe en México o está descontinuada.',
      solution: 'Acceso total a todas las tiendas de USA'
    },
    {
      icon: ComputerDesktopIcon,
      problem: '"No enviamos a México"',
      description: '90% de tiendas online no hacen envíos internacionales.',
      solution: 'Tu dirección USA personal para recibir todo'
    },
    {
      icon: CurrencyDollarIcon,
      problem: '"3x más caro aquí"',
      description: 'El mismo producto cuesta el triple en tiendas locales.',
      solution: 'Precios de USA + envío económico'
    }
  ] : [
    {
      icon: NoSymbolIcon,
      problem: '"This product is not available"',
      description: 'Your favorite brand doesn\'t exist in Mexico or is discontinued.',
      solution: 'Full access to all US stores'
    },
    {
      icon: ComputerDesktopIcon,
      problem: '"We don\'t ship to Mexico"',
      description: '90% of online stores don\'t offer international shipping.',
      solution: 'Your personal US address to receive everything'
    },
    {
      icon: CurrencyDollarIcon,
      problem: '"3x more expensive here"',
      description: 'The same product costs triple in local stores.',
      solution: 'US prices + affordable shipping'
    }
  ]
})
</script>