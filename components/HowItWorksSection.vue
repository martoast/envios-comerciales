<template>
    <section id="how-it-works" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.howItWorksTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.howItWorksTitle }}</h2>
          <p class="text-lg text-gray-600">{{ t.howItWorksSubtitle }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <div v-for="(step, index) in steps" :key="index" class="bg-white p-8 rounded-2xl border border-gray-200 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
              {{ index + 1 }}
            </div>
            <div class="w-16 h-16 bg-primary-50 text-primary-500 rounded-full inline-flex items-center justify-center mb-5">
              <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </div>
            <h3 class="text-xl mb-2.5 font-bold">{{ step.title }}</h3>
            <p class="text-base mb-0">{{ step.description }}</p>
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
      es: 'En 3 sencillos pasos',
      en: 'In 3 simple steps'
    },
    howItWorksSubtitle: {
      es: 'Regístrate gratis y empieza a comprar en cualquier tienda del mundo',
      en: 'Register for free and start shopping at any store in the world'
    }
  }
  
  const t = createTranslations(translations)
  
  const steps = computed(() => {
    return language.value === 'es' ? [
      {
        title: 'Regístrate y obtén tu domicilio en USA',
        description: 'Es gratis y solo toma 2 minutos. Te asignamos una dirección personal en San Diego que puedes usar de inmediato.'
      },
      {
        title: 'Úsalo como shipping address en tus compras',
        description: 'Compra en Amazon, eBay, Walmart o cualquier tienda. Al pagar, ingresa "SDSS [Tu Nombre]" en el campo de nombre y usa la dirección de USA que te proporcionamos.'
      },
      {
        title: 'Nosotros consolidamos y enviamos a México',
        description: 'Recibimos todos tus paquetes, los agrupamos en uno solo para ahorrar costos y te lo enviamos a tu domicilio.'
      }
    ] : [
      {
        title: 'Register and get your US address',
        description: 'It\'s free and only takes 2 minutes. We assign you a personal address in San Diego that you can use immediately.'
      },
      {
        title: 'Use it as your shipping address for purchases',
        description: 'Shop on Amazon, eBay, Walmart or any store. At checkout, enter "SDSS [Your Name]" in the name field and use the USA address we provide you.'
      },
      {
        title: 'We consolidate and ship to Mexico',
        description: 'We receive all your packages, group them into one to save costs and ship it to your home.'
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