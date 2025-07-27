<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.addItemsTitle }}</h1>
              <p class="text-sm text-gray-600 mt-1">{{ t.addItemsSubtitle }}</p>
            </div>
          </div>
          
          <!-- Progress indicator -->
          <div class="hidden sm:flex items-center gap-2">
            <div class="w-8 h-2 bg-primary-500 rounded-full"></div>
            <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <div v-else-if="order" class="space-y-6">
        <!-- Success Banner - Only show if it's a new order -->
        <div v-if="isNewOrder" class="bg-green-50 rounded-2xl p-6 border border-green-200/50">
          <div class="flex items-start gap-4">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-green-900 mb-1">{{ t.orderCreatedSuccess }}</h3>
              <p class="text-sm text-green-700">{{ t.orderNumber }}: <span class="font-mono font-bold">{{ order.order_number }}</span></p>
            </div>
          </div>
        </div>

        <!-- Main Container -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column - Add Item Form -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.whatDidYouBuy }}</h2>
            
            <form @submit.prevent="handleAddItem" class="space-y-5">
              <!-- Product Name -->
              <div>
                <label for="product_name" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.productNameLabel }}
                </label>
                <input
                  v-model="itemForm.product_name"
                  type="text"
                  id="product_name"
                  :placeholder="t.productNamePlaceholder"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                    errors.product_name ? 'border-red-300' : 'border-gray-200'
                  ]"
                  required
                  autofocus
                />
                <p v-if="errors.product_name" class="mt-1 text-sm text-red-600">{{ errors.product_name[0] }}</p>
              </div>

              <!-- Product Link -->
              <div>
                <label for="product_url" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.whereDidYouBuyIt }}
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <input
                    v-model="itemForm.product_url"
                    type="url"
                    id="product_url"
                    :placeholder="t.productUrlPlaceholder"
                    :class="[
                      'pl-10 w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                      errors.product_url ? 'border-red-300' : 'border-gray-200'
                    ]"
                    required
                  />
                </div>
                <p v-if="errors.product_url" class="mt-1 text-sm text-red-600">{{ errors.product_url[0] }}</p>
                <p v-else class="mt-1 text-xs text-gray-500">{{ t.productUrlHelp }}</p>
              </div>

              <!-- Quantity with visual counter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.howMany }}
                </label>
                <div class="flex gap-3 items-center">
                  <button
                    type="button"
                    @click="itemForm.quantity = Math.max(1, itemForm.quantity - 1)"
                    class="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <svg class="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </svg>
                  </button>
                  <input
                    v-model.number="itemForm.quantity"
                    type="number"
                    min="1"
                    max="99"
                    class="w-20 text-center text-lg font-semibold px-3 py-2 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    readonly
                  />
                  <button
                    type="button"
                    @click="itemForm.quantity = Math.min(99, itemForm.quantity + 1)"
                    class="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <svg class="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="addingItem || !itemForm.product_name.trim() || !itemForm.product_url.trim()"
                class="w-full px-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="addingItem" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>{{ addingItem ? t.adding : t.addToShipment }}</span>
              </button>
            </form>
          </div>

          <!-- Right Column - Shipment List -->
          <div class="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">{{ t.yourShipment }}</h2>
              <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-300">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ order.items?.length || 0 }} {{ order.items?.length === 1 ? t.item : t.items }}</span>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="!order.items || order.items.length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <img src="/logo.svg" alt="Box" class="w-12 h-12 flex-shrink-0">
              </div>
              <p class="text-gray-500 font-medium">{{ t.emptyShipment }}</p>
              <p class="text-sm text-gray-400 mt-1">{{ t.startAdding }}</p>
            </div>

            <!-- Items List -->
            <div v-else class="space-y-3">
              <TransitionGroup name="list">
                <div v-for="(item, index) in order.items" :key="item.id" 
                     class="group relative bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 truncate">{{ item.product_name }}</p>
                      <p class="text-sm text-gray-500 mt-1">{{ t.quantity }}: {{ item.quantity }}</p>
                    </div>
                    <button
                      @click="removeItem(item.id)"
                      class="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Complete Button -->
            <div v-if="order.items && order.items.length > 0" class="mt-6 pt-6 border-t border-gray-300">
              <button
                @click="showCompleteModal = true"
                class="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ t.finishAndShip }}
              </button>
              <p class="text-xs text-gray-500 text-center mt-2">{{ t.canAddMoreLater }}</p>
            </div>
          </div>
        </div>

        <!-- Help Section -->
        <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="flex-1">
              <p class="text-sm text-blue-800">{{ t.reminder }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Order Modal -->
    <TransitionRoot as="template" :show="showCompleteModal">
      <Dialog class="relative z-10" @close="showCompleteModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                    <svg class="size-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                      {{ t.readyToShip }}
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">{{ t.confirmText }}</p>
                      <div class="mt-4 bg-gray-50 rounded-lg p-4">
                        <p class="text-2xl font-bold text-gray-900">{{ order?.items?.length || 0 }}</p>
                        <p class="text-sm text-gray-600">{{ order?.items?.length === 1 ? t.productInShipment : t.productsInShipment }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                    @click="handleCompleteOrder"
                    :disabled="completingOrder"
                  >
                    {{ completingOrder ? t.completing : t.yesFinish }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="showCompleteModal = false"
                  >
                    {{ t.keepAdding }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

// Define page meta
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer', 'complete-profile']
})

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()

// Check if this is a new order from payment success
const isNewOrder = ref(route.query.new === 'true')

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const order = ref(null)
const loading = ref(true)
const addingItem = ref(false)
const completingOrder = ref(false)
const showCompleteModal = ref(false)

// Form for new item
const itemForm = ref({
  product_name: '',
  product_url: '',
  quantity: 1
})

// Errors object
const errors = ref({})

// Translations
const translations = {
  addItemsTitle: {
    es: 'Agrega tus Productos',
    en: 'Add Your Products'
  },
  addItemsSubtitle: {
    es: 'Lista los productos que estás enviando en esta orden',
    en: 'List the products you\'re shipping in this order'
  },
  orderCreatedSuccess: {
    es: '¡Tu orden está lista!',
    en: 'Your order is ready!'
  },
  orderNumber: {
    es: 'Orden',
    en: 'Order'
  },
  whatDidYouBuy: {
    es: '¿Qué compraste?',
    en: 'What did you buy?'
  },
  productNameLabel: {
    es: 'Nombre del producto',
    en: 'Product name'
  },
  whereDidYouBuyIt: {
    es: 'Link del producto(url)',
    en: 'Product link (url)'
  },
  productUrlPlaceholder: {
    es: 'Pega el link del producto aquí',
    en: 'Paste the product link here'
  },
  productUrlHelp: {
    es: 'Ejemplo: www.amazon.com/producto...',
    en: 'Example: www.amazon.com/product...'
  },
  howMany: {
    es: '¿Cuántos?',
    en: 'How many?'
  },
  quantity: {
    es: 'Cantidad',
    en: 'Quantity'
  },
  adding: {
    es: 'Agregando...',
    en: 'Adding...'
  },
  addToShipment: {
    es: 'Agregar al Envío',
    en: 'Add to Shipment'
  },
  yourShipment: {
    es: 'Tu Envío',
    en: 'Your Shipment'
  },
  item: {
    es: 'producto',
    en: 'item'
  },
  items: {
    es: 'productos',
    en: 'items'
  },
  emptyShipment: {
    es: 'Tu envío está vacío',
    en: 'Your shipment is empty'
  },
  startAdding: {
    es: 'Agrega productos para comenzar',
    en: 'Add products to get started'
  },
  finishAndShip: {
    es: 'Finalizar y Enviar',
    en: 'Finish & Ship'
  },
  canAddMoreLater: {
    es: 'Puedes agregar más productos después',
    en: 'You can add more products later'
  },
  reminder: {
    es: 'Recuerda usar tu dirección USA al comprar. Nosotros recibimos todo y lo enviamos a México.',
    en: 'Remember to use your USA address when shopping. We receive everything and ship it to Mexico.'
  },
  readyToShip: {
    es: '¿Listo para enviar?',
    en: 'Ready to ship?'
  },
  confirmText: {
    es: 'Tu orden quedará lista para recibir estos productos.',
    en: 'Your order will be ready to receive these products.'
  },
  productInShipment: {
    es: 'producto en tu envío',
    en: 'product in your shipment'
  },
  productsInShipment: {
    es: 'productos en tu envío',
    en: 'products in your shipment'
  },
  yesFinish: {
    es: 'Sí, Finalizar',
    en: 'Yes, Finish'
  },
  keepAdding: {
    es: 'Seguir Agregando',
    en: 'Keep Adding'
  },
  completing: {
    es: 'Finalizando...',
    en: 'Completing...'
  },
  itemAddedSuccess: {
    es: '¡Producto agregado!',
    en: 'Product added!'
  },
  itemRemovedSuccess: {
    es: 'Producto eliminado',
    en: 'Product removed'
  },
  orderCompletedSuccess: {
    es: '¡Orden completada! Te avisaremos cuando lleguen tus productos.',
    en: 'Order completed! We\'ll let you know when your products arrive.'
  },
  errorAddingItem: {
    es: 'Error al agregar el producto',
    en: 'Error adding product'
  },
  errorRemovingItem: {
    es: 'Error al eliminar el producto',
    en: 'Error removing product'
  },
  errorCompletingOrder: {
    es: 'Error al completar la orden',
    en: 'Error completing order'
  },
  'extra-small': {
    es: 'Extra Pequeña',
    en: 'Extra Small'
  },
  small: {
    es: 'Pequeña',
    en: 'Small'
  },
  medium: {
    es: 'Mediana',
    en: 'Medium'
  },
  large: {
    es: 'Grande',
    en: 'Large'
  },
  'extra-large': {
    es: 'Extra Grande',
    en: 'Extra Large'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/orders/${route.params.id}`)
    order.value = response.data
  } catch (error) {
    console.error('Error fetching order:', error)
    $toast.error('Error loading order')
    navigateTo('/app/orders')
  } finally {
    loading.value = false
  }
}

const handleAddItem = async () => {
  if (!itemForm.value.product_name.trim()) return

  // Clear previous errors
  errors.value = {}
  addingItem.value = true
  
  try {
    await $customFetch(`/orders/${order.value.id}/items`, {
      method: 'POST',
      body: {
        product_name: itemForm.value.product_name.trim(),
        product_url: itemForm.value.product_url.trim(),
        quantity: itemForm.value.quantity
      }
    })

    $toast.success(t.value.itemAddedSuccess)

    // Reset form
    itemForm.value = {
      product_name: '',
      product_url: '',
      quantity: 1
    }

    // Refresh order
    await fetchOrder()
  } catch (error) {
    console.error('Error adding item:', error)
    
    // Handle validation errors
    if (error.status === 422 && error.data?.errors) {
      errors.value = error.data.errors
      
      // Show general error message if available
      if (error.data.message) {
        $toast.error(error.data.message)
      }
    } else {
      $toast.error(error.data?.message || t.value.errorAddingItem)
    }
  } finally {
    addingItem.value = false
  }
}

const removeItem = async (itemId) => {
  try {
    await $customFetch(`/orders/${order.value.id}/items/${itemId}`, {
      method: 'DELETE'
    })

    $toast.success(t.value.itemRemovedSuccess)
    await fetchOrder()
  } catch (error) {
    console.error('Error removing item:', error)
    $toast.error(t.value.errorRemovingItem)
  }
}

const handleCompleteOrder = async () => {
  completingOrder.value = true
  try {
    await $customFetch(`/orders/${order.value.id}/complete`, {
      method: 'PUT'
    })

    $toast.success(t.value.orderCompletedSuccess, {
      duration:3000
    })

    showCompleteModal.value = false

    return navigateTo(`/app/orders/${order.value.id}`)

  } catch (error) {
    console.error('Error completing order:', error)
    $toast.error(error.data?.message || t.value.errorCompletingOrder)
  } finally {
    completingOrder.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchOrder()
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>