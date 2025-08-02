<template>
    <div class="animate-fadeIn">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Simple Header -->
        <div class="border-b border-gray-200 px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ t.orderOverview }}
          </h2>
          <p class="text-sm text-gray-600">{{ t.reviewBeforePayment }}</p>
        </div>
  
        <!-- Content -->
        <div class="p-6">
          <!-- Order Details Section -->
          <div class="space-y-6">
            <!-- Box Details -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                {{ t.orderDetails }}
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-gray-900 font-medium">
                      {{ getBoxTranslations(selectedBox).name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedBox?.dimensions || selectedBox?.metadata?.dimensions }}
                    </p>
                  </div>
                  <p class="text-gray-900 font-medium">
                    {{ formatPrice(getDisplayPrice(selectedBox)) }}
                  </p>
                </div>
              </div>
            </div>
  
            <!-- Divider -->
            <div class="border-t border-gray-200"></div>
  
            <!-- Addresses -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Ship To -->
              <div>
                <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  {{ t.shipTo }}
                  <span v-if="isRural" class="ml-2 text-xs font-normal text-orange-600">({{ t.ruralArea }})</span>
                </h3>
                <div class="text-sm text-gray-700 space-y-1">
                  <p>
                    {{ deliveryAddress.street }}
                    {{ deliveryAddress.exterior_number }}{{ deliveryAddress.interior_number ? ` Int. ${deliveryAddress.interior_number}` : "" }}
                  </p>
                  <p>
                    {{ deliveryAddress.colonia }}, {{ deliveryAddress.municipio }}
                  </p>
                  <p>
                    {{ deliveryAddress.estado }} {{ deliveryAddress.postal_code }}
                  </p>
                  <p v-if="deliveryAddress.referencias" class="text-gray-500 italic">
                    {{ deliveryAddress.referencias }}
                  </p>
                </div>
              </div>
            </div>
  
            <!-- Divider -->
            <div class="border-t border-gray-200"></div>
  
            <!-- Price Breakdown -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                {{ t.priceBreakdown }}
              </h3>
              <!-- Exchange Rate Info Box -->
              <div v-if="language === 'es'" class="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3">
                <p class="text-xs text-blue-700 font-medium">
                  {{ t.exchangeRateInfo }}
                </p>
              </div>
              <div class="space-y-2">
                <!-- Box Price -->
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ getBoxTranslations(selectedBox).name }}</span>
                  <span class="text-gray-900">{{ formatPrice(getDisplayPrice(selectedBox)) }}</span>
                </div>
  
                <!-- IVA if applicable -->
                <div v-if="declaredValue && declaredValue >= 50" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ t.ivaLabel }}</span>
                  <span class="text-gray-900">{{ formatPrice(ivaAmountDisplay) }}</span>
                </div>
  
                <!-- Rural Surcharge if applicable -->
                <div v-if="isRural && ruralSurcharge" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ t.ruralDeliveryFee }}</span>
                  <span class="text-gray-900">{{ formatPrice(language === "en" ? ruralSurcharge.price / exchangeRate : ruralSurcharge.price) }}</span>
                </div>
  
                <!-- Total Line -->
                <div class="border-t border-gray-200 pt-3 mt-3">
                  <div class="flex justify-between">
                    <span class="text-base font-semibold text-gray-900">{{ t.total }}</span>
                    <span class="text-base font-semibold text-gray-900">{{ formatPrice(totalAmount) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation -->
      <div class="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <button
          type="button"
          @click="$emit('previous')"
          class="order-2 sm:order-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          {{ t.back }}
        </button>
  
        <button
          type="submit"
          @click="$emit('submit')"
          :disabled="loading || !isFormValid"
          class="order-1 sm:order-2 px-8 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? t.processing : t.proceedToPayment }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    selectedBox: Object,
    deliveryAddress: Object,
    declaredValue: Number,
    isRural: Boolean,
    ruralSurcharge: Object,
    loading: Boolean,
    isFormValid: Boolean,
    language: String,
    exchangeRate: Number,
    t: Object,
  });
  
  const emit = defineEmits(['previous', 'submit']);
  
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
  
  const ivaAmount = computed(() => {
    return props.declaredValue && props.declaredValue >= 50 ? props.declaredValue * 0.16 : 0;
  });
  
  const ivaAmountDisplay = computed(() => {
    const baseIva = ivaAmount.value;
    return props.language === "en" ? baseIva : baseIva * props.exchangeRate;
  });
  
  const totalAmount = computed(() => {
    const boxPrice = props.selectedBox ? getDisplayPrice(props.selectedBox) : 0;
    const rural = props.isRural && props.ruralSurcharge 
      ? props.language === "en" 
        ? props.ruralSurcharge.price / props.exchangeRate 
        : props.ruralSurcharge.price 
      : 0;
    const iva = props.language === "en" ? ivaAmount.value : ivaAmount.value * props.exchangeRate;
    return boxPrice + iva + rural;
  });
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