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
          <!-- Welcome Banner -->
          <div class="bg-green-50 rounded-2xl p-6 border border-green-200/50">
            <div class="flex items-start gap-4">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-green-900 mb-1">{{ t.orderCreatedSuccess }}</h3>
                <p class="text-sm text-green-700 mb-3">{{ t.orderCreatedMessage }}</p>
                <div class="bg-green-100 rounded-lg p-3">
                  <p class="text-sm font-medium text-green-800">{{ t.orderNumber }}: {{ order.order_number }}</p>
                  <p class="text-xs text-green-600 mt-1">{{ t.boxSize }}: {{ getBoxName(order.box_size) }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Add Items Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.addYourItems }}</h2>
            
            <!-- Current Items List -->
            <div v-if="order.items && order.items.length > 0" class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t.itemsAdded }} ({{ order.items.length }})</h3>
              <div class="space-y-3">
                <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ item.product_name }}</p>
                    <p class="text-sm text-gray-600">{{ t.quantity }}: {{ item.quantity }}</p>
                    <p v-if="item.tracking_number" class="text-xs text-gray-500 mt-1">{{ t.tracking }}: {{ item.tracking_number }}</p>
                  </div>
                  <button
                    @click="removeItem(item.id)"
                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Add Item Form -->
            <form @submit.prevent="handleAddItem" class="space-y-6">
              <!-- Product URL -->
              <div>
                <label for="product_url" class="block text-sm font-semibold text-gray-900 mb-2">
                  {{ t.productUrlLabel }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="itemForm.product_url"
                  type="url"
                  id="product_url"
                  :placeholder="t.productUrlPlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                  @blur="extractProductInfo"
                />
                <p class="text-xs text-gray-500 mt-2">{{ t.productUrlHelp }}</p>
              </div>
  
              <!-- Product Name (auto-filled from URL or manual) -->
              <div>
                <label for="product_name" class="block text-sm font-semibold text-gray-900 mb-2">
                  {{ t.productNameLabel }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="itemForm.product_name"
                  type="text"
                  id="product_name"
                  :placeholder="t.productNamePlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
  
              <!-- Quantity -->
              <div>
                <label for="quantity" class="block text-sm font-semibold text-gray-900 mb-2">
                  {{ t.quantityLabel }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="itemForm.quantity"
                  type="number"
                  id="quantity"
                  min="1"
                  max="99"
                  :placeholder="t.quantityPlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
  
              <!-- Tracking Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ t.trackingInfo }}</h3>
                <p class="text-sm text-gray-600">{{ t.trackingInfoHelp }}</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="tracking_number" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.trackingNumberLabel }}
                    </label>
                    <input
                      v-model="itemForm.tracking_number"
                      type="text"
                      id="tracking_number"
                      :placeholder="t.trackingNumberPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label for="carrier" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.carrierLabel }}
                    </label>
                    <select
                      v-model="itemForm.carrier"
                      id="carrier"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">{{ t.selectCarrier }}</option>
                      <option v-for="(label, value) in carriers" :key="value" :value="value">
                        {{ label }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <!-- Or Tracking URL -->
                <div class="text-center text-sm text-gray-500">{{ t.or }}</div>
                <div>
                  <label for="tracking_url" class="block text-sm font-semibold text-gray-900 mb-2">
                    {{ t.trackingUrlLabel }}
                  </label>
                  <input
                    v-model="itemForm.tracking_url"
                    type="url"
                    id="tracking_url"
                    :placeholder="t.trackingUrlPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <p class="text-xs text-gray-500 mt-2">{{ t.trackingUrlHelp }}</p>
                </div>
              </div>
  
              <!-- Add Item Button -->
              <div class="flex justify-center">
                <button
                  type="submit"
                  :disabled="addingItem"
                  class="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <svg v-if="addingItem" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ addingItem ? t.addingItem : t.addFirstItem }}
                </button>
              </div>
            </form>
          </div>
  
          <!-- Complete Order Section -->
          <div v-if="order.items && order.items.length > 0" class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200/50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 class="font-bold text-primary-900 mb-1">{{ t.readyToComplete }}</h3>
                <p class="text-sm text-primary-700">{{ t.readyToCompleteText }}</p>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="showCompleteModal = true"
                  :disabled="completingOrder"
                  class="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {{ completingOrder ? t.completing : t.completeOrder }}
                </button>
                <button
                  @click="navigateTo(`/app/orders/${order.id}`)"
                  class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  {{ t.addMoreLater }}
                </button>
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
                    <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100">
                      <svg class="size-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                        {{ t.confirmCompleteOrder }}
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">{{ t.confirmCompleteOrderText }}</p>
                        <div class="mt-4 bg-gray-50 rounded-lg p-3">
                          <p class="text-sm font-medium text-gray-900">{{ order?.items?.length || 0 }} {{ t.itemsWillBeProcessed }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                      @click="handleCompleteOrder"
                      :disabled="completingOrder"
                    >
                      {{ completingOrder ? t.completing : t.confirmComplete }}
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      @click="showCompleteModal = false"
                    >
                      {{ t.cancel }}
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
  import { ref, computed, onMounted } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  // Define page meta
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer', 'complete-profile']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  const route = useRoute()
  const user = useUser().value
  
  // Use the language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const order = ref(null)
  const loading = ref(true)
  const addingItem = ref(false)
  const completingOrder = ref(false)
  const showCompleteModal = ref(false)
  const copied = ref(false)
  
  // Form for new item
  const itemForm = ref({
    product_name: '',
    product_url: '',
    quantity: 1,
    tracking_number: '',
    tracking_url: '',
    carrier: ''
  })
  
  // Carriers
  const carriers = {
    ups: 'UPS',
    fedex: 'FedEx',
    usps: 'USPS',
    amazon: 'Amazon',
    dhl: 'DHL',
    other: 'Other'
  }
  
  // PO Box Address
  const poBoxAddress = computed(() => ({
    line1: `PC-${user?.id || 'XXXX'}`,
    line2: '1234 E Aviation Blvd, Suite 200',
    line3: 'El Segundo, CA 90245, USA'
  }))
  
  // Translations
  const translations = {
    addItemsTitle: {
      es: 'Agregar Productos a tu Orden',
      en: 'Add Products to Your Order'
    },
    addItemsSubtitle: {
      es: 'Agrega los productos que compraste',
      en: 'Add the products you purchased'
    },
    orderCreatedSuccess: {
      es: '¡Tu orden ha sido creada exitosamente!',
      en: 'Your order has been created successfully!'
    },
    orderCreatedMessage: {
      es: 'Ahora agrega los productos que compraste o planeas comprar usando tu dirección de Estados Unidos.',
      en: 'Now add the products you purchased or plan to purchase using your USA address.'
    },
    orderNumber: {
      es: 'Número de orden',
      en: 'Order number'
    },
    boxSize: {
      es: 'Tamaño de caja',
      en: 'Box size'
    },
    paidAmount: {
      es: 'Pagado',
      en: 'Paid'
    },
    useThisAddress: {
      es: 'Usa esta dirección cuando compres',
      en: 'Use this address when shopping'
    },
    copyAddress: {
      es: 'Copiar dirección',
      en: 'Copy address'
    },
    copied: {
      es: 'Copiado',
      en: 'Copied'
    },
    addYourItems: {
      es: 'Agrega tus Productos',
      en: 'Add Your Products'
    },
    itemsAdded: {
      es: 'Productos agregados',
      en: 'Items added'
    },
    quantity: {
      es: 'Cantidad',
      en: 'Quantity'
    },
    price: {
      es: 'Precio',
      en: 'Price'
    },
    tracking: {
      es: 'Rastreo',
      en: 'Tracking'
    },
    productUrlLabel: {
      es: 'URL del Producto',
      en: 'Product URL'
    },
    productUrlPlaceholder: {
      es: 'https://www.amazon.com/...',
      en: 'https://www.amazon.com/...'
    },
    productUrlHelp: {
      es: 'Pega el enlace del producto que compraste',
      en: 'Paste the link of the product you purchased'
    },
    productNameLabel: {
      es: 'Nombre del Producto',
      en: 'Product Name'
    },
    productNamePlaceholder: {
      es: 'Ej: iPhone 15 Pro Max 256GB',
      en: 'Ex: iPhone 15 Pro Max 256GB'
    },
    quantityLabel: {
      es: 'Cantidad',
      en: 'Quantity'
    },
    quantityPlaceholder: {
      es: '1',
      en: '1'
    },
    priceLabel: {
      es: 'Precio Total (USD)',
      en: 'Total Price (USD)'
    },
    pricePlaceholder: {
      es: '0.00',
      en: '0.00'
    },
    trackingInfo: {
      es: 'Información de Rastreo (Opcional)',
      en: 'Tracking Information (Optional)'
    },
    trackingInfoHelp: {
      es: 'Si ya compraste el producto, agrega la información de rastreo para que podamos monitorearlo.',
      en: 'If you already purchased the product, add tracking info so we can monitor it.'
    },
    trackingNumberLabel: {
      es: 'Número de Rastreo',
      en: 'Tracking Number'
    },
    trackingNumberPlaceholder: {
      es: '1Z999AA1234567890',
      en: '1Z999AA1234567890'
    },
    carrierLabel: {
      es: 'Transportista',
      en: 'Carrier'
    },
    selectCarrier: {
      es: 'Selecciona transportista',
      en: 'Select carrier'
    },
    or: {
      es: '- O -',
      en: '- OR -'
    },
    trackingUrlLabel: {
      es: 'URL de Rastreo Completa',
      en: 'Full Tracking URL'
    },
    trackingUrlPlaceholder: {
      es: 'https://www.ups.com/track?tracknum=...',
      en: 'https://www.ups.com/track?tracknum=...'
    },
    trackingUrlHelp: {
      es: 'O pega el enlace completo de rastreo del transportista',
      en: 'Or paste the full tracking link from the carrier'
    },
    addFirstItem: {
      es: 'Agregar Producto',
      en: 'Add Product'
    },
    addingItem: {
      es: 'Agregando...',
      en: 'Adding...'
    },
    readyToComplete: {
      es: '¿Listo para finalizar?',
      en: 'Ready to complete?'
    },
    readyToCompleteText: {
      es: 'Puedes completar tu orden ahora o agregar más productos después.',
      en: 'You can complete your order now or add more products later.'
    },
    completeOrder: {
      es: 'Completar Orden',
      en: 'Complete Order'
    },
    completing: {
      es: 'Completando...',
      en: 'Completing...'
    },
    addMoreLater: {
      es: 'Agregar Más Después',
      en: 'Add More Later'
    },
    confirmCompleteOrder: {
      es: '¿Completar orden?',
      en: 'Complete order?'
    },
    confirmCompleteOrderText: {
      es: 'Te notificaremos cuando lleguen todos tus paquetes.',
      en: 'We\'ll notify you when all your packages arrive.'
    },
    itemsWillBeProcessed: {
      es: 'productos serán procesados',
      en: 'items will be processed'
    },
    confirmComplete: {
      es: 'Sí, completar',
      en: 'Yes, complete'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    itemAddedSuccess: {
      es: 'Producto agregado exitosamente',
      en: 'Product added successfully'
    },
    itemRemovedSuccess: {
      es: 'Producto eliminado',
      en: 'Product removed'
    },
    orderCompletedSuccess: {
      es: '¡Orden completada! Te notificaremos cuando lleguen tus paquetes.',
      en: 'Order completed! We\'ll notify you when your packages arrive.'
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
    xl: {
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
  
  const extractProductInfo = () => {
    const url = itemForm.value.product_url
    if (!url) return
  
    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname.replace('www.', '')
      
      // Extract retailer
      if (domain.includes('amazon')) {
        itemForm.value.retailer = 'Amazon'
      } else if (domain.includes('ebay')) {
        itemForm.value.retailer = 'eBay'
      } else if (domain.includes('walmart')) {
        itemForm.value.retailer = 'Walmart'
      } else if (domain.includes('bestbuy')) {
        itemForm.value.retailer = 'Best Buy'
      } else if (domain.includes('target')) {
        itemForm.value.retailer = 'Target'
      }
  
      // Try to extract product name from URL (basic implementation)
      if (!itemForm.value.product_name) {
        const pathParts = urlObj.pathname.split('/').filter(Boolean)
        
        if (domain.includes('amazon') && pathParts.length > 1) {
          // Amazon URLs often have product names in the path
          const productNamePart = pathParts.find(part => part.length > 20)
          if (productNamePart) {
            itemForm.value.product_name = decodeURIComponent(productNamePart.replace(/-/g, ' '))
              .split('/')[0]
              .substring(0, 100)
          }
        }
      }
    } catch (error) {
      console.error('Error parsing URL:', error)
    }
  }
  
  const copyAddress = async () => {
    const addressText = `${user?.name || ''}\n${poBoxAddress.value.line1}\n${poBoxAddress.value.line2}\n${poBoxAddress.value.line3}`
    
    try {
      await navigator.clipboard.writeText(addressText)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }
  
  const handleAddItem = async () => {
    if (!itemForm.value.product_url || !itemForm.value.product_name) return
  
    addingItem.value = true
    try {
      await $customFetch(`/orders/${order.value.id}/items`, {
        method: 'POST',
        body: itemForm.value
      })
  
      $toast.success(t.value.itemAddedSuccess)
  
      // Reset form
      itemForm.value = {
        product_name: '',
        product_url: '',
        quantity: 1,
        tracking_number: '',
        tracking_url: '',
        carrier: ''
      }
  
      // Refresh order
      await fetchOrder()
    } catch (error) {
      console.error('Error adding item:', error)
      $toast.error(error.data?.message || t.value.errorAddingItem)
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
        duration: 6000
      })
  
      showCompleteModal.value = false
      
      // Redirect to order details
      setTimeout(() => {
        navigateTo(`/app/orders/${order.value.id}`)
      }, 1000)
    } catch (error) {
      console.error('Error completing order:', error)
      $toast.error(error.data?.message || t.value.errorCompletingOrder)
    } finally {
      completingOrder.value = false
    }
  }
  
  const getBoxName = (boxSize) => {
    return t.value[boxSize] || boxSize
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
  </style>