<template>
    <TransitionRoot
      :show="show"
      enter="transition ease-out duration-300"
      enter-from="opacity-0 translate-y-4"
      enter-to="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 translate-y-4"
      @after-enter="handleAfterEnter"
    >
      <div class="relative">
        <!-- Dynamic background color based on status -->
        <div :class="[
          'relative rounded-xl sm:rounded-2xl shadow-lg overflow-hidden',
          getBannerColor()
        ]">
          <!-- Content -->
          <div class="relative p-4 sm:p-6">
            <!-- Close button -->
            <button
              @click="$emit('dismiss')"
              class="absolute top-3 right-3 sm:top-4 sm:right-4
                     w-8 h-8 flex items-center justify-center
                     text-white/60 hover:text-white
                     rounded-lg transition-colors duration-200"
              :aria-label="t.close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
  
            <!-- Main Content -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:gap-4">
              <!-- Icon -->
              <div class="flex justify-center sm:justify-start mb-3 sm:mb-0">
                <div class="p-3 bg-white/20 rounded-xl">
                  <StatusIcon />
                </div>
              </div>
  
              <!-- Text -->
              <div class="flex-1 text-center sm:text-left pr-0 sm:pr-8">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                  {{ getTitle() }}
                </h3>
                <p class="text-sm sm:text-base text-white/90 leading-relaxed">
                  {{ getMessage() }}
                </p>
  
                <!-- Info Box -->
                <div v-if="getNextSteps()" class="mt-4 bg-white/10 rounded-lg p-3 sm:p-4">
                  <p class="text-sm font-medium text-white mb-1">
                    {{ getNextSteps().title }}
                  </p>
                  <p class="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {{ getNextSteps().message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { TransitionRoot } from '@headlessui/vue'
  import { computed, h, onMounted } from 'vue'
  
  // Get confetti from Nuxt app
  const { $confetti } = useNuxtApp()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // Define props
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      required: true
    },
    trigger: {
      type: String,
      default: 'auto' // 'auto', 'just_completed', 'status_change'
    }
  })
  
  // Define emits
  defineEmits(['dismiss'])
  
  // Define translations
  const translations = {
    close: {
      es: 'Cerrar',
      en: 'Close'
    },
    // Collecting status
    collectingTitle: {
      es: '¡Orden Creada! 🎉',
      en: 'Order Created! 🎉'
    },
    collectingMessage: {
      es: 'Tu orden ha sido creada exitosamente. Ahora puedes agregar los productos que compraste.',
      en: 'Your order has been created successfully. Now you can add the products you purchased.'
    },
    collectingNextTitle: {
      es: '¿Qué sigue?',
      en: 'What\'s next?'
    },
    collectingNextMessage: {
      es: 'Agrega los productos que compraste para completar tu orden.',
      en: 'Add the products you purchased to complete your order.'
    },
    // Awaiting packages status
    awaitingTitle: {
      es: '¡Orden Completada! 🎉',
      en: 'Order Completed! 🎉'
    },
    awaitingMessage: {
      es: 'Tu orden está lista para recibir tus paquetes. Te notificaremos cuando cada uno llegue a nuestro almacén.',
      en: 'Your order is ready to receive your packages. We\'ll notify you as each one arrives at our warehouse.'
    },
    awaitingNextTitle: {
      es: '¿Qué sigue?',
      en: 'What happens next?'
    },
    awaitingNextMessage: {
      es: 'Rastrea tus paquetes mientras viajan a nuestro almacén. Una vez que todos lleguen, los consolidaremos y enviaremos a tu dirección en México.',
      en: 'Track your packages as they travel to our warehouse. Once they all arrive, we\'ll consolidate them and ship to your address in Mexico.'
    },
    // Packages complete status
    packagesCompleteTitle: {
      es: '¡Todos tus paquetes han llegado! 📦',
      en: 'All your packages have arrived! 📦'
    },
    packagesCompleteMessage: {
      es: 'Hemos recibido todos tus paquetes en nuestro almacén. Estamos preparando tu envío.',
      en: 'We\'ve received all your packages at our warehouse. We\'re preparing your shipment.'
    },
    packagesCompleteNextTitle: {
      es: '¿Qué sigue?',
      en: 'What\'s next?'
    },
    packagesCompleteNextMessage: {
      es: 'Consolidaremos tus paquetes y te enviaremos todo a tu Dirección de Entrega.',
      en: 'We\'ll consolidate your packages and ship everything to your Delivery Address.'
    },
    // Shipped status
    shippedTitle: {
      es: '¡Tu paquete está en camino! 🚚',
      en: 'Your package is on its way! 🚚'
    },
    shippedMessage: {
      es: 'Tu paquete salió de nuestro almacén y está en camino a tu Dirección de Entrega.',
      en: 'Your package has left our warehouse and is on its way to your Delivery Address.'
    },
    shippedNextTitle: {
      es: 'Información de rastreo',
      en: 'Tracking information'
    },
    shippedNextMessage: {
      es: 'Pronto recibirás el número de guía para rastrear tu paquete con el transportista en México.',
      en: 'You\'ll soon receive the tracking number to track your package with the carrier in Mexico.'
    },
    // Delivered status
    deliveredTitle: {
      es: '¡Paquete Entregado! ✅',
      en: 'Package Delivered! ✅'
    },
    deliveredMessage: {
      es: 'Tu paquete ha sido entregado exitosamente en tu dirección.',
      en: 'Your package has been successfully delivered to your address.'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Status configurations
  const statusConfigs = {
    collecting: {
      color: 'bg-primary-500',
      icon: 'DocumentPlusIcon',
      confetti: false
    },
    awaiting_packages: {
      color: 'bg-green-500',
      icon: 'CheckCircleIcon',
      confetti: true
    },
    packages_complete: {
      color: 'bg-primary-500',
      icon: 'CubeIcon',
      confetti: true
    },
    shipped: {
      color: 'bg-primary-600',
      icon: 'TruckIcon',
      confetti: false
    },
    delivered: {
      color: 'bg-green-500',
      icon: 'CheckBadgeIcon',
      confetti: true
    }
  }
  
  // Get banner color based on status
  const getBannerColor = () => {
    return statusConfigs[props.order?.status]?.color || 'bg-gray-600'
  }
  
  // Get appropriate title
  const getTitle = () => {
    const status = props.order?.status || 'collecting'
    const titleKey = {
      collecting: 'collectingTitle',
      awaiting_packages: 'awaitingTitle',
      packages_complete: 'packagesCompleteTitle',
      shipped: 'shippedTitle',
      delivered: 'deliveredTitle'
    }[status]
    
    return t.value[titleKey] || ''
  }
  
  // Get appropriate message
  const getMessage = () => {
    const status = props.order?.status || 'collecting'
    
    // For delivered status, only show if it was recently delivered
    if (status === 'delivered' && props.trigger === 'auto') {
      const deliveredAt = new Date(props.order.delivered_at)
      const now = new Date()
      const hoursSinceDelivery = (now - deliveredAt) / 1000 / 60 / 60
      
      // Don't show generic delivered message if it's been more than 24 hours
      if (hoursSinceDelivery > 24) {
        return ''
      }
    }
    
    const messageKey = {
      collecting: 'collectingMessage',
      awaiting_packages: 'awaitingMessage',
      packages_complete: 'packagesCompleteMessage',
      shipped: 'shippedMessage',
      delivered: 'deliveredMessage'
    }[status]
    
    return t.value[messageKey] || ''
  }
  
  // Get next steps
  const getNextSteps = () => {
    const status = props.order?.status || 'collecting'
    
    // No next steps for delivered
    if (status === 'delivered') return null
    
    const nextStepsKeys = {
      collecting: {
        title: 'collectingNextTitle',
        message: 'collectingNextMessage'
      },
      awaiting_packages: {
        title: 'awaitingNextTitle',
        message: 'awaitingNextMessage'
      },
      packages_complete: {
        title: 'packagesCompleteNextTitle',
        message: 'packagesCompleteNextMessage'
      },
      shipped: {
        title: 'shippedNextTitle',
        message: 'shippedNextMessage'
      }
    }
    
    const keys = nextStepsKeys[status]
    if (!keys) return null
    
    return {
      title: t.value[keys.title],
      message: t.value[keys.message]
    }
  }
  
  // Get status icon component
  const StatusIcon = computed(() => {
    const status = props.order?.status || 'collecting'
    const iconName = statusConfigs[status]?.icon || 'CheckCircleIcon'
    
    // Return a functional component that renders the appropriate SVG
    return () => h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      class: 'w-8 h-8 text-white'
    }, [
      iconName === 'DocumentPlusIcon' ? h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      }) : iconName === 'CubeIcon' ? h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
      }) : iconName === 'TruckIcon' ? h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
      }) : iconName === 'CheckBadgeIcon' ? h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
      }) : h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  })
  
  // Trigger confetti on mount for awaiting_packages with completed_at
  onMounted(() => {
    if (props.show && props.order?.status === 'awaiting_packages' && props.order?.completed_at) {
      setTimeout(() => {
        $confetti()
      }, 300) // Small delay for banner animation
    }
  })
  
  // Handle after enter transition (keep empty)
  const handleAfterEnter = () => {
    // Empty
  }
  </script>