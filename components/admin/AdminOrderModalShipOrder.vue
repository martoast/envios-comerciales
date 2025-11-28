<!-- components/admin/AdminOrderModalShipOrder.vue -->
<template>
  <TransitionRoot :show="show" as="template">
    <Dialog class="relative z-50" @close="$emit('close')">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <DialogPanel class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <DialogTitle class="text-lg font-semibold mb-4">Ship Order & Request Deposit</DialogTitle>
            
            <div class="space-y-4">
              <!-- Box Selection Section -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700">Boxes</label>
                  <button 
                    @click="addBox" 
                    type="button"
                    class="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add Box
                  </button>
                </div>

                <!-- Box Entries -->
                <div class="space-y-3">
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
                        <option value="" disabled>Select box size...</option>
                        <option v-for="prod in products" :key="prod.id" :value="prod.price_id">
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
                <div v-if="totalBoxPrice > 0" class="mt-3 p-3 bg-primary-50 rounded-lg border border-primary-100">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Total Box Price:</span>
                    <span class="font-semibold text-gray-900">${{ totalBoxPrice.toFixed(2) }} MXN</span>
                  </div>
                  <div class="flex justify-between text-sm mt-1">
                    <span class="text-primary-700 font-medium">Deposit (50%):</span>
                    <span class="font-bold text-primary-700">${{ depositAmount.toFixed(2) }} MXN</span>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">Customer will receive an invoice for the 50% deposit immediately.</p>
              </div>

              <!-- Guia Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Guia Number (Tracking)</label>
                <input 
                  v-model="form.guia_number" 
                  type="text" 
                  class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" 
                  placeholder="e.g. 1234567890"
                >
              </div>

              <!-- Estimated Delivery -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date</label>
                <input 
                  v-model="form.estimated_delivery_date" 
                  type="date" 
                  class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
              </div>

              <!-- GIA Document -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GIA Document (PDF)</label>
                <input 
                  type="file" 
                  @change="handleFileChange" 
                  accept=".pdf" 
                  class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                >
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea 
                  v-model="form.notes" 
                  rows="2" 
                  class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
            </div>

            <div class="mt-6 flex gap-3 justify-end">
              <button 
                @click="$emit('close')" 
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                @click="submit" 
                :disabled="processing || !isValid"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              >
                <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Confirm Ship & Invoice
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

const processing = ref(false)
const products = ref([])
const giaFile = ref(null)

const form = ref({
  boxes: [{ stripe_price_id: '', quantity: 1 }],
  guia_number: '',
  estimated_delivery_date: '',
  notes: ''
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
    const product = products.value.find(p => p.price_id === box.stripe_price_id)
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
  try {
    const res = await $customFetch('/products')
    products.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const handleFileChange = (e) => {
  giaFile.value = e.target.files[0]
}

const submit = async () => {
  if (!isValid.value) return
  processing.value = true

  const formData = new FormData()
  
  // Add boxes array - Laravel expects boxes[0][stripe_price_id] format
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
    $toast.success('Order shipped & deposit invoice sent!')
    emit('success')
  } catch (err) {
    $toast.error(err.data?.message || 'Error shipping order')
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>