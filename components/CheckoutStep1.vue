<template>
    <div class="animate-fadeIn">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 sm:p-6 lg:p-8">
          <!-- Loading State -->
          <div v-if="loadingProducts" class="flex items-center justify-center py-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
              <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
  
          <!-- Box Options - Mobile Optimized -->
          <div v-else class="space-y-3 sm:space-y-4">
            <label
              v-for="box in availableBoxes"
              :key="box.id"
              :class="[
                'relative block cursor-pointer rounded-xl border-2 p-4 sm:p-5 transition-all duration-200',
                selectedBox?.id === box.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white',
              ]"
            >
              <input
                type="radio"
                name="box"
                :value="box.id"
                :checked="selectedBox?.id === box.id"
                @change="$emit('update:selectedBoxId', box.id)"
                class="sr-only"
              />
  
              <!-- Mobile Layout -->
              <div class="sm:hidden">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <img src="/logo.svg" alt="ECTJ" class="w-10 h-10 flex-shrink-0" />
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ getBoxTranslations(box).name }}
                      </h3>
                      <div class="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        <span>{{ box.dimensions || box.metadata?.dimensions }}</span>
                        <span v-if="box.max_weight || box.metadata?.max_weight">
                          • {{ t.upTo }} {{ box.max_weight || box.metadata?.max_weight }}kg
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="selectedBox?.id === box.id" class="flex-shrink-0">
                    <CheckCircleIcon class="w-6 h-6 text-primary-500" />
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-3">
                  {{ getBoxTranslations(box).description }}
                </p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-bold text-primary-600">
                    {{ formatPrice(getDisplayPrice(box)) }}
                  </p>
                  <p v-if="language === 'en'" class="text-xs text-gray-500">
                    ≈ ${{ box.price.toLocaleString() }} MXN
                  </p>
                </div>
              </div>
  
              <!-- Desktop/Tablet Layout -->
              <div class="hidden sm:block">
                <div class="flex items-start gap-4">
                  <!-- Logo and Selection Indicator -->
                  <div class="relative flex-shrink-0">
                    <img src="/logo.svg" alt="ECTJ" class="w-14 h-14 lg:w-16 lg:h-16" />
                    <div
                      v-if="selectedBox?.id === box.id"
                      class="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <CheckIcon class="w-4 h-4 text-white" />
                    </div>
                  </div>
  
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">
                          {{ getBoxTranslations(box).name }}
                        </h3>
                        <p class="text-sm text-gray-600 mb-3">
                          {{ getBoxTranslations(box).description }}
                        </p>
                        <div class="flex flex-wrap gap-4 text-sm">
                          <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span class="text-gray-700">{{ box.dimensions || box.metadata?.dimensions }}</span>
                          </div>
                          <div v-if="box.max_weight || box.metadata?.max_weight" class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            <span class="text-gray-700">{{ t.upTo }} {{ box.max_weight || box.metadata?.max_weight }}kg</span>
                          </div>
                        </div>
                      </div>
  
                      <!-- Price -->
                      <div class="text-right flex-shrink-0">
                        <p class="text-2xl font-bold text-primary-600">
                          {{ formatPrice(getDisplayPrice(box)) }}
                        </p>
                        <p v-if="language === 'en'" class="text-xs text-gray-500 mt-1">
                          ≈ ${{ box.price.toLocaleString() }} MXN
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
  
          <!-- Size Guide - Mobile Optimized -->
          <div class="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
            <div class="flex gap-3">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1 text-sm text-primary-800">
                <p class="font-medium mb-1">{{ t.needHelp }}</p>
                <p class="text-xs sm:text-sm mb-3">{{ t.helpText }}</p>
  
                <!-- Contact Options -->
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <a
                    href="https://wa.me/16195591910"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-700 hover:text-primary-900"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.98-3.686c-.592-1.02-.9-2.176-.898-3.358.002-3.808 3.105-6.912 6.913-6.912 3.809 0 6.913 3.104 6.913 6.913s-3.104 6.923-6.913 6.923z" />
                    </svg>
                    {{ t.contactWhatsApp }}
                  </a>
  
                  <a
                    href="mailto:envioscomercialestj@gmail.com"
                    class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-700 hover:text-primary-900"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ t.contactEmail }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation - Mobile Optimized -->
      <div class="flex justify-end mt-4 sm:mt-6">
        <button
          type="button"
          @click="$emit('next')"
          :disabled="!selectedBox"
          :class="[
            'w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2',
            selectedBox
              ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-xl sm:hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          ]"
        >
          {{ t.continue }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { CheckCircleIcon, CheckIcon } from "@heroicons/vue/24/solid";
  
  const props = defineProps({
    availableBoxes: Array,
    selectedBoxId: [String, Number],
    loadingProducts: Boolean,
    exchangeRate: Number,
    language: String,
    t: Object,
  });
  
  const emit = defineEmits(['update:selectedBoxId', 'next']);
  
  const selectedBox = computed(() => {
    return props.availableBoxes.find((box) => box.id === props.selectedBoxId);
  });
  
  const getDisplayPrice = (box) => {
    if (!box) return 0;
    const priceMXN = box.price;
    const priceUSD = priceMXN / props.exchangeRate;
    return props.language === "en" ? priceUSD : priceMXN;
  };
  
  const formatPrice = (amount) => {
    const currency = props.language === "en" ? "USD" : "MXN";
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency}`;
  };
  
  const getBoxTranslations = (box) => {
    if (!box) return { name: "", description: "" };
  
    const typeMapping = {
      "extra-small": {
        name: props.t.extraSmallBoxName,
        description: props.t.extraSmallBoxDesc,
      },
      small: {
        name: props.t.smallBoxName,
        description: props.t.smallBoxDesc,
      },
      medium: {
        name: props.t.mediumBoxName,
        description: props.t.mediumBoxDesc,
      },
      large: {
        name: props.t.largeBoxName,
        description: props.t.largeBoxDesc,
      },
      "extra-large": {
        name: props.t.extraLargeBoxName,
        description: props.t.extraLargeBoxDesc,
      },
    };
  
    const boxType = box.type || box.metadata?.type;
    return typeMapping[boxType] || { name: box.name, description: box.description };
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  </style>