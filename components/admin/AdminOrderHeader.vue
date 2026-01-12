<!-- components/admin/AdminOrderHeader.vue -->
<template>
  <div class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
    <!-- Mobile Layout (default) -->
    <div class="px-4 py-3 sm:hidden">
      <!-- Top Row: Back + Actions -->
      <div class="flex items-center justify-between mb-2">
        <button
          @click="goBack"
          class="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors -ml-1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>{{ t.orders }}</span>
        </button>

        <button
          @click="$emit('toggle-menu')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <!-- Bottom Row: Order Info -->
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <h1 class="text-base font-bold text-gray-900 truncate">
            #{{ order?.order_number }}
          </h1>
          <p class="text-xs text-gray-500 truncate">{{ order?.user?.name }}</p>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <!-- Order Type Badge -->
          <span
            v-if="order"
            :class="[
              'px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide',
              isCrossing ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
            ]"
          >
            {{ isCrossing ? t.crossing : t.ship }}
          </span>

          <!-- Status Badge -->
          <span
            v-if="order"
            :class="['px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide', getStatusColor(order.status)]"
          >
            {{ getStatusLabelShort(order.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Desktop Layout (sm and up) -->
    <div class="hidden sm:block px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left: Back + Order Info -->
        <div class="flex items-center gap-4 min-w-0">
          <button
            @click="goBack"
            class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            :title="t.backToOrders"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="min-w-0">
            <div class="flex items-center gap-3">
              <h1 class="text-lg font-bold text-gray-900">
                {{ t.order }} #{{ order?.order_number }}
              </h1>
              
              <!-- Order Type Badge -->
              <span
                v-if="order"
                :class="[
                  'px-2 py-0.5 rounded text-xs font-medium',
                  isCrossing ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                ]"
              >
                {{ isCrossing ? t.crossingOnly : t.shipping }}
              </span>
            </div>
            <p class="text-sm text-gray-500 truncate">{{ order?.user?.name }} · {{ order?.user?.email }}</p>
          </div>
        </div>

        <!-- Right: Status + Actions -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <!-- Status Badge -->
          <div v-if="order" class="flex items-center gap-2">
            <div
              :class="['w-2 h-2 rounded-full animate-pulse', getStatusDotColor(order.status)]"
            ></div>
            <span
              :class="['px-3 py-1.5 rounded-lg text-xs font-semibold', getStatusColor(order.status)]"
            >
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <!-- Actions Button -->
          <button
            @click="$emit('toggle-menu')"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            :title="t.actions"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Actions Dropdown (shared between mobile and desktop) -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showMenu"
        class="absolute right-4 top-14 sm:top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
      >
        <NuxtLink
          :to="`/app/admin/orders/${order?.id}/edit`"
          @click="$emit('close-menu')"
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {{ t.editOrder }}
        </NuxtLink>
        <!-- Print Label - Only for shipping orders with delivery address -->
        <button
          v-if="canPrintLabel"
          @click="handlePrintLabel"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          {{ t.printLabel }}
        </button>
        <!-- View Jesus Message - Only for shipping orders with delivery address -->
        <button
          v-if="canPrintLabel"
          @click="handleViewMessage"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {{ t.viewMessage }}
        </button>
        <hr class="my-1 border-gray-100" />
        <button
          @click="$emit('delete')"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {{ t.deleteOrder }}
        </button>
      </div>
    </Transition>

    <!-- Click outside overlay to close menu -->
    <div
      v-if="showMenu"
      class="fixed inset-0 z-40"
      @click="$emit('close-menu')"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  order: {
    type: Object,
    default: null,
  },
  showMenu: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle-menu', 'close-menu', 'delete', 'print-label', 'view-message']);

const router = useRouter();
const { getReturnUrl } = useOrdersReturnUrl();

const goBack = () => {
  router.push(getReturnUrl());
};

const { t: createTranslations, currentLanguage } = useLanguage();

const translations = {
  orders: { es: 'Órdenes', en: 'Orders' },
  order: { es: 'Orden', en: 'Order' },
  backToOrders: { es: 'Volver a órdenes', en: 'Back to orders' },
  actions: { es: 'Acciones', en: 'Actions' },
  editOrder: { es: 'Editar Orden', en: 'Edit Order' },
  printLabel: { es: 'Imprimir Etiqueta', en: 'Print Label' },
  viewMessage: { es: 'Ver Mensaje', en: 'View Message' },
  deleteOrder: { es: 'Eliminar Orden', en: 'Delete Order' },
  crossing: { es: 'Cruce', en: 'Cross' },
  ship: { es: 'Envío', en: 'Ship' },
  crossingOnly: { es: 'Solo Cruce', en: 'Crossing Only' },
  shipping: { es: 'Envío', en: 'Shipping' },
};

const t = createTranslations(translations);

const isCrossing = computed(() => props.order?.order_type === 'crossing');

// Can print label only for shipping orders with delivery address
const canPrintLabel = computed(() => {
  return !isCrossing.value && props.order?.delivery_address;
});

const handlePrintLabel = () => {
  emit('close-menu');
  emit('print-label');
};

const handleViewMessage = () => {
  emit('close-menu');
  emit('view-message');
};

const getStatusColor = (status) => {
  const colors = {
    collecting: 'bg-slate-100 text-slate-700',
    awaiting_packages: 'bg-amber-100 text-amber-700',
    packages_complete: 'bg-blue-100 text-blue-700',
    processing: 'bg-purple-100 text-purple-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    awaiting_payment: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const getStatusDotColor = (status) => {
  const colors = {
    collecting: 'bg-slate-500',
    awaiting_packages: 'bg-amber-500',
    packages_complete: 'bg-blue-500',
    processing: 'bg-purple-500',
    shipped: 'bg-indigo-500',
    delivered: 'bg-emerald-500',
    awaiting_payment: 'bg-orange-500',
    paid: 'bg-green-500',
    cancelled: 'bg-red-500',
  };
  return colors[status] || 'bg-gray-500';
};

const getStatusLabel = (status) => {
  const labels = {
    collecting: { es: 'Recolectando', en: 'Collecting' },
    awaiting_packages: { es: 'Esperando Paquetes', en: 'Awaiting Packages' },
    packages_complete: { es: 'Paquetes Completos', en: 'Packages Complete' },
    processing: { es: 'Procesando', en: 'Processing' },
    shipped: { es: 'Enviado', en: 'Shipped' },
    delivered: { es: 'Entregado', en: 'Delivered' },
    awaiting_payment: { es: 'Esperando Pago', en: 'Awaiting Payment' },
    paid: { es: 'Pagado', en: 'Paid' },
    cancelled: { es: 'Cancelado', en: 'Cancelled' },
  };
  
  const lang = currentLanguage?.value || 'en';
  return labels[status]?.[lang] || status?.replace(/_/g, ' ').toUpperCase() || '';
};

const getStatusLabelShort = (status) => {
  const labels = {
    collecting: { es: 'Recolect.', en: 'Collect.' },
    awaiting_packages: { es: 'Esperando', en: 'Awaiting' },
    packages_complete: { es: 'Completo', en: 'Complete' },
    processing: { es: 'Procesando', en: 'Process.' },
    shipped: { es: 'Enviado', en: 'Shipped' },
    delivered: { es: 'Entregado', en: 'Delivered' },
    awaiting_payment: { es: 'Pago Pend.', en: 'Pay Pend.' },
    paid: { es: 'Pagado', en: 'Paid' },
    cancelled: { es: 'Cancelado', en: 'Cancelled' },
  };
  
  const lang = currentLanguage?.value || 'en';
  return labels[status]?.[lang] || status?.replace(/_/g, ' ') || '';
};
</script>