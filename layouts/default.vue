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

  // useSeoMeta({
  //   title: '',
  //   ogTitle: '',
  //   description: '',
  //   ogDescription: '',
  //   ogImage: '',
  //   twitterCard: 'summary_large_image',
  // })
  // Initialize language on layout mount
  const { initializeLanguage } = useLanguage()
  
  onMounted(() => {
    initializeLanguage()
  })
  </script>