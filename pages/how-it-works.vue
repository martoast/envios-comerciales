<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative w-full bg-white py-12 md:py-12 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-50/20"
      ></div>
      <div class="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <span
            class="text-primary-600 uppercase font-bold text-sm tracking-wider animate-fadeIn"
          >
            {{ t.howItWorksTag }}
          </span>
          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 animate-fadeIn"
            style="animation-delay: 0.1s"
          >
            {{ t.heroTitle }}
          </h1>
          <p
            class="text-lg md:text-xl text-gray-600 animate-fadeIn"
            style="animation-delay: 0.2s"
          >
            {{ t.heroSubtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Address Details Section - Improved Design -->
    <section
      class="bg-gradient-to-br from-gray-50 via-white to-primary-50/10 md:py-20"
    >
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Content -->
          <div class="order-2 lg:order-1">
            <span
              class="text-primary-600 uppercase font-bold text-sm tracking-wider"
            >
              {{ t.addressSectionTag }}
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {{ t.addressTitle }}
            </h2>
            <div class="space-y-6 text-gray-700">
              <p>{{ t.addressIntro }}</p>

              <div
                class="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              >
                <h4 class="font-bold text-gray-900 mb-6 text-lg">
                  {{ t.howToUseTitle }}
                </h4>
                <div class="space-y-6">
                  <div class="relative pl-6">
                    <div
                      class="absolute left-0 top-1 w-4 h-4 bg-primary-500 rounded-full"
                    ></div>
                    <div>
                      <span class="font-semibold text-gray-900 text-lg">{{
                        t.nameField
                      }}</span>
                      <p class="text-gray-600 mt-1">{{ t.nameInstructions }}</p>
                    </div>
                  </div>
                  <div class="relative pl-6">
                    <div
                      class="absolute left-0 top-1 w-4 h-4 bg-primary-500 rounded-full"
                    ></div>
                    <div>
                      <span class="font-semibold text-gray-900 text-lg">{{
                        t.addressField
                      }}</span>
                      <p class="text-gray-600 mt-1">
                        {{ t.addressInstructions }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink
                  to="/register"
                  class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
                >
                  {{ t.getAddressButton }}
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>
                <a
                  href="#faq"
                  class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 transition-all duration-300"
                >
                  {{ t.learnMoreButton }}
                </a>
              </div>
            </div>
          </div>

          <!-- Visual - Improved Responsive Design -->
          <div class="order-1 lg:order-2 relative">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <!-- Main Image Container -->
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Shopping_online_with_bank_card.jpg/2560px-Shopping_online_with_bank_card.jpg"
                  alt="Online Shopping"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Address Example Card - Responsive Positioning -->
              <div
                class="relative sm:absolute -mt-4 sm:mt-0 sm:-bottom-8 sm:-right-4 md:-right-8 lg:-bottom-12 lg:-right-12 mx-4 sm:mx-0"
              >
                <div
                  class="bg-white rounded-xl shadow-2xl p-5 sm:p-6 max-w-sm mx-auto sm:mx-0 transform sm:rotate-3 hover:rotate-0 transition-transform duration-300"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <p
                      class="text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.exampleAddress }}
                    </p>
                  </div>
                  <div class="space-y-2 font-mono text-sm">
                    <p class="font-bold text-gray-900 text-base">
                      ECTJ Juan Pérez
                    </p>
                    <p class="text-gray-700">123 Main Street</p>
                    <p class="text-gray-700">San Diego, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTACarouselBanner />


    <!-- Footer -->
    <FooterSection />
  </main>
</template>

<script setup>
import { computed } from "vue";

import CTACarouselBanner from "~/components/Landing/Main/CTACarouselBanner.vue";
import FooterSection from "~/components/Landing/FooterSection.vue";
import MainFAQSection from "~/components/Landing/Main/FAQSection.vue";

const { t: createTranslations, language } = useLanguage();

const translations = {
  howItWorksTag: {
    es: "CÓMO FUNCIONA",
    en: "HOW IT WORKS",
  },
  heroTitle: {
    es: "Lo que necesitas para que tus compras lleguen a tu puerta",
    en: "Everything you need to get your purchases delivered to your door",
  },
  heroSubtitle: {
    es: "Hacemos el proceso de envio a Mexico, rápido y seguro.",
    en: "We make the shipping to Mexico process easy, fast and safe.",
  },
  step1Title: {
    es: "Selecciona tus productos",
    en: "Select your products",
  },
  step1Desc: {
    es: "Visita tu tienda online favorita y compra lo que quieras.",
    en: "Visit your favorite online store and buy whatever you like.",
  },
  step2Title: {
    es: "Usa tu dirección",
    en: "Use your address",
  },
  step2Desc: {
    es: "Para la dirección de envío, usa tu dirección de Envíos Comerciales TJ en San Diego.",
    en: "For the shipping address, use your Envios Comerciales TJ address in San Diego.",
  },
  step3Title: {
    es: "¡Recibe en casa!",
    en: "Receive at home!",
  },
  step3Desc: {
    es: "Consolidamos tus paquetes y los enviamos directamente a tu hogar en México.",
    en: "We consolidate your packages and ship them directly to your home in Mexico.",
  },
  addressSectionTag: {
    es: "TU DIRECCIÓN EN USA",
    en: "YOUR ADDRESS IN USA",
  },
  addressTitle: {
    es: "Usar tu dirección de USA es fácil",
    en: "Using your U.S. address is easy",
  },
  addressIntro: {
    es: "Cuando hagas una compra en línea, usa tu dirección de Envíos Comerciales TJ como dirección de envío. Asegúrate de completar todos los campos como se muestra.",
    en: "When you make a purchase online, use your Envios Comerciales TJ address as your shipping address. Make sure all fields are completed as shown.",
  },
  howToUseTitle: {
    es: "Instrucciones al momento de comprar:",
    en: "Instructions when purchasing:",
  },
  nameField: {
    es: "Nombre",
    en: "Name",
  },
  nameInstructions: {
    es: "Agrega ECTJ seguido de tu nombre completo y tu número de cuenta.",
    en: "Add ECTJ followed by your full name and your account number.",
  },
  addressField: {
    es: "Dirección de envío",
    en: "Shipping address",
  },
  addressInstructions: {
    es: "Usa la dirección completa de USA que te proporcionamos",
    en: "Use the complete USA address we provide you.",
  },
  getAddressButton: {
    es: "Obtén tu Dirección",
    en: "Get Your Address",
  },
  learnMoreButton: {
    es: "Aprende más",
    en: "Learn more",
  },
  exampleAddress: {
    es: "EJEMPLO DE DIRECCIÓN",
    en: "ADDRESS EXAMPLE",
  },
  copyTip: {
    es: "Copia exactamente como se muestra",
    en: "Copy exactly as shown",
  },
  whyChooseUs: {
    es: "¿Por qué elegirnos?",
    en: "Why choose us?",
  },
  benefit1Title: {
    es: "0% de impuestos",
    en: "0% Sales Tax",
  },
  benefit1Desc: {
    es: "Nuestra dirección en California está libre de impuestos estatales.",
    en: "Our California address is free from state sales tax.",
  },
  benefit2Title: {
    es: "Cruce seguro",
    en: "Safe crossing",
  },
  benefit2Desc: {
    es: "Cruzamos por el puerto de Tijuana con todos los permisos necesarios.",
    en: "We cross through the Tijuana port with all necessary permits.",
  },
  benefit3Title: {
    es: "Entrega rápida",
    en: "Fast delivery",
  },
  benefit3Desc: {
    es: "Recibe tus paquetes en 3-5 días hábiles en cualquier parte de México.",
    en: "Receive your packages in 3-5 business days anywhere in Mexico.",
  },
  ctaTitle: {
    es: "¿Listo para empezar a comprar?",
    en: "Ready to start shopping?",
  },
  ctaSubtitle: {
    es: "Obtén tu dirección en USA gratis y empieza a comprar hoy mismo.",
    en: "Get your free US address and start shopping today.",
  },
  ctaButton: {
    es: "Regístrate Gratis",
    en: "Register Free",
  },
  calculateButton: {
    es: "Calcular Costos",
    en: "Calculate Costs",
  },
};

const t = createTranslations(translations);
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(3deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Responsive adjustments for address card on mobile */
@media (max-width: 640px) {
  .animate-float {
    animation: none;
  }
}
</style>
