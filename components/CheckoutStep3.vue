<template>
    <div class="animate-fadeIn">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <!-- Declared Value Section -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">
            {{ t.declaredValueSubtitle }}
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ t.declaredValueDescription }}
          </p>
  
          <div>
            <label for="declared_value" class="block text-sm font-semibold text-gray-900 mb-2">
              {{ t.totalDeclaredValue }}
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                :value="declaredValue"
                @input="$emit('update:declaredValue', parseFloat($event.target.value) || 0)"
                type="number"
                id="declared_value"
                min="1"
                max="99999"
                step="0.01"
                class="pl-8 w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
                required
              />
            </div>
            <p class="text-xs text-gray-500 mt-2">
              {{ t.declaredValueWarning }}
            </p>
          </div>
  
          <!-- IVA Calculation Display -->
          <div v-if="declaredValue && declaredValue > 0" class="mt-4 pt-4 border-t border-yellow-200">
            <div v-if="declaredValue >= 50" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ t.ivaLabel }}:</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(ivaAmountDisplay) }}</span>
              </div>
              <!-- Exchange Rate Info -->
              <div v-if="language === 'es'" class="text-xs text-gray-500 text-right">
                {{ t.exchangeRateInfo }}
              </div>
            </div>
            <div v-else class="text-sm text-green-600 font-medium">
              {{ t.noIvaRequired }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation -->
      <div class="flex justify-between mt-6">
        <button
          type="button"
          @click="$emit('previous')"
          class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
        >
          <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          {{ t.back }}
        </button>
  
        <button
          type="button"
          @click="$emit('next')"
          :disabled="!declaredValue"
          class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {{ t.continue }}
          <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    declaredValue: Number,
    language: String,
    exchangeRate: Number,
    t: Object,
  });
  
  const emit = defineEmits(['update:declaredValue', 'previous', 'next']);
  
  const ivaAmount = computed(() => {
    return props.declaredValue && props.declaredValue >= 50 ? props.declaredValue * 0.16 : 0;
  });
  
  const ivaAmountDisplay = computed(() => {
    const baseIva = ivaAmount.value;
    return props.language === "en" ? baseIva : baseIva * props.exchangeRate;
  });
  
  const formatPrice = (amount) => {
    const currency = props.language === "en" ? "USD" : "MXN";
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${currency}`;
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