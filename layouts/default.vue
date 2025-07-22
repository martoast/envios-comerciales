<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen">
      <!-- Language Toggle - Always visible -->
      <LanguageToggle class="fixed top-4 right-4 sm:top-5 sm:right-5 z-[1001]" />
      
      <!-- Page Content -->
      <slot />
    </div>
  </template>
  
  <script setup>

  useSeoMeta({
    title: 'Envios Comerciales TJ - Compra en cualquier parte del mundo y recibe en México',
    ogTitle: 'Envios Comerciales TJ - Compra en cualquier parte del mundo y recibe en México',
    description: 'Compra en cualquier parte del mundo y recibe en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.',
    ogDescription: 'Compra en cualquier parte del mundo y recibe en México. Te damos un domicilio en USA, consolidamos tus paquetes y enviamos a todo México al mejor precio.',
    ogImage: '/logo.jpeg',
    twitterCard: 'summary_large_image',
  })


  // Initialize language on layout mount
  const { initializeLanguage } = useLanguage()
  
  onMounted(() => {
    initializeLanguage()
  })
  </script>