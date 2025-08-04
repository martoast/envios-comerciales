<template>
    <section class="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-8 sm:mb-10 lg:mb-12">
          <h3 class="text-base sm:text-lg font-semibold text-gray-700">
            {{ t.logosHeader }}
          </h3>
        </div>
        
        <!-- Carousel Container -->
        <div class="relative">
          <!-- Gradient Overlays -->
          <div class="absolute left-0 top-0 w-8 sm:w-16 md:w-24 lg:w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 top-0 w-8 sm:w-16 md:w-24 lg:w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          <!-- Scrollable Container -->
          <div 
            ref="scrollContainer"
            class="flex overflow-x-auto scrollbar-hide"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @touchstart="handleTouch"
            @touchmove="handleTouch"
            @touchend="stopTouch"
          >
            <!-- Logo Track with continuous animation -->
            <div 
              ref="logoTrack"
              class="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 animate-scroll"
              :class="{ 'pause-animation': isDragging }"
            >
              <!-- First set of logos -->
              <div 
                v-for="(logo, index) in logos" 
                :key="`logo-1-${index}`"
                class="flex-shrink-0"
              >
                <img 
                  :src="logo.src" 
                  :alt="logo.alt"
                  class="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 select-none"
                  loading="lazy"
                  draggable="false"
                >
              </div>
              
              <!-- Duplicate set for seamless loop -->
              <div 
                v-for="(logo, index) in logos" 
                :key="`logo-2-${index}`"
                class="flex-shrink-0"
              >
                <img 
                  :src="logo.src" 
                  :alt="logo.alt"
                  class="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 select-none"
                  loading="lazy"
                  draggable="false"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // Translations
  const translations = {
    logosHeader: {
      es: 'Compra en las Mejores Tiendas de Estados Unidos',
      en: 'Shop from Top US Retailers'
    }
  }
  
  const t = createTranslations(translations)
  
  // Logo data
  const logos = [
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/21afeea318a64a71bcb1dbd3ef27ffec/shein-logo.png',
      alt: 'SHEIN'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/c7378301189a420a8648cdc317dad98b/sephora.png',
      alt: 'Sephora'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/4342cf740e1d4c809a5266f006012ffc/macys-logo.png',
      alt: "Macy's"
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/9b11fc458968411b972a0f7df9e42c67/apple-logo.png',
      alt: 'Apple'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/22ea4c4db5df4d4fbb4f5067de096869/shop-disney-logo.png',
      alt: 'Disney'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/9c6f199c00bc41a8ba335347cbb4ac66/ready-edit-nordstrom-logo-transparent-2.png',
      alt: 'Nordstrom'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/3706eb76defa4368bf0c8b1d738b3456/amazon-logo.png',
      alt: 'Amazon'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/7569832f95cb49f8af42a2aa4c4adc8d/walmart-logo.png',
      alt: 'Walmart'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/fbd77ea07e224a73b1fecf4137d7ba78/ebay-logo.png',
      alt: 'eBay'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/f3ffc5a464e94ff89d4405d026923c27/bath-body-works.png',
      alt: 'Bath & Body Works'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/3e5ad2a7062640a1a4fee03f0004ebbe/gap.png',
      alt: 'Gap'
    },
    {
      src: 'https://static.nc-myus.com/images/pub/www/uploads/image/774f8d281cfe45ef81f7882de1599be2/carters-logo-120x120.png',
      alt: "Carter's"
    }
  ]
  
  // Refs and state
  const scrollContainer = ref(null)
  const logoTrack = ref(null)
  const isDragging = ref(false)
  const startX = ref(0)
  const scrollLeft = ref(0)
  
  // Mouse drag handlers
  const startDrag = (e) => {
    isDragging.value = true
    startX.value = e.pageX - scrollContainer.value.offsetLeft
    scrollLeft.value = scrollContainer.value.scrollLeft
    scrollContainer.value.style.cursor = 'grabbing'
  }
  
  const onDrag = (e) => {
    if (!isDragging.value) return
    e.preventDefault()
    const x = e.pageX - scrollContainer.value.offsetLeft
    const walk = (x - startX.value) * 2
    scrollContainer.value.scrollLeft = scrollLeft.value - walk
  }
  
  const endDrag = () => {
    isDragging.value = false
    scrollContainer.value.style.cursor = 'grab'
  }
  
  // Touch handlers
  const handleTouch = (e) => {
    isDragging.value = true
  }
  
  const stopTouch = () => {
    isDragging.value = false
  }
  
  // Initialize cursor
  onMounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.style.cursor = 'grab'
    }
  })
  </script>
  
  <style scoped>
  /* Hide scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Continuous scroll animation */
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll {
    animation: scroll 40s linear infinite;
  }
  
  /* Pause animation when dragging or hovering */
  .animate-scroll:hover,
  .animate-scroll.pause-animation {
    animation-play-state: paused;
  }
  
  /* Smooth animation */
  .animate-scroll {
    will-change: transform;
  }
  </style>