<template>
    <section class="bg-dark-500 text-white py-20 px-5 text-center">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <h2 class="text-4xl mb-4 text-white">{{ t.ctaFooterTitle }}</h2>
        <p class="text-lg mb-8 text-white/80 max-w-2xl mx-auto">{{ t.ctaFooterSubtitle }}</p>
        <a :href="t.ctaFooterLink" target="_blank" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-white text-primary-500 shadow-md hover:-translate-y-1 hover:shadow-lg">
          {{ t.contactWhatsApp }}
        </a>
      </div>
    </section>
  </template>
  
  <script setup>
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    ctaFooterTitle: {
      es: 'Tu Próximo Envío Comienza Aquí',
      en: 'Your Next Shipment Starts Here'
    },
    ctaFooterSubtitle: {
      es: 'Obtén tu cotización personalizada en minutos y empieza a comprar en cualquier tienda de USA hoy mismo',
      en: 'Get your custom quote in minutes and start shopping from any US store today'
    },
    ctaFooterLink: {
      es: 'https://wa.me/16195591910?text=Hola!%20Quiero%20mi%20cotizaci%C3%B3n%20personalizada%20ahora.',
      en: 'https://wa.me/16195591910?text=Hi!%20I%20want%20my%20custom%20quote%20now.'
    },
    contactWhatsApp: {
      es: 'Contactar por WhatsApp',
      en: 'Contact via WhatsApp'
    }
  }
  
  const t = createTranslations(translations)
  </script>
  
  <style scoped>
  .bg-dark-500 { 
    background-color: #1a202c; 
  }
  </style>