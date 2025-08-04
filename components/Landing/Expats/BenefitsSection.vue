<!-- components/Landing/Expats/BenefitsSection.vue -->
<template>
  <section class="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <span class="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          {{ t.benefitsTagline }}
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {{ t.benefitsTitle }}
        </h2>
        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t.benefitsSubtitle }}
        </p>
      </div>
      
      <!-- Benefits Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div v-for="(benefit, index) in benefits" :key="index" 
             class="group text-center">
          <!-- Card -->
          <div class="bg-gray-50 rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:-translate-y-1">
            <!-- Icon -->
            <div class="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl inline-flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
              <component :is="benefit.icon" class="w-7 h-7" />
            </div>
            
            <!-- Title -->
            <h3 class="text-base font-bold text-gray-900 mb-2">
              {{ benefit.title }}
            </h3>
            
            <!-- Description -->
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ benefit.description }}
            </p>
            
            <!-- Extra detail on hover -->
            <div class="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-xs text-primary-600 font-medium">
                {{ benefit.extra }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { 
  HomeIcon,
  ShoppingBagIcon,
  CubeIcon,
  TruckIcon
} from "@heroicons/vue/24/outline"

const { t: createTranslations, language } = useLanguage()

const translations = {
  benefitsTagline: {
    es: 'Cómo funciona',
    en: 'How it works'
  },
  benefitsTitle: {
    es: 'Compra como si vivieras en USA',
    en: 'Shop like you live in the USA'
  },
  benefitsSubtitle: {
    es: 'Simple: usas nuestra dirección al momento de comprar y nosotros te lo enviamos',
    en: 'Simple: use our address on your online shopping and and we will ship it to you'
  },
  bottomMessage: {
    es: '🎉 Más de 5,000 expats ya están comprando sus marcas favoritas',
    en: '🎉 Over 5,000 expats are already shopping their favorite brands'
  }
}

const t = createTranslations(translations)

const benefits = computed(() => {
  return language.value === 'es' ? [
    {
      icon: HomeIcon,
      title: 'Tu dirección en USA',
      description: 'Te damos una dirección real para todas tus compras',
      extra: '¡Úsala de inmediato!'
    },
    {
      icon: ShoppingBagIcon,
      title: 'Compra donde quieras',
      description: 'Amazon, Target, Best Buy... cualquier tienda que te guste',
      extra: 'Sin restricciones'
    },
    {
      icon: CubeIcon,
      title: 'Juntamos tus compras',
      description: 'Esperamos todos tus paquetes y los enviamos juntos',
      extra: 'Ahorras hasta 60%'
    },
    {
      icon: TruckIcon,
      title: 'Recibe en días',
      description: 'Tu pedido llega a tu casa en México en 3-5 días',
      extra: 'Envío rápido y seguro'
    }
  ] : [
    {
      icon: HomeIcon,
      title: 'Your US address',
      description: 'Get a real US address for all your purchases',
      extra: 'Use it immediately!'
    },
    {
      icon: ShoppingBagIcon,
      title: 'Shop anywhere',
      description: 'Amazon, Target, Best Buy... any store you like',
      extra: 'No restrictions'
    },
    {
      icon: CubeIcon,
      title: 'We bundle your purchases',
      description: 'We wait for all your packages and ship them together',
      extra: 'Save up to 60%'
    },
    {
      icon: TruckIcon,
      title: 'Receive in days',
      description: 'Your order arrives at your home in Mexico in 3-5 days',
      extra: 'Fast & secure shipping'
    }
  ]
})
</script>