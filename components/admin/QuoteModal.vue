<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fadeIn max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0">
        <h3 class="text-lg font-bold text-gray-900">Create Quote</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-5">
        
        <!-- Payment Method Selector -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-3">Payment Method</label>
          <div class="grid grid-cols-2 gap-3">
            
            <!-- Stripe Option -->
            <button
              type="button"
              @click="form.payment_method = 'stripe'"
              :class="[
                'relative p-4 rounded-xl border-2 transition-all duration-200 text-left group',
                form.payment_method === 'stripe' 
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              ]"
            >
              <!-- Selected Indicator -->
              <div 
                v-if="form.payment_method === 'stripe'"
                class="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div class="flex flex-col items-center gap-2">
                <!-- Stripe Logo -->
                <div :class="[
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  form.payment_method === 'stripe' ? 'bg-indigo-100' : 'bg-gray-100'
                ]">
                  <svg class="w-8 h-8" :class="form.payment_method === 'stripe' ? 'text-indigo-600' : 'text-gray-400'" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                  </svg>
                </div>
                <div class="text-center">
                  <span :class="[
                    'font-semibold text-sm block',
                    form.payment_method === 'stripe' ? 'text-indigo-900' : 'text-gray-700'
                  ]">Stripe</span>
                  <span class="text-xs text-gray-500">Card / Invoice</span>
                </div>
              </div>
            </button>

            <!-- NU Bank Option -->
            <button
              type="button"
              @click="form.payment_method = 'manual_deposit'"
              :class="[
                'relative p-4 rounded-xl border-2 transition-all duration-200 text-left group',
                form.payment_method === 'manual_deposit' 
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              ]"
            >
              <!-- Selected Indicator -->
              <div 
                v-if="form.payment_method === 'manual_deposit'"
                class="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div class="flex flex-col items-center gap-2">
                <!-- NU Bank Logo -->
                <div :class="[
                  'w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden',
                  form.payment_method === 'manual_deposit' ? 'bg-purple-100' : 'bg-gray-100'
                ]">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/2560px-Nubank_logo_2021.svg.png" 
                    alt="NU Bank" 
                    class="w-8 h-8 object-contain"
                  >
                </div>
                <div class="text-center">
                  <span :class="[
                    'font-semibold text-sm block',
                    form.payment_method === 'manual_deposit' ? 'text-purple-900' : 'text-gray-700'
                  ]">NU Bank</span>
                  <span class="text-xs text-gray-500">Bank Transfer</span>
                </div>
              </div>
            </button>
          </div>

          <!-- Payment Method Info -->
          <div class="mt-3 p-3 rounded-lg text-xs" :class="form.payment_method === 'stripe' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'">
            <div v-if="form.payment_method === 'stripe'" class="flex items-start gap-2">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>A Stripe invoice will be created and sent to the customer. They can pay with card online. Amount will be converted to MXN.</span>
            </div>
            <div v-else class="flex items-start gap-2">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Customer will receive bank transfer instructions via email. You'll need to manually confirm payment once received.</span>
            </div>
          </div>
        </div>

        <hr class="border-gray-100">

        <!-- Items Total (Editable in case admin found diff prices) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Merchandise Total ($)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input 
              v-model.number="form.items_total" 
              type="number" 
              step="0.01" 
              class="w-full pl-7 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
        </div>

        <!-- Shipping -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Shipping to Warehouse ($)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input 
              v-model.number="form.shipping_cost" 
              type="number" 
              step="0.01" 
              class="w-full pl-7 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
        </div>

        <!-- Tax -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">US Sales Tax ($)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input 
              v-model.number="form.sales_tax" 
              type="number" 
              step="0.01" 
              class="w-full pl-7 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
        </div>

        <!-- Admin Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Note to Customer (Optional)</label>
          <textarea 
            v-model="form.admin_notes" 
            rows="2" 
            class="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-sm"
            placeholder="Any special instructions or notes..."
          ></textarea>
        </div>

        <!-- Summary Calculation -->
        <div class="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
          <div class="flex justify-between text-gray-600">
            <span>Merchandise</span>
            <span>${{ formatNumber(form.items_total || 0) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${{ formatNumber(form.shipping_cost || 0) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Sales Tax</span>
            <span>${{ formatNumber(form.sales_tax || 0) }}</span>
          </div>
          <div class="flex justify-between text-gray-500 pt-1 border-t border-gray-200">
            <span>Subtotal</span>
            <span>${{ subtotal }}</span>
          </div>
          <div class="flex justify-between font-medium" :class="form.payment_method === 'stripe' ? 'text-indigo-600' : 'text-purple-600'">
            <span>Service Fee (8%)</span>
            <span>${{ fee }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${{ total }} USD</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          @click="submit"
          :disabled="processing"
          :class="[
            'w-full py-3.5 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
            form.payment_method === 'stripe' 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          ]"
        >
          <svg v-if="processing" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <template v-if="!processing">
            <template v-if="form.payment_method === 'stripe'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Send Stripe Invoice
            </template>
            <template v-else>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/2560px-Nubank_logo_2021.svg.png" 
                alt="NU" 
                class="w-5 h-5 object-contain brightness-0 invert"
              >
              Send Bank Transfer Instructions
            </template>
          </template>
          <template v-else>
            {{ form.payment_method === 'stripe' ? 'Creating Invoice...' : 'Sending Instructions...' }}
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps(['show', 'estimatedTotal']);
const emit = defineEmits(['close', 'confirm']);

const processing = ref(false);

const form = ref({
  items_total: 0,
  shipping_cost: 0,
  sales_tax: 0,
  admin_notes: '',
  payment_method: 'stripe' // 'stripe' or 'manual_deposit'
});

// Init values
onMounted(() => {
  form.value.items_total = parseFloat(props.estimatedTotal || 0);
});

// Format number helper
const formatNumber = (num) => {
  return parseFloat(num || 0).toFixed(2);
};

// Computed Math
const subtotal = computed(() => {
  return (
    parseFloat(form.value.items_total || 0) + 
    parseFloat(form.value.shipping_cost || 0) + 
    parseFloat(form.value.sales_tax || 0)
  ).toFixed(2);
});

const fee = computed(() => {
  return (subtotal.value * 0.08).toFixed(2);
});

const total = computed(() => {
  return (parseFloat(subtotal.value) + parseFloat(fee.value)).toFixed(2);
});

const submit = () => {
  processing.value = true;
  emit('confirm', form.value);
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>