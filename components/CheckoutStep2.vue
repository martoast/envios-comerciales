<template>
    <div class="animate-fadeIn">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <!-- USA Address Card -->
        <div class="mb-8 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 sm:p-8 border border-primary-200/50">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 bg-primary-100 rounded-xl">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {{ t.yourUSAddress }}
                </h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    {{ t.nameAtCheckout }}
                  </p>
                  <p class="text-lg font-semibold text-gray-900">
                    ECTJ {{ user?.name || "Loading..." }}
                  </p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    {{ t.shippingAddress }}
                  </p>
                  <p class="text-gray-700">{{ poBoxAddress.line1 }}</p>
                  <p class="text-gray-700">{{ poBoxAddress.line2 }}</p>
                </div>
                <div class="mt-3 p-3 bg-primary-50 rounded-lg">
                  <p class="text-sm text-primary-700">
                    <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t.checkoutTip }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                @click="copyAddress"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <svg v-else class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ copied ? t.copied : t.copyAddress }}
              </button>
            </div>
          </div>
        </div>
  
        <!-- Instructions -->
        <div class="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6">
          <h4 class="font-semibold text-primary-900 mb-3">
            {{ t.importantInstructions }}
          </h4>
          <ul class="space-y-2 text-sm text-primary-800">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ t.instruction1 }}
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ t.instruction2 }}
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ t.instruction3 }}
            </li>
          </ul>
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
          class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
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
    user: Object,
    poBoxAddress: Object,
    t: Object,
  });
  
  const emit = defineEmits(['previous', 'next']);
  
  const copied = ref(false);
  
  const copyAddress = async () => {
    const address = `ECTJ ${props.user?.name}
  ${props.poBoxAddress.line1}
  ${props.poBoxAddress.line2}`;
  
    try {
      await navigator.clipboard.writeText(address);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
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