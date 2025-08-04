<!-- components/Landing/Expats/TestimonialsSection.vue -->
<template>
    <section class="py-20 px-5 bg-gradient-to-br from-primary-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t.testimonialsTitle }}
          </h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" 
               class="bg-white p-8 rounded-2xl shadow-lg">
            <div class="flex gap-1 mb-4">
              <svg v-for="n in 5" :key="n" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-gray-700 mb-6 italic">"{{ testimonial.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const { t: createTranslations, language } = useLanguage()
  
  const translations = {
    testimonialsTitle: {
      es: 'Expats felices en México',
      en: 'Happy expats in Mexico'
    }
  }
  
  const t = createTranslations(translations)
  
  const testimonials = computed(() => {
    return language.value === 'es' ? [
      {
        text: 'Después de 3 años en México, por fin puedo comprar mis marcas favoritas de USA sin complicaciones. El servicio es excelente y hablan perfecto inglés.',
        name: 'Sarah Johnson',
        location: 'Playa del Carmen'
      },
      {
        text: 'Como canadiense en CDMX, necesitaba acceso a productos específicos. Este servicio ha sido un salvavidas. Rápido, confiable y sin sorpresas.',
        name: 'Michael Chen',
        location: 'Ciudad de México'
      },
      {
        text: 'Mudarse a otro país es difícil, pero poder comprar las cosas que conoces lo hace más fácil. Excelente servicio y muy profesional.',
        name: 'Emma Williams',
        location: 'Guadalajara'
      }
    ] : [
      {
        text: 'After 3 years in Mexico, I can finally buy my favorite US brands without complications. The service is excellent and they speak perfect English.',
        name: 'Sarah Johnson',
        location: 'Playa del Carmen'
      },
      {
        text: 'As a Canadian in CDMX, I needed access to specific products. This service has been a lifesaver. Fast, reliable and no surprises.',
        name: 'Michael Chen',
        location: 'Mexico City'
      },
      {
        text: 'Moving to another country is hard, but being able to buy the things you know makes it easier. Excellent and very professional service.',
        name: 'Emma Williams',
        location: 'Guadalajara'
      }
    ]
  })
  </script>