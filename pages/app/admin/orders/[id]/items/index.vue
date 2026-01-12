<!-- pages/app/admin/orders/[id]/items/index.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900">{{ t.manageItems }}</h1>
              <p class="text-sm text-gray-500 mt-0.5">
                {{ t.order }} #{{ order?.order_number }} · {{ order?.items?.length || 0 }} {{ t.items }}
              </p>
            </div>
          </div>

          <!-- Add Item Button -->
          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t.addItem }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Items List -->
      <div v-else-if="order" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Summary Header -->
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-500">{{ t.totalItems }}:</span>
              <span class="font-semibold text-gray-900">{{ order.items?.length || 0 }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">{{ t.arrived }}:</span>
              <span class="font-semibold text-green-600">{{ arrivedCount }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">{{ t.pending }}:</span>
              <span class="font-semibold text-amber-600">{{ pendingCount }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">{{ t.totalValue }}:</span>
              <span class="font-semibold text-gray-900">${{ totalValue.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!order.items || order.items.length === 0" class="px-6 py-16 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noItems }}</h3>
          <p class="text-gray-500 mb-6">{{ t.noItemsDesc }}</p>
          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t.addFirstItem }}
          </button>
        </div>

        <!-- Items Table -->
        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex gap-4 items-start">
              <!-- Image -->
              <div class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  v-if="item.product_image_url"
                  :src="item.product_image_url"
                  class="w-full h-full object-cover"
                  alt=""
                >
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <h3 class="text-sm font-medium text-gray-900 truncate">
                      {{ item.product_name || t.noName }}
                    </h3>
                    <p class="text-xs text-gray-500 mt-0.5">
                      {{ t.qty }}: {{ item.quantity }}
                      <span v-if="item.declared_value">· ${{ item.declared_value }}</span>
                      <span v-if="item.weight"> · {{ item.weight }} kg</span>
                    </p>
                    <p v-if="item.tracking_number" class="text-xs text-gray-400 mt-0.5 font-mono">
                      {{ item.carrier?.toUpperCase() || 'TRACKING' }}: {{ item.tracking_number }}
                    </p>
                  </div>

                  <!-- Status Badge -->
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                    item.arrived ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  ]">
                    {{ item.arrived ? t.arrived : t.pending }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-3">
                  <button
                    @click="openEditModal(item)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    {{ t.edit }}
                  </button>
                  <button
                    @click="openDeleteModal(item)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    {{ t.delete }}
                  </button>
                  <a
                    v-if="item.product_url"
                    :href="item.product_url"
                    target="_blank"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    {{ t.viewProduct }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showItemModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeItemModal"></div>

          <div class="relative inline-block w-full max-w-lg p-6 my-8 text-left bg-white rounded-2xl shadow-xl transform transition-all">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ editingItem ? t.editItem : t.addItem }}
              </h3>
              <button @click="closeItemModal" class="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveItem" class="space-y-4">
              <!-- Product Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.productName }} *</label>
                <input
                  v-model="itemForm.product_name"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.productNamePlaceholder"
                >
              </div>

              <!-- Product URL -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.productUrl }}</label>
                <input
                  v-model="itemForm.product_url"
                  type="url"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://amazon.com/..."
                >
              </div>

              <!-- Quantity & Value Row -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.quantity }} *</label>
                  <input
                    v-model.number="itemForm.quantity"
                    type="number"
                    min="1"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.declaredValue }} *</label>
                  <input
                    v-model.number="itemForm.declared_value"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0.00"
                  >
                </div>
              </div>

              <!-- Tracking Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.trackingNumber }}</label>
                <input
                  v-model="itemForm.tracking_number"
                  type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="1Z999AA10123456784"
                >
              </div>

              <!-- Carrier & Estimated Delivery Row -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.carrier }}</label>
                  <select
                    v-model="itemForm.carrier"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{{ t.autoDetect }}</option>
                    <option value="amazon">Amazon</option>
                    <option value="ups">UPS</option>
                    <option value="fedex">FedEx</option>
                    <option value="usps">USPS</option>
                    <option value="dhl">DHL</option>
                    <option value="ontrac">OnTrac</option>
                    <option value="lasership">LaserShip</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.estimatedDelivery }}</label>
                  <input
                    v-model="itemForm.estimated_delivery_date"
                    type="date"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                </div>
              </div>

              <!-- Weight & Arrived (only for edit mode) -->
              <div v-if="editingItem" class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.weight }} (kg)</label>
                  <input
                    v-model.number="itemForm.weight"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.status }}</label>
                  <select
                    v-model="itemForm.arrived"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option :value="false">{{ t.pending }}</option>
                    <option :value="true">{{ t.arrived }}</option>
                  </select>
                </div>
              </div>

              <!-- Product Image URL (edit mode) -->
              <div v-if="editingItem">
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.imageUrl }}</label>
                <input
                  v-model="itemForm.product_image_url"
                  type="url"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://..."
                >
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  @click="closeItemModal"
                  class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  {{ t.cancel }}
                </button>
                <button
                  type="submit"
                  :disabled="saving"
                  class="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  {{ saving ? t.saving : (editingItem ? t.saveChanges : t.addItem) }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showDeleteModal = false"></div>

          <div class="relative inline-block w-full max-w-md p-6 my-8 text-left bg-white rounded-2xl shadow-xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ t.deleteItem }}</h3>
                <p class="mt-2 text-sm text-gray-500">
                  {{ t.deleteConfirmation }}
                </p>
                <p class="mt-1 text-sm font-medium text-gray-700">
                  {{ deletingItem?.product_name }}
                </p>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                {{ t.cancel }}
              </button>
              <button
                @click="deleteItem"
                :disabled="deleting"
                class="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
              >
                {{ deleting ? t.deleting : t.delete }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { t: createTranslations } = useLanguage()

// State
const order = ref(null)
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const showItemModal = ref(false)
const showDeleteModal = ref(false)
const editingItem = ref(null)
const deletingItem = ref(null)

const itemForm = ref({
  product_name: '',
  product_url: '',
  product_image_url: '',
  quantity: 1,
  declared_value: null,
  tracking_number: '',
  carrier: '',
  estimated_delivery_date: '',
  weight: null,
  arrived: false
})

// Translations
const translations = {
  manageItems: { es: 'Gestionar Artículos', en: 'Manage Items' },
  order: { es: 'Orden', en: 'Order' },
  items: { es: 'artículos', en: 'items' },
  addItem: { es: 'Agregar Artículo', en: 'Add Item' },
  editItem: { es: 'Editar Artículo', en: 'Edit Item' },
  deleteItem: { es: 'Eliminar Artículo', en: 'Delete Item' },
  totalItems: { es: 'Total', en: 'Total' },
  arrived: { es: 'Llegaron', en: 'Arrived' },
  pending: { es: 'Pendiente', en: 'Pending' },
  totalValue: { es: 'Valor Total', en: 'Total Value' },
  noItems: { es: 'Sin artículos', en: 'No items' },
  noItemsDesc: { es: 'Esta orden no tiene artículos. Agrega el primer artículo.', en: 'This order has no items. Add the first item.' },
  addFirstItem: { es: 'Agregar Primer Artículo', en: 'Add First Item' },
  noName: { es: 'Sin nombre', en: 'No name' },
  qty: { es: 'Cant', en: 'Qty' },
  edit: { es: 'Editar', en: 'Edit' },
  delete: { es: 'Eliminar', en: 'Delete' },
  viewProduct: { es: 'Ver Producto', en: 'View Product' },
  productName: { es: 'Nombre del Producto', en: 'Product Name' },
  productNamePlaceholder: { es: 'Ej: iPhone 15 Pro Max', en: 'Ex: iPhone 15 Pro Max' },
  productUrl: { es: 'URL del Producto', en: 'Product URL' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  declaredValue: { es: 'Valor Declarado (USD)', en: 'Declared Value (USD)' },
  trackingNumber: { es: 'Número de Rastreo', en: 'Tracking Number' },
  carrier: { es: 'Transportista', en: 'Carrier' },
  autoDetect: { es: 'Auto-detectar', en: 'Auto-detect' },
  estimatedDelivery: { es: 'Entrega Estimada', en: 'Estimated Delivery' },
  weight: { es: 'Peso', en: 'Weight' },
  status: { es: 'Estado', en: 'Status' },
  imageUrl: { es: 'URL de Imagen', en: 'Image URL' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  saveChanges: { es: 'Guardar Cambios', en: 'Save Changes' },
  deleteConfirmation: { es: '¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.', en: 'Are you sure you want to delete this item? This action cannot be undone.' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  itemAdded: { es: 'Artículo agregado exitosamente', en: 'Item added successfully' },
  itemUpdated: { es: 'Artículo actualizado exitosamente', en: 'Item updated successfully' },
  itemDeleted: { es: 'Artículo eliminado exitosamente', en: 'Item deleted successfully' },
  errorLoading: { es: 'Error al cargar la orden', en: 'Error loading order' },
  errorSaving: { es: 'Error al guardar el artículo', en: 'Error saving item' },
  errorDeleting: { es: 'Error al eliminar el artículo', en: 'Error deleting item' },
}

const t = createTranslations(translations)

// Computed
const arrivedCount = computed(() => {
  return order.value?.items?.filter(i => i.arrived).length || 0
})

const pendingCount = computed(() => {
  return order.value?.items?.filter(i => !i.arrived).length || 0
})

const totalValue = computed(() => {
  return order.value?.items?.reduce((sum, item) => {
    return sum + ((item.declared_value || 0) * (item.quantity || 1))
  }, 0) || 0
})

// Methods
const goBack = () => {
  router.push(`/app/admin/orders/${route.params.id}`)
}

const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/orders/${route.params.id}`)
    order.value = response.data
  } catch (error) {
    $toast.error(t.value.errorLoading)
    router.push('/app/admin/orders')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingItem.value = null
  itemForm.value = {
    product_name: '',
    product_url: '',
    product_image_url: '',
    quantity: 1,
    declared_value: null,
    tracking_number: '',
    carrier: '',
    estimated_delivery_date: '',
    weight: null,
    arrived: false
  }
  showItemModal.value = true
}

const openEditModal = (item) => {
  editingItem.value = item
  itemForm.value = {
    product_name: item.product_name || '',
    product_url: item.product_url || '',
    product_image_url: item.product_image_url || '',
    quantity: item.quantity || 1,
    declared_value: item.declared_value || null,
    tracking_number: item.tracking_number || '',
    carrier: item.carrier || '',
    estimated_delivery_date: item.estimated_delivery_date || '',
    weight: item.weight || null,
    arrived: item.arrived || false
  }
  showItemModal.value = true
}

const closeItemModal = () => {
  showItemModal.value = false
  editingItem.value = null
}

const openDeleteModal = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const saveItem = async () => {
  saving.value = true
  try {
    const payload = { ...itemForm.value }

    // Clean up empty values
    if (!payload.product_url) delete payload.product_url
    if (!payload.product_image_url) delete payload.product_image_url
    if (!payload.tracking_number) delete payload.tracking_number
    if (!payload.carrier) delete payload.carrier
    if (!payload.estimated_delivery_date) delete payload.estimated_delivery_date
    if (!payload.weight) delete payload.weight

    if (editingItem.value) {
      // Update existing item
      await $customFetch(`/admin/management/orders/${route.params.id}/items/${editingItem.value.id}`, {
        method: 'PUT',
        body: payload
      })
      $toast.success(t.value.itemUpdated)
    } else {
      // Add new item
      await $customFetch(`/admin/management/orders/${route.params.id}/items`, {
        method: 'POST',
        body: payload
      })
      $toast.success(t.value.itemAdded)
    }

    closeItemModal()
    await fetchOrder()
  } catch (error) {
    console.error('Error saving item:', error)
    $toast.error(t.value.errorSaving)
  } finally {
    saving.value = false
  }
}

const deleteItem = async () => {
  if (!deletingItem.value) return

  deleting.value = true
  try {
    await $customFetch(`/admin/management/orders/${route.params.id}/items/${deletingItem.value.id}`, {
      method: 'DELETE'
    })
    $toast.success(t.value.itemDeleted)
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchOrder()
  } catch (error) {
    console.error('Error deleting item:', error)
    $toast.error(t.value.errorDeleting)
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchOrder()
})
</script>
