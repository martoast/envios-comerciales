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

    <!-- Funnel Capture Popup -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="showFunnelCapture" 
          class="fixed inset-0 z-[2000] overflow-y-auto"
          @click="closeFunnelCapture"
        >
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          <!-- Modal Container -->
          <div class="flex min-h-full items-center justify-center p-4">
            <Transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0 scale-95 translate-y-4"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-4"
            >
              <div 
                v-if="showFunnelCapture"
                class="relative w-full max-w-md transform transition-all"
                @click.stop
              >
                <!-- Close Button -->
                <button
                  @click="closeFunnelCapture"
                  class="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200 group"
                  :aria-label="t.closeButton"
                >
                  <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>

                <!-- Funnel Capture Component -->
                <FunnelCapture 
                  @success="handleCaptureSuccess"
                  @error="handleCaptureError"
                />
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const route = useRoute()
const { t: createTranslations } = useLanguage()

// Check if we're on login or register page
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

// Check if we should show funnel capture (not on auth or app pages)
const shouldShowFunnelCapture = computed(() => {
  return !isAuthPage.value && !route.path.startsWith('/app')
})

const translations = {
  loginButton: {
    es: 'Iniciar Sesión',
    en: 'Login'
  },
  closeButton: {
    es: 'Cerrar',
    en: 'Close'
  }
}

const t = createTranslations(translations)

// Funnel capture state
const showFunnelCapture = ref(false)
const hasShownFunnelCapture = ref(false)

// Track scroll percentage
const scrollPercentage = ref(0)

// Track time on page
const timeOnPage = ref(0)
let timeInterval = null

// Configuration
const TIME_TRIGGER_SECONDS = 10 // Show after 10 seconds
const SCROLL_TRIGGER_PERCENTAGE = 30 // Show after 30% scroll

const calculateScrollPercentage = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrolled = window.scrollY
  const percentage = (scrolled / documentHeight) * 100
  scrollPercentage.value = Math.min(percentage, 100)
}

// Unified function to show the funnel capture
const showFunnelCapturePopup = (triggerType) => {
  if (!shouldShowFunnelCapture.value || hasShownFunnelCapture.value || showFunnelCapture.value) {
    return
  }

  console.log(`Funnel capture triggered by: ${triggerType}`)
  
  showFunnelCapture.value = true
  hasShownFunnelCapture.value = true
  
  // Save to session storage so it doesn't show again in this session
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('funnelCaptureShown', 'true')
    sessionStorage.setItem('funnelCaptureTrigger', triggerType)
  }

  // Clear the timer if it was triggered by scroll
  if (timeInterval && triggerType === 'scroll') {
    clearInterval(timeInterval)
    timeInterval = null
  }
}

const handleScroll = () => {
  // Only calculate if we should show funnel capture and haven't shown it yet
  if (!shouldShowFunnelCapture.value || hasShownFunnelCapture.value) return

  calculateScrollPercentage()

  // Show popup when user scrolls 30% of the page
  if (scrollPercentage.value >= SCROLL_TRIGGER_PERCENTAGE) {
    showFunnelCapturePopup('scroll')
  }
}

const startTimeTracking = () => {
  // Clear any existing interval
  if (timeInterval) {
    clearInterval(timeInterval)
  }

  // Reset time on page
  timeOnPage.value = 0

  // Start tracking time
  timeInterval = setInterval(() => {
    if (!shouldShowFunnelCapture.value || hasShownFunnelCapture.value) {
      clearInterval(timeInterval)
      timeInterval = null
      return
    }

    timeOnPage.value++

    // Show after configured seconds
    if (timeOnPage.value >= TIME_TRIGGER_SECONDS) {
      showFunnelCapturePopup('time')
      clearInterval(timeInterval)
      timeInterval = null
    }
  }, 1000)
}

const closeFunnelCapture = () => {
  showFunnelCapture.value = false
}

const handleCaptureSuccess = (data) => {
  console.log('Lead captured:', data)
  
  // Analytics tracking (optional)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lead_capture', {
      event_category: 'engagement',
      event_label: sessionStorage.getItem('funnelCaptureTrigger') || 'unknown'
    })
  }
  
  // Close the popup after success
  setTimeout(() => {
    closeFunnelCapture()
  }, 2000)
  
  // Save to local storage so it doesn't show again for this user
  if (typeof window !== 'undefined') {
    localStorage.setItem('funnelCaptureCompleted', 'true')
    localStorage.setItem('funnelCaptureDate', new Date().toISOString())
  }
}

const handleCaptureError = (error) => {
  console.error('Capture failed:', error)
}

// Check if user has already completed funnel capture
const checkFunnelCaptureStatus = () => {
  if (typeof window !== 'undefined') {
    // Check if user has already completed the form
    const completed = localStorage.getItem('funnelCaptureCompleted')
    if (completed) {
      hasShownFunnelCapture.value = true
      return
    }
    
    // Check if already shown in this session
    const shownInSession = sessionStorage.getItem('funnelCaptureShown')
    if (shownInSession) {
      hasShownFunnelCapture.value = true
    }
  }
}

// Watch for route changes
watch(() => route.path, (newPath, oldPath) => {
  // Reset session-based showing when navigating to a new page
  if (typeof window !== 'undefined') {
    const completed = localStorage.getItem('funnelCaptureCompleted')
    if (!completed && newPath !== oldPath) {
      // Only reset if not completed and actually changed pages
      hasShownFunnelCapture.value = false
      showFunnelCapture.value = false
      sessionStorage.removeItem('funnelCaptureShown')
      sessionStorage.removeItem('funnelCaptureTrigger')
      
      // Restart time tracking on new page
      if (shouldShowFunnelCapture.value) {
        startTimeTracking()
      }
    }
  }
})

// SEO Meta
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
  checkFunnelCaptureStatus()
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Calculate initial scroll percentage
  calculateScrollPercentage()
  
  // Start time tracking if appropriate
  if (shouldShowFunnelCapture.value && !hasShownFunnelCapture.value) {
    startTimeTracking()
  }
})

onUnmounted(() => {
  // Remove scroll listener
  window.removeEventListener('scroll', handleScroll)
  
  // Clear time interval
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
})
</script>