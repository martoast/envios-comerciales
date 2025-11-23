<!-- components/user/UserOrderModals.vue -->
<template>
    <!-- Complete Order Modal -->
    <TransitionRoot as="template" :show="showComplete">
      <Dialog class="relative z-50" @close="$emit('close-complete')">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto p-4 flex items-center justify-center">
          <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
            <div class="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <DialogTitle class="text-lg font-semibold mb-2">{{ t.confirmComplete }}</DialogTitle>
            <p class="text-sm text-gray-600 mb-6">{{ t.completeDesc }}</p>
            <div class="flex gap-3">
              <button @click="$emit('close-complete')" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">{{ t.cancel }}</button>
              <button @click="completeOrder" :disabled="processing" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                {{ processing ? t.processing : t.yesComplete }}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
  
    <!-- Reopen Modal -->
    <TransitionRoot as="template" :show="showReopen">
      <Dialog class="relative z-50" @close="$emit('close-reopen')">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto p-4 flex items-center justify-center">
          <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
            <div class="mx-auto w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>
            <DialogTitle class="text-lg font-semibold mb-2">{{ t.confirmReopen }}</DialogTitle>
            <p class="text-sm text-gray-600 mb-6">{{ t.reopenDesc }}</p>
            <div class="flex gap-3">
              <button @click="$emit('close-reopen')" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">{{ t.cancel }}</button>
              <button @click="reopenOrder" :disabled="processing" class="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">
                {{ processing ? t.processing : t.yesReopen }}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
  
    <!-- Delete Modal -->
    <TransitionRoot as="template" :show="showDelete">
      <Dialog class="relative z-50" @close="$emit('close-delete')">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto p-4 flex items-center justify-center">
          <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
            <div class="mx-auto w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <DialogTitle class="text-lg font-semibold text-gray-900 mb-2">{{ t.deleteTitle }}</DialogTitle>
            <p class="text-sm text-gray-600 mb-6">{{ t.deleteDesc }}</p>
            <div class="flex gap-3">
              <button @click="$emit('close-delete')" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">{{ t.cancel }}</button>
              <button @click="deleteOrder" :disabled="processing" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                {{ processing ? t.processing : t.yesDelete }}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
  import { ref } from 'vue'
  
  const props = defineProps(['order', 'showComplete', 'showReopen', 'showDelete'])
  const emit = defineEmits(['close-complete', 'close-reopen', 'close-delete', 'refresh', 'deleted'])
  const { $customFetch, $toast } = useNuxtApp()
  const processing = ref(false)
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    cancel: { es: "Cancelar", en: "Cancel" },
    processing: { es: "Procesando...", en: "Processing..." },
    confirmComplete: { es: "¿Completar Orden?", en: "Complete Order?" },
    completeDesc: { es: "Notificaremos cuando lleguen tus paquetes.", en: "We will notify you when your packages arrive." },
    yesComplete: { es: "Sí, Completar", en: "Yes, Complete" },
    confirmReopen: { es: "¿Reabrir Orden?", en: "Reopen Order?" },
    reopenDesc: { es: "Podrás agregar más artículos.", en: "You will be able to add more items." },
    yesReopen: { es: "Sí, Reabrir", en: "Yes, Reopen" },
    deleteTitle: { es: "¿Eliminar Orden?", en: "Delete Order?" },
    deleteDesc: { es: "Esta acción es irreversible.", en: "This action cannot be undone." },
    yesDelete: { es: "Eliminar", en: "Delete" },
  }
  const t = createTranslations(translations)
  
  const completeOrder = async () => {
    processing.value = true
    try {
      await $customFetch(`/orders/${props.order.id}/complete`, { method: 'PUT' })
      $toast.success('Order completed')
      emit('close-complete')
      emit('refresh', true) // Trigger confetti
    } catch (e) {
      $toast.error(e.data?.message || 'Error')
    } finally {
      processing.value = false
    }
  }
  
  const reopenOrder = async () => {
    processing.value = true
    try {
      await $customFetch(`/orders/${props.order.id}/reopen`, { method: 'PUT' })
      $toast.success('Order reopened')
      emit('close-reopen')
      // Navigate to add items? or just refresh
      const router = useRouter()
      router.push(`/app/orders/${props.order.id}/items`)
    } catch (e) {
      $toast.error(e.data?.message || 'Error')
    } finally {
      processing.value = false
    }
  }
  
  const deleteOrder = async () => {
    processing.value = true
    try {
      await $customFetch(`/orders/${props.order.id}`, { method: 'DELETE' })
      $toast.success('Order deleted')
      emit('close-delete')
      emit('deleted')
    } catch (e) {
      $toast.error(e.data?.message || 'Error')
    } finally {
      processing.value = false
    }
  }
  </script>