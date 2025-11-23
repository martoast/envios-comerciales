<!-- components/admin/AdminOrderModalMarkArrived.vue -->
<template>
    <TransitionRoot :show="show" as="template">
      <Dialog class="relative z-50" @close="$emit('close')">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <DialogTitle class="text-lg font-semibold mb-4">Mark Item Arrived</DialogTitle>
              
              <div v-if="item" class="bg-gray-50 p-3 rounded-lg mb-4">
                <p class="font-medium text-sm">{{ item.product_name }}</p>
                <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
  
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg) <span class="text-red-500">*</span></label>
                  <input v-model.number="form.weight" type="number" step="0.01" class="w-full border-gray-300 rounded-lg focus:ring-primary-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Dimensions (L x W x H) cm</label>
                  <div class="grid grid-cols-3 gap-2">
                    <input v-model.number="form.dimensions.length" type="number" placeholder="L" class="w-full border-gray-300 rounded-lg text-sm">
                    <input v-model.number="form.dimensions.width" type="number" placeholder="W" class="w-full border-gray-300 rounded-lg text-sm">
                    <input v-model.number="form.dimensions.height" type="number" placeholder="H" class="w-full border-gray-300 rounded-lg text-sm">
                  </div>
                </div>
              </div>
  
              <div class="flex gap-3 justify-end mt-6">
                <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button 
                  @click="submit" 
                  :disabled="processing || !form.weight"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Confirm Arrival
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
  import { ref, watch } from 'vue'
  
  const props = defineProps(['show', 'item', 'orderId'])
  const emit = defineEmits(['close', 'success'])
  const { $customFetch, $toast } = useNuxtApp()
  
  const processing = ref(false)
  const form = ref({
    weight: null,
    dimensions: { length: null, width: null, height: null }
  })
  
  watch(() => props.show, (val) => {
    if (val) {
      form.value = { weight: null, dimensions: { length: null, width: null, height: null } }
    }
  })
  
  const submit = async () => {
    processing.value = true
    try {
      const payload = {
        arrived: true,
        weight: parseFloat(form.value.weight),
      }
      if (form.value.dimensions.length) payload.dimensions = form.value.dimensions
  
      await $customFetch(`/admin/orders/${props.orderId}/items/${props.item.id}/arrived`, {
        method: 'PUT',
        body: payload
      })
      $toast.success('Item marked as arrived')
      emit('success')
    } catch (err) {
      $toast.error(err.data?.message || 'Error')
    } finally {
      processing.value = false
    }
  }
  </script>