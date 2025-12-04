<!-- components/admin/AdminOrderModalReadyForPickup.vue -->
<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <!-- Header -->
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <!-- Truck Icon -->
                    <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                  </div>
                  <div>
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.title }}
                    </DialogTitle>
                    <p class="text-sm text-gray-500">{{ order?.order_number }}</p>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="px-6 py-5 space-y-5">
                <!-- Info Banner -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ t.infoTitle }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ t.infoDesc }}</p>
                    </div>
                  </div>
                </div>

                <!-- Box Selection Section -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700">{{ t.boxes }}</label>
                    <button 
                      @click="addBox" 
                      type="button"
                      class="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      {{ t.addBox }}
                    </button>
                  </div>

                  <!-- Loading Products -->
                  <div v-if="loadingProducts" class="py-4 text-center">
                    <svg class="animate-spin h-6 w-6 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <p class="text-sm text-gray-500 mt-2">{{ t.loadingProducts }}</p>
                  </div>

                  <!-- No Crossing Products Available -->
                  <div v-else-if="crossingProducts.length === 0" class="py-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                    <svg class="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    <p class="text-sm text-gray-500">{{ t.noCrossingProducts }}</p>
                  </div>

                  <!-- Box Entries -->
                  <div v-else class="space-y-3">
                    <div 
                      v-for="(box, index) in form.boxes" 
                      :key="index"
                      class="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <div class="flex-1">
                        <select 
                          v-model="box.stripe_price_id" 
                          class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          <option value="" disabled>{{ t.selectBoxSize }}</option>
                          <option v-for="prod in crossingProducts" :key="prod.id" :value="prod.price_id">
                            {{ prod.name }} - ${{ prod.price }} {{ prod.currency }}
                          </option>
                        </select>
                      </div>
                      <div class="w-20">
                        <input 
                          v-model.number="box.quantity" 
                          type="number" 
                          min="1" 
                          max="10"
                          class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm text-center"
                          placeholder="Qty"
                        >
                      </div>
                      <button 
                        v-if="form.boxes.length > 1"
                        @click="removeBox(index)" 
                        type="button"
                        class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Price Summary (100% Payment) -->
                  <div v-if="totalBoxPrice > 0" class="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">{{ t.totalBoxPrice }}:</span>
                      <span class="font-semibold text-gray-900">${{ totalBoxPrice.toFixed(2) }} MXN</span>
                    </div>
                    <div class="flex justify-between text-sm mt-1">
                      <span class="text-green-700 font-medium">{{ t.fullPayment }} (100%):</span>
                      <span class="font-bold text-green-700">${{ totalBoxPrice.toFixed(2) }} MXN</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">{{ t.fullPaymentNote }}</p>
                </div>

                <!-- Notes -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.notes }}</label>
                  <textarea 
                    v-model="form.notes" 
                    rows="2" 
                    class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    :placeholder="t.notesPlaceholder"
                  ></textarea>
                </div>

                <!-- Customer Info -->
                <div class="bg-gray-50 rounded-xl p-4">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {{ t.customerWillBeNotified }}
                  </p>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-sm font-bold text-gray-600">{{ order?.user?.name?.charAt(0) || '?' }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ order?.user?.name }}</p>
                      <p class="text-sm text-gray-500">{{ order?.user?.email }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  @click="$emit('close')"
                  :disabled="processing"
                  class="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50"
                >
                  {{ t.cancel }}
                </button>
                <button
                  type="button"
                  @click="handleConfirm"
                  :disabled="processing || !isValid"
                  class="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ processing ? t.processing : t.confirm }}
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
import { ref, computed, onMounted, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  order: { type: Object, default: null },
})

const emit = defineEmits(['close', 'success'])

const { $customFetch, $toast } = useNuxtApp()
const { t: createTranslations } = useLanguage()

const processing = ref(false)
const loadingProducts = ref(false)
const products = ref([])

const form = ref({
  boxes: [{ stripe_price_id: '', quantity: 1 }],
  notes: ''
})

const translations = {
  title: { es: 'Marcar Listo para Recoger', en: 'Mark Ready for Pickup' },
  infoTitle: { es: 'Orden de Solo Cruce', en: 'Crossing-Only Order' },
  infoDesc: { es: 'El cliente recibirá una factura por el 100% del total y podrá recoger sus paquetes una vez pagado.', en: 'Customer will receive an invoice for 100% of the total and can pick up their packages once paid.' },
  boxes: { es: 'Cajas', en: 'Boxes' },
  addBox: { es: 'Agregar Caja', en: 'Add Box' },
  selectBoxSize: { es: 'Seleccionar tamaño...', en: 'Select box size...' },
  loadingProducts: { es: 'Cargando productos...', en: 'Loading products...' },
  noCrossingProducts: { es: 'No hay productos de cruce disponibles', en: 'No crossing products available' },
  totalBoxPrice: { es: 'Precio Total de Cajas', en: 'Total Box Price' },
  fullPayment: { es: 'Pago Completo', en: 'Full Payment' },
  fullPaymentNote: { es: 'El cliente recibirá una factura por el 100% del total inmediatamente.', en: 'Customer will receive an invoice for 100% of the total immediately.' },
  notes: { es: 'Notas (Opcional)', en: 'Notes (Optional)' },
  notesPlaceholder: { es: 'Notas adicionales...', en: 'Additional notes...' },
  customerWillBeNotified: { es: 'Se notificará al cliente', en: 'Customer will be notified' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirm: { es: 'Confirmar y Facturar', en: 'Confirm & Invoice' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  success: { es: 'Pedido listo para recoger y factura enviada', en: 'Order ready for pickup and invoice sent' },
  error: { es: 'Error al actualizar el pedido', en: 'Error updating order' },
}

const t = createTranslations(translations)

// Filter products to only show crossing products (no shipping)
const crossingProducts = computed(() => {
  return products.value.filter(p => 
    !p.shipping || p.shipping === 'false' || p.shipping === false
  )
})

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    form.value = {
      boxes: [{ stripe_price_id: '', quantity: 1 }],
      notes: ''
    }
  }
})

// Calculate total box price
const totalBoxPrice = computed(() => {
  return form.value.boxes.reduce((total, box) => {
    const product = crossingProducts.value.find(p => p.price_id === box.stripe_price_id)
    if (product) {
      return total + (product.price * (box.quantity || 1))
    }
    return total
  }, 0)
})

const isValid = computed(() => {
  const hasValidBoxes = form.value.boxes.every(box => box.stripe_price_id && box.quantity >= 1)
  const hasAtLeastOneBox = form.value.boxes.length > 0
  return hasValidBoxes && hasAtLeastOneBox
})

const addBox = () => {
  form.value.boxes.push({ stripe_price_id: '', quantity: 1 })
}

const removeBox = (index) => {
  if (form.value.boxes.length > 1) {
    form.value.boxes.splice(index, 1)
  }
}

const fetchProducts = async () => {
  loadingProducts.value = true
  try {
    const res = await $customFetch('/products')
    products.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loadingProducts.value = false
  }
}

const handleConfirm = async () => {
  if (!props.order || !isValid.value) return

  processing.value = true
  try {
    const formData = new FormData()
    
    // Add boxes array
    form.value.boxes.forEach((box, index) => {
      formData.append(`boxes[${index}][stripe_price_id]`, box.stripe_price_id)
      formData.append(`boxes[${index}][quantity]`, box.quantity)
    })
    
    if (form.value.notes) formData.append('notes', form.value.notes)

    await $customFetch(`/admin/orders/${props.order.id}/ship`, {
      method: 'POST',
      body: formData
    })

    $toast.success(t.value.success)
    emit('success')
  } catch (error) {
    console.error('Error:', error)
    $toast.error(error.data?.message || t.value.error)
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>