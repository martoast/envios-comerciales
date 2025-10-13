<!-- components/BoxSelector.vue -->
<template>
    <section class="py-4 sm:py-6 pb-24">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-6 sm:mb-8">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3 px-4">
            {{ t.selectBoxTitle }}
          </h2>
          <p class="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            {{ t.selectBoxSubtitle }}
          </p>
        </div>
  
        <!-- Loading State -->
        <div v-if="loadingProducts" class="flex flex-col items-center justify-center py-16">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <img src="/box.svg" alt="Box" class="w-8 h-8">
            </div>
          </div>
          <p class="text-gray-500 mt-4 text-sm">{{ t.loadingBoxes }}</p>
        </div>
  
        <!-- Box Selection Grid - Mobile Optimized -->
        <div v-else class="space-y-3 px-4">
          <button
            v-for="(box, index) in sortedBoxes"
            :key="box.id"
            @click="selectBox(box)"
            :class="[
              'w-full text-left rounded-2xl transition-all duration-300 animate-fadeIn',
              'active:scale-[0.98] touch-manipulation',
              modelValue === box.id 
                ? 'bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-500 shadow-lg shadow-primary-500/20' 
                : 'bg-white border-2 border-gray-200 hover:border-primary-300 hover:shadow-md'
            ]"
            :style="`animation-delay: ${index * 50}ms`"
          >
            <div class="p-4">
              <!-- Header Row -->
              <div class="flex items-start justify-between gap-3 mb-3">
                <!-- Icon & Title -->
                <div class="flex items-start gap-3 flex-1 min-w-0">
                  <!-- Box Icon -->
                  <div :class="[
                    'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    modelValue === box.id 
                      ? 'bg-primary-100' 
                      : 'bg-gray-100'
                  ]">
                    <img 
                      src="/box.svg" 
                      alt="Box" 
                      :class="[
                        'w-7 h-7 transition-all',
                        modelValue === box.id ? 'opacity-100' : 'opacity-60'
                      ]"
                    >
                  </div>
  
                  <!-- Title & Description -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-bold text-gray-900 text-base sm:text-lg truncate">
                        {{ getBoxTranslations(box).name }}
                      </h3>
                      <span v-if="index === 2" class="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {{ t.popular }}
                      </span>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {{ getBoxTranslations(box).description }}
                    </p>
                  </div>
                </div>
  
                <!-- Price Badge -->
                <div class="flex-shrink-0 text-right">
                  <div :class="[
                    'text-xl sm:text-2xl font-bold',
                    modelValue === box.id ? 'text-primary-600' : 'text-gray-900'
                  ]">
                    {{ formatPrice(getDisplayPrice(box), true) }}
                  </div>
                  <div class="text-xs text-gray-500 mt-0.5">
                    {{ language === 'en' ? 'USD' : 'MXN' }}
                  </div>
                </div>
              </div>
  
              <!-- Specs Row - Mobile Optimized -->
              <div class="flex items-center gap-3 flex-wrap">
                <!-- Dimensions Pill -->
                <div v-if="box.max_length && box.max_width && box.max_height" 
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                    modelValue === box.id 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-gray-100 text-gray-700'
                  ]"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                  </svg>
                  <span class="whitespace-nowrap">{{ box.max_length }}×{{ box.max_width }}×{{ box.max_height }} cm</span>
                </div>
  
                <!-- Weight Pill -->
                <div v-if="box.max_weight" 
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                    modelValue === box.id 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-gray-100 text-gray-700'
                  ]"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                  </svg>
                  <span class="whitespace-nowrap">{{ box.max_weight }}kg {{ t.max }}</span>
                </div>
  
                <!-- Selected Badge -->
                <div v-if="modelValue === box.id" class="ml-auto">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-full text-xs font-semibold shadow-lg">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ t.selected }}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
  
        <!-- Info Note - Mobile Optimized -->
        <div class="mt-6 mx-4">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 shadow-sm">
            <div class="flex gap-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-blue-900 mb-1">{{ t.noteTitle }}</p>
                <p class="text-xs sm:text-sm text-blue-800 leading-relaxed">{{ t.noteDescription }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Bottom Continue Banner -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <div 
          v-if="selectedBox && !loadingProducts" 
          class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50"
        >
          <div class="max-w-4xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between gap-4">
              <!-- Selected Box Info -->
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/box.svg" alt="Box" class="w-6 h-6">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-600 font-medium">{{ t.selected }}</p>
                  <p class="text-sm font-bold text-gray-900 truncate">
                    {{ getBoxTranslations(selectedBox).name }} - {{ formatPrice(getDisplayPrice(selectedBox), true) }}
                  </p>
                </div>
              </div>

              <!-- Continue Button -->
              <button
                @click="$emit('continue')"
                class="flex-shrink-0 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <span class="flex items-center gap-2">
                  {{ t.continue }}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: null
    },
    selectedBoxData: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'update:selectedBoxData', 'boxSelected', 'continue'])
  
  const { $customFetch } = useNuxtApp()
  const { t: createTranslations, language } = useLanguage()
  
  const exchangeRate = 18
  const allProducts = ref([])
  const loadingProducts = ref(true)
  
  // Filter to only show consolidated boxes
  const availableBoxes = computed(() => {
    return allProducts.value.filter(product => product.consolidated === 'true')
  })
  
  // Sort boxes by max_weight (smallest to largest)
  const sortedBoxes = computed(() => {
    return [...availableBoxes.value].sort((a, b) => {
      const weightA = parseFloat(a.max_weight) || 0
      const weightB = parseFloat(b.max_weight) || 0
      return weightA - weightB
    })
  })
  
  const selectedBox = computed(() => {
    if (props.selectedBoxData) return props.selectedBoxData
    return availableBoxes.value.find(box => box.id === props.modelValue)
  })
  
  const selectBox = (box) => {
    emit('update:modelValue', box.id)
    emit('update:selectedBoxData', box)
    emit('boxSelected', box)
  }
  
  const clearSelection = () => {
    emit('update:modelValue', null)
    emit('update:selectedBoxData', null)
  }
  
  const getDisplayPrice = (box) => {
    const priceMXN = box.price
    const priceUSD = priceMXN / exchangeRate
    return language.value === 'en' ? priceUSD : priceMXN
  }
  
  const formatPrice = (amount, compact = false) => {
    if (compact) {
      return `$${Math.round(amount).toLocaleString('en-US')}`
    }
    const currency = language.value === 'en' ? 'USD' : 'MXN'
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
  }
  
  const translations = {
    selectBoxTitle: {
      es: 'Selecciona el Tamaño de Caja',
      en: 'Select Box Size'
    },
    selectBoxSubtitle: {
      es: 'Elige el tamaño que mejor se ajuste a tus productos',
      en: 'Choose the size that best fits your products'
    },
    currentSelection: {
      es: 'Seleccionado',
      en: 'Selected'
    },
    changeBox: {
      es: 'Cambiar',
      en: 'Change'
    },
    loadingBoxes: {
      es: 'Cargando opciones...',
      en: 'Loading options...'
    },
    max: {
      es: 'máx',
      en: 'max'
    },
    selected: {
      es: 'Seleccionado',
      en: 'Selected'
    },
    popular: {
      es: 'Popular',
      en: 'Popular'
    },
    continue: {
      es: 'Continuar',
      en: 'Continue'
    },
    noteTitle: {
      es: 'Nota importante',
      en: 'Important note'
    },
    noteDescription: {
      es: 'El tamaño de caja es una estimación inicial. Nuestro equipo ajustará al tamaño óptimo cuando tus paquetes lleguen.',
      en: 'Box size is an initial estimate. Our team will adjust to the optimal size when your packages arrive.'
    },
    smallBoxName: { es: 'Caja Pequeña', en: 'Small Box' },
    smallBoxDescription: { es: 'Libros, cosméticos, electrónicos pequeños', en: 'Books, cosmetics, small electronics' },
    mediumBoxName: { es: 'Caja Mediana', en: 'Medium Box' },
    mediumBoxDescription: { es: 'Ropa, zapatos, artículos deportivos', en: 'Clothing, shoes, sports gear' },
    largeBoxName: { es: 'Caja Grande', en: 'Large Box' },
    largeBoxDescription: { es: 'Electrodomésticos, decoración, consolas', en: 'Appliances, decor, gaming consoles' },
    extraSmallBoxName: { es: 'Caja Extra Pequeña', en: 'Extra Small Box' },
    extraSmallBoxDescription: { es: 'Joyería, documentos, accesorios ligeros', en: 'Jewelry, documents, light accessories' },
    extraLargeBoxName: { es: 'Caja Extra Grande', en: 'Extra Large Box' },
    extraLargeBoxDescription: { es: 'Muebles pequeños, equipos grandes', en: 'Small furniture, large equipment' }
  }
  
  const t = createTranslations(translations)
  
  const getBoxTranslations = (box) => {
    if (!box) return { name: '', description: '' }
    
    const typeMapping = {
      'Extra Small Box': { name: t.value.extraSmallBoxName, description: t.value.extraSmallBoxDescription },
      'Small Box': { name: t.value.smallBoxName, description: t.value.smallBoxDescription },
      'Medium Box': { name: t.value.mediumBoxName, description: t.value.mediumBoxDescription },
      'Large Box': { name: t.value.largeBoxName, description: t.value.largeBoxDescription },
      'Extra Large Box': { name: t.value.extraLargeBoxName, description: t.value.extraLargeBoxDescription }
    }
    
    return typeMapping[box.name] || { name: box.name, description: box.description }
  }
  
  const fetchProducts = async () => {
    try {
      loadingProducts.value = true
      const response = await $customFetch('/products')
      allProducts.value = response.data
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      loadingProducts.value = false
    }
  }
  
  onMounted(() => {
    fetchProducts()
  })
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
    opacity: 0;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>