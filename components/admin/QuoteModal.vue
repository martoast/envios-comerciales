<template>
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Create Quote</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
  
        <div class="p-6 space-y-4">
          <!-- Items Total (Editable in case admin found diff prices) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Merchandise Total ($)</label>
            <input v-model.number="form.items_total" type="number" step="0.01" class="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
  
          <!-- Shipping -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Shipping to Warehouse ($)</label>
            <input v-model.number="form.shipping_cost" type="number" step="0.01" class="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
  
          <!-- Tax -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">US Sales Tax ($)</label>
            <input v-model.number="form.sales_tax" type="number" step="0.01" class="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
  
          <!-- Admin Notes -->
          <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Note to Customer (Optional)</label>
              <textarea v-model="form.admin_notes" rows="2" class="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
          </div>
  
          <!-- Summary Calculation -->
          <div class="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${{ subtotal }}</span>
              </div>
              <div class="flex justify-between text-blue-600 font-medium">
                  <span>Service Fee (5%)</span>
                  <span>${{ fee }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold text-gray-900">
                  <span>Invoice Total</span>
                  <span>${{ total }}</span>
              </div>
          </div>
          
          <button 
            @click="submit" 
            :disabled="processing"
            class="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
          >
            {{ processing ? 'Creating Invoice...' : 'Send Invoice' }}
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
      admin_notes: ''
  });
  
  // Init values
  onMounted(() => {
      form.value.items_total = parseFloat(props.estimatedTotal || 0);
  });
  
  // Computed Math
  const subtotal = computed(() => {
      return (parseFloat(form.value.items_total || 0) + parseFloat(form.value.shipping_cost || 0) + parseFloat(form.value.sales_tax || 0)).toFixed(2);
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