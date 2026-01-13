<!-- components/admin/AdminOrderModalMarkArrived.vue -->
<template>
  <TransitionRoot :show="show" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <DialogTitle class="text-lg font-semibold">{{ t.title }}</DialogTitle>
            </div>

            <div v-if="item" class="bg-gray-50 p-4 rounded-lg mb-4">
              <p class="font-medium">{{ item.product_name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ t.qty }}: {{ item.quantity }}</p>
            </div>

            <p class="text-gray-600 text-sm mb-6">{{ t.description }}</p>

            <div class="flex gap-3 justify-end">
              <button
                @click="$emit('close')"
                class="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {{ t.cancel }}
              </button>
              <button
                @click="submit"
                :disabled="processing"
                class="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors font-medium"
              >
                <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ t.confirm }}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'

const props = defineProps(['show', 'item', 'orderId'])
const emit = defineEmits(['close', 'success'])
const { $customFetch, $toast } = useNuxtApp()
const { t: createTranslations } = useLanguage()

const processing = ref(false)

const translations = {
  title: { es: 'Marcar como Llegado', en: 'Mark as Arrived' },
  qty: { es: 'Cantidad', en: 'Quantity' },
  description: { es: 'Confirmar que este artículo ha llegado a la bodega.', en: 'Confirm that this item has arrived at the warehouse.' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirm: { es: 'Confirmar Llegada', en: 'Confirm Arrival' },
  success: { es: 'Artículo marcado como llegado', en: 'Item marked as arrived' },
  error: { es: 'Error al actualizar', en: 'Error updating' },
}

const t = createTranslations(translations)

const submit = async () => {
  processing.value = true
  try {
    await $customFetch(`/admin/orders/${props.orderId}/items/${props.item.id}/arrived`, {
      method: 'PUT',
      body: { arrived: true }
    })
    $toast.success(t.value.success)
    emit('success')
  } catch (err) {
    $toast.error(err.data?.message || t.value.error)
  } finally {
    processing.value = false
  }
}
</script>
