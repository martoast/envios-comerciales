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
      answer: 'Tu tranquilidad es nuestra prioridad. Te mantendremos informado de la ruta de tu paquete en todo momento para tu tranquilidad. Con 12 años de experiencia, estamos siempre al pendiente de todo el proceso de envío hasta que el producto llega a su destino, ofreciéndote un seguimiento personalizado y sin problemas. Todos nuestros envíos incluyen seguro contra pérdida o daño. Importante: Es responsabilidad del cliente proporcionar la dirección de envío completa y correcta con todas las especificaciones requeridas.'
    },
    {
      question: '¿Cuánto tiempo tarda en llegar mi envío?',
      answer: 'Una vez que recibimos tu paquete en nuestra bodega de San Diego, el proceso de cruce y envío a tu domicilio en México toma de 3 a 5 días hábiles. Te proporcionamos un número de guía para que puedas rastrear tu paquete en tiempo real. Nuestro equipo está siempre al pendiente del proceso para asegurar que todo marche correctamente.'
    },
    {
      question: '¿Cómo sé que su servicio es confiable?',
      answer: 'Llevamos más de 12 años en la industria brindando un servicio de seguimiento personalizado y sin problemas. Hemos servido a más de mil clientes satisfechos. Nuestra reputación se basa en la transparencia, la comunicación constante y el cuidado de cada envío. Contamos con una bodega física en San Diego y estamos siempre al pendiente de todo el proceso de envío hasta que llega a su destino.'
    }
  ] : [
    {
      question: 'What happens if my package is lost or damaged?',
      answer: 'Your peace of mind is our priority. We will keep you informed of your package\'s route at all times for your tranquility. With 12 years of experience, we are always monitoring the entire shipping process until the product reaches its destination, offering personalized tracking without issues. All our shipments include insurance against loss or damage. Important: It is the customer\'s responsibility to provide a complete and correct shipping address with all required specifications.'
    },
    {
      question: 'How long will my shipment take to arrive?',
      answer: 'Once we receive your package at our San Diego warehouse, the process of crossing and shipping to your address in Mexico takes 3 to 5 business days. We provide you with a tracking number so you can monitor your package in real time. Our team is always overseeing the process to ensure everything goes smoothly.'
    },
    {
      question: 'How do I know your service is reliable?',
      answer: 'We have been in the industry for over 12 years providing personalized tracking service without issues. We have served more than a thousand satisfied customers. Our reputation is built on transparency, constant communication, and care for each shipment. We have a physical warehouse in San Diego and are always monitoring the entire shipping process until it reaches its destination.'
    }
  ]
})
</script>