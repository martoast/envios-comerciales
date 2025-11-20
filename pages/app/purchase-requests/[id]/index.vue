<template>
  <section class="min-h-screen bg-gray-50 pb-12">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <NuxtLink to="/app/purchase-requests" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ request?.request_number || 'Loading...' }}</h1>
              <p class="text-xs text-gray-500">{{ formatDate(request?.created_at) }}</p>
            </div>
          </div>
          
          <div v-if="request" class="flex items-center gap-3">
            <!-- Edit Button (Only if pending_review) -->
            <NuxtLink 
              v-if="request.status === 'pending_review'"
              :to="`/app/purchase-requests/${request.id}/edit`"
              class="px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-2 border border-transparent hover:border-primary-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              <span class="hidden sm:inline">{{ t.editRequest }}</span>
              <span class="sm:hidden">{{ t.edit }}</span>
            </NuxtLink>

            <span :class="['px-3 py-1 rounded-full text-sm font-medium border', getStatusColor(request.status)]">
              {{ getStatusLabel(request.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>

    <!-- Content -->
    <div v-else-if="request" class="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-6 animate-fadeIn">
      
      <!-- Action Banner for QUOTED status -->
      <div v-if="request.status === 'quoted'" class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 class="text-2xl font-bold mb-2">{{ t.quoteReady }}</h2>
            <p class="text-blue-100 mb-4 max-w-lg">{{ t.quoteReadyDesc }}</p>
            <div class="text-3xl font-bold">${{ request.total_amount }} USD</div>
            <p class="text-sm text-blue-200 mt-1">{{ t.includesFees }}</p>
          </div>
          <NuxtLink 
            :to="request.payment_link" 
            target="_blank"
            class="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"
          >
            <span>{{ t.payNow }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Purchase Success Banner -->
      <div v-if="request.status === 'purchased'" class="bg-green-50 border border-green-200 rounded-2xl p-6 flex gap-4 items-start">
        <div class="p-2 bg-green-100 rounded-full text-green-600 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-green-900 text-lg">{{ t.purchasedTitle }}</h3>
          <p class="text-green-700 mt-1">{{ t.purchasedDesc }}</p>
          <NuxtLink to="/app/orders" class="inline-flex items-center gap-1 text-green-800 font-medium mt-3 hover:underline">
            {{ t.goToOrders }} &rarr;
          </NuxtLink>
        </div>
      </div>

      <!-- Rejection Banner -->
      <div v-if="request.status === 'rejected'" class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 class="font-bold text-red-900">{{ t.requestRejected }}</h3>
        <p class="text-red-700 mt-2">{{ request.admin_notes || t.noReason }}</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Items List -->
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 class="font-semibold text-gray-900">{{ t.requestedItems }}</h3>
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="item in request.items" :key="item.id" class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex gap-4 items-start">
                  
                  <!-- Image Thumbnail (Improved) -->
                  <a 
                    v-if="item.image_full_url" 
                    :href="item.image_full_url" 
                    target="_blank" 
                    class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group"
                    title="View Full Image"
                  >
                    <img :src="item.image_full_url" class="w-full h-full object-cover" alt="Product Image">
                    <!-- Hover Overlay -->
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <svg class="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </div>
                  </a>
                  
                  <!-- Fallback Icon if no image -->
                  <div v-else class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-gray-900 text-lg leading-snug">{{ item.product_name }}</h4>
                    <a :href="item.product_url" target="_blank" class="text-sm text-primary-600 hover:underline flex items-center gap-1 mt-1 mb-3 w-fit">
                      {{ truncateUrl(item.product_url) }}
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div class="bg-gray-50 p-2 rounded-lg">
                        <span class="text-gray-500 block text-xs uppercase tracking-wide">{{ t.price }}</span>
                        <span class="font-semibold text-gray-900">${{ item.price }}</span>
                      </div>
                      <div class="bg-gray-50 p-2 rounded-lg">
                        <span class="text-gray-500 block text-xs uppercase tracking-wide">{{ t.quantity }}</span>
                        <span class="font-semibold text-gray-900">{{ item.quantity }}</span>
                      </div>
                    </div>

                    <!-- Structured Options Display -->
                    <div v-if="item.options && Object.keys(item.options).length > 0" class="flex flex-wrap gap-2 mb-2">
                        <span v-for="(val, key) in item.options" :key="key" class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                            <strong>{{ key }}:</strong> {{ val }}
                        </span>
                    </div>

                    <!-- Notes -->
                    <div v-if="item.notes" class="mt-2 text-sm bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-100">
                      <span class="font-medium block text-xs uppercase tracking-wide mb-1 text-yellow-600">{{ t.notes }}</span>
                      {{ item.notes }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Breakdown Sidebar -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 class="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{{ t.summary }}</h3>
            
            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>{{ t.merchandise }}</span>
                <span>${{ request.items_total || request.items.reduce((a,b)=>a+(b.price*b.quantity),0).toFixed(2) }}</span>
              </div>
              
              <div v-if="request.status !== 'pending_review'" class="space-y-3 pt-3 border-t border-dashed border-gray-200">
                 <div class="flex justify-between text-gray-600">
                  <span>{{ t.shipping }}</span>
                  <span>${{ request.shipping_cost || '0.00' }}</span>
                </div>
                 <div class="flex justify-between text-gray-600">
                  <span>{{ t.tax }}</span>
                  <span>${{ request.sales_tax || '0.00' }}</span>
                </div>
                 <div class="flex justify-between text-gray-600">
                  <span>{{ t.fee }} (8%)</span>
                  <span>${{ request.processing_fee || '0.00' }}</span>
                </div>
              </div>
              
              <div v-else class="bg-gray-100 rounded-lg p-3 text-xs text-gray-500 text-center mt-4">
                {{ t.pendingCalculation }}
              </div>

              <div v-if="request.status !== 'pending_review'" class="pt-4 mt-4 border-t border-gray-200 flex justify-between font-bold text-lg text-gray-900">
                <span>{{ t.total }}</span>
                <span>${{ request.total_amount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer', 'complete-profile']
});

const route = useRoute();
const { $customFetch } = useNuxtApp();
const { t: createTranslations } = useLanguage();
const user = useUser().value;

const translations = {
  quoteReady: { es: '¡Tu cotización está lista!', en: 'Your quote is ready!' },
  quoteReadyDesc: { 
    es: 'Hemos revisado tu solicitud y calculado todos los costos. Realiza el pago para que procedamos con la compra.', 
    en: 'We have reviewed your request and calculated all costs. Make the payment so we can proceed with the purchase.' 
  },
  includesFees: { es: 'Incluye envío a almacén, impuestos y tarifa de servicio.', en: 'Includes warehouse shipping, taxes, and service fee.' },
  payNow: { es: 'Pagar Ahora', en: 'Pay Now' },
  purchasedTitle: { es: '¡Compra Realizada!', en: 'Purchase Complete!' },
  purchasedDesc: { 
    es: 'Hemos comprado tus artículos. Han sido agregados a tu lista de envíos y te notificaremos cuando lleguen al almacén.', 
    en: 'We have purchased your items. They have been added to your shipment list and we will notify you when they arrive at the warehouse.' 
  },
  goToOrders: { es: 'Ir a Mis Envíos', en: 'Go to My Shipments' },
  requestRejected: { es: 'Solicitud Rechazada', en: 'Request Rejected' },
  noReason: { es: 'No se especificó razón.', en: 'No reason specified.' },
  requestedItems: { es: 'Artículos Solicitados', en: 'Requested Items' },
  price: { es: 'Precio', en: 'Price' },
  quantity: { es: 'Cant.', en: 'Qty' },
  notes: { es: 'Notas / Opciones', en: 'Notes / Options' },
  summary: { es: 'Resumen de Costos', en: 'Cost Summary' },
  merchandise: { es: 'Mercancía', en: 'Merchandise' },
  shipping: { es: 'Envío (USA)', en: 'Shipping (USA)' },
  tax: { es: 'Impuestos (USA)', en: 'Sales Tax' },
  fee: { es: 'Tarifa de Servicio', en: 'Service Fee' },
  total: { es: 'Total (USD)', en: 'Total (USD)' },
  pendingCalculation: { es: 'Calculando costos finales...', en: 'Calculating final costs...' },
  viewImage: { es: 'Ver Imagen', en: 'View Image' }, 
  editRequest: { es: 'Editar Solicitud', en: 'Edit Request' },
  edit: { es: 'Editar', en: 'Edit' },
  // Status Labels
  pending_review: { es: 'Pendiente de Revisión', en: 'Pending Review' },
  quoted: { es: 'Cotizado', en: 'Quoted' },
  paid: { es: 'Pagado', en: 'Paid' },
  purchased: { es: 'Comprado', en: 'Purchased' },
  rejected: { es: 'Rechazado', en: 'Rejected' },
  cancelled: { es: 'Cancelado', en: 'Cancelled' }
};

const t = createTranslations(translations);
const request = ref(null);
const loading = ref(true);

const fetchRequest = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/purchase-requests/${route.params.id}`);
    request.value = response.data || response;
  } catch (e) {
    console.error('Error fetching request:', e);
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (status) => {
  const map = {
    pending_review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    quoted: 'bg-blue-50 text-blue-700 border-blue-200',
    paid: 'bg-primary-50 text-primary-700 border-primary-200',
    purchased: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return map[status] || 'bg-gray-50 text-gray-600';
};

const getStatusLabel = (status) => t.value[status] || status;

const formatDate = (date) => {
  if(!date) return '';
  return new Date(date).toLocaleDateString(user?.preferred_language === 'es' ? 'es-MX' : 'en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const truncateUrl = (url) => {
  try {
    let safeUrl = url;
    if (!safeUrl.match(/^https?:\/\//i)) {
        safeUrl = 'https://' + safeUrl;
    }
    const { hostname } = new URL(safeUrl);
    return hostname.replace('www.', '');
  } catch {
    return 'Link';
  }
};

onMounted(() => {
  fetchRequest();
});
</script>