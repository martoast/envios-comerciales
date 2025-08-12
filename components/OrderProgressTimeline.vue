<template>
  <div class="bg-white rounded-xl p-6 border border-gray-200">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">
      {{ t.orderProgress }}
    </h2>
    <div class="relative">
      <!-- Timeline Steps -->
      <div class="space-y-6 relative">
        <!-- Step 1: Items Added -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              order.items?.length > 0 
                ? order.status === 'collecting' && order.items?.length > 0
                  ? 'bg-primary-600 ring-4 ring-primary-100'
                  : 'bg-green-600'
                : 'bg-gray-300',
            ]"
          >
            <svg
              v-if="order.items?.length > 0 && order.status !== 'collecting'"
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
              v-else-if="order.status === 'collecting' && order.items?.length > 0"
              class="w-3 h-3 bg-white rounded-full animate-pulse"
            ></div>
            <span v-else class="text-white text-xs font-semibold">1</span>
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
              <span v-if="order.items?.length > 0">
                {{ totalItemQuantity }}
                {{ totalItemQuantity === 1 ? t.item : t.items }}
                {{ t.added }}
              </span>
              <span v-else>{{ t.noItemsYet }}</span>
            </p>
          </div>
        </div>

        <!-- Step 2: Order Submitted -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              order.status !== 'collecting'
                ? 'bg-green-600'  // Always complete if past collecting
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
            <span v-else class="text-white text-xs font-semibold">2</span>
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
              {{ t.orderSubmitted }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.completed_at">
                {{ formatDate(order.completed_at) }}
              </span>
              <span v-else-if="order.status === 'collecting'">
                {{ t.pendingSubmission }}
              </span>
            </p>
          </div>
        </div>

        <!-- Step 3: Packages Arrived -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              ['packages_complete', 'processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                ? 'bg-green-600'
                : order.status === 'awaiting_packages'
                  ? 'bg-amber-500 ring-4 ring-amber-100'  // Current active step
                  : 'bg-gray-300',
            ]"
          >
            <svg
              v-if="['packages_complete', 'processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)"
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
            <svg
              v-else-if="order.status === 'awaiting_packages'"
              class="w-4 h-4 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span v-else class="text-white text-xs font-semibold">3</span>
          </div>
          <div class="flex-1">
            <p
              class="font-medium"
              :class="
                ['awaiting_packages', 'packages_complete', 'processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                  ? 'text-gray-900'
                  : 'text-gray-500'
              "
            >
              {{ t.packagesArrived }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.status === 'awaiting_packages'">
                <span class="font-medium text-amber-600">{{ t.currentStatus }}:</span> {{ arrivedCount }}/{{ totalItemQuantity }}
                {{ t.arrived }}
              </span>
              <span v-else-if="['packages_complete', 'processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)">
                {{ t.allPackagesReceived }}
              </span>
              <span v-else>{{ t.waitingForPackages }}</span>
            </p>
          </div>
        </div>

        <!-- Step 4: Processing/Quote Preparation -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              ['processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                ? order.status === 'processing'
                  ? 'bg-blue-600 ring-4 ring-blue-100'
                  : 'bg-green-600'
                : 'bg-gray-300',
            ]"
          >
            <svg
              v-if="['quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)"
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
              v-else-if="order.status === 'processing'"
              class="w-3 h-3 bg-white rounded-full animate-pulse"
            ></div>
            <span v-else class="text-white text-xs font-semibold">4</span>
          </div>
          <div class="flex-1">
            <p
              class="font-medium"
              :class="
                ['processing', 'quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                  ? 'text-gray-900'
                  : 'text-gray-500'
              "
            >
              {{ t.processingOrder }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.status === 'processing'">
                <span class="font-medium text-blue-600">{{ t.preparingQuote }}</span>
              </span>
              <span v-else-if="['quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)">
                {{ t.processingComplete }}
              </span>
              <span v-else>{{ t.pendingProcessing }}</span>
            </p>
          </div>
        </div>

        <!-- Step 5: Invoice Sent -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              ['quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                ? order.status === 'quote_sent'
                  ? 'bg-orange-600 ring-4 ring-orange-100'
                  : 'bg-green-600'
                : 'bg-gray-300',
            ]"
          >
            <svg
              v-if="['paid', 'shipped', 'delivered'].includes(order.status)"
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
              v-else-if="order.status === 'quote_sent'"
              class="w-3 h-3 bg-white rounded-full animate-pulse"
            ></div>
            <span v-else class="text-white text-xs font-semibold">5</span>
          </div>
          <div class="flex-1">
            <p
              class="font-medium"
              :class="
                ['quote_sent', 'paid', 'shipped', 'delivered'].includes(order.status)
                  ? 'text-gray-900'
                  : 'text-gray-500'
              "
            >
              {{ t.invoiceSent }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.quote_sent_at">
                {{ formatDate(order.quote_sent_at) }}
                <span v-if="order.quoted_amount" class="font-medium">
                  - ${{ order.quoted_amount }} MXN
                </span>
              </span>
              <span v-else-if="order.status === 'quote_sent'">
                <span class="font-medium text-orange-600">{{ t.awaitingPayment }}</span>
              </span>
              <span v-else>{{ t.pendingInvoice }}</span>
            </p>
          </div>
        </div>

        <!-- Step 6: Payment Received -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              ['paid', 'shipped', 'delivered'].includes(order.status)
                ? order.status === 'paid'
                  ? 'bg-green-600 ring-4 ring-green-100'
                  : 'bg-green-600'
                : 'bg-gray-300',
            ]"
          >
            <svg
              v-if="['paid', 'shipped', 'delivered'].includes(order.status)"
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
                ['paid', 'shipped', 'delivered'].includes(order.status)
                  ? 'text-gray-900'
                  : 'text-gray-500'
              "
            >
              {{ t.paymentReceived }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.paid_at">
                {{ formatDate(order.paid_at) }}
                <span v-if="order.amount_paid" class="font-medium">
                  - ${{ order.amount_paid }} MXN
                </span>
              </span>
              <span v-else-if="order.status === 'paid'">
                {{ t.preparingShipment }}
              </span>
              <span v-else>{{ t.pendingPayment }}</span>
            </p>
          </div>
        </div>

        <!-- Step 7: Shipped -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              ['shipped', 'delivered'].includes(order.status)
                ? order.status === 'shipped'
                  ? 'bg-primary-600 ring-4 ring-primary-100'
                  : 'bg-green-600'
                : 'bg-gray-300',
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
            <div
              v-else-if="order.status === 'shipped'"
              class="w-3 h-3 bg-white rounded-full animate-pulse"
            ></div>
            <span v-else class="text-white text-xs font-semibold">7</span>
          </div>
          <div class="flex-1">
            <p
              class="font-medium"
              :class="
                ['shipped', 'delivered'].includes(order.status)
                  ? 'text-gray-900'
                  : 'text-gray-500'
              "
            >
              {{ t.shipped }}
            </p>
            <p class="text-sm text-gray-500">
              <span v-if="order.shipped_at">
                {{ formatDate(order.shipped_at) }}
              </span>
              <span v-else-if="order.status === 'shipped'">
                {{ t.inTransitToMexico }}
              </span>
              <span v-else>{{ t.pendingShipment }}</span>
            </p>
          </div>
        </div>

        <!-- Step 8: Delivered -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              order.status === 'delivered' 
                ? 'bg-green-600 ring-4 ring-green-100'
                : 'bg-gray-300',
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
            <span v-else class="text-white text-xs font-semibold">8</span>
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
            <p class="text-sm text-gray-500">
              <span v-if="order.delivered_at">
                {{ formatDate(order.delivered_at) }}
              </span>
              <span v-else>{{ t.pendingDelivery }}</span>
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
  // Step labels
  itemsAdded: {
    es: "Productos Agregados",
    en: "Items Added",
  },
  orderSubmitted: {
    es: "Orden Creada",
    en: "Order Created",
  },
  packagesArrived: {
    es: "Paquetes en Almacén",
    en: "Packages at Warehouse",
  },
  processingOrder: {
    es: "Procesando Orden",
    en: "Processing Order",
  },
  invoiceSent: {
    es: "Cotización Enviada",
    en: "Quote Sent",
  },
  paymentReceived: {
    es: "Pago Recibido",
    en: "Payment Received",
  },
  shipped: {
    es: "Enviado a México",
    en: "Shipped to Mexico",
  },
  delivered: {
    es: "Entregado",
    en: "Delivered",
  },
  // Status descriptions
  item: {
    es: "artículo",
    en: "item",
  },
  items: {
    es: "artículos",
    en: "items",
  },
  added: {
    es: "agregado(s)",
    en: "added",
  },
  noItemsYet: {
    es: "Sin artículos aún",
    en: "No items yet",
  },
  pendingSubmission: {
    es: "Pendiente de envío",
    en: "Pending submission",
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
  waitingForPackages: {
    es: "Esperando llegada de paquetes",
    en: "Waiting for packages to arrive",
  },
  preparingQuote: {
    es: "Preparando cotización",
    en: "Preparing quote",
  },
  processingComplete: {
    es: "Procesamiento completado",
    en: "Processing completed",
  },
  pendingProcessing: {
    es: "Pendiente de procesamiento",
    en: "Pending processing",
  },
  awaitingPayment: {
    es: "Esperando pago",
    en: "Awaiting payment",
  },
  pendingInvoice: {
    es: "Pendiente de cotización",
    en: "Pending quote",
  },
  preparingShipment: {
    es: "Preparando envío",
    en: "Preparing shipment",
  },
  pendingPayment: {
    es: "Pendiente de pago",
    en: "Pending payment",
  },
  inTransitToMexico: {
    es: "En tránsito a México",
    en: "In transit to Mexico",
  },
  pendingShipment: {
    es: "Pendiente de envío",
    en: "Pending shipment",
  },
  pendingDelivery: {
    es: "Pendiente de entrega",
    en: "Pending delivery",
  },
}

// Get reactive translations
const t = createTranslations(translations)

// Computed
const arrivedCount = computed(() => {
  if (!props.order?.items) return 0
  return props.order.items
    .filter((item) => item.arrived)
    .reduce((total, item) => total + item.quantity, 0)
})

const totalItemQuantity = computed(() => {
  if (!props.order?.items) return 0
  return props.order.items.reduce((total, item) => total + item.quantity, 0)
})

const allPackagesArrived = computed(() => {
  return arrivedCount.value === totalItemQuantity.value && totalItemQuantity.value > 0
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