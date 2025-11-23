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
                <!-- 1. Select Box Product -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Box Product</label>
                  <select v-model="form.stripe_price_id" class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                    <option value="" disabled>Select a box size...</option>
                    <option v-for="prod in products" :key="prod.id" :value="prod.price_id">
                      {{ prod.name }} - ${{ prod.price }} {{ prod.currency }}
                    </option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">The user will be billed for a 50% deposit of this price immediately.</p>
                </div>
  
                <!-- 2. Guia Number -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Guia Number (Tracking)</label>
                  <input v-model="form.guia_number" type="text" class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. 1234567890">
                </div>
  
                <!-- 3. Estimated Delivery -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date</label>
                  <input v-model="form.estimated_delivery_date" type="date" class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                </div>
  
                <!-- 4. GIA Document -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">GIA Document (PDF)</label>
                  <input type="file" @change="handleFileChange" accept=".pdf" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100">
                </div>
  
                <!-- 5. Notes -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea v-model="form.notes" rows="2" class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"></textarea>
                </div>
              </div>
  
              <div class="mt-6 flex gap-3 justify-end">
                <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button 
                  @click="submit" 
                  :disabled="processing || !isValid"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg v-if="processing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
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
  import { ref, computed, onMounted } from 'vue'
  
  const props = defineProps(['show', 'order'])
  const emit = defineEmits(['close', 'success'])
  const { $customFetch, $toast } = useNuxtApp()
  
  const processing = ref(false)
  const products = ref([])
  const giaFile = ref(null)
  
  const form = ref({
    stripe_price_id: '',
    guia_number: '',
    estimated_delivery_date: '',
    notes: ''
  })
  
  const isValid = computed(() => {
    return form.value.stripe_price_id && 
           form.value.guia_number.length >= 10 && 
           form.value.estimated_delivery_date && 
           giaFile.value
  })
  
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
    formData.append('stripe_price_id', form.value.stripe_price_id)
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