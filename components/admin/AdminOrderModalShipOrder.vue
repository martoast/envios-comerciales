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
              <!-- Info Banner -->
              <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-indigo-800">{{ t.infoTitle }}</p>
                    <p class="text-sm text-indigo-600 mt-1">{{ t.infoDesc }}</p>
                  </div>
                </div>
              </div>

              <!-- Boxes Section - Add Guias to Existing Boxes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.boxes }}</label>

                <!-- No boxes -->
                <div v-if="!orderBoxes.length" class="py-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                  <svg class="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  <p class="text-sm text-gray-500">{{ t.noBoxes }}</p>
                </div>

                <!-- Box Entries -->
                <div v-else class="space-y-4">
                  <div
                    v-for="(box, index) in form.boxes"
                    :key="box.box_id"
                    class="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <!-- Box Header -->
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <span class="text-sm font-medium text-gray-900">{{ box.box_name }}</span>
                          <span class="text-xs text-gray-500 ml-2">${{ parseFloat(box.box_price).toFixed(2) }} MXN</span>
                        </div>
                      </div>
                      <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                        {{ t.box }} {{ index + 1 }}
                      </span>
                    </div>

                    <!-- Guia Number -->
                    <div class="mb-3">
                      <label class="block text-xs font-medium text-gray-600 mb-1">{{ t.guiaNumber }}</label>
                      <input
                        v-model="box.guia_number"
                        type="text"
                        class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder="e.g. 1234567890"
                      >
                    </div>

                    <!-- GIA File -->
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">{{ t.giaDocument }}</label>
                      <input
                        type="file"
                        @change="(e) => handleFileChange(e, index)"
                        accept=".pdf"
                        class="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      >
                      <p v-if="box.gia_file" class="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ box.gia_file.name }}
                      </p>
                    </div>
                  </div>
                </div>
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
import { ref, computed, watch } from 'vue'

const props = defineProps(['show', 'order'])
const emit = defineEmits(['close', 'success'])
const { $customFetch, $toast } = useNuxtApp()
const { t: createTranslations } = useLanguage()

const processing = ref(false)

const form = ref({
  boxes: [],
  estimated_delivery_date: '',
  notes: ''
})

const translations = {
  title: { es: 'Enviar Orden', en: 'Ship Order' },
  infoTitle: { es: 'Agregar Guías de Envío', en: 'Add Shipping Tracking' },
  infoDesc: { es: 'Ingresa el número de guía y documento GIA para cada caja.', en: 'Enter the tracking number and GIA document for each box.' },
  boxes: { es: 'Cajas', en: 'Boxes' },
  box: { es: 'Caja', en: 'Box' },
  noBoxes: { es: 'No hay cajas en esta orden', en: 'No boxes in this order' },
  guiaNumber: { es: 'Número de Guía (Rastreo)', en: 'Guia Number (Tracking)' },
  estimatedDelivery: { es: 'Fecha Estimada de Entrega', en: 'Estimated Delivery Date' },
  giaDocument: { es: 'Documento GIA (PDF)', en: 'GIA Document (PDF)' },
  notes: { es: 'Notas (Opcional)', en: 'Notes (Optional)' },
  notesPlaceholder: { es: 'Notas adicionales...', en: 'Additional notes...' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirm: { es: 'Confirmar Envío', en: 'Confirm Shipment' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  success: { es: 'Orden enviada correctamente', en: 'Order shipped successfully' },
  error: { es: 'Error al enviar la orden', en: 'Error shipping order' },
}

const t = createTranslations(translations)

// Get boxes from order
const orderBoxes = computed(() => props.order?.boxes || [])

// Initialize form with order boxes when modal opens
watch(() => props.show, (newVal) => {
  if (newVal && props.order?.boxes) {
    form.value = {
      boxes: props.order.boxes.map(box => ({
        box_id: box.id,
        box_name: box.box_name || box.product?.name || 'Box',
        box_price: box.box_price || 0,
        guia_number: box.guia_number || '',
        gia_file: null
      })),
      estimated_delivery_date: '',
      notes: ''
    }
  }
})

const isValid = computed(() => {
  if (!form.value.boxes.length) return false

  const hasValidBoxes = form.value.boxes.every(box =>
    box.guia_number.length >= 10 &&
    box.gia_file
  )
  return hasValidBoxes && form.value.estimated_delivery_date
})

const handleFileChange = (e, index) => {
  form.value.boxes[index].gia_file = e.target.files[0] || null
}

const submit = async () => {
  if (!isValid.value) return
  processing.value = true

  const formData = new FormData()

  form.value.boxes.forEach((box, index) => {
    formData.append(`boxes[${index}][box_id]`, box.box_id)
    formData.append(`boxes[${index}][guia_number]`, box.guia_number)
    formData.append(`boxes[${index}][gia_file]`, box.gia_file)
  })

  formData.append('estimated_delivery_date', form.value.estimated_delivery_date)
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
</script>
