<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen">
    <!-- Top Right Controls -->
    <div class="fixed top-4 right-4 sm:top-5 sm:right-5 z-[1001] flex items-center gap-3">
      <!-- Login Button - Hidden on login/register pages -->
      <NuxtLink 
        v-if="!isAuthPage"
        to="/login" 
        class="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-all duration-200"
      >
        {{ t.loginButton }}
      </NuxtLink>
      
      <!-- Language Toggle -->
      <LanguageToggle />
    </div>
    
    <!-- Page Content -->
    <slot />
  </div>
</template>
  
<script setup>
const route = useRoute()
const { t: createTranslations } = useLanguage()

// Check if we're on login or register page
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

const translations = {
  loginButton: {
    es: 'Iniciar Sesión',
    en: 'Login'
  }
}

const t = createTranslations(translations)

useSeoMeta({
  title: 'Envios Comerciales TJ - Compra en cualquier tienda del mundo y recíbelo en México',
  ogTitle: 'Envios Comerciales TJ - Compra en cualquier tienda del mundo y recíbelo en México',
  description: 'Compra en cualquier tienda del mundo y recíbelo en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.',
  ogDescription: 'Compra en cualquier tienda del mundo y recíbelo en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.',
  ogImage: '/logo.jpeg',
  twitterCard: 'summary_large_image',
})

// Initialize language on layout mount
const { initializeLanguage } = useLanguage()

onMounted(() => {
  initializeLanguage()
})
</script>