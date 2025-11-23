<!-- components/admin/AdminOrderModalDelete.vue -->
<template>
    <TransitionRoot :show="show" as="template">
      <Dialog class="relative z-50" @close="$emit('close')">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <DialogTitle class="text-lg font-semibold text-red-600 mb-4">Delete Order</DialogTitle>
              <p class="text-sm text-gray-600 mb-6">
                Are you sure you want to delete order <strong>{{ order?.order_number }}</strong>? 
                This action cannot be undone.
              </p>
              <div class="flex gap-3 justify-end">
                <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button 
                  @click="confirm" 
                  :disabled="processing"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Delete Order
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
  const props = defineProps(['show', 'order'])
  const emit = defineEmits(['close', 'success'])
  const { $customFetch, $toast } = useNuxtApp()
  const processing = ref(false)
  
  const confirm = async () => {
    processing.value = true
    try {
      await $customFetch(`/admin/orders/${props.order.id}`, { method: 'DELETE' })
      $toast.success('Order deleted')
      emit('success')
    } catch (err) {
      $toast.error(err.data?.message || 'Error')
    } finally {
      processing.value = false
    }
  }
  </script>