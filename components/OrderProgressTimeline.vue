<!-- components/OrderProgressTimeline.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ t.orderProgress }}
      </h2>
    </div>

    <div class="p-4 sm:p-6">
      <!-- Progress Steps -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"
          aria-hidden="true"
        ></div>

        <!-- Steps -->
        <div class="space-y-6 relative">
          
          <!-- Step 1: Order Created & Items (Orden Creada) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  order.created_at ? 'bg-primary-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="order.created_at"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', order.created_at ? 'text-gray-900' : 'text-gray-500']">
                {{ t.orderCreated }}
              </p>
              <p v-if="order.created_at" class="text-xs text-gray-600 mt-0.5">
                {{ formatDate(order.created_at) }}
              </p>
              <p v-if="order.items?.length" class="text-xs text-gray-500 mt-1">
                {{ order.items.length }} {{ t.itemsAddedCount }}
              </p>
            </div>
          </div>

          <!-- Step 2: Packages at Warehouse (Paquetes en Almacén) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isStatusReached('packages_complete') ? 'bg-primary-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="isStatusReached('packages_complete')"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <!-- Active Pulse -->
                <div v-else-if="order.status === 'awaiting_packages'" class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', isStatusReached('packages_complete') ? 'text-gray-900' : 'text-gray-500']">
                {{ t.packagesAtWarehouse }}
              </p>
              <p :class="['text-xs mt-0.5', isStatusReached('packages_complete') ? 'text-gray-600' : order.status === 'awaiting_packages' ? 'text-amber-600' : 'text-gray-400']">
                {{
                  isStatusReached("packages_complete")
                    ? t.allPackagesReceived
                    : order.status === "awaiting_packages"
                    ? t.waitingForPackages
                    : t.pendingPackages
                }}
              </p>
            </div>
          </div>

          <!-- Step 3: Processing Order (En Camino a México) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isStatusReached('processing') ? 'bg-primary-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="isStatusReached('processing')"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div v-else-if="order.status === 'packages_complete'" class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', isStatusReached('processing') ? 'text-gray-900' : 'text-gray-500']">
                {{ t.processingOrder }}
              </p>
              <p :class="['text-xs mt-0.5', isStatusReached('processing') ? 'text-gray-600' : order.status === 'packages_complete' ? 'text-amber-600' : 'text-gray-400']">
                {{
                  isStatusReached("processing")
                    ? t.shippingToMexico
                    : order.status === "packages_complete"
                    ? t.readyToShip
                    : t.pendingProcessing
                }}
              </p>
              <p v-if="order.processing_started_at" class="text-xs text-gray-500 mt-1">
                {{ formatDate(order.processing_started_at) }}
              </p>
            </div>
          </div>

          <!-- Step 4: Shipped (Enviado) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isStatusReached('shipped') ? 'bg-indigo-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="isStatusReached('shipped')"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div v-else-if="order.status === 'processing'" class="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', isStatusReached('shipped') ? 'text-gray-900' : 'text-gray-500']">
                {{ t.shippedToMexico }}
              </p>
              <p v-if="order.shipped_at" class="text-xs text-gray-600 mt-0.5">
                {{ formatDate(order.shipped_at) }}
              </p>
              <p v-else :class="['text-xs mt-0.5', order.status === 'processing' ? 'text-amber-600' : 'text-gray-400']">
                {{ order.status === "processing" ? t.preparingShipment : t.pendingShipment }}
              </p>
            </div>
          </div>

          <!-- Step 5: Deposit Paid (Depósito) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  order.deposit_paid_at ? 'bg-green-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="order.deposit_paid_at"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <!-- If shipped but deposit not paid, show pulse -->
                <div v-else-if="order.status === 'shipped' && !order.deposit_paid_at" class="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', order.deposit_paid_at ? 'text-gray-900' : 'text-gray-500']">
                {{ t.depositStatus }}
              </p>
              <p v-if="order.deposit_paid_at" class="text-xs text-green-600 mt-0.5">
                {{ t.depositPaid }} ({{ formatDate(order.deposit_paid_at) }})
              </p>
              <p v-else-if="order.status === 'shipped' && !order.deposit_paid_at" class="text-xs text-indigo-600 mt-0.5 font-medium">
                {{ t.depositPending }}
              </p>
              <p v-else class="text-xs text-gray-400 mt-0.5">
                {{ t.pending }}
              </p>
            </div>
          </div>

          <!-- Step 6: Delivered & Final Invoice (Entregado) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isStatusReached('delivered') ? 'bg-green-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="isStatusReached('delivered')"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div v-else-if="order.status === 'shipped' && order.deposit_paid_at" class="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', isStatusReached('delivered') ? 'text-gray-900' : 'text-gray-500']">
                {{ t.delivered }}
              </p>
              <p v-if="order.delivered_at" class="text-xs text-gray-600 mt-0.5">
                {{ formatDate(order.delivered_at) }}
              </p>
              <p v-else :class="['text-xs mt-0.5', order.status === 'shipped' && order.deposit_paid_at ? 'text-green-600' : 'text-gray-400']">
                {{ order.status === "shipped" ? t.inTransit : t.pendingDelivery }}
              </p>
            </div>
          </div>

          <!-- Step 7: Final Payment (Pago Final) -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isStatusReached('paid') ? 'bg-green-600' : 'bg-gray-200',
                ]"
              >
                <svg
                  v-if="isStatusReached('paid')"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <!-- Awaiting Payment Pulse -->
                <div v-else-if="order.status === 'awaiting_payment'" class="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                <div v-else class="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p :class="['text-sm font-medium', isStatusReached('paid') ? 'text-gray-900' : 'text-gray-500']">
                {{ t.paymentReceived }}
              </p>
              <p v-if="order.paid_at" class="text-xs text-gray-600 mt-0.5">
                {{ t.orderCompleteDesc }} - {{ formatDate(order.paid_at) }}
              </p>
              <p v-else-if="order.status === 'awaiting_payment'" class="text-xs text-orange-600 font-medium mt-0.5">
                {{ t.finalPaymentDue }}
              </p>
              <p v-else class="text-xs text-gray-400 mt-0.5">
                {{ t.pendingPayment }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const user = useUser().value;
const { t: createTranslations } = useLanguage();

// New Status Flow
const statusOrder = [
  "collecting",
  "awaiting_packages",
  "packages_complete",
  "processing",
  "shipped",
  "delivered",
  "awaiting_payment",
  "paid",
];

const isStatusReached = (targetStatus) => {
  // Special case: collecting comes before everything, so checking created_at or items length usually sufficient
  // Here we rely on status index
  const currentIndex = statusOrder.indexOf(props.order.status);
  const targetIndex = statusOrder.indexOf(targetStatus);
  return currentIndex >= targetIndex;
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const locale = user?.preferred_language === "es" ? "es-MX" : "en-US";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const translations = {
  orderProgress: { es: "Progreso de la Orden", en: "Order Progress" },
  itemsAdded: { es: "Productos Agregados", en: "Items Added" },
  itemsAddedCount: { es: "artículo(s)", en: "item(s)" },
  noItemsYet: { es: "Sin artículos aún", en: "No items yet" },
  orderCreated: { es: "Orden Creada", en: "Order Created" },
  packagesAtWarehouse: { es: "Paquetes en Almacén", en: "Packages at Warehouse" },
  allPackagesReceived: { es: "Todos los paquetes recibidos", en: "All packages received" },
  waitingForPackages: { es: "Esperando llegada de paquetes", en: "Waiting for packages to arrive" },
  pendingPackages: { es: "Pendiente de recepción", en: "Pending reception" },
  processingOrder: { es: "En Camino a México", en: "On Its Way to Mexico" },
  shippingToMexico: { es: "Viajando desde USA a México", en: "Traveling from USA to Mexico" },
  readyToShip: { es: "Listo para enviar a México", en: "Ready to ship to Mexico" },
  pendingProcessing: { es: "Pendiente de procesamiento", en: "Pending processing" },
  shippedToMexico: { es: "Enviado a tu Dirección", en: "Shipped to Your Address" },
  preparingShipment: { es: "Preparando envío", en: "Preparing shipment" },
  pendingShipment: { es: "Pendiente de envío", en: "Pending shipment" },
  delivered: { es: "Entregado", en: "Delivered" },
  inTransit: { es: "En tránsito", en: "In transit" },
  pendingDelivery: { es: "Pendiente de entrega", en: "Pending delivery" },
  invoiceSent: { es: "Factura Final", en: "Final Invoice" },
  preparingInvoice: { es: "Preparando factura", en: "Preparing invoice" },
  pendingInvoice: { es: "Pendiente de factura", en: "Pending invoice" },
  paymentReceived: { es: "Orden Finalizada", en: "Order Complete" },
  waitingForPayment: { es: "Esperando pago final", en: "Waiting for final payment" },
  pendingPayment: { es: "Pendiente de pago", en: "Pending payment" },
  pending: { es: "Pendiente", en: "Pending" },
  
  // Deposit specific
  depositStatus: { es: "Depósito (50%)", en: "Deposit (50%)" },
  depositPaid: { es: "Pagado", en: "Paid" },
  depositPending: { es: "Pago Requerido", en: "Payment Required" },
  
  finalPaymentDue: { es: "Saldo Pendiente", en: "Balance Due" },
  orderCompleteDesc: { es: "¡Gracias!", en: "Thanks!" },
};

const t = createTranslations(translations);
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>