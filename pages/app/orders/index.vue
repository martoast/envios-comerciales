<!-- pages/app/orders/index.vue -->
<template>
  <section
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20"
  >
    <!-- Mobile-First Header -->
    <div
      class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <!-- Mobile Layout -->
        <div class="lg:hidden space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-extrabold text-gray-900">
              {{ t.myOrders }}
            </h1>
            <NuxtLink
              to="/app/orders/create"
              class="p-2 bg-primary-500 text-white rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-300"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:flex lg:items-center lg:justify-between">
          <div class="flex items-center gap-8 animate-fadeIn">
            <h1 class="text-3xl font-extrabold text-gray-900">
              {{ t.myOrders }}
            </h1>
          </div>

          <!-- Create Order Button Desktop -->
          <NuxtLink
            to="/app/orders/create"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-fadeIn"
            style="animation-delay: 0.1s"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ t.createOrder }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
     

      <!-- Orders Section -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
        style="animation-delay: 0.3s"
      >
        <!-- Search Section -->
        <div class="px-4 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
          <div class="space-y-3">
            <!-- Search Input -->
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t.searchPlaceholder"
                class="block w-full pl-10 pr-10 py-3 sm:py-2.5 border border-gray-200 rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                style="max-width: 500px"
              />
              <!-- Clear button -->
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Active Search Indicator -->
            <div
              v-if="searchQuery && !loading"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-gray-600">{{ t.showingSearchResults }}</span>
              <button
                @click="searchQuery = ''"
                class="text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.clearSearch }}
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="px-6 py-16 text-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4"
          >
            <svg
              class="animate-spin h-8 w-8 text-primary-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p class="text-gray-500">{{ t.loadingOrders }}</p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!loading && orders.length === 0"
          class="px-6 py-16 text-center"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ searchQuery ? t.noSearchResults : t.noOrders }}
          </h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            {{ searchQuery ? t.tryDifferentSearch : t.getStarted }}
          </p>
          <NuxtLink
            v-if="!searchQuery"
            to="/app/orders/create"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ t.createFirstOrder }}
          </NuxtLink>
        </div>

        <!-- Orders List - Mobile Cards / Desktop Table -->
        <div v-else>
          <!-- Mobile Cards -->
          <div class="sm:hidden divide-y divide-gray-100">
            <NuxtLink
              v-for="order in orders"
              :key="order.id"
              :to="`/app/orders/${order.id}`"
              class="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="font-semibold text-gray-900">
                    {{ order.tracking_number }}
                  </p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(order.status),
                  ]"
                >
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-4">
                  <span class="text-gray-500">
                    <span class="font-medium text-gray-900">{{
                      order.items?.length || 0
                    }}</span>
                    {{ t.items.toLowerCase() }}
                  </span>
                  <span class="text-gray-500">{{
                    formatDate(order.created_at)
                  }}</span>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <!-- Progress bar for awaiting packages -->
              <div v-if="order.status === 'awaiting_packages'" class="mt-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      class="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                      :style="`width: ${order.arrival_progress || 0}%`"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500"
                    >{{ order.arrival_progress || 0 }}%</span
                  >
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.orderInfo }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.status }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.items }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.created }}
                  </th>
                  <th class="relative px-6 py-3">
                    <span class="sr-only">{{ t.actions }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="order in orders"
                  :key="order.id"
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="navigateTo(`/app/orders/${order.id}`)"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p class="text-sm font-semibold text-gray-900">
                        {{ order.tracking_number }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(order.status),
                      ]"
                    >
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-900">{{
                        order.items?.length || 0
                      }}</span>
                      <div
                        v-if="order.status === 'awaiting_packages'"
                        class="flex items-center gap-2"
                      >
                        <div class="w-24 bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                            :style="`width: ${order.arrival_progress || 0}%`"
                          ></div>
                        </div>
                        <span class="text-xs text-gray-500"
                          >{{ order.arrival_progress || 0 }}%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(order.created_at) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <NuxtLink
                      :to="`/app/orders/${order.id}`"
                      class="text-primary-600 hover:text-primary-900"
                      @click.stop
                    >
                      {{ t.viewDetails }}
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.lastPage > 1"
            class="px-4 sm:px-6 py-4 border-t border-gray-100"
          >
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-700 hidden sm:block">
                {{ t.showing }}
                <span class="font-medium">{{ pagination.from }}</span>
                {{ t.to }} <span class="font-medium">{{ pagination.to }}</span>
                {{ t.of }}
                <span class="font-medium">{{ pagination.total }}</span>
                {{ t.results }}
              </p>
              <p class="text-sm text-gray-700 sm:hidden">
                {{ pagination.from }}-{{ pagination.to }} {{ t.of }}
                {{ pagination.total }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="changePage(pagination.currentPage - 1)"
                  :disabled="pagination.currentPage === 1"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.previous }}
                </button>
                <button
                  @click="changePage(pagination.currentPage + 1)"
                  :disabled="pagination.currentPage === pagination.lastPage"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {{ t.next }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// Define page meta to use app layout
definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

// Nuxt imports
const { $customFetch } = useNuxtApp();
const user = useUser().value;

// Use the language composable
const { t: createTranslations } = useLanguage();

// State
const orders = ref([]);
const allOrders = ref([]); // Store all orders for stats calculation
const loading = ref(true);
const searchQuery = ref("");
const searchDebounce = ref(null);
const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  from: 0,
  to: 0,
  total: 0,
});

// Define translations
const translations = {
  myOrders: {
    es: "Mis Envios",
    en: "My Orders",
  },
  createOrder: {
    es: "Crear Envio",
    en: "Create Order",
  },
  searchPlaceholder: {
    es: "Buscar por número de orden...",
    en: "Search by order name or number...",
  },
  loadingOrders: {
    es: "Cargando órdenes...",
    en: "Loading orders...",
  },
  noOrders: {
    es: "No hay envios todavía",
    en: "No orders yet",
  },
  noSearchResults: {
    es: "No se encontraron resultados",
    en: "No results found",
  },
  getStarted: {
    es: "Comienza creando tu primer envio.",
    en: "Get started by creating your first consolidation order.",
  },
  tryDifferentSearch: {
    es: "Intenta con diferentes términos de búsqueda.",
    en: "Try different search terms.",
  },
  createFirstOrder: {
    es: "Crear tu primer envio",
    en: "Create your first order",
  },
  orderInfo: {
    es: "Número de Orden",
    en: "Order Number",
  },
  status: {
    es: "Estado",
    en: "Status",
  },
  items: {
    es: "Artículos",
    en: "Items",
  },
  created: {
    es: "Creado",
    en: "Created",
  },
  actions: {
    es: "Acciones",
    en: "Actions",
  },
  viewDetails: {
    es: "Ver detalles",
    en: "View details",
  },
  showing: {
    es: "Mostrando",
    en: "Showing",
  },
  to: {
    es: "a",
    en: "to",
  },
  of: {
    es: "de",
    en: "of",
  },
  results: {
    es: "resultados",
    en: "results",
  },
  previous: {
    es: "Anterior",
    en: "Previous",
  },
  next: {
    es: "Siguiente",
    en: "Next",
  },
  showingSearchResults: {
    es: "Mostrando resultados de búsqueda",
    en: "Showing search results",
  },
  clearSearch: {
    es: "Limpiar búsqueda",
    en: "Clear search",
  },
  // Status translations - UPDATED
  collecting: {
    es: "Agregando Artículos",
    en: "Adding Items",
  },
  awaiting_packages: {
    es: "Esperando Paquetes",
    en: "Awaiting Packages",
  },
  packages_complete: {
    es: "Paquetes Completos",
    en: "Packages Complete",
  },
  processing: {
    es: "Procesando",
    en: "Processing",
  },
  shipped: {
    es: "Enviado",
    en: "Shipped",
  },
  delivered: {
    es: "Entregado",
    en: "Delivered",
  },
  awaiting_payment: {
    es: "Esperando Pago",
    en: "Awaiting Payment",
  },
  paid: {
    es: "Pagado",
    en: "Paid",
  },
  cancelled: {
    es: "Cancelado",
    en: "Cancelled",
  },
  // Stats
  totalOrders: {
    es: "Total",
    en: "Total",
  },
  activeOrders: {
    es: "Activas",
    en: "Active",
  },
  inTransit: {
    es: "En Tránsito",
    en: "In Transit",
  },
  delivered: {
    es: "Entregadas",
    en: "Delivered",
  },
};

// Get reactive translations
const t = createTranslations(translations);

// Computed stats - based on ALL orders, not filtered - UPDATED
const stats = computed(() => {
  // Use allOrders for stats if available, otherwise use current orders
  const ordersForStats =
    allOrders.value.length > 0 ? allOrders.value : orders.value;
  const totalOrders = ordersForStats.length;
  
  // Active orders: collecting, awaiting_packages, packages_complete, processing
  const activeOrders = ordersForStats.filter((o) =>
    [
      "collecting",
      "awaiting_packages",
      "packages_complete",
      "processing",
    ].includes(o.status)
  ).length;
  
  // In transit: shipped status
  const inTransit = ordersForStats.filter((o) => o.status === "shipped").length;
  
  // Delivered: delivered, awaiting_payment, and paid statuses
  const delivered = ordersForStats.filter((o) =>
    ["delivered", "awaiting_payment", "paid"].includes(o.status)
  ).length;

  return [
    {
      label: t.value.totalOrders,
      value: totalOrders,
      icon: "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      label: t.value.activeOrders,
      value: activeOrders,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: t.value.inTransit,
      value: inTransit,
      icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      label: t.value.delivered,
      value: delivered,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];
});

// Methods
const fetchOrders = async (page = 1) => {
  loading.value = true;
  try {
    const response = await $customFetch("/orders", {
      params: {
        page,
        search: searchQuery.value || undefined,
      },
    });

    orders.value = response.data.data;
    pagination.value = {
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      from: response.data.from,
      to: response.data.to,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch all orders for stats (without filters)
const fetchAllOrdersForStats = async () => {
  try {
    const response = await $customFetch("/orders", {
      params: {
        page: 1,
        per_page: 10,
      },
    });
    allOrders.value = response.data.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    fetchOrders(page);
  }
};

// Updated status colors to match new flow
const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-primary-100 text-primary-700",
    processing: "bg-primary-100 text-primary-700",
    shipped: "bg-primary-100 text-primary-700",
    delivered: "bg-green-100 text-green-700",
    awaiting_payment: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusLabel = (status) => {
  return t.value[status] || status;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Watch search query with debounce
watch(searchQuery, (newValue) => {
  clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    fetchOrders(1);
  }, 300); // 300ms debounce
});

// Fetch orders on mount
onMounted(() => {
  fetchOrders();
  fetchAllOrdersForStats();
});

// Cleanup
onUnmounted(() => {
  clearTimeout(searchDebounce.value);
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

/* Hide scrollbar for stats cards on mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>