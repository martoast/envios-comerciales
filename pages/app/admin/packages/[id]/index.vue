<!-- pages/app/admin/packages/[id]/index.vue -->
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
              <p class="text-sm text-gray-500 mt-1 font-mono">ID: {{ packageItem?.id }}</p>
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
        
        <!-- Top Row: Product Image & Status Alerts -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Product Image Card -->
            <div class="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div class="aspect-w-16 aspect-h-12 bg-gray-50 w-full relative group">
                    <img 
                        v-if="packageItem.product_image_url" 
                        :src="packageItem.product_image_url" 
                        alt="Product" 
                        class="w-full h-full object-cover"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                        <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    
                    <!-- Zoom Overlay -->
                    <a 
                        v-if="packageItem.product_image_url" 
                        :href="packageItem.product_image_url" 
                        target="_blank"
                        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-zoom-in"
                    >
                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </a>
                </div>
                <div class="p-4 border-t border-gray-100 bg-white flex-1">
                    <h3 class="font-bold text-gray-900 line-clamp-2 mb-2" :title="packageItem.product_name">{{ packageItem.product_name }}</h3>
                    <p v-if="packageItem.product_url" class="text-sm truncate">
                        <a :href="packageItem.product_url" target="_blank" class="text-primary-600 hover:underline flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                            {{ t.viewProduct }}
                        </a>
                    </p>
                </div>
            </div>

            <!-- Status & Tracking Column -->
            <div class="lg:col-span-2 space-y-4">
                <!-- Status Alert -->
                <div v-if="!packageItem.arrived" class="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
                    <svg class="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                        <h3 class="font-bold text-yellow-900">{{ t.pendingArrival }}</h3>
                        <p class="text-sm text-yellow-700 mt-1">{{ t.pendingArrivalDesc }}</p>
                        <p v-if="packageItem.estimated_delivery_date" class="text-xs font-medium text-yellow-800 mt-2 bg-yellow-100 inline-block px-2 py-1 rounded">
                            ETA: {{ formatDate(packageItem.estimated_delivery_date) }}
                        </p>
                    </div>
                </div>

                <div v-else-if="packageItem.arrived && !packageItem.weight" class="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
                    <svg class="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                    <div>
                        <h3 class="font-bold text-orange-900">{{ t.missingWeight }}</h3>
                        <p class="text-sm text-orange-700 mt-1">{{ t.missingWeightDesc }}</p>
                    </div>
                </div>
                
                <!-- Real-time Tracking Card -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                        {{ t.trackingInfo }}
                    </h2>

                    <div v-if="packageItem.tracking_number" class="space-y-4">
                        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                            <div>
                                <p class="text-xs text-gray-500 uppercase font-bold tracking-wider">{{ packageItem.carrier || 'Carrier' }}</p>
                                <p class="font-mono text-lg font-medium text-gray-900">{{ packageItem.tracking_number }}</p>
                            </div>
                            <!-- Live Status Badge -->
                            <div v-if="trackingData">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border" :class="getTrackingColorClass(trackingData.status.tag)">
                                    {{ trackingData.status.tag }}
                                </span>
                            </div>
                            <div v-else-if="loadingTracking" class="animate-pulse text-xs text-gray-400">Loading...</div>
                        </div>
                        
                        <!-- Checkpoints -->
                        <div v-if="trackingData && trackingData.checkpoints?.length" class="border-t border-gray-100 pt-4">
                            <p class="text-xs font-bold text-gray-400 uppercase mb-3">Latest Updates</p>
                            <div class="space-y-4 pl-2 border-l-2 border-gray-100">
                                <div v-for="(kp, idx) in [...trackingData.checkpoints].reverse().slice(0, 3)" :key="idx" class="relative pl-4">
                                    <div class="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-gray-200 rounded-full"></div>
                                    <p class="text-sm font-medium text-gray-800">{{ kp.message }}</p>
                                    <p class="text-xs text-gray-500">{{ kp.location }} • {{ formatDate(kp.time) }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Fallback Link -->
                        <div class="text-right">
                             <a :href="getCarrierUrl" target="_blank" class="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
                                {{ t.viewOnCarrier }} &rarr;
                             </a>
                        </div>
                    </div>
                    <div v-else class="text-center py-6 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        {{ t.notProvided }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Physical Details -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
              </svg>
              {{ t.physicalDetails }}
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between border-b border-gray-50 pb-2">
                <span class="text-gray-500">{{ t.status }}</span>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  packageItem.arrived ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                ]">
                  {{ packageItem.arrived ? t.arrived : t.pending }}
                </span>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-2" v-if="packageItem.arrived_at">
                <span class="text-gray-500">{{ t.arrivedAt }}</span>
                <span class="font-medium text-gray-900">{{ formatDate(packageItem.arrived_at) }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-2">
                <span class="text-gray-500">{{ t.weight }}</span>
                <span class="font-medium text-gray-900">{{ packageItem.weight ? `${packageItem.weight} kg` : t.notWeighed }}</span>
              </div>
              <div class="flex justify-between" v-if="packageItem.dimensions">
                <span class="text-gray-500">{{ t.dimensions }}</span>
                <span class="font-medium text-gray-900">
                  {{ packageItem.dimensions.length }} × {{ packageItem.dimensions.width }} × {{ packageItem.dimensions.height }} cm
                </span>
              </div>
            </div>
          </div>

          <!-- Order & Customer Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {{ t.orderInfo }}
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between border-b border-gray-50 pb-2">
                <span class="text-gray-500">{{ t.orderNumber }}</span>
                <NuxtLink :to="`/app/admin/orders/${packageItem.order.id}`" class="font-mono font-medium text-primary-600 hover:underline">
                  {{ packageItem.order.tracking_number }}
                </NuxtLink>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-2">
                <span class="text-gray-500">{{ t.customer }}</span>
                <NuxtLink :to="`/app/admin/customers/${packageItem.order.user.id}`" class="font-medium text-primary-600 hover:underline">
                  {{ packageItem.order.user.name }}
                </NuxtLink>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-2">
                <span class="text-gray-500">{{ t.orderStatus }}</span>
                <span class="text-sm font-medium capitalize">{{ packageItem.order.status.replace('_', ' ') }}</span>
              </div>
              
              <!-- GIA LINK -->
              <div v-if="packageItem.order.gia_url" class="mt-4 pt-2">
                 <a :href="packageItem.order.gia_url" target="_blank" class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 font-medium rounded-lg hover:bg-primary-100 transition-colors border border-primary-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    View Order GIA
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
          
          <div class="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
             <div class="flex items-center gap-3">
                <div class="p-2 bg-white border border-gray-200 rounded-lg">
                   <!-- Preview Image if image -->
                   <img 
                      v-if="isImageFile(packageItem.proof_of_purchase_mime_type)" 
                      :src="packageItem.proof_of_purchase_url" 
                      class="w-10 h-10 object-cover rounded"
                   >
                   <svg v-else class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                </div>
                <div>
                   <p class="font-medium text-sm text-gray-900 line-clamp-1">{{ packageItem.proof_of_purchase_filename }}</p>
                   <p class="text-xs text-gray-500">{{ formatFileSize(packageItem.proof_of_purchase_size) }}</p>
                </div>
             </div>
             <a :href="packageItem.proof_of_purchase_url" target="_blank" class="text-primary-600 hover:text-primary-700 text-sm font-bold hover:underline">
                View
             </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

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
const trackingData = ref(null)
const loadingTracking = ref(false)

// Translations
const translations = {
  packageDetails: { es: 'Detalles del Paquete', en: 'Package Details' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  editPackage: { es: 'Editar', en: 'Edit' },
  pendingArrival: { es: 'Esperando Llegada', en: 'Pending Arrival' },
  pendingArrivalDesc: { es: 'Este paquete aún no ha llegado a nuestro almacén.', en: 'This package has not yet arrived at our warehouse.' },
  missingWeight: { es: 'Peso Faltante', en: 'Missing Weight' },
  missingWeightDesc: { es: 'Este paquete ha llegado pero aún no ha sido pesado.', en: 'This package has arrived but has not been weighed yet.' },
  packageInfo: { es: 'Información', en: 'Information' },
  productName: { es: 'Producto', en: 'Product' },
  noName: { es: 'Sin nombre', en: 'No name' },
  productUrl: { es: 'URL', en: 'URL' },
  viewProduct: { es: 'Ver', en: 'View' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  trackingInfo: { es: 'Rastreo', en: 'Tracking' },
  trackingNumber: { es: 'Tracking #', en: 'Tracking #' },
  notProvided: { es: 'No disponible', en: 'N/A' },
  carrier: { es: 'Carrier', en: 'Carrier' },
  unknown: { es: 'Desconocido', en: 'Unknown' },
  trackingLink: { es: 'Link Externo', en: 'External Link' },
  trackPackage: { es: 'Rastrear', en: 'Track' },
  physicalDetails: { es: 'Físico', en: 'Physical' },
  status: { es: 'Estado', en: 'Status' },
  arrived: { es: 'Llegó', en: 'Arrived' },
  pending: { es: 'Pendiente', en: 'Pending' },
  arrivedAt: { es: 'Fecha Llegada', en: 'Arrival Date' },
  weight: { es: 'Peso', en: 'Weight' },
  notWeighed: { es: '-', en: '-' },
  dimensions: { es: 'Dimensiones', en: 'Dimensions' },
  orderInfo: { es: 'Orden', en: 'Order' },
  orderNumber: { es: 'ID Orden', en: 'Order ID' },
  orderStatus: { es: 'Estado Orden', en: 'Order Status' },
  boxSize: { es: 'Caja', en: 'Box' },
  customerInfo: { es: 'Cliente', en: 'Customer' },
  customer: { es: 'Cliente', en: 'Customer' },
  name: { es: 'Nombre', en: 'Name' },
  email: { es: 'Email', en: 'Email' },
  phone: { es: 'Tel', en: 'Phone' },
  timestamps: { es: 'Fechas', en: 'Dates' },
  createdAt: { es: 'Creado', en: 'Created' },
  updatedAt: { es: 'Actualizado', en: 'Updated' },
  proofOfPurchase: { es: 'Recibo', en: 'Receipt' },
  viewDocument: { es: 'Ver', en: 'View' },
  downloadDocument: { es: 'Bajar', en: 'Download' },
  viewOnCarrier: { es: 'Ver en sitio', en: 'View on site' }
}

const t = createTranslations(translations)

// Methods
const fetchPackage = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/packages/${route.params.id}`)
    packageItem.value = response.data
    
    // Fetch tracking if available and not arrived
    if (packageItem.value.tracking_number && !packageItem.value.arrived) {
        fetchTracking()
    }
  } catch (error) {
    console.error('Error fetching package:', error)
    $toast.error('Error loading package details')
    await router.push('/app/admin/packages')
  } finally {
    loading.value = false
  }
}

const fetchTracking = async () => {
    loadingTracking.value = true
    try {
        const response = await $customFetch('/shipment-tracking/track', {
            method: 'POST',
            body: { tracking_number: packageItem.value.tracking_number }
        })
        if (response.success) {
            trackingData.value = response.data
        }
    } catch (e) {
        // Silent fail
    } finally {
        loadingTracking.value = false
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
  if (mimeType.includes('pdf')) return 'PDF'
  if (mimeType.includes('image')) return 'Image'
  return 'File'
}

const isImageFile = (mimeType) => {
  return mimeType && mimeType.startsWith('image/')
}

const openImageInNewTab = (url) => {
  window.open(url, '_blank')
}

const getCarrierUrl = computed(() => {
    return `https://www.google.com/search?q=${packageItem.value?.tracking_number}`
})

const getTrackingColorClass = (status) => {
    const s = status?.toLowerCase()
    if (s === 'delivered') return 'bg-green-100 text-green-800 border-green-200'
    if (s === 'outfordelivery' || s === 'out for delivery') return 'bg-blue-100 text-blue-800 border-blue-200'
    if (s === 'exception') return 'bg-red-100 text-red-800 border-red-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
}

const getOrderStatusColor = (status) => {
  const colors = {
    'collecting': 'bg-blue-100 text-blue-700',
    'awaiting_packages': 'bg-yellow-100 text-yellow-700',
    'packages_complete': 'bg-purple-100 text-purple-700',
    'processing': 'bg-indigo-100 text-indigo-700',
    'shipped': 'bg-cyan-100 text-cyan-700',
    'delivered': 'bg-green-100 text-green-700',
    'awaiting_payment': 'bg-orange-100 text-orange-700',
    'paid': 'bg-emerald-100 text-emerald-700',
    'cancelled': 'bg-red-100 text-red-700'
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>