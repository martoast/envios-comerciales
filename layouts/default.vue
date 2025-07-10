<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen">
      <!-- Language Toggle - Always visible -->
      <LanguageToggle />
      
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