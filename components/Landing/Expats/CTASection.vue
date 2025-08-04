<!-- components/Landing/Expats/CTASection.vue -->
<template>
    <section class="py-20 px-5 bg-gradient-to-r from-primary-500 to-primary-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ t.ctaTitle }}
        </h2>
        <p class="text-xl text-white/90 mb-8">
          {{ t.ctaSubtitle }}
        </p>
        <NuxtLink
          to="/register"
          class="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          {{ t.ctaButton }}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </template>
  
  <script setup>
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    ctaTitle: {
      es: '¿Listo para comprar sin límites?',
      en: 'Ready to shop without limits?'
    },
    ctaSubtitle: {
      es: 'Únete a la comunidad de expats que ya disfrutan de compras internacionales',
      en: 'Join the expat community already enjoying international shopping'
    },
    ctaButton: {
      es: 'Crear Mi Cuenta Gratis',
      en: 'Create My Free Account'
    }
  }
  
  const t = createTranslations(translations)
  </script>