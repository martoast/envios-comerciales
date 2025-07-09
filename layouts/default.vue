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
  // Initialize language on layout mount
  const { initializeLanguage } = useLanguage()
  
  onMounted(() => {
    initializeLanguage()
  })
  </script>