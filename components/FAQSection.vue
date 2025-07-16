<template>
    <section id="faq" class="py-24 px-5 bg-white">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.faqTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.faqTitle }}</h2>
        </div>
        <div class="max-w-[800px] mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 last:border-b-0">
            <button
              @click="openFaq = openFaq === index ? -1 : index"
              class="w-full p-5 flex justify-between items-center text-left bg-transparent border-none cursor-pointer text-[1.1rem] font-semibold text-gray-900 hover:text-primary-500"
            >
              <span>{{ faq.question }}</span>
              <svg
                :class="['transition-transform duration-300', openFaq === index ? 'rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div
              v-show="openFaq === index"
              class="overflow-hidden transition-all duration-300"
            >
              <p class="px-5 pb-5 m-0 text-base">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const { t: createTranslations, language } = useLanguage()
  
  const openFaq = ref(-1)
  
  const translations = {
    faqTagline: {
      es: 'PREGUNTAS FRECUENTES',
      en: 'FREQUENTLY ASKED QUESTIONS'
    },
    faqTitle: {
      es: 'Resolvemos tus Dudas',
      en: 'Answering Your Doubts'
    }
  }
  
  const t = createTranslations(translations)
  
  const faqs = computed(() => {
    return language.value === 'es' ? [
      {
        question: '¿Qué pasa si mi paquete se pierde o se daña?',
        answer: 'Tu tranquilidad es lo más importante. Todos nuestros envíos están 100% asegurados contra pérdida o daño. Si algo le sucede a tu paquete durante el tránsito con nosotros, te reembolsamos el valor total de tu producto. Contáctanos para conocer los detalles de la cobertura.'
      },
      {
        question: '¿Cuánto tiempo tarda en llegar mi envío?',
        answer: 'Una vez que recibimos tu paquete en nuestra bodega de San Diego, el proceso de cruce y envío a tu domicilio en México toma de 3 a 5 días hábiles. Te mantendremos informado con un número de guía para que puedas rastrearlo en todo momento.'
      },
      {
        question: '¿Cómo sé que su servicio es confiable?',
        answer: 'Llevamos más de 10 años en la industria y hemos servido a más de mil clientes. Nuestra reputación se basa en la transparencia y la eficiencia. Contamos con una bodega física en San Diego, ofrecemos seguro en todos los envíos y puedes ver las opiniones de nuestros clientes satisfechos en esta misma página.'
      }
    ] : [
      {
        question: 'What happens if my package is lost or damaged?',
        answer: 'Your peace of mind is paramount. All our shipments are 100% insured against loss or damage. If anything happens to your package while in transit with us, we will refund the full value of your product. Contact us for coverage details.'
      },
      {
        question: 'How long will my shipment take to arrive?',
        answer: 'Once we receive your package at our San Diego warehouse, the process of crossing and shipping to your address in Mexico takes 3 to 5 business days. We will keep you informed with a tracking number so you can trace it at all times.'
      },
      {
        question: 'How do I know your service is reliable?',
        answer: 'We have been in the industry for over 10 years and have served more than a thousand clients. Our reputation is built on transparency and efficiency. We have a physical warehouse in San Diego, offer insurance on all shipments, and you can see reviews from our satisfied customers on this very page.'
      }
    ]
  })
  </script>