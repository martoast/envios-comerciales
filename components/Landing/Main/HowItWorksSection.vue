<template>
  <section id="how-it-works" class="py-24 px-5">
    <div class="max-w-7xl mx-auto px-5 fade-in-section">
      <div class="text-center mb-14 max-w-3xl mx-auto">
        <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.howItWorksTagline }}</span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.howItWorksTitle }}</h2>
        <p class="text-lg text-gray-600">{{ t.howItWorksSubtitle }}</p>
      </div>
      <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
        <!-- Connecting line for desktop -->
        <div class="hidden lg:block absolute left-[10%] right-[10%] top-16 h-0.5 bg-gray-200" style="z-index: 0;">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200"></div>
        </div>

        <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center relative" style="z-index: 1;">
          <!-- Icon container -->
          <div class="bg-gray-50 rounded-2xl p-5 w-28 h-28 flex items-center justify-center mb-4 transition-all duration-300 hover:bg-gray-100 hover:scale-105">
            <svg class="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon"/>
            </svg>
          </div>

          <!-- Number and title -->
          <div class="flex items-center gap-2 mb-3">
            <div class="text-sm bg-primary-500 text-white font-bold h-7 w-7 flex justify-center items-center rounded-full">
              {{ index + 1 }}
            </div>
            <h3 class="text-primary-900 font-bold text-base">{{ step.title }}</h3>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-center px-2 text-sm font-light">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const { t: createTranslations, language } = useLanguage()

const translations = {
  howItWorksTagline: {
    es: 'ASÍ DE FÁCIL',
    en: 'IT\'S THAT EASY'
  },
  howItWorksTitle: {
    es: 'En 5 sencillos pasos',
    en: 'In 5 simple steps'
  },
  howItWorksSubtitle: {
    es: 'Recibe tus compras en México',
    en: 'Receive your purchases in Mexico'
  }
}

const t = createTranslations(translations)

const steps = computed(() => {
  return language.value === 'es' ? [
    {
      title: 'Regístrate',
      description: 'Obtén tu dirección gratis en USA en solo 2 minutos.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      title: 'Compra',
      description: 'Usa tu dirección Boxly en el checkout de cualquier tienda.',
      icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
    },
    {
      title: 'Registra tus compras',
      description: 'Crea tu orden en el dashboard con los datos de tus compras. Solo toma 2 minutos.',
      icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
    },
    {
      title: 'Consolidamos',
      description: 'Recibimos todo en nuestro almacén en San Diego y lo juntamos en una sola caja.',
      icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
    },
    {
      title: 'Recibe',
      description: 'Enviamos a tu puerta en 3-5 días hábiles.',
      icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
    }
  ] : [
    {
      title: 'Sign up',
      description: 'Get your free US address in just 2 minutes.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      title: 'Shop',
      description: 'Use your Boxly address at checkout on any store.',
      icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
    },
    {
      title: 'Register',
      description: 'Create your order in the dashboard with your tracking number.',
      icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
    },
    {
      title: 'We consolidate',
      description: 'We combine all your packages into one box.',
      icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
    },
    {
      title: 'Receive',
      description: 'We ship to your door in 3-5 business days.',
      icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
    }
  ]
})

onMounted(() => {
  const sections = document.querySelectorAll('.fade-in-section')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running'
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  
  sections.forEach((section) => {
    section.style.animationPlayState = 'paused'
    observer.observe(section)
  })
})
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

.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards;
}
</style>