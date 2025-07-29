<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/app/admin/packages" 
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.packageDetails }}</h1>
              <p class="text-sm text-gray-500 mt-1">{{ packageItem?.product_name || t.loading }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="packageItem" class="flex items-center gap-3">
            <NuxtLink 
              :to="`/app/admin/packages/${packageItem.id}/edit`"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all duration-300 hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              {{ t.editPackage }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Package Content -->
      <div v-else-if="packageItem" class="space-y-6">
        <!-- Status Alert -->
        <div v-if="!packageItem.arrived" class="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 sm:p-6 animate-fadeIn">
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h3 class="text-lg font-semibold text-yellow-900">{{ t.pendingArrival }}</h3>
              <p class="text-sm text-yellow-700 mt-1">{{ t.pendingArrivalDesc }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="packageItem.arrived && !packageItem.weight" class="bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-6 animate-fadeIn">
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
            </svg>
            <div>
              <h3 class="text-lg font-semibold text-orange-900">{{ t.missingWeight }}</h3>
              <p class="text-sm text-orange-700 mt-1">{{ t.missingWeightDesc }}</p>
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Package Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              {{ t.packageInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.productName }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.product_name || t.noName }}</p>
              </div>
              <div v-if="packageItem.product_url">
                <p class="text-sm text-gray-500">{{ t.productUrl }}</p>
                <a :href="packageItem.product_url" target="_blank" class="font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                  {{ t.viewProduct }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">{{ t.quantity }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.quantity }}</p>
              </div>
              
            </div>
          </div>

          <!-- Physical Details -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.2s">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
              </svg>
              {{ t.physicalDetails }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.status }}</p>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  packageItem.arrived ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                ]">
                  {{ packageItem.arrived ? t.arrived : t.pending }}
                </span>
              </div>
              <div v-if="packageItem.arrived_at">
                <p class="text-sm text-gray-500">{{ t.arrivedAt }}</p>
                <p class="font-medium text-gray-900">{{ formatDate(packageItem.arrived_at) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.weight }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.weight ? `${packageItem.weight} kg` : t.notWeighed }}</p>
              </div>
              <div v-if="packageItem.dimensions">
                <p class="text-sm text-gray-500">{{ t.dimensions }}</p>
                <p class="font-medium text-gray-900">
                  {{ packageItem.dimensions.length }} × {{ packageItem.dimensions.width }} × {{ packageItem.dimensions.height }} cm
                </p>
              </div>
            </div>
          </div>

          <!-- Tracking Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.1s">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              {{ t.trackingInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.trackingNumber }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.tracking_number || t.notProvided }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.carrier }}</p>
                <p class="font-medium text-gray-900 capitalize">{{ packageItem.carrier || t.unknown }}</p>
              </div>
              <div v-if="packageItem.tracking_url">
                <p class="text-sm text-gray-500">{{ t.trackingLink }}</p>
                <a :href="packageItem.tracking_url" target="_blank" class="font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                  {{ t.trackPackage }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          
        </div>

        <!-- Proof of Purchase Section -->
        <div v-if="packageItem.proof_of_purchase_url" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {{ t.proofOfPurchase }}
          </h2>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <div class="p-2 bg-primary-100 rounded-lg">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ packageItem.proof_of_purchase_filename }}</p>
                    <p class="text-sm text-gray-500">
                      {{ getFileType(packageItem.proof_of_purchase_mime_type) }} • {{ formatFileSize(packageItem.proof_of_purchase_size) }}
                    </p>
                  </div>
                </div>
                
                <div class="flex gap-3 mt-3">
                  <a 
                    :href="packageItem.proof_of_purchase_url" 
                    target="_blank"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all duration-300 text-sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    {{ t.viewDocument }}
                  </a>
                  
                  <a 
                    :href="packageItem.proof_of_purchase_url" 
                    download
                    class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    {{ t.downloadDocument }}
                  </a>
                </div>
              </div>
              
              <!-- File Preview for Images -->
              <div v-if="isImageFile(packageItem.proof_of_purchase_mime_type)" class="ml-6">
                <img 
                  :src="packageItem.proof_of_purchase_url" 
                  :alt="packageItem.proof_of_purchase_filename"
                  class="w-32 h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                  @click="openImageInNewTab(packageItem.proof_of_purchase_url)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Order & Customer Info -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Order Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              {{ t.orderInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.orderNumber }}</p>
                <NuxtLink :to="`/app/admin/orders/${packageItem.order.id}`" class="font-medium text-primary-600 hover:text-primary-700">
                  {{ packageItem.order.order_number }}
                </NuxtLink>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.orderStatus }}</p>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                  getOrderStatusColor(packageItem.order.status)
                ]">
                  {{ packageItem.order.status.replace('_', ' ') }}
                </span>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.boxSize }}</p>
                <p class="font-medium text-gray-900 capitalize">{{ packageItem.order.box_size }}</p>
              </div>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.1s">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {{ t.customerInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.name }}</p>
                <NuxtLink :to="`/app/admin/customers/${packageItem.order.user.id}`" class="font-medium text-primary-600 hover:text-primary-700">
                  {{ packageItem.order.user.name }}
                </NuxtLink>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.email }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.order.user.email }}</p>
              </div>
              <div v-if="packageItem.order.user.phone">
                <p class="text-sm text-gray-500">{{ t.phone }}</p>
                <p class="font-medium text-gray-900">{{ packageItem.order.user.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ t.timestamps }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">{{ t.createdAt }}</p>
              <p class="font-medium text-gray-900">{{ formatDate(packageItem.created_at) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">{{ t.updatedAt }}</p>
              <p class="font-medium text-gray-900">{{ formatDate(packageItem.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Define page meta
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()

// Use language composable
const { t: createTranslations } = useLanguage()

// State
const packageItem = ref(null)
const loading = ref(true)

// Translations
const translations = {
  packageDetails: {
    es: 'Detalles del Paquete',
    en: 'Package Details'
  },
  loading: {
    es: 'Cargando...',
    en: 'Loading...'
  },
  editPackage: {
    es: 'Editar Paquete',
    en: 'Edit Package'
  },
  pendingArrival: {
    es: 'Esperando Llegada',
    en: 'Pending Arrival'
  },
  pendingArrivalDesc: {
    es: 'Este paquete aún no ha llegado a nuestro almacén.',
    en: 'This package has not yet arrived at our warehouse.'
  },
  missingWeight: {
    es: 'Peso Faltante',
    en: 'Missing Weight'
  },
  missingWeightDesc: {
    es: 'Este paquete ha llegado pero aún no ha sido pesado.',
    en: 'This package has arrived but has not been weighed yet.'
  },
  packageInfo: {
    es: 'Información del Paquete',
    en: 'Package Information'
  },
  productName: {
    es: 'Nombre del Producto',
    en: 'Product Name'
  },
  noName: {
    es: 'Sin nombre',
    en: 'No name'
  },
  productUrl: {
    es: 'URL del Producto',
    en: 'Product URL'
  },
  viewProduct: {
    es: 'Ver Producto',
    en: 'View Product'
  },
  retailer: {
    es: 'Tienda',
    en: 'Retailer'
  },
  quantity: {
    es: 'Cantidad',
    en: 'Quantity'
  },
  declaredValue: {
    es: 'Valor Declarado',
    en: 'Declared Value'
  },
  trackingInfo: {
    es: 'Información de Rastreo',
    en: 'Tracking Information'
  },
  trackingNumber: {
    es: 'Número de Rastreo',
    en: 'Tracking Number'
  },
  notProvided: {
    es: 'No proporcionado',
    en: 'Not provided'
  },
  carrier: {
    es: 'Transportista',
    en: 'Carrier'
  },
  unknown: {
    es: 'Desconocido',
    en: 'Unknown'
  },
  trackingLink: {
    es: 'Enlace de Rastreo',
    en: 'Tracking Link'
  },
  trackPackage: {
    es: 'Rastrear Paquete',
    en: 'Track Package'
  },
  physicalDetails: {
    es: 'Detalles Físicos',
    en: 'Physical Details'
  },
  status: {
    es: 'Estado',
    en: 'Status'
  },
  arrived: {
    es: 'Llegó',
    en: 'Arrived'
  },
  pending: {
    es: 'Pendiente',
    en: 'Pending'
  },
  arrivedAt: {
    es: 'Fecha de Llegada',
    en: 'Arrival Date'
  },
  weight: {
    es: 'Peso',
    en: 'Weight'
  },
  notWeighed: {
    es: 'No pesado',
    en: 'Not weighed'
  },
  dimensions: {
    es: 'Dimensiones',
    en: 'Dimensions'
  },
  orderInfo: {
    es: 'Información de la Orden',
    en: 'Order Information'
  },
  orderNumber: {
    es: 'Número de Orden',
    en: 'Order Number'
  },
  orderStatus: {
    es: 'Estado de la Orden',
    en: 'Order Status'
  },
  boxSize: {
    es: 'Tamaño de Caja',
    en: 'Box Size'
  },
  customerInfo: {
    es: 'Información del Cliente',
    en: 'Customer Information'
  },
  name: {
    es: 'Nombre',
    en: 'Name'
  },
  email: {
    es: 'Correo',
    en: 'Email'
  },
  phone: {
    es: 'Teléfono',
    en: 'Phone'
  },
  timestamps: {
    es: 'Fechas',
    en: 'Timestamps'
  },
  createdAt: {
    es: 'Creado',
    en: 'Created'
  },
  updatedAt: {
    es: 'Actualizado',
    en: 'Updated'
  },
  proofOfPurchase: {
    es: 'Comprobante de Compra',
    en: 'Proof of Purchase'
  },
  viewDocument: {
    es: 'Ver Documento',
    en: 'View Document'
  },
  downloadDocument: {
    es: 'Descargar',
    en: 'Download'
  }
}

const t = createTranslations(translations)

// Methods
const fetchPackage = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/packages/${route.params.id}`)
    packageItem.value = response.data
  } catch (error) {
    console.error('Error fetching package:', error)
    $toast.error('Error loading package details')
    await router.push('/app/admin/packages')
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const getFileType = (mimeType) => {
  if (!mimeType) return 'File'
  const types = {
    'application/pdf': 'PDF',
    'image/jpeg': 'JPEG Image',
    'image/jpg': 'JPG Image',
    'image/png': 'PNG Image'
  }
  return types[mimeType] || 'File'
}

const isImageFile = (mimeType) => {
  return mimeType && mimeType.startsWith('image/')
}

const openImageInNewTab = (url) => {
  window.open(url, '_blank')
}

const getOrderStatusColor = (status) => {
  const colors = {
    'collecting': 'bg-primary-100 text-primary-700',
    'awaiting_packages': 'bg-yellow-100 text-yellow-700',
    'packages_complete': 'bg-slate-100 text-slate-700',
    'quote_sent': 'bg-orange-100 text-orange-700',
    'paid': 'bg-green-100 text-green-700',
    'shipped': 'bg-primary-100 text-primary-700',
    'delivered': 'bg-gray-100 text-gray-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

// Fetch data on mount
onMounted(() => {
  fetchPackage()
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
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>