<!-- components/user/UserOrderItemsList.vue -->
<template>
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">{{ t.items }} ({{ items.length }})</h2>
        
        <NuxtLink
          v-if="canManageItems"
          :to="`/app/orders/${order.id}/items`"
          class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          {{ t.manage }}
        </NuxtLink>
      </div>
  
      <div v-if="items.length > 0" class="divide-y divide-gray-100">
        <div v-for="item in items" :key="item.id" class="p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
          <div class="flex items-start gap-3 sm:gap-4">
            
            <!-- Product Image Thumbnail -->
            <a 
              v-if="item.product_image_url" 
              :href="item.product_image_url" 
              target="_blank"
              class="flex-shrink-0 cursor-zoom-in"
              title="View Image"
            >
               <img :src="item.product_image_url" alt="Product" class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200 shadow-sm hover:opacity-90 transition-opacity">
            </a>
            <!-- Fallback Icon -->
            <div v-else class="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
              <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
  
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                  <div>
                      <!-- Product Name (Now with URL Logic) -->
                      <div class="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                          <a 
                              v-if="item.product_url" 
                              :href="item.product_url" 
                              target="_blank" 
                              class="hover:text-primary-600 hover:underline transition-colors"
                          >
                              {{ item.product_name }}
                              <!-- External Link Icon -->
                              <svg class="inline-block w-3.5 h-3.5 ml-0.5 -mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                          <span v-else>{{ item.product_name }}</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t.quantity }}: {{ item.quantity }}</p>
                  </div>
  
                  <!-- Warehouse Status Badge -->
                  <span v-if="item.arrived" class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap ml-2 border border-green-200">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                      {{ t.arrivedWarehouse }}
                  </span>
                  <span v-else class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap ml-2 border border-gray-200">
                      {{ t.pendingArrival }}
                  </span>
              </div>
  
              <!-- Real-time Tracking Information Block -->
              <div v-if="item.tracking_number && !item.arrived && trackingInfo[item.tracking_number]" class="mt-3 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  
                  <!-- Tracking Header -->
                  <div 
                    @click="toggleTrackingDetails(item.id)"
                    class="px-3 py-2 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                      <div class="flex items-center gap-2">
                          <!-- Carrier Logo -->
                          <div class="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-0.5">
                              <img 
                                  v-if="getCarrierLogo(item)" 
                                  :src="getCarrierLogo(item)" 
                                  :alt="getCarrierName(item)"
                                  class="w-full h-full object-contain"
                              >
                              <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                          </div>
                          <div class="flex flex-col">
                              <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                  {{ getCarrierName(item) || 'Tracking' }}
                              </span>
                              <span class="text-[10px] text-gray-500 font-mono">{{ item.tracking_number }}</span>
                          </div>
                      </div>
                      
                      <!-- Tracking Status Badge -->
                      <div class="flex items-center gap-2">
                          <span 
                              v-if="getTrackingStatus(item)" 
                              class="text-xs font-medium px-2 py-0.5 rounded-full border"
                              :class="getTrackingColorClass(getTrackingStatus(item))"
                          >
                              {{ getTrackingStatus(item) }}
                          </span>
                          <svg class="w-4 h-4 text-gray-400 transform transition-transform" :class="{ 'rotate-180': expandedItems.includes(item.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                      </div>
                  </div>
  
                  <!-- Tracking Body -->
                  <div class="px-3 py-2 border-t border-gray-100">
                      
                      <!-- Latest Update Summary (Fixed to pick NEWEST checkpoint) -->
                      <div class="flex items-start gap-3 mb-2">
                          <div class="flex-1">
                              <p class="text-sm text-gray-900 font-medium">
                                  {{ getLatestCheckpoint(item)?.message || t.statusUnavailable }}
                              </p>
                              <p class="text-xs text-gray-500">
                                  <span v-if="getLatestCheckpoint(item)?.location">{{ getLatestCheckpoint(item).location }}</span>
                                  <span v-if="getLatestCheckpoint(item)"> • {{ formatDateTime(getLatestCheckpoint(item).time) }}</span>
                              </p>
                          </div>
                      </div>
  
                      <!-- Estimated Delivery -->
                      <div v-if="getTrackingEta(item)" class="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-2 py-1.5 rounded-md mb-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <span class="font-semibold">{{ t.estimatedDelivery }}:</span>
                          <span>{{ getTrackingEta(item) }}</span>
                      </div>
  
                      <!-- Expandable Checkpoints -->
                      <div v-if="expandedItems.includes(item.id)" class="mt-3 pt-3 border-t border-dashed border-gray-200 space-y-4 pl-1">
                          <div v-for="(checkpoint, idx) in getSortedCheckpoints(item)" :key="idx" class="relative flex gap-3 pb-1">
                              <!-- Timeline Line -->
                              <div v-if="idx !== getSortedCheckpoints(item).length - 1" class="absolute left-[5px] top-2 bottom-[-16px] w-0.5 bg-gray-200"></div>
                              
                              <div class="mt-1.5 w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 z-10" 
                                  :class="idx === 0 ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300'">
                              </div>
                              
                              <div class="flex-1 min-w-0">
                                  <p class="text-xs font-medium text-gray-800">{{ checkpoint.message }}</p>
                                  <p class="text-[10px] text-gray-500">
                                      {{ checkpoint.location }} • {{ formatDateTime(checkpoint.time) }}
                                  </p>
                              </div>
                          </div>
                          <div class="pt-2 text-center">
                              <a :href="getCarrierTrackingUrl(item)" target="_blank" class="text-xs text-primary-600 hover:text-primary-700 hover:underline">
                                  {{ t.viewOnCarrierSite }} &rarr;
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- Fallback View -->
              <div v-else-if="item.tracking_number && !item.arrived" class="mt-3">
                   <div class="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded border border-gray-200 flex items-center justify-between">
                      <span class="font-mono">#{{ item.tracking_number }}</span>
                      <span v-if="loadingTracking" class="animate-pulse">{{ t.fetchingUpdate }}...</span>
                      <span v-else class="text-gray-400 italic">{{ t.noTrackingDetails }}</span>
                   </div>
              </div>
  
              <!-- User Actions & Manual Date -->
              <div class="flex flex-wrap items-center gap-3 mt-3">
                <!-- Manual Estimated Date -->
                <div v-if="!item.arrived && item.estimated_delivery_date && !getTrackingEta(item)" class="text-xs text-gray-600 bg-gray-100 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full">
                  <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>{{ t.expectedBy }}: {{ formatDate(item.estimated_delivery_date) }}</span>
                </div>
  
                <!-- Receipt Link -->
                <a 
                  v-if="item.proof_of_purchase_full_url" 
                  :href="item.proof_of_purchase_full_url" 
                  target="_blank"
                  class="group inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  {{ t.viewReceipt }}
                </a>
              </div>
  
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="p-8 text-center text-gray-500 text-sm">
        {{ t.noItems }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  const props = defineProps(['order'])
  const items = computed(() => props.order?.items || [])
  const { t: createTranslations } = useLanguage()
  const { $customFetch } = useNuxtApp()
  
  const trackingInfo = ref({})
  const loadingTracking = ref(false)
  const expandedItems = ref([])
  
  const canManageItems = computed(() => {
    const status = props.order?.status
    return status === 'collecting' || (status === 'awaiting_packages' && items.value.some(i => !i.arrived))
  })
  
  const translations = {
    items: { es: "Artículos", en: "Items" },
    manage: { es: "Gestionar", en: "Manage" },
    quantity: { es: "Cant", en: "Qty" },
    arrivedWarehouse: { es: "En Almacén", en: "At Warehouse" },
    pendingArrival: { es: "Esperando Llegada", en: "Awaiting Arrival" },
    inTransit: { es: "En Camino", en: "In Transit" },
    expectedBy: { es: "Esperado para", en: "Expected by" },
    estimatedDelivery: { es: "Entrega Estimada", en: "Estimated Delivery" },
    noItems: { es: "No hay artículos.", en: "No items found." },
    viewReceipt: { es: "Ver Recibo", en: "View Receipt" },
    tracking: { es: "Rastreando", en: "Tracking" },
    deliveredCarrier: { es: "Entregado", en: "Delivered" },
    clickToTrack: { es: "Clic para ver detalles", en: "Click to view details" },
    statusUnavailable: { es: "Estado no disponible", en: "Status unavailable" },
    fetchingUpdate: { es: "Actualizando...", en: "Updating..." },
    noTrackingDetails: { es: "Detalles no disponibles", en: "Details unavailable" },
    viewOnCarrierSite: { es: "Ver en sitio del transportista", en: "View on carrier site" },
  }
  const t = createTranslations(translations)
  
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
  
  const toggleTrackingDetails = (itemId) => {
      if (expandedItems.value.includes(itemId)) {
          expandedItems.value = expandedItems.value.filter(id => id !== itemId)
      } else {
          expandedItems.value.push(itemId)
      }
  }
  
  // --- Bulk Tracking Logic ---
  
  const fetchTrackingInfo = async () => {
      const packagesToTrack = items.value
          .filter(item => item.tracking_number && !item.arrived)
          .map(item => ({
              tracking_number: item.tracking_number,
              carrier: item.carrier
          }))
  
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
          console.error('Bulk tracking failed', e)
      } finally {
          loadingTracking.value = false
      }
  }
  
  // Safe Helpers
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
  
  // FIX: Always get the LATEST (Last in array, or sorted desc)
  const getLatestCheckpoint = (item) => {
      const info = getTrackingInfo(item)
      if (!info || !info.checkpoints || info.checkpoints.length === 0) return null
      
      // Create copy and sort by time DESC (Newest first)
      const sorted = [...info.checkpoints].sort((a,b) => new Date(b.time) - new Date(a.time))
      return sorted[0] // Return newest
  }
  
  // FIX: Sort Newest -> Oldest for the list
  const getSortedCheckpoints = (item) => {
      const info = getTrackingInfo(item)
      if (!info || !info.checkpoints) return []
      
      // Sort DESC, take top 5
      return [...info.checkpoints]
          .sort((a,b) => new Date(b.time) - new Date(a.time))
          .slice(0, 5)
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
  
  const getCarrierTrackingUrl = (item) => {
      return `https://www.google.com/search?q=${item.tracking_number}`
  }
  
  watch(() => props.order?.items, (newItems) => {
      if (newItems && newItems.length > 0) {
          fetchTrackingInfo()
      }
  }, { deep: true })
  
  onMounted(() => {
      if (items.value.length > 0) {
          fetchTrackingInfo()
      }
  })
  </script>