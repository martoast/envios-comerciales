<!-- pages/app/admin/orders/[id]/items/index.vue -->
<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">{{ t.manageItems }}</h1>
              <p class="text-sm text-gray-500">{{ t.order }} #{{ order?.order_number || order?.tracking_number }}</p>
            </div>
          </div>
          <button
            @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t.addItem }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Content -->
    <div v-else-if="order" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 border border-gray-200">
          <p class="text-2xl font-bold text-gray-900">{{ order.items?.length || 0 }}</p>
          <p class="text-sm text-gray-500">{{ t.totalItems }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-gray-200">
          <p class="text-2xl font-bold text-green-600">{{ arrivedCount }}</p>
          <p class="text-sm text-gray-500">{{ t.arrived }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-gray-200">
          <p class="text-2xl font-bold text-amber-600">{{ pendingCount }}</p>
          <p class="text-sm text-gray-500">{{ t.pending }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-gray-200">
          <p class="text-2xl font-bold text-gray-900">${{ totalValue.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">{{ t.totalValue }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!order.items || order.items.length === 0" class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ t.noItems }}</h3>
        <p class="text-gray-500 mb-6 max-w-sm mx-auto">{{ t.noItemsDesc }}</p>
        <button
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          {{ t.addFirstItem }}
        </button>
      </div>

      <!-- Items Grid -->
      <div v-else class="space-y-4">
        <div
          v-for="item in order.items"
          :key="item.id"
          class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <div class="flex flex-col sm:flex-row">
            <!-- Image -->
            <div class="sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-gray-100 relative">
              <img
                v-if="item.product_image_url"
                :src="item.product_image_url"
                class="w-full h-full object-cover"
                alt=""
              >
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <!-- Status Badge -->
              <div class="absolute top-2 left-2">
                <span :class="[
                  'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-sm',
                  item.arrived ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                ]">
                  <span :class="['w-1.5 h-1.5 rounded-full', item.arrived ? 'bg-green-200' : 'bg-amber-200']"></span>
                  {{ item.arrived ? t.arrived : t.pending }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 p-5">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {{ item.product_name || t.noName }}
                  </h3>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 mt-3 text-sm">
                    <div>
                      <span class="text-gray-400">{{ t.qty }}</span>
                      <p class="font-medium text-gray-900">{{ item.quantity }}</p>
                    </div>
                    <div>
                      <span class="text-gray-400">{{ t.value }}</span>
                      <p class="font-medium text-gray-900">${{ item.declared_value || '0' }}</p>
                    </div>
                    <div>
                      <span class="text-gray-400">{{ t.weight }}</span>
                      <p class="font-medium text-gray-900">{{ item.weight ? `${item.weight} kg` : '-' }}</p>
                    </div>
                    <div v-if="item.tracking_number">
                      <span class="text-gray-400">{{ t.tracking }}</span>
                      <p class="font-medium text-gray-900 font-mono text-xs truncate" :title="item.tracking_number">
                        {{ item.tracking_number }}
                      </p>
                    </div>
                  </div>

                  <!-- Product Link -->
                  <a
                    v-if="item.product_url"
                    :href="item.product_url"
                    target="_blank"
                    class="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 mt-3"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    {{ t.viewProduct }}
                  </a>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                  <!-- Mark Arrived Button - Only show if not arrived -->
                  <button
                    v-if="!item.arrived"
                    @click="openMarkArrivedModal(item)"
                    class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    {{ t.markArrived }}
                  </button>

                  <button
                    @click="openEditModal(item)"
                    class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    {{ t.edit }}
                  </button>

                  <button
                    @click="openDeleteModal(item)"
                    class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    {{ t.delete }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <TransitionRoot :show="showItemModal" as="template">
      <Dialog class="relative z-50" @close="closeItemModal">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <DialogTitle class="text-lg font-semibold text-gray-900">
                  {{ editingItem ? t.editItem : t.addItem }}
                </DialogTitle>
                <button @click="closeItemModal" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form @submit.prevent="saveItem" class="p-6 space-y-5">
                <!-- Product Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">
                    {{ t.productName }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="itemForm.product_name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    :placeholder="t.productNamePlaceholder"
                  >
                </div>

                <!-- Product URL -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.productUrl }}</label>
                  <input
                    v-model="itemForm.product_url"
                    type="url"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="https://amazon.com/..."
                  >
                </div>

                <!-- Quantity & Value -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">
                      {{ t.quantity }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model.number="itemForm.quantity"
                      type="number"
                      min="1"
                      required
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">
                      {{ t.declaredValue }} <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        v-model.number="itemForm.declared_value"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="0.00"
                      >
                    </div>
                  </div>
                </div>

                <!-- Tracking -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.trackingNumber }}</label>
                  <input
                    v-model="itemForm.tracking_number"
                    type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-mono"
                    placeholder="1Z999AA10123456784"
                  >
                </div>

                <!-- Carrier & ETA -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.carrier }}</label>
                    <select
                      v-model="itemForm.carrier"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.estimatedDelivery }}</label>
                    <input
                      v-model="itemForm.estimated_delivery_date"
                      type="date"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                  </div>
                </div>

                <!-- Weight & Status (Edit Mode) -->
                <div v-if="editingItem" class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.weight }}</label>
                    <div class="relative">
                      <input
                        v-model.number="itemForm.weight"
                        type="number"
                        step="0.01"
                        min="0"
                        class="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                      <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.status }}</label>
                    <select
                      v-model="itemForm.arrived"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option :value="false">{{ t.pending }}</option>
                      <option :value="true">{{ t.arrived }}</option>
                    </select>
                  </div>
                </div>

                <!-- Image URL (Edit Mode) -->
                <div v-if="editingItem">
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t.imageUrl }}</label>
                  <input
                    v-model="itemForm.product_image_url"
                    type="url"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="https://..."
                  >
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    @click="closeItemModal"
                    class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {{ t.cancel }}
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {{ saving ? t.saving : (editingItem ? t.saveChanges : t.addItem) }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Mark Arrived Modal -->
    <AdminOrderModalMarkArrived
      :show="showMarkArrivedModal"
      :item="selectedItem"
      :order-id="route.params.id"
      @close="showMarkArrivedModal = false"
      @success="handleMarkArrivedSuccess"
    />

    <!-- Delete Confirmation Modal -->
    <TransitionRoot :show="showDeleteModal" as="template">
      <Dialog class="relative z-50" @close="showDeleteModal = false">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <DialogTitle class="text-lg font-semibold text-gray-900">{{ t.deleteItem }}</DialogTitle>
                  <p class="mt-2 text-sm text-gray-500">{{ t.deleteConfirmation }}</p>
                  <p class="mt-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    {{ deletingItem?.product_name }}
                  </p>
                </div>
              </div>

              <div class="flex justify-end gap-3 mt-6">
                <button
                  @click="showDeleteModal = false"
                  class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {{ t.cancel }}
                </button>
                <button
                  @click="deleteItem"
                  :disabled="deleting"
                  class="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <svg v-if="deleting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ deleting ? t.deleting : t.delete }}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
import AdminOrderModalMarkArrived from '~/components/admin/AdminOrderModalMarkArrived.vue'

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
const showMarkArrivedModal = ref(false)
const editingItem = ref(null)
const deletingItem = ref(null)
const selectedItem = ref(null)

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
  addItem: { es: 'Agregar', en: 'Add Item' },
  editItem: { es: 'Editar Artículo', en: 'Edit Item' },
  deleteItem: { es: 'Eliminar Artículo', en: 'Delete Item' },
  totalItems: { es: 'Total Items', en: 'Total Items' },
  arrived: { es: 'Llegados', en: 'Arrived' },
  pending: { es: 'Pendientes', en: 'Pending' },
  totalValue: { es: 'Valor Total', en: 'Total Value' },
  noItems: { es: 'Sin artículos', en: 'No items yet' },
  noItemsDesc: { es: 'Agrega el primer artículo a esta orden.', en: 'Add the first item to this order.' },
  addFirstItem: { es: 'Agregar Artículo', en: 'Add Item' },
  noName: { es: 'Sin nombre', en: 'Unnamed' },
  qty: { es: 'Cantidad', en: 'Quantity' },
  value: { es: 'Valor', en: 'Value' },
  weight: { es: 'Peso', en: 'Weight' },
  tracking: { es: 'Tracking', en: 'Tracking' },
  viewProduct: { es: 'Ver producto', en: 'View product' },
  markArrived: { es: 'Marcar Llegado', en: 'Mark Arrived' },
  edit: { es: 'Editar', en: 'Edit' },
  delete: { es: 'Eliminar', en: 'Delete' },
  productName: { es: 'Nombre del Producto', en: 'Product Name' },
  productNamePlaceholder: { es: 'Ej: iPhone 15 Pro Max', en: 'E.g. iPhone 15 Pro Max' },
  productUrl: { es: 'URL del Producto', en: 'Product URL' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  declaredValue: { es: 'Valor (USD)', en: 'Value (USD)' },
  trackingNumber: { es: 'Número de Tracking', en: 'Tracking Number' },
  carrier: { es: 'Carrier', en: 'Carrier' },
  autoDetect: { es: 'Auto-detectar', en: 'Auto-detect' },
  estimatedDelivery: { es: 'Fecha Estimada', en: 'Est. Delivery' },
  status: { es: 'Estado', en: 'Status' },
  imageUrl: { es: 'URL de Imagen', en: 'Image URL' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  saveChanges: { es: 'Guardar', en: 'Save' },
  deleteConfirmation: { es: '¿Eliminar este artículo? Esta acción no se puede deshacer.', en: 'Delete this item? This action cannot be undone.' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  itemAdded: { es: 'Artículo agregado', en: 'Item added' },
  itemUpdated: { es: 'Artículo actualizado', en: 'Item updated' },
  itemDeleted: { es: 'Artículo eliminado', en: 'Item deleted' },
  errorLoading: { es: 'Error al cargar', en: 'Error loading' },
  errorSaving: { es: 'Error al guardar', en: 'Error saving' },
  errorDeleting: { es: 'Error al eliminar', en: 'Error deleting' },
}

const t = createTranslations(translations)

// Computed
const arrivedCount = computed(() => order.value?.items?.filter(i => i.arrived).length || 0)
const pendingCount = computed(() => order.value?.items?.filter(i => !i.arrived).length || 0)
const totalValue = computed(() => {
  return order.value?.items?.reduce((sum, item) => sum + ((item.declared_value || 0) * (item.quantity || 1)), 0) || 0
})

// Methods
const goBack = () => router.push(`/app/admin/orders/${route.params.id}`)

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

const openMarkArrivedModal = (item) => {
  selectedItem.value = item
  showMarkArrivedModal.value = true
}

const handleMarkArrivedSuccess = async () => {
  showMarkArrivedModal.value = false
  selectedItem.value = null
  await fetchOrder()
}

const saveItem = async () => {
  saving.value = true
  try {
    const payload = { ...itemForm.value }

    // Clean empty values
    Object.keys(payload).forEach(key => {
      if (payload[key] === '' || payload[key] === null) delete payload[key]
    })

    if (editingItem.value) {
      await $customFetch(`/admin/management/orders/${route.params.id}/items/${editingItem.value.id}`, {
        method: 'PUT',
        body: payload
      })
      $toast.success(t.value.itemUpdated)
    } else {
      await $customFetch(`/admin/management/orders/${route.params.id}/items`, {
        method: 'POST',
        body: payload
      })
      $toast.success(t.value.itemAdded)
    }

    closeItemModal()
    await fetchOrder()
  } catch (error) {
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
    $toast.error(t.value.errorDeleting)
  } finally {
    deleting.value = false
  }
}

onMounted(() => fetchOrder())
</script>
