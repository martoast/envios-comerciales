<template>
    <section id="testimonials" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.testimonialsTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.testimonialsTitle }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-[30px] rounded-2xl border border-gray-200">
            <div class="stars text-yellow-500 mb-[15px]">
              <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <p class="italic mb-5 text-gray-900">"{{ testimonial.quote }}"</p>
            <div class="font-bold text-gray-900">
              {{ testimonial.author }} - <span class="font-normal text-gray-600">{{ testimonial.location }}</span>
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
    testimonialsTagline: {
      es: 'LO QUE DICEN NUESTROS CLIENTES',
      en: 'WHAT OUR CLIENTS SAY'
    },
    testimonialsTitle: {
      es: 'Historias de Éxito Reales',
      en: 'Real Success Stories'
    }
  }
  
  const t = createTranslations(translations)
  
  const testimonials = computed(() => {
    return language.value === 'es' ? [
      {
        quote: 'El servicio fue increíblemente rápido y profesional. Recibí mis refacciones de auto en Monterrey sin ningún problema. ¡Totalmente recomendados!',
        author: 'Carlos R.',
        location: 'Monterrey, NL'
      },
      {
        quote: 'Tenía miedo de comprar electrónicos caros, pero el equipo me guió en todo momento y mi laptop llegó perfecta a la Ciudad de México. ¡Excelente comunicación!',
        author: 'Sofia G.',
        location: 'CDMX'
      },
      {
        quote: 'Consolidé varias compras de ropa y juguetes y ahorré muchísimo en el envío a Guadalajara. Súper fácil todo el proceso.',
        author: 'Javier L.',
        location: 'Guadalajara, Jal.'
      }
    ] : [
      {
        quote: 'The service was incredibly fast and professional. I received my car parts in Monterrey without any issues. Totally recommended!',
        author: 'Carlos R.',
        location: 'Monterrey, NL'
      },
      {
        quote: 'I was afraid of buying expensive electronics, but the team guided me at all times and my laptop arrived perfectly in Mexico City. Excellent communication!',
        author: 'Sofia G.',
        location: 'Mexico City'
      },
      {
        quote: 'I consolidated several purchases of clothes and toys and saved a lot on shipping to Guadalajara. The whole process was super easy.',
        author: 'Javier L.',
        location: 'Guadalajara, Jal.'
      }
    ]
  })
  </script>