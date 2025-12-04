<!-- components/admin/AdminOrderModalShipOrder.vue -->
<template>
  <TransitionRoot :show="show" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <DialogPanel class="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <!-- Plane Icon -->
                  <svg class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
                <div>
                  <DialogTitle class="text-lg font-semibold text-gray-900">{{ t.title }}</DialogTitle>
                  <p class="text-sm text-gray-500">{{ order?.order_number }}</p>
                </div>
              </div>
            </div>

            <div class="p-6 space-y-5">
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

                <!-- No Shipping Products Available -->
                <div v-else-if="shippingProducts.length === 0" class="py-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                  <svg class="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  <p class="text-sm text-gray-500">{{ t.noShippingProducts }}</p>
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
                        <option v-for="prod in shippingProducts" :key="prod.id" :value="prod.price_id">
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

                <!-- Price Summary -->
                <div v-if="totalBoxPrice > 0" class="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">{{ t.totalBoxPrice }}:</span>
                    <span class="font-semibold text-gray-900">${{ totalBoxPrice.toFixed(2) }} MXN</span>
                  </div>
                  <div class="flex justify-between text-sm mt-1">
                    <span class="text-indigo-700 font-medium">{{ t.deposit }} (50%):</span>
                    <span class="font-bold text-indigo-700">${{ depositAmount.toFixed(2) }} MXN</span>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">{{ t.depositNote }}</p>
              </div>

              <!-- Guia Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.guiaNumber }}</label>
                <input 
                  v-model="form.guia_number" 
                  type="text" 
                  class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" 
                  placeholder="e.g. 1234567890"
                >
              </div>

              <!-- Estimated Delivery -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.estimatedDelivery }}</label>
                <input 
                  v-model="form.estimated_delivery_date" 
                  type="date" 
                  class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
              </div>

              <!-- GIA Document -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.giaDocument }}</label>
                <input 
                  type="file" 
                  @change="handleFileChange" 
                  accept=".pdf" 
                  class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                >
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
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
              <button 
                @click="$emit('close')" 
                class="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {{ t.cancel }}
              </button>
              <button 
                @click="submit" 
                :disabled="processing || !isValid"
                class="px-5 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {{ processing ? t.processing : t.confirm }}
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
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps(['show', 'order'])
const emit = defineEmits(['close', 'success'])
const { $customFetch, $toast } = useNuxtApp()
const { t: createTranslations } = useLanguage()

const processing = ref(false)
const loadingProducts = ref(false)
const products = ref([])
const giaFile = ref(null)

const form = ref({
  boxes: [{ stripe_price_id: '', quantity: 1 }],
  guia_number: '',
  estimated_delivery_date: '',
  notes: ''
})

const translations = {
  title: { es: 'Enviar Orden y Solicitar Depósito', en: 'Ship Order & Request Deposit' },
  boxes: { es: 'Cajas', en: 'Boxes' },
  addBox: { es: 'Agregar Caja', en: 'Add Box' },
  selectBoxSize: { es: 'Seleccionar tamaño...', en: 'Select box size...' },
  loadingProducts: { es: 'Cargando productos...', en: 'Loading products...' },
  noShippingProducts: { es: 'No hay productos de envío disponibles', en: 'No shipping products available' },
  totalBoxPrice: { es: 'Precio Total de Cajas', en: 'Total Box Price' },
  deposit: { es: 'Depósito', en: 'Deposit' },
  depositNote: { es: 'El cliente recibirá una factura por el 50% de depósito inmediatamente.', en: 'Customer will receive an invoice for the 50% deposit immediately.' },
  guiaNumber: { es: 'Número de Guía (Rastreo)', en: 'Guia Number (Tracking)' },
  estimatedDelivery: { es: 'Fecha Estimada de Entrega', en: 'Estimated Delivery Date' },
  giaDocument: { es: 'Documento GIA (PDF)', en: 'GIA Document (PDF)' },
  notes: { es: 'Notas (Opcional)', en: 'Notes (Optional)' },
  notesPlaceholder: { es: 'Notas adicionales...', en: 'Additional notes...' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirm: { es: 'Confirmar Envío y Facturar', en: 'Confirm Ship & Invoice' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  success: { es: '¡Orden enviada y factura de depósito enviada!', en: 'Order shipped & deposit invoice sent!' },
  error: { es: 'Error al enviar la orden', en: 'Error shipping order' },
}

const t = createTranslations(translations)

// Filter products to only show shipping products
const shippingProducts = computed(() => {
  return products.value.filter(p => 
    p.shipping === 'true' || p.shipping === true
  )
})

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    form.value = {
      boxes: [{ stripe_price_id: '', quantity: 1 }],
      guia_number: '',
      estimated_delivery_date: '',
      notes: ''
    }
    giaFile.value = null
  }
})

// Calculate total box price based on selected boxes
const totalBoxPrice = computed(() => {
  return form.value.boxes.reduce((total, box) => {
    const product = shippingProducts.value.find(p => p.price_id === box.stripe_price_id)
    if (product) {
      return total + (product.price * (box.quantity || 1))
    }
    return total
  }, 0)
})

// 50% deposit amount
const depositAmount = computed(() => {
  return totalBoxPrice.value * 0.5
})

const isValid = computed(() => {
  const hasValidBoxes = form.value.boxes.every(box => box.stripe_price_id && box.quantity >= 1)
  const hasAtLeastOneBox = form.value.boxes.length > 0
  return hasValidBoxes && 
         hasAtLeastOneBox &&
         form.value.guia_number.length >= 10 && 
         form.value.estimated_delivery_date && 
         giaFile.value
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

const handleFileChange = (e) => {
  giaFile.value = e.target.files[0]
}

const submit = async () => {
  if (!isValid.value) return
  processing.value = true

  const formData = new FormData()
  
  form.value.boxes.forEach((box, index) => {
    formData.append(`boxes[${index}][stripe_price_id]`, box.stripe_price_id)
    formData.append(`boxes[${index}][quantity]`, box.quantity)
  })
  
  formData.append('guia_number', form.value.guia_number)
  formData.append('estimated_delivery_date', form.value.estimated_delivery_date)
  formData.append('gia_file', giaFile.value)
  if (form.value.notes) formData.append('notes', form.value.notes)

  try {
    await $customFetch(`/admin/orders/${props.order.id}/ship`, {
      method: 'POST',
      body: formData
    })
    $toast.success(t.value.success)
    emit('success')
  } catch (err) {
    $toast.error(err.data?.message || t.value.error)
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>