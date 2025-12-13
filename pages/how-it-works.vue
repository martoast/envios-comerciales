<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative w-full bg-white py-12 md:py-16 overflow-hidden">
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

    <!-- Step-by-Step Process -->
    <MainStepsSection />

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700">
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ t.ctaTitle }}
          </h2>
          <p class="text-xl text-primary-100 mb-8">
            {{ t.ctaSubtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/register"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              {{ t.ctaButton }}
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
            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              {{ t.calculateButton }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <MainFAQSection />

    <!-- Footer -->
    <FooterSection />
  </main>
</template>

<script setup>
import FooterSection from "~/components/Landing/FooterSection.vue";
import MainFAQSection from "~/components/Landing/Main/FAQSection.vue";
import MainStepsSection from "~/components/Landing/Main/StepsSection.vue";

const { t: createTranslations } = useLanguage();

const translations = {
  howItWorksTag: {
    es: "CÓMO FUNCIONA",
    en: "HOW IT WORKS",
  },
  heroTitle: {
    es: "Compra en USA, recibe en México en 5 pasos simples",
    en: "Shop in USA, receive in Mexico in 5 simple steps",
  },
  heroSubtitle: {
    es: "Simple, rápido y seguro.",
    en: "Simple, fast and secure.",
  },
  // CTA
  ctaTitle: {
    es: "¿Listo para empezar a ahorrar?",
    en: "Ready to start saving?",
  },
  ctaSubtitle: {
    es: "Regístrate gratis y obtén tu dirección en USA hoy mismo",
    en: "Register for free and get your US address today",
  },
  ctaButton: {
    es: "Regístrate Gratis",
    en: "Register Free",
  },
  calculateButton: {
    es: "Ver Precios",
    en: "See Pricing",
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

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>