<!-- pages/faq.vue -->
<template>
    <main class="overflow-hidden">
      <!-- FAQ Section Component -->
      <FAQSection />
  
      <!-- CTA Footer -->
      <CTAFooter />
  
      <!-- Footer -->
      <FooterSection />
    </main>
  </template>
  
  <script setup>
  import FAQSection from "~/components/Landing/FAQSection.vue";
  import FooterSection from "~/components/Landing/FooterSection.vue";
  import CTAFooter from "~/components/Landing/CTAFooter.vue";
  
  // Page meta
  useHead({
    title: 'Preguntas Frecuentes - Envios Comerciales Tijuana',
    meta: [
      {
        name: 'description',
        content: 'Encuentra respuestas a las preguntas más comunes sobre nuestro servicio de envíos entre San Diego y Tijuana.'
      }
    ]
  })
  </script>