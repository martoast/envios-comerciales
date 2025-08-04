<!-- components/Landing/Expats/FAQSection.vue -->
<template>
    <section class="py-20 px-5 bg-white">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ t.faqTitle }}
          </h2>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in expatFaqs" :key="index" 
               class="border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="openFaq = openFaq === index ? -1 : index"
              class="w-full p-6 flex justify-between items-center text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 pr-4">{{ faq.question }}</span>
              <svg
                :class="['transition-transform duration-300 flex-shrink-0', openFaq === index ? 'rotate-180' : '']"
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openFaq === index" class="px-6 pb-6">
              <p class="text-gray-600">{{ faq.answer }}</p>
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
    faqTitle: {
      es: 'Preguntas frecuentes de expats',
      en: 'Common expat questions'
    }
  }
  
  const t = createTranslations(translations)
  
  const expatFaqs = computed(() => {
    return language.value === 'es' ? [
      {
        question: '¿Puedo usar mi tarjeta de crédito internacional?',
        answer: 'Sí, puedes usar cualquier tarjeta de crédito o débito internacional para tus compras. Nosotros solo cobramos el servicio de reenvío desde USA a México, que puedes pagar con tarjetas mexicanas o internacionales.'
      },
      {
        question: '¿Manejan devoluciones si no me gusta el producto?',
        answer: 'Sí, podemos gestionar devoluciones. Si necesitas devolver algo, lo enviamos de vuelta a la tienda original. Ten en cuenta que esto genera un costo adicional de envío de retorno.'
      },
      {
        question: '¿Qué pasa con los impuestos de importación?',
        answer: 'Manejamos toda la documentación aduanal. Los impuestos dependen del valor y tipo de producto. Te informamos de cualquier impuesto antes de enviar para que no tengas sorpresas.'
      },
      {
        question: '¿Puedo recibir paquetes de mi familia en el extranjero?',
        answer: 'Por supuesto. Tu familia puede enviar regalos o paquetes a tu dirección USA y nosotros te los hacemos llegar a México. Es perfecto para regalos de cumpleaños o navidad.'
      },
      {
        question: '¿Tienen servicio al cliente en inglés?',
        answer: 'Sí, nuestro equipo es completamente bilingüe. Puedes comunicarte con nosotros en inglés o español, como prefieras. Entendemos las necesidades específicas de la comunidad expat.'
      }
    ] : [
      {
        question: 'Can I use my international credit card?',
        answer: 'Yes, you can use any international credit or debit card for your purchases. We only charge for the forwarding service from USA to Mexico, which you can pay with Mexican or international cards.'
      },
      {
        question: 'Do you handle returns if I don\'t like the product?',
        answer: 'Yes, we can manage returns. If you need to return something, we send it back to the original store. Please note this generates an additional return shipping cost.'
      },
      {
        question: 'What about import taxes?',
        answer: 'We handle all customs documentation. Taxes depend on the value and type of product. We inform you of any taxes before shipping so you have no surprises.'
      },
      {
        question: 'Can I receive packages from my family abroad?',
        answer: 'Of course. Your family can send gifts or packages to your US address and we\'ll get them to you in Mexico. It\'s perfect for birthday or Christmas gifts.'
      },
      {
        question: 'Do you have customer service in English?',
        answer: 'Yes, our team is fully bilingual. You can communicate with us in English or Spanish, whichever you prefer. We understand the specific needs of the expat community.'
      }
    ]
  })
  </script>