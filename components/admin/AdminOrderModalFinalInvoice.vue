<template>
  <TransitionRoot :show="show" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" />
      
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 sm:p-6">
          <DialogPanel class="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
            
            <!-- Header -->
            <div class="border-b border-gray-100 px-6 py-5 flex items-center justify-between bg-gray-50/50">
              <div>
                <DialogTitle class="text-lg font-bold text-gray-900">Generate Final Invoice</DialogTitle>
                <p class="text-sm text-gray-500 mt-0.5">Order #{{ order?.order_number }}</p>
              </div>
              <div class="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100">
                {{ order?.box_size?.replace(/-/g, ' ') || 'Unknown Box' }}
              </div>
            </div>

            <div class="p-6">
              <!-- Calculation Summary Card -->
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                <div class="px-5 py-4 border-b border-gray-100 bg-gray-50/30">
                  <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Cost Breakdown</h4>
                </div>
                <div class="p-5 space-y-3">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-600">Total Box Price</span>
                    <span class="font-medium text-gray-900">${{ formatMoney(order?.box_price) }}</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-600">Less Deposit Paid (50%)</span>
                    <span class="font-medium text-red-500">-${{ formatMoney(order?.deposit_amount) }}</span>
                  </div>
                  <div class="pt-3 mt-1 border-t border-gray-100 flex justify-between items-center">
                    <span class="font-semibold text-gray-900">Base Remaining Balance</span>
                    <span class="font-bold text-lg text-primary-600">${{ formatMoney(baseRemaining) }}</span>
                  </div>
                </div>
              </div>

              <!-- Extra Charges Section -->
              <div class="mb-8">
                <div class="flex justify-between items-end mb-4">
                  <div>
                    <h3 class="text-sm font-bold text-gray-900">Additional Charges</h3>
                    <p class="text-xs text-gray-500 mt-1">Add customs, insurance, or special handling fees.</p>
                  </div>
                  <button 
                    @click="addStartItem" 
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Add Item
                  </button>
                </div>
                
                <div class="space-y-3">
                  <TransitionGroup name="list">
                    <div v-for="(item, index) in quoteItems" :key="index" class="group flex gap-3 items-start">
                      <div class="flex-1 space-y-2 sm:space-y-0 sm:flex sm:gap-3">
                        <div class="flex-1">
                          <input 
                            v-model="item.item" 
                            type="text" 
                            placeholder="Item Name (e.g. Customs Duty)" 
                            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                          >
                        </div>
                        <div class="flex-[2]">
                          <input 
                            v-model="item.description" 
                            type="text" 
                            placeholder="Description (Optional)" 
                            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                          >
                        </div>
                      </div>
                      <div class="relative w-28 sm:w-32">
                        <span class="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                        <input 
                          v-model.number="item.amount" 
                          type="number" 
                          step="0.01" 
                          class="w-full pl-6 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-right focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                          placeholder="0.00"
                        >
                      </div>
                      <button 
                        @click="removeItem(index)" 
                        class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Item"
                      >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </TransitionGroup>
                  
                  <div v-if="quoteItems.length === 0" class="py-6 text-center border-2 border-dashed border-gray-100 rounded-xl">
                    <p class="text-sm text-gray-400 italic">No extra charges added.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer / Actions -->
            <div class="bg-gray-50 px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex flex-col sm:flex-row items-center gap-2 text-sm">
                <span class="text-gray-600 font-medium">Total Invoice Amount:</span>
                <span class="text-2xl font-black text-gray-900">${{ formatMoney(finalTotal) }} <span class="text-xs font-bold text-gray-400 uppercase">MXN</span></span>
              </div>
              
              <div class="flex w-full sm:w-auto gap-3">
                <button 
                  @click="$emit('close')" 
                  class="flex-1 sm:flex-none px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  @click="sendInvoice" 
                  :disabled="processing"
                  class="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 flex items-center justify-center gap-2"
                >
                  <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span v-else>Send Final Invoice</span>
                </button>
              </div>
            </div>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
import { ref, computed } from 'vue'

const props = defineProps(['show', 'order'])
const emit = defineEmits(['close', 'success'])
const { $customFetch, $toast } = useNuxtApp()

const processing = ref(false)
const quoteItems = ref([])

// Helpers
const formatMoney = (val) => (parseFloat(val) || 0).toFixed(2)

// Computed Totals
const baseRemaining = computed(() => {
  return (props.order?.box_price || 0) - (props.order?.deposit_amount || 0)
})

const extrasTotal = computed(() => {
  return quoteItems.value.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
})

const finalTotal = computed(() => {
  return baseRemaining.value + extrasTotal.value
})

// Actions
const addStartItem = () => {
  quoteItems.value.push({ item: '', description: '', amount: null, type: 'custom' })
}

const removeItem = (index) => {
  quoteItems.value.splice(index, 1)
}

const sendInvoice = async () => {
  processing.value = true
  try {
    // First, prepare the quote breakdown
    if (quoteItems.value.length > 0) {
      await $customFetch(`/admin/orders/${props.order.id}/prepare-quote`, {
        method: 'POST',
        body: { quote_items: quoteItems.value }
      })
    }

    // Then send the final invoice
    await $customFetch(`/admin/orders/${props.order.id}/send-invoice`, {
      method: 'POST'
    })

    $toast.success('Final invoice sent successfully')
    emit('success')
  } catch (err) {
    $toast.error(err.data?.message || 'Error sending invoice')
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>