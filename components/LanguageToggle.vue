<!-- components/LanguageToggle.vue -->
<template>
    <div class="fixed top-4 right-4 sm:top-5 sm:right-5 z-[1001] bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full p-1 flex gap-1.5 shadow-lg">
      <button
        @click="switchLanguage('es')"
        :class="['bg-transparent border-2 rounded-full w-9 h-9 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 p-0 flex items-center justify-center', language === 'es' ? 'border-primary-500 scale-110 shadow-md' : 'border-transparent hover:border-gray-300']"
        title="Español"
        aria-label="Cambiar a Español"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" 
          alt="Bandera de México" 
          class="w-7 h-7 sm:w-[30px] sm:h-[30px] rounded-full shadow-sm object-cover"
        >
      </button>
      <button
        @click="switchLanguage('en')"
        :class="['bg-transparent border-2 rounded-full w-9 h-9 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 p-0 flex items-center justify-center', language === 'en' ? 'border-primary-500 scale-110 shadow-md' : 'border-transparent hover:border-gray-300']"
        title="English"
        aria-label="Switch to English"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1600px-Flag_of_the_United_States.svg.png?20250221172329" 
          alt="United States Flag" 
          class="w-7 h-7 sm:w-[30px] sm:h-[30px] rounded-full shadow-sm object-cover"
        >
      </button>
    </div>
  </template>
  
  <script setup>
  const { language, switchLanguage } = useLanguage()
  </script>