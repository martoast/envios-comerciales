<template>
  <footer class="bg-dark-500 text-white/70 py-12 px-5 text-base border-t border-white/10">
    <div class="max-w-6xl mx-auto px-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-left md:text-left">
        <div>
          <h4 class="text-white mb-4 text-lg">{{ t.addressUSA }}</h4>
          <p class="m-0">
            2220 Otay Lakes Road<br>
            San Diego, CA 91915<br>
            United States
          </p>
        </div>
        <div>
          <h4 class="text-white mb-4 text-lg">{{ t.contact }}</h4>
          <ul class="list-none p-0 m-0">
            <li class="mb-2">
              <a href="mailto:envioscomercialestj@gmail.com" class="text-white/70 no-underline hover:text-white hover:underline">envioscomercialestj@gmail.com</a>
            </li>
            <li class="mb-2">
              <a href="https://wa.me/16195591910" target="_blank" class="text-white/70 no-underline hover:text-white hover:underline">WhatsApp: +1 (619) 559-1910</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-white mb-4 text-lg">{{ t.businessHours }}</h4>
          <p class="m-0">
            {{ t.hoursWeekdays }}<br>
            {{ t.hoursSaturday }}
          </p>
        </div>
      </div>
      
      <!-- Legal Links Section -->
      <div class="text-center mt-8 pt-8 border-t border-white/10">
        <div class="flex justify-center gap-6 mb-4">
          <NuxtLink to="/terms" class="text-white/70 no-underline hover:text-white hover:underline">
            {{ t.termsLink }}
          </NuxtLink>
          <span class="text-white/30">|</span>
          <NuxtLink to="/privacy-policy" class="text-white/70 no-underline hover:text-white hover:underline">
            {{ t.privacyLink }}
          </NuxtLink>
        </div>
        <p class="m-0">{{ t.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t: createTranslations } = useLanguage()

const translations = {
  addressUSA: {
    es: 'Dirección en USA',
    en: 'USA Address'
  },
  contact: {
    es: 'Contacto',
    en: 'Contact'
  },
  businessHours: {
    es: 'Horario de Atención',
    en: 'Business Hours'
  },
  hoursWeekdays: {
    es: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    en: 'Monday to Friday: 9:00 AM - 6:00 PM'
  },
  hoursSaturday: {
    es: 'Sábado: 10:00 AM - 2:00 PM',
    en: 'Saturday: 10:00 AM - 2:00 PM'
  },
  termsLink: {
    es: 'Términos y Condiciones',
    en: 'Terms and Conditions'
  },
  privacyLink: {
    es: 'Política de Privacidad',
    en: 'Privacy Policy'
  },
  copyright: {
    es: '© 2025 Envios Comerciales Tijuana - Todos los derechos reservados.',
    en: '© 2025 Envios Comerciales Tijuana - All rights reserved.'
  }
}

const t = createTranslations(translations)
</script>

<style scoped>
.bg-dark-500 { 
  background-color: #1a202c; 
}
</style>