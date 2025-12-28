<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="handleClose">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-400"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-400"
            enter-from="opacity-0 translate-y-full sm:translate-y-8 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-300"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-full sm:translate-y-8 sm:scale-95"
          >
            <DialogPanel class="onboarding-modal w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

              <!-- Header with decorative background -->
              <div class="relative px-6 pt-8 pb-6 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
                <!-- Decorative elements -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <!-- Mobile drag indicator -->
                <div class="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full"></div>

                <!-- Header content -->
                <div class="relative">
                  <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center animate-float">
                    <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 class="text-2xl sm:text-2xl font-bold text-white text-center mb-2">
                    {{ t.title }}
                  </h2>
                  <p class="text-primary-100 text-center text-sm leading-relaxed max-w-xs mx-auto mb-3">
                    {{ t.subtitle }}
                  </p>
                  <!-- Fee Badge -->
                  <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur rounded-full text-xs font-medium text-white">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t.feeNote }}
                  </div>
                </div>
              </div>

              <!-- Steps -->
              <div class="px-6 py-6 space-y-0">
                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="step-item relative flex gap-4"
                  :style="{ animationDelay: `${200 + index * 100}ms` }"
                >
                  <!-- Timeline connector -->
                  <div class="flex flex-col items-center">
                    <div
                      class="step-icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      :class="step.colorClass"
                    >
                      <component :is="step.icon" class="w-5 h-5" />
                    </div>
                    <div
                      v-if="index < steps.length - 1"
                      class="w-0.5 flex-1 my-2 bg-gradient-to-b from-gray-200 to-gray-100 rounded-full min-h-[24px]"
                    ></div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 pb-6" :class="{ 'pb-0': index === steps.length - 1 }">
                    <h3 class="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {{ step.title }}
                    </h3>
                    <p class="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 pb-6 pt-2">
                <!-- Don't show again checkbox -->
                <label class="flex items-center gap-3 mb-5 cursor-pointer group">
                  <div class="relative">
                    <input
                      type="checkbox"
                      v-model="dontShowAgain"
                      class="peer sr-only"
                    >
                    <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-primary-500 peer-checked:bg-primary-500 transition-all duration-200 flex items-center justify-center group-hover:border-primary-400">
                      <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span class="text-sm text-gray-600">{{ t.dontShowAgain }}</span>
                </label>

                <!-- CTA Button -->
                <button
                  @click="handleClose"
                  class="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-base"
                >
                  {{ t.gotIt }}
                </button>

                
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, h } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const { t: createTranslations } = useLanguage();

// Use Nuxt's useCookie for SSR-friendly persistent storage
const onboardingDismissed = useCookie('boxly_assisted_purchase_onboarding_dismissed', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  default: () => false
});

const dontShowAgain = ref(false);

const translations = {
  title: {
    es: 'Compra Asistida',
    en: 'Assisted Purchase'
  },
  subtitle: {
    es: '¿La tienda no acepta tu tarjeta mexicana? Nosotros compramos por ti',
    en: "Store doesn't accept your Mexican card? We buy for you"
  },
  step1Title: {
    es: 'Envía los Enlaces',
    en: 'Send Product Links'
  },
  step1Desc: {
    es: 'Pega los enlaces de los productos que deseas de tiendas como Amazon, eBay, y más',
    en: 'Paste links to products you want from stores like Amazon, eBay, and more'
  },
  step2Title: {
    es: 'Te Cotizamos en Pesos',
    en: 'We Quote You in Pesos'
  },
  step2Desc: {
    es: 'Calculamos el costo total en MXN: producto + impuestos USA + 8% de servicio. Sin sorpresas',
    en: 'We calculate the total in MXN: product + US taxes + 8% service fee. No surprises'
  },
  step3Title: {
    es: 'Deposita y Compramos',
    en: 'Deposit & We Buy'
  },
  step3Desc: {
    es: 'Deposita en pesos a nuestra cuenta mexicana (banco o OXXO). Sin comisiones internacionales. Nosotros hacemos la compra en EE.UU.',
    en: 'Deposit in pesos to our Mexican account (bank or OXXO). No international fees. We make the purchase in the US'
  },
  step4Title: {
    es: 'Envío a México',
    en: 'Shipped to Mexico'
  },
  step4Desc: {
    es: 'Tu pedido llega a nuestro almacén y te lo enviamos con seguimiento completo',
    en: 'Your order arrives at our warehouse and we ship it to you with full tracking'
  },
  feeNote: {
    es: 'Solo 8% de tarifa de servicio sobre el valor del producto',
    en: 'Only 8% service fee on product value'
  },
  dontShowAgain: {
    es: 'No mostrar de nuevo',
    en: "Don't show this again"
  },
  gotIt: {
    es: '¡Entendido, comenzar!',
    en: 'Got it, let\'s start!'
  }
};

const t = createTranslations(translations);

// Icon components
const LinkIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      'stroke-width': '2'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
      })
    ]);
  }
};

const WalletIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      'stroke-width': '2'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
      })
    ]);
  }
};

const CartIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      'stroke-width': '2'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
      })
    ]);
  }
};

const TruckIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      'stroke-width': '2'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
      })
    ]);
  }
};

const steps = computed(() => [
  {
    icon: LinkIcon,
    title: t.value.step1Title,
    description: t.value.step1Desc,
    colorClass: 'bg-blue-50 text-blue-600'
  },
  {
    icon: WalletIcon,
    title: t.value.step2Title,
    description: t.value.step2Desc,
    colorClass: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: CartIcon,
    title: t.value.step3Title,
    description: t.value.step3Desc,
    colorClass: 'bg-amber-50 text-amber-600'
  },
  {
    icon: TruckIcon,
    title: t.value.step4Title,
    description: t.value.step4Desc,
    colorClass: 'bg-primary-50 text-primary-600'
  }
]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const handleClose = () => {
  if (dontShowAgain.value) {
    onboardingDismissed.value = true;
  }
  isOpen.value = false;
  emit('close');
};
</script>

<style scoped>
.onboarding-modal {
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-item {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked + div svg {
  opacity: 1;
}

/* Smooth scrollbar for modal */
.onboarding-modal::-webkit-scrollbar {
  width: 4px;
}

.onboarding-modal::-webkit-scrollbar-track {
  background: transparent;
}

.onboarding-modal::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}
</style>
