<!-- components/admin/AdminOrderModalMarkDelivered.vue -->
<template>
  <TransitionRoot :show="show" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <DialogPanel class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-green-100 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <DialogTitle class="text-lg font-semibold">
                {{ isCrossing ? t.titlePickedUp : t.titleDelivered }}
              </DialogTitle>
            </div>
            
            <p class="text-sm text-gray-600 mb-6">
              {{ isCrossing ? t.confirmPickedUp : t.confirmDelivered }}
              <strong>{{ order?.order_number }}</strong>?
              {{ isCrossing ? t.pickupNote : t.deliveryNote }}
            </p>

            <!-- Crossing Order: Additional info -->
            <div v-if="isCrossing" class="bg-gray-50 rounded-lg p-4 mb-6">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t.pickupDetails }}</p>
              <p class="text-sm text-gray-700">{{ t.customerPickedUp }}</p>
            </div>

            <div class="flex gap-3 justify-end">
              <button 
                @click="$emit('close')" 
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {{ t.cancel }}
              </button>
              <button 
                @click="confirm" 
                :disabled="processing"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
              >
                <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {{ isCrossing ? t.confirmPickedUpBtn : t.confirmDeliveredBtn }}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'

const props = defineProps(['show', 'order'])
const emit = defineEmits(['close', 'success'])
const { $customFetch, $toast } = useNuxtApp()
const { t: createTranslations } = useLanguage()

const processing = ref(false)

const isCrossing = computed(() => props.order?.order_type === 'crossing')

const translations = {
  titleDelivered: { es: 'Marcar como Entregado', en: 'Mark as Delivered' },
  titlePickedUp: { es: 'Marcar como Recogido', en: 'Mark as Picked Up' },
  confirmDelivered: { es: '¿Confirmar que la orden ha sido entregada exitosamente al cliente?', en: 'Confirm that order has been successfully delivered to the customer?' },
  confirmPickedUp: { es: '¿Confirmar que el cliente ha recogido su orden?', en: 'Confirm that the customer has picked up their order?' },
  deliveryNote: { es: 'Esto te permitirá generar la factura final.', en: 'This will allow you to generate the final invoice.' },
  pickupNote: { es: 'Esto completará la orden.', en: 'This will complete the order.' },
  pickupDetails: { es: 'Detalles de Recolección', en: 'Pickup Details' },
  customerPickedUp: { es: 'El cliente recogió sus paquetes en la bodega de Tijuana.', en: 'Customer picked up their packages at the Tijuana warehouse.' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirmDeliveredBtn: { es: 'Confirmar Entregado', en: 'Confirm Delivered' },
  confirmPickedUpBtn: { es: 'Confirmar Recogido', en: 'Confirm Picked Up' },
  successDelivered: { es: 'Orden marcada como entregada', en: 'Order marked as delivered' },
  successPickedUp: { es: 'Orden marcada como recogida', en: 'Order marked as picked up' },
  error: { es: 'Error al actualizar', en: 'Error updating' },
}

const t = createTranslations(translations)

const confirm = async () => {
  processing.value = true
  try {
    await $customFetch(`/admin/orders/${props.order.id}/status`, {
      method: 'PUT',
      body: { status: 'delivered' }
    })
    $toast.success(isCrossing.value ? t.value.successPickedUp : t.value.successDelivered)
    emit('success')
  } catch (err) {
    $toast.error(err.data?.message || t.value.error)
  } finally {
    processing.value = false
  }
}
</script>