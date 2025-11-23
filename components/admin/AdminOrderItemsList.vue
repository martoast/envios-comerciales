<!-- components/admin/AdminOrderItemsList.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">{{ t.items }}</h2>
      <span class="text-sm text-gray-500">{{ items.length }} {{ t.itemsCount }}</span>
    </div>
    <div class="divide-y divide-gray-100">
      <div
        v-for="item in items"
        :key="item.id"
        class="px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex gap-4 items-start">
          <!-- Item Image Thumbnail -->
          <a 
            v-if="item.product_image_url" 
            :href="item.product_image_url" 
            target="_blank" 
            class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group cursor-zoom-in"
            title="View Full Image"
          >
            <img :src="item.product_image_url" class="w-full h-full object-cover" alt="Product Image">
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <svg class="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
          </a>
          <!-- Fallback Icon -->
          <div v-else class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>

          <div class="flex-1 min-w-0">
            <!-- Item Header -->
            <div class="flex justify-between items-start mb-1">
                <h3 class="text-sm font-medium text-gray-900 line-clamp-1" :title="item.product_name">
                  <!-- Product Name Link Logic -->
                  <a 
                      v-if="item.product_url" 
                      :href="item.product_url" 
                      target="_blank" 
                      class="hover:text-primary-600 hover:underline transition-colors inline-flex items-center gap-1"
                  >
                      {{ item.product_name }}
                      <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <span v-else>{{ item.product_name }}</span>
                </h3>
                
                <!-- Internal Status Badge -->
                <span :class="[
                  'px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-2',
                  item.arrived ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                ]">
                  {{ item.arrived ? t.arrived : t.pending }}
                </span>
            </div>
            
            <!-- Item Details -->
            <p class="text-xs text-gray-500 mb-2">
              {{ t.quantity }}: {{ item.quantity }} | 
              <span v-if="item.weight">{{ t.weight }}: {{ item.weight }} kg</span>
              <template v-if="item.declared_value">
                | {{ t.value }}: ${{ item.declared_value }}
              </template>
              <span v-if="item.dimensions">| {{ formatDimensions(item.dimensions) }}</span>
            </p>

            <!-- Real-time Tracking Information Block -->
            <div v-if="item.tracking_number && !item.arrived" class="mt-3 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                
                <!-- Tracking Header (Clickable) -->
                <div 
                  @click="toggleTrackingDetails(item.id)"
                  class="px-3 py-2 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <div class="flex items-center gap-2">
                        <!-- Carrier Logo -->
                        <div class="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-0.5">
                            <img 
                                v-if="getCarrierLogo(item)" 
                                :src="getCarrierLogo(item)" 
                                :alt="getCarrierName(item)"
                                class="w-full h-full object-contain"
                            >
                            <svg v-else class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide leading-tight">
                                {{ getCarrierName(item) }}
                            </span>
                            <span class="text-[10px] text-gray-500 font-mono leading-tight">#{{ item.tracking_number }}</span>
                        </div>
                    </div>
                    
                    <!-- Tracking Status Badge -->
                    <div class="flex items-center gap-2">
                        <span v-if="loadingTracking" class="text-[10px] text-gray-400">Loading...</span>
                        <span 
                            v-else-if="getTrackingStatus(item)" 
                            class="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                            :class="getTrackingColorClass(getTrackingStatus(item))"
                        >
                            {{ getTrackingStatus(item) }}
                        </span>
                        <svg class="w-3 h-3 text-gray-400 transform transition-transform" :class="{ 'rotate-180': expandedItems.includes(item.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                </div>

                <!-- Tracking Body (Expandable) -->
                <div v-if="expandedItems.includes(item.id) && trackingInfo[item.tracking_number]" class="px-3 py-2 border-t border-gray-100 bg-gray-50/50">
                    
                    <!-- Latest Update Summary -->
                    <div class="flex items-start gap-3 mb-3">
                        <div class="flex-1">
                            <p class="text-xs text-gray-900 font-medium">
                                {{ getLatestCheckpoint(item)?.message || 'Status unavailable' }}
                            </p>
                            <p class="text-[10px] text-gray-500">
                                <span v-if="getLatestCheckpoint(item)?.location">{{ getLatestCheckpoint(item).location }}</span>
                                <span v-if="getLatestCheckpoint(item)"> • {{ formatDateTime(getLatestCheckpoint(item).time) }}</span>
                            </p>
                        </div>
                    </div>

                    <!-- Estimated Delivery -->
                    <div v-if="getTrackingEta(item)" class="flex items-center gap-2 text-[10px] text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 mb-3 w-fit">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span class="font-semibold">{{ t.expectedDelivery }}:</span>
                        <span>{{ getTrackingEta(item) }}</span>
                    </div>

                    <!-- Checkpoints Timeline -->
                    <div class="pt-2 border-t border-dashed border-gray-200 space-y-3 pl-1">
                        <div v-for="(checkpoint, idx) in getSortedCheckpoints(item)" :key="idx" class="relative flex gap-3 pb-1">
                            <!-- Timeline Line -->
                            <div v-if="idx !== getSortedCheckpoints(item).length - 1" class="absolute left-[4px] top-1.5 bottom-[-14px] w-px bg-gray-300"></div>
                            
                            <div class="mt-1 w-2 h-2 rounded-full border flex-shrink-0 z-10" 
                                :class="idx === 0 ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-400'">
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-medium text-gray-800 leading-tight">{{ checkpoint.message }}</p>
                                <p class="text-[10px] text-gray-500 leading-tight mt-0.5">
                                    {{ checkpoint.location }} • {{ formatDateTime(checkpoint.time) }}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-2 mt-2 border-t border-gray-100 text-center">
                        <a :href="getCarrierTrackingUrl(item)" target="_blank" class="text-[10px] text-primary-600 hover:text-primary-700 hover:underline flex items-center justify-center gap-1">
                            View on Carrier Site <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </a>
                    </div>
                </div>
                
                <!-- Fallback if expanded but no data -->
                <div v-else-if="expandedItems.includes(item.id)" class="px-3 py-3 text-center text-xs text-gray-400 italic border-t border-gray-100">
                    {{ loadingTracking ? 'Fetching updates...' : 'No detailed tracking info available.' }}
                </div>

            </div>

            <!-- Actions Row -->
            <div class="flex flex-wrap items-center gap-3 mt-3">
                <!-- Mark Arrived Button -->
                <button
                  v-if="!item.arrived && orderStatus !== 'collecting'"
                  @click="$emit('mark-arrived', item)"
                  class="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg font-medium flex items-center gap-1 transition-colors"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ t.markArrived }}
                </button>

                <!-- Proof of Purchase -->
                <a 
                  v-if="item.proof_of_purchase_full_url" 
                  :href="item.proof_of_purchase_full_url" 
                  target="_blank"
                  class="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-1 transition-colors border border-gray-200"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  {{ t.viewDocument }}
                </a>
            </div>

          </div>
        </div>
      </div>
      <div v-if="items.length === 0" class="px-6 py-8 text-center text-gray-500 text-sm">
        No items found in this order.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['items', 'orderStatus'])
const emit = defineEmits(['mark-arrived'])
const { t: createTranslations } = useLanguage()
const { $customFetch } = useNuxtApp()

const trackingInfo = ref({})
const loadingTracking = ref(false)
const expandedItems = ref([])

const translations = {
  items: { es: 'Artículos', en: 'Items' },
  itemsCount: { es: 'artículos', en: 'items' },
  arrived: { es: 'Llegó', en: 'Arrived' },
  pending: { es: 'Pendiente', en: 'Pending' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  weight: { es: 'Peso', en: 'Weight' },
  value: { es: 'Valor', en: 'Value' },
  dimensions: { es: 'Dimensiones', en: 'Dimensions' },
  markArrived: { es: 'Marcar como Llegado', en: 'Mark as Arrived' },
  expectedDelivery: { es: 'Entrega Estimada', en: 'Expected Delivery' },
  expectedToday: { es: 'Llega hoy', en: 'Expected today' },
  viewDocument: { es: 'Ver Documento', en: 'View Document' },
  daysOverdue: { es: 'días de retraso', en: 'days overdue' },
  dayOverdue: { es: 'día de retraso', en: 'day overdue' },
  daysAway: { es: 'días', en: 'days away' },
  dayAway: { es: 'día', en: 'day away' },
}

const t = createTranslations(translations)

// --- Tracking Logic ---

const fetchTrackingInfo = async () => {
    const packagesToTrack = props.items
        .filter(item => item.tracking_number && !item.arrived)
        .map(item => ({
            tracking_number: item.tracking_number,
            carrier: item.carrier
        }))

    // Deduplicate
    const uniquePackages = [...new Map(packagesToTrack.map(item => [item.tracking_number, item])).values()]

    if (uniquePackages.length === 0) return

    loadingTracking.value = true
    try {
        const response = await $customFetch('/shipment-tracking/track/bulk', {
            method: 'POST',
            body: { packages: uniquePackages }
        })
        
        if (response.success && response.data) {
            trackingInfo.value = { ...trackingInfo.value, ...response.data }
        }
    } catch (e) {
        console.error('Bulk tracking failed (Admin)', e)
    } finally {
        loadingTracking.value = false
    }
}

const toggleTrackingDetails = (itemId) => {
    if (expandedItems.value.includes(itemId)) {
        expandedItems.value = expandedItems.value.filter(id => id !== itemId)
    } else {
        expandedItems.value.push(itemId)
    }
}

const getTrackingInfo = (item) => {
    if (!item?.tracking_number) return null
    return trackingInfo.value[item.tracking_number] || null
}

const getTrackingStatus = (item) => {
    const info = getTrackingInfo(item)
    if (!info || !info.status) return null
    
    const tag = info.status.tag
    if (tag === 'Delivered') return 'Delivered'
    if (tag === 'OutForDelivery') return 'Out for Delivery'
    if (tag === 'InTransit') return 'In Transit'
    if (tag === 'Exception') return 'Exception'
    if (tag === 'InfoReceived') return 'Label Created'
    return tag || 'Pending'
}

const getCarrierName = (item) => {
    const info = getTrackingInfo(item)
    if (info && info.carrier && info.carrier.name) {
        return info.carrier.name
    }
    return item.carrier || 'Carrier'
}

const getCarrierLogo = (item) => {
    const info = getTrackingInfo(item)
    let slug = info?.carrier?.slug || item.carrier?.toLowerCase() || ''
    
    if (slug.includes('fedex')) return 'https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg'
    if (slug.includes('ups')) return 'https://upload.wikimedia.org/wikipedia/commons/6/6b/United_Parcel_Service_logo_2014.svg'
    if (slug.includes('usps')) return 'https://upload.wikimedia.org/wikipedia/commons/5/5a/USPS_-_Color_Logo.svg'
    if (slug.includes('dhl')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/200px-DHL_Logo.svg.png'
    if (slug.includes('amazon')) return 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    if (slug.includes('ontrac')) return 'https://upload.wikimedia.org/wikipedia/commons/8/8c/OnTrac_logo.png'
    
    return null
}

const getTrackingEta = (item) => {
    const info = getTrackingInfo(item)
    if (!info || !info.estimated_delivery) return null
    return formatDate(info.estimated_delivery)
}

// Get LATEST (Newest) Checkpoint
const getLatestCheckpoint = (item) => {
    const info = getTrackingInfo(item)
    if (!info || !info.checkpoints || info.checkpoints.length === 0) return null
    
    // Sort Descending (Newest First) and take top
    const sorted = [...info.checkpoints].sort((a,b) => new Date(b.time) - new Date(a.time))
    return sorted[0]
}

// Get Sorted Checkpoints (Newest -> Oldest)
const getSortedCheckpoints = (item) => {
    const info = getTrackingInfo(item)
    if (!info || !info.checkpoints) return []
    
    return [...info.checkpoints]
        .sort((a,b) => new Date(b.time) - new Date(a.time))
        .slice(0, 5) // Limit to last 5 events
}

const getTrackingColorClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-600 border-gray-200'
    
    const s = status.toLowerCase()
    if (s === 'delivered') return 'bg-green-50 text-green-700 border-green-200'
    if (s === 'out for delivery') return 'bg-blue-50 text-blue-700 border-blue-200'
    if (s === 'exception') return 'bg-red-50 text-red-700 border-red-200'
    if (s === 'label created' || s === 'pending') return 'bg-gray-100 text-gray-600 border-gray-200'
    
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
}

// Helpers
const formatDimensions = (dimensions) => {
  if (!dimensions) return '-'
  const length = dimensions.length || dimensions.l || 0
  const width = dimensions.width || dimensions.w || 0
  const height = dimensions.height || dimensions.h || 0
  if (!length && !width && !height) return '-'
  return `${length} × ${width} × ${height} cm`
}

const formatDeliveryDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDate = (date) => {
    if(!date) return ''
    return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const formatDateTime = (dateString) => {
    if(!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getCarrierTrackingUrl = (item) => {
    return `https://www.google.com/search?q=${item.tracking_number}`
}

const getDeliveryStatus = (dateString) => {
  if (!dateString) return 'unknown'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deliveryDate = new Date(dateString)
  deliveryDate.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'overdue'
  if (diffDays === 0) return 'today'
  return 'future'
}

const getDaysUntilDelivery = (dateString) => {
  if (!dateString) return ''
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deliveryDate = new Date(dateString)
  deliveryDate.setHours(0, 0, 0, 0)
  
  const diffTime = deliveryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    return absDays === 1 
      ? `1 ${t.value.dayOverdue}` 
      : `${absDays} ${t.value.daysOverdue}`
  } else if (diffDays === 0) {
    return t.value.expectedToday
  } else {
    return diffDays === 1 
      ? `1 ${t.value.dayAway}` 
      : `${diffDays} ${t.value.daysAway}`
  }
}

onMounted(() => {
    if (props.items && props.items.length > 0) {
        fetchTrackingInfo()
    }
})
</script>