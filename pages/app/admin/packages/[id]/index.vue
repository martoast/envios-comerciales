<!-- pages/app/admin/packages/[id]/index.vue -->
<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button
              @click="goBack"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="h-6 w-px bg-gray-200"></div>
            <span class="text-sm text-gray-500">{{ t.package }} #{{ packageItem?.id }}</span>
          </div>
          <NuxtLink
            v-if="packageItem"
            :to="`/app/admin/packages/${packageItem.id}/edit`"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            {{ t.edit }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Content -->
    <div v-else-if="packageItem" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Product Hero -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div class="flex flex-col md:flex-row">
          <!-- Product Image -->
          <div class="md:w-80 flex-shrink-0 bg-gray-100 relative">
            <div class="aspect-square md:aspect-auto md:h-full">
              <img
                v-if="packageItem.product_image_url"
                :src="packageItem.product_image_url"
                alt=""
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 min-h-[240px]">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
              <span :class="[
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm',
                packageItem.arrived
                  ? 'bg-green-500 text-white'
                  : 'bg-amber-500 text-white'
              ]">
                <span :class="['w-2 h-2 rounded-full', packageItem.arrived ? 'bg-green-200' : 'bg-amber-200']"></span>
                {{ packageItem.arrived ? t.arrived : t.pending }}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex-1 p-6 md:p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ packageItem.product_name || t.noName }}
            </h1>

            <!-- Quick Stats -->
            <div class="flex flex-wrap gap-4 mt-4 mb-6">
              <div class="flex items-center gap-2 text-gray-600">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                </svg>
                <span class="font-medium">{{ t.qty }}: {{ packageItem.quantity }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="font-medium">${{ packageItem.declared_value || '0' }}</span>
              </div>
              <div v-if="packageItem.weight" class="flex items-center gap-2 text-gray-600">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
                <span class="font-medium">{{ packageItem.weight }} kg</span>
              </div>
            </div>

            <!-- Product Link -->
            <a
              v-if="packageItem.product_url"
              :href="packageItem.product_url"
              target="_blank"
              class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {{ t.viewProduct }}
            </a>
          </div>
        </div>
      </div>

      <!-- Order Context Card - THE MAIN FOCUS -->
      <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p class="text-primary-100 text-sm font-medium mb-1">{{ t.belongsToOrder }}</p>
            <div class="flex items-center gap-3">
              <span class="text-2xl font-bold">{{ packageItem.order.order_number || packageItem.order.tracking_number }}</span>
              <span :class="[
                'px-2.5 py-1 rounded-full text-xs font-semibold uppercase',
                getOrderStatusClass(packageItem.order.status)
              ]">
                {{ formatStatus(packageItem.order.status) }}
              </span>
            </div>
            <div class="flex items-center gap-2 mt-2 text-primary-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span class="font-medium">{{ packageItem.order.user.name }}</span>
              <span class="text-primary-200">·</span>
              <span>{{ packageItem.order.user.email }}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <NuxtLink
              :to="`/app/admin/orders/${packageItem.order.id}`"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              {{ t.viewOrder }}
            </NuxtLink>
            <NuxtLink
              :to="`/app/admin/orders/${packageItem.order.id}/items`"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-400/30 text-white font-semibold rounded-xl hover:bg-primary-400/50 transition-colors border border-primary-300/30"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
              {{ t.manageItems }}
            </NuxtLink>
            <NuxtLink
              :to="`/app/admin/customers/${packageItem.order.user.id}`"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-400/30 text-white font-semibold rounded-xl hover:bg-primary-400/50 transition-colors border border-primary-300/30"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {{ t.viewCustomer }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <!-- Item Details Card -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 class="font-semibold text-gray-900">{{ t.itemDetails }}</h2>
          </div>
          <div class="p-6">
            <dl class="space-y-4">
              <div class="flex justify-between">
                <dt class="text-gray-500">{{ t.status }}</dt>
                <dd>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    packageItem.arrived ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  ]">
                    {{ packageItem.arrived ? t.arrived : t.pending }}
                  </span>
                </dd>
              </div>
              <div v-if="packageItem.arrived_at" class="flex justify-between">
                <dt class="text-gray-500">{{ t.arrivedAt }}</dt>
                <dd class="font-medium text-gray-900">{{ formatDate(packageItem.arrived_at) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">{{ t.quantity }}</dt>
                <dd class="font-medium text-gray-900">{{ packageItem.quantity }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">{{ t.declaredValue }}</dt>
                <dd class="font-medium text-gray-900">${{ packageItem.declared_value || '0' }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">{{ t.weight }}</dt>
                <dd class="font-medium text-gray-900">
                  {{ packageItem.weight ? `${packageItem.weight} kg` : '-' }}
                </dd>
              </div>
              <div v-if="packageItem.dimensions" class="flex justify-between">
                <dt class="text-gray-500">{{ t.dimensions }}</dt>
                <dd class="font-medium text-gray-900">
                  {{ packageItem.dimensions.length }} × {{ packageItem.dimensions.width }} × {{ packageItem.dimensions.height }} cm
                </dd>
              </div>
              <div v-if="packageItem.estimated_delivery_date" class="flex justify-between">
                <dt class="text-gray-500">{{ t.estimatedDelivery }}</dt>
                <dd class="font-medium text-gray-900">{{ formatDate(packageItem.estimated_delivery_date) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Tracking Card - Collapsible -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            @click="showTracking = !showTracking"
            class="w-full px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between text-left"
          >
            <h2 class="font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              {{ t.tracking }}
            </h2>
            <svg :class="['w-5 h-5 text-gray-400 transition-transform', showTracking ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <div v-if="showTracking" class="p-6">
            <div v-if="packageItem.tracking_number">
              <!-- Tracking Number Display -->
              <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
                <div>
                  <p class="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                    {{ packageItem.carrier?.toUpperCase() || t.carrier }}
                  </p>
                  <p class="font-mono text-lg font-bold text-gray-900">{{ packageItem.tracking_number }}</p>
                </div>
                <div v-if="trackingData?.status?.tag">
                  <span :class="['px-3 py-1.5 rounded-full text-sm font-semibold', getTrackingColorClass(trackingData.status.tag)]">
                    {{ trackingData.status.tag }}
                  </span>
                </div>
              </div>

              <!-- Checkpoints -->
              <div v-if="trackingData?.checkpoints?.length" class="space-y-3 mb-4">
                <div
                  v-for="(cp, idx) in sortedCheckpoints.slice(0, 3)"
                  :key="idx"
                  class="flex gap-3 text-sm"
                >
                  <div :class="['w-2 h-2 rounded-full mt-1.5 flex-shrink-0', idx === 0 ? 'bg-primary-500' : 'bg-gray-300']"></div>
                  <div>
                    <p class="font-medium text-gray-900">{{ cp.message }}</p>
                    <p class="text-gray-500 text-xs">{{ cp.location }} · {{ formatDateTime(cp.time) }}</p>
                  </div>
                </div>
              </div>

              <!-- Track Link -->
              <a
                :href="getCarrierUrl"
                target="_blank"
                class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.trackOnCarrier }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div v-else class="text-center py-8 text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <p class="font-medium">{{ t.noTracking }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Proof of Purchase -->
      <div v-if="packageItem.proof_of_purchase_url" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 class="font-semibold text-gray-900">{{ t.proofOfPurchase }}</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  v-if="isImageFile(packageItem.proof_of_purchase_mime_type)"
                  :src="packageItem.proof_of_purchase_url"
                  class="w-full h-full object-cover rounded-lg"
                >
                <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ packageItem.proof_of_purchase_filename || t.proofFile }}</p>
                <p v-if="packageItem.proof_of_purchase_size" class="text-sm text-gray-500">
                  {{ formatFileSize(packageItem.proof_of_purchase_size) }}
                </p>
              </div>
            </div>
            <a
              :href="packageItem.proof_of_purchase_url"
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              {{ t.view }}
            </a>
          </div>
        </div>
      </div>

    </div>
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
const { getReturnUrl } = useListReturnUrl('packages')
const { t: createTranslations } = useLanguage()

// State
const packageItem = ref(null)
const loading = ref(true)
const trackingData = ref(null)
const loadingTracking = ref(false)
const showTracking = ref(true)

// Translations
const translations = {
  package: { es: 'Paquete', en: 'Package' },
  edit: { es: 'Editar', en: 'Edit' },
  arrived: { es: 'Llegado', en: 'Arrived' },
  pending: { es: 'Pendiente', en: 'Pending' },
  noName: { es: 'Sin nombre', en: 'No name' },
  qty: { es: 'Cantidad', en: 'Qty' },
  viewProduct: { es: 'Ver producto original', en: 'View original product' },
  belongsToOrder: { es: 'Pertenece a la orden', en: 'Belongs to order' },
  viewOrder: { es: 'Ver Orden', en: 'View Order' },
  manageItems: { es: 'Gestionar Items', en: 'Manage Items' },
  viewCustomer: { es: 'Ver Cliente', en: 'View Customer' },
  itemDetails: { es: 'Detalles del Artículo', en: 'Item Details' },
  status: { es: 'Estado', en: 'Status' },
  arrivedAt: { es: 'Fecha de llegada', en: 'Arrival date' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  declaredValue: { es: 'Valor declarado', en: 'Declared value' },
  weight: { es: 'Peso', en: 'Weight' },
  dimensions: { es: 'Dimensiones', en: 'Dimensions' },
  estimatedDelivery: { es: 'Entrega estimada', en: 'Est. delivery' },
  tracking: { es: 'Rastreo', en: 'Tracking' },
  carrier: { es: 'Transportista', en: 'Carrier' },
  trackOnCarrier: { es: 'Rastrear en sitio del carrier', en: 'Track on carrier site' },
  noTracking: { es: 'Sin número de rastreo', en: 'No tracking number' },
  proofOfPurchase: { es: 'Comprobante de Compra', en: 'Proof of Purchase' },
  proofFile: { es: 'Archivo', en: 'File' },
  view: { es: 'Ver', en: 'View' },
}

const t = createTranslations(translations)

// Navigation
const goBack = () => {
  router.push(getReturnUrl())
}

// Computed
const sortedCheckpoints = computed(() => {
  if (!trackingData.value?.checkpoints) return []
  return [...trackingData.value.checkpoints].sort((a, b) => new Date(b.time) - new Date(a.time))
})

const getCarrierUrl = computed(() => {
  const tracking = packageItem.value?.tracking_number
  const carrier = packageItem.value?.carrier?.toLowerCase()

  if (carrier === 'ups') return `https://www.ups.com/track?tracknum=${tracking}`
  if (carrier === 'fedex') return `https://www.fedex.com/fedextrack/?trknbr=${tracking}`
  if (carrier === 'usps') return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking}`
  if (carrier === 'dhl') return `https://www.dhl.com/us-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${tracking}`
  if (carrier === 'amazon') return `https://www.amazon.com/gp/css/shiptrack/view.html?trackingNumber=${tracking}`

  return `https://www.google.com/search?q=${tracking}+tracking`
})

// Methods
const fetchPackage = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/packages/${route.params.id}`)
    packageItem.value = response.data

    if (packageItem.value.tracking_number && !packageItem.value.arrived) {
      fetchTracking()
    }
  } catch (error) {
    $toast.error('Error loading package')
    router.push('/app/admin/packages')
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
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatDateTime = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-US', {
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

const isImageFile = (mimeType) => {
  return mimeType && mimeType.startsWith('image/')
}

const formatStatus = (status) => {
  return status?.replace(/_/g, ' ') || ''
}

const getOrderStatusClass = (status) => {
  const classes = {
    'collecting': 'bg-blue-400/30 text-white',
    'awaiting_packages': 'bg-amber-400/30 text-white',
    'packages_complete': 'bg-purple-400/30 text-white',
    'processing': 'bg-indigo-400/30 text-white',
    'shipped': 'bg-cyan-400/30 text-white',
    'delivered': 'bg-green-400/30 text-white',
    'ready_for_pickup': 'bg-teal-400/30 text-white',
    'awaiting_payment': 'bg-orange-400/30 text-white',
  }
  return classes[status] || 'bg-white/20 text-white'
}

const getTrackingColorClass = (status) => {
  const s = status?.toLowerCase()
  if (s === 'delivered') return 'bg-green-100 text-green-700'
  if (s === 'outfordelivery' || s === 'out for delivery') return 'bg-blue-100 text-blue-700'
  if (s === 'exception') return 'bg-red-100 text-red-700'
  if (s === 'intransit' || s === 'in transit') return 'bg-indigo-100 text-indigo-700'
  return 'bg-gray-100 text-gray-700'
}

onMounted(() => {
  fetchPackage()
})
</script>
