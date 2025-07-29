<template>
    <div class="bg-white rounded-xl p-6 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ t.orderProgress }}
      </h2>
      <div class="relative">
        <!-- Timeline Steps -->
        <div class="space-y-6 relative">
          <!-- Payment Step -->
          <div class="flex items-start gap-4">
            <div
              class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-green-600"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">
                {{ t.paymentCompleted }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(order.paid_at) }}
              </p>
            </div>
          </div>
  
          <!-- Items Added Step -->
          <div class="flex items-start gap-4">
            <div
              :class="[
                'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                order.items?.length > 0 ? 'bg-green-600' : 'bg-gray-300',
              ]"
            >
              <svg
                v-if="order.items?.length > 0"
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span v-else class="text-white text-xs font-semibold">2</span>
            </div>
            <div class="flex-1">
              <p
                class="font-medium"
                :class="
                  order.items?.length > 0 ? 'text-gray-900' : 'text-gray-500'
                "
              >
                {{ t.itemsAdded }}
              </p>
              <p class="text-sm text-gray-500">
                {{ order.items?.length || 0 }}
                {{ order.items?.length === 1 ? t.item : t.items }}
              </p>
            </div>
          </div>
  
          <!-- Order Completed Step -->
          <div class="flex items-start gap-4">
            <div
              :class="[
                'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                order.status !== 'collecting'
                  ? 'bg-green-600'
                  : 'bg-gray-300',
              ]"
            >
              <svg
                v-if="order.status !== 'collecting'"
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span v-else class="text-white text-xs font-semibold">3</span>
            </div>
            <div class="flex-1">
              <p
                class="font-medium"
                :class="
                  order.status !== 'collecting'
                    ? 'text-gray-900'
                    : 'text-gray-500'
                "
              >
                {{ t.orderCompleted }}
              </p>
              <p v-if="order.completed_at" class="text-sm text-gray-500">
                {{ formatDate(order.completed_at) }}
              </p>
            </div>
          </div>
  
          <!-- Awaiting Packages Step -->
          <div class="flex items-start gap-4">
            <div
              :class="[
                'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                [
                  'awaiting_packages',
                  'packages_complete',
                  'shipped',
                  'delivered',
                ].includes(order.status)
                  ? order.status === 'awaiting_packages'
                    ? 'bg-primary-600 ring-4 ring-primary-100'
                    : 'bg-green-600'
                  : 'bg-gray-300',
              ]"
            >
              <svg
                v-if="
                  ['packages_complete', 'shipped', 'delivered'].includes(
                    order.status
                  )
                "
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div
                v-else-if="order.status === 'awaiting_packages'"
                class="w-3 h-3 bg-white rounded-full animate-pulse"
              ></div>
              <span v-else class="text-white text-xs font-semibold">4</span>
            </div>
            <div class="flex-1">
              <p
                class="font-medium"
                :class="
                  [
                    'awaiting_packages',
                    'packages_complete',
                    'shipped',
                    'delivered',
                  ].includes(order.status)
                    ? 'text-gray-900'
                    : 'text-gray-500'
                "
              >
                {{ t.awaitingPackages }}
              </p>
              <p class="text-sm text-gray-500">
                <span v-if="order.status === 'awaiting_packages'">
                  {{ t.currentStatus }}: {{ arrivedCount }}/{{
                    order.items?.length || 0
                  }}
                  {{ t.arrived }}
                </span>
                <span
                  v-else-if="
                    ['packages_complete', 'shipped', 'delivered'].includes(
                      order.status
                    )
                  "
                >
                  {{ t.allPackagesReceived }}
                </span>
                <span v-else>{{ t.pendingCompletion }}</span>
              </p>
            </div>
          </div>
  
          <!-- Ready to Ship Step -->
          <div class="flex items-start gap-4">
            <div
              :class="[
                'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                ['packages_complete', 'shipped', 'delivered'].includes(
                  order.status
                )
                  ? order.status === 'packages_complete'
                    ? 'bg-primary-600 ring-4 ring-primary-100'
                    : 'bg-green-600'
                  : 'bg-gray-300',
              ]"
            >
              <svg
                v-if="['shipped', 'delivered'].includes(order.status)"
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div
                v-else-if="order.status === 'packages_complete'"
                class="w-3 h-3 bg-white rounded-full animate-pulse"
              ></div>
              <span v-else class="text-white text-xs font-semibold">5</span>
            </div>
            <div class="flex-1">
              <p
                class="font-medium"
                :class="
                  ['packages_complete', 'shipped', 'delivered'].includes(
                    order.status
                  )
                    ? 'text-gray-900'
                    : 'text-gray-500'
                "
              >
                {{ t.readyToShip }}
              </p>
              <p class="text-sm text-gray-500">
                <span v-if="order.status === 'packages_complete'">{{
                  t.preparingShipment
                }}</span>
                <span
                  v-else-if="['shipped', 'delivered'].includes(order.status)"
                  >{{ t.packageConsolidated }}</span
                >
                <span v-else>{{ t.waitingForPackages }}</span>
              </p>
            </div>
          </div>
  
          <!-- Delivered Step -->
          <div class="flex items-start gap-4">
            <div
              :class="[
                'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
                order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300',
              ]"
            >
              <svg
                v-if="order.status === 'delivered'"
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span v-else class="text-white text-xs font-semibold">6</span>
            </div>
            <div class="flex-1">
              <p
                class="font-medium"
                :class="
                  order.status === 'delivered'
                    ? 'text-gray-900'
                    : 'text-gray-500'
                "
              >
                {{ t.delivered }}
              </p>
              <p v-if="order.delivered_at" class="text-sm text-gray-500">
                {{ formatDate(order.delivered_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // Props
  const props = defineProps({
    order: {
      type: Object,
      required: true
    }
  })
  
  // Translations
  const translations = {
    orderProgress: {
      es: "Progreso de la Orden",
      en: "Order Progress",
    },
    paymentCompleted: {
      es: "Pago Completado",
      en: "Payment Completed",
    },
    itemsAdded: {
      es: "Productos Agregados",
      en: "Items Added",
    },
    item: {
      es: "artículo",
      en: "item",
    },
    items: {
      es: "artículos",
      en: "items",
    },
    orderCompleted: {
      es: "Caja Completada",
      en: "Box Completed",
    },
    awaitingPackages: {
      es: "Esperando Paquetes",
      en: "Awaiting Packages",
    },
    readyToShip: {
      es: "En Tránsito",
      en: "In Transit",
    },
    delivered: {
      es: "Entregado",
      en: "Delivered",
    },
    currentStatus: {
      es: "Estado actual",
      en: "Current status",
    },
    arrived: {
      es: "llegados",
      en: "arrived",
    },
    allPackagesReceived: {
      es: "Todos los paquetes recibidos",
      en: "All packages received",
    },
    pendingCompletion: {
      es: "Pendiente de completar",
      en: "Pending completion",
    },
    preparingShipment: {
      es: "Preparando envío a México",
      en: "Preparing shipment to Mexico",
    },
    packageConsolidated: {
      es: "Paquetes consolidados",
      en: "Packages consolidated",
    },
    waitingForPackages: {
      es: "Esperando que lleguen todos los paquetes",
      en: "Waiting for all packages to arrive",
    },
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const arrivedCount = computed(() => {
    return props.order?.items?.filter((item) => item.arrived).length || 0
  })
  
  // Methods
  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  </script>
  
  <style scoped>
  /* Pulse animation */
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style>