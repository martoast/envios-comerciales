<!-- components/user/UserOrderShippingDetails.vue -->
<template>
  <div v-if="order.guia_number || order.gia_url" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900">{{ t.shippingDetails }}</h2>
    </div>

    <div class="p-4 sm:p-6 space-y-6">

      <!-- DELIVERED STATE -->
      <div v-if="isDelivered && order.guia_number" class="flex flex-col items-center justify-center bg-green-50 rounded-xl p-6 border border-green-200 text-center">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-1">{{ t.packageDelivered }}</h3>
        <p class="text-sm text-green-600 font-medium mb-4">
          {{ order.delivered_at ? formatDate(order.delivered_at) : '' }}
        </p>

        <NuxtLink
          :to="`/track?tracking_number=${order.guia_number}`"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          {{ t.viewDeliveryDetails }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </NuxtLink>

        <!-- Subtle Reference Number -->
        <div class="mt-4 text-xs text-gray-400">
          {{ t.courierRef }}: <span class="font-mono select-all">{{ order.guia_number }}</span>
        </div>
      </div>

      <!-- IN TRANSIT STATE -->
      <div v-else-if="order.guia_number" class="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-1">{{ t.shipmentOnWay }}</h3>
        <p class="text-sm text-gray-500 mb-4">{{ t.trackInstruction }}</p>

        <NuxtLink
          :to="`/track?tracking_number=${order.guia_number}`"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {{ t.trackPackage }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>

        <!-- Subtle Reference Number -->
        <div class="mt-4 text-xs text-gray-400">
          {{ t.courierRef }}: <span class="font-mono select-all">{{ order.guia_number }}</span>
        </div>
      </div>

      <!-- Secondary Info Grid -->
      <div class="grid sm:grid-cols-2 gap-4 pt-2">

        <!-- Dates -->
        <div class="space-y-3">
          <!-- Delivered Date (show first if delivered) -->
          <div v-if="order.delivered_at" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider">{{ t.deliveredOn }}</p>
              <p class="text-sm font-medium text-green-700">{{ formatDate(order.delivered_at) }}</p>
            </div>
          </div>

          <div v-if="order.shipped_at" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider">{{ t.shippedOn }}</p>
              <p class="text-sm font-medium text-gray-900">{{ formatDate(order.shipped_at) }}</p>
            </div>
          </div>

          <!-- Only show estimated delivery if NOT delivered yet -->
          <div v-if="order.estimated_delivery_date && !isDelivered" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider">{{ t.estimatedDelivery }}</p>
              <p class="text-sm font-medium text-gray-900">{{ formatDate(order.estimated_delivery_date) }}</p>
            </div>
          </div>
        </div>

        <!-- GIA Document -->
        <div v-if="order.gia_url" class="flex flex-col justify-center">
          <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p class="text-xs text-gray-500 mb-2">{{ t.giaDocumentDesc }}</p>
            <NuxtLink :to="order.gia_url" external target="_blank" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              {{ t.downloadGIA }}
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['order'])
const { t: createTranslations } = useLanguage()

// Check if order is delivered
const isDelivered = computed(() => props.order?.status === 'delivered')

const translations = {
  shippingDetails: { es: "Detalles del Envío", en: "Shipping Details" },
  // Delivered state
  packageDelivered: { es: "¡Tu paquete fue entregado!", en: "Your package has been delivered!" },
  viewDeliveryDetails: { es: "Ver Detalles de Entrega", en: "View Delivery Details" },
  deliveredOn: { es: "Entregado el", en: "Delivered On" },
  // In transit state
  shipmentOnWay: { es: "Tu paquete está en camino", en: "Your shipment is on the way" },
  trackInstruction: { es: "Haz clic abajo para ver el estado actual", en: "Click below to view current status" },
  trackPackage: { es: "Rastrear Paquete", en: "Track Package" },
  courierRef: { es: "Ref. Guía", en: "Courier Ref" },
  // Common
  giaDocumentDesc: { es: "Documento de Importación (GIA):", en: "Import Document (GIA):" },
  downloadGIA: { es: "Descargar PDF", en: "Download PDF" },
  shippedOn: { es: "Enviado el", en: "Shipped On" },
  estimatedDelivery: { es: "Entrega Estimada", en: "Estimated Delivery" },
}
const t = createTranslations(translations)

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}
</script>