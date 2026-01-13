<!-- pages/app/orders/[id]/index.vue -->
<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header -->
    <UserOrderHeader
      :order="order"
      :loading="loading"
      @delete="showDeleteOrderModal = true"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div
          class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"
        ></div>
        <p class="mt-4 text-sm text-gray-600">{{ t.loadingOrder }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div
      v-else-if="order"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
    >
      <!-- Success/Confetti Banner -->
      <SuccessBanner
        :show="showSuccessBanner"
        :order="order"
        :trigger="bannerTrigger"
        @dismiss="dismissSuccessBanner"
      />

      <!-- Dynamic Status Banner (Handles Deposit & Final Payment CTAs) -->
      <UserOrderStatusBanner
        :order="order"
        @reopen="showReopenOrderModal = true"
        @complete="showCompleteOrderModal = true"
      />

      <!-- Arrival Proof Image - Show when all packages arrived -->
      <div
        v-if="order.arrival_image_url"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="px-5 py-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">{{ t.packagesArrived }}</h2>
              <p class="text-sm text-gray-500">{{ t.packagesArrivedDesc }}</p>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="rounded-xl overflow-hidden border border-gray-200">
            <img
              :src="order.arrival_image_url"
              :alt="t.packagesArrived"
              class="w-full max-h-80 object-cover"
            >
          </div>
        </div>
      </div>

      <!-- Shipping Details (Guia, GIA, Dates) - Only for shipping orders -->
      <UserOrderShippingDetails
        v-if="order.order_type !== 'crossing'"
        :order="order"
      />

      <!-- Address - Only for shipping orders -->
      <UserOrderAddress v-if="order.order_type !== 'crossing'" :order="order" />

      <!-- Pickup Location - Only for crossing orders -->
      <div
        v-if="order.order_type === 'crossing'"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="px-5 py-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">
                {{ t.pickupLocation }}
              </h2>
              <p class="text-sm text-gray-500">{{ t.pickupLocationDesc }}</p>
            </div>
          </div>
        </div>

        <div class="p-5">
          <!-- Warehouse Details -->
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <!-- Warehouse Icon -->
                <svg
                  class="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">
                  {{ t.warehouseName }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">
                  {{ t.warehouseAddress }}
                </p>
                <p class="text-sm text-gray-500 mt-0.5">
                  Tijuana, Baja California, México
                </p>
              </div>
            </div>

            <!-- Map Link Button -->
            <a
              href="https://maps.app.goo.gl/4SsEVjy2D4noFM9n8"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-3 w-full px-5 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg group"
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {{ t.getDirections }}
              <svg
                class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <!-- Hours Info -->
            <div
              class="flex items-center gap-2 text-sm text-gray-500 justify-center pt-2"
            >
              <svg
                class="w-4 h-4"
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
              <span>{{ t.pickupHours }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <UserOrderItemsList :order="order" />

      <!-- Progress Timeline -->
      <OrderProgressTimeline :order="order" />
    </div>

    <!-- Modals Wrapper -->
    <UserOrderModals
      :order="order"
      :show-complete="showCompleteOrderModal"
      :show-reopen="showReopenOrderModal"
      :show-delete="showDeleteOrderModal"
      @close-complete="showCompleteOrderModal = false"
      @close-reopen="showReopenOrderModal = false"
      @close-delete="showDeleteOrderModal = false"
      @refresh="handleRefresh"
      @deleted="handleDeleted"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserOrderHeader from "~/components/user/UserOrderHeader.vue";
import UserOrderStatusBanner from "~/components/user/UserOrderStatusBanner.vue";
import UserOrderShippingDetails from "~/components/user/UserOrderShippingDetails.vue";
import UserOrderAddress from "~/components/user/UserOrderAddress.vue";
import UserOrderItemsList from "~/components/user/UserOrderItemsList.vue";
import UserOrderModals from "~/components/user/UserOrderModals.vue";
import SuccessBanner from "~/components/SuccessBanner.vue";
import OrderProgressTimeline from "~/components/OrderProgressTimeline.vue";

definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { t: createTranslations } = useLanguage();

const order = ref(null);
const loading = ref(true);

// Modal States
const showCompleteOrderModal = ref(false);
const showReopenOrderModal = ref(false);
const showDeleteOrderModal = ref(false);

// Banner States
const showSuccessBanner = ref(false);
const bannerTrigger = ref("auto");

const translations = {
  loadingOrder: { es: "Cargando orden...", en: "Loading order..." },
  // Arrival Proof
  packagesArrived: { es: "Tus Paquetes Han Llegado", en: "Your Packages Have Arrived" },
  packagesArrivedDesc: { es: "Foto de tus artículos en nuestra bodega", en: "Photo of your items at our warehouse" },
  // Order Type
  crossingOnly: { es: "Solo Cruce", en: "Crossing Only" },
  homeDelivery: { es: "Envío a Domicilio", en: "Home Delivery" },
  // Pickup Location
  pickupLocation: { es: "Ubicación de Recolección", en: "Pickup Location" },
  pickupLocationDesc: {
    es: "Recoge tus paquetes en nuestra bodega",
    en: "Pick up your packages at our warehouse",
  },
  crossingOrderInfo: { es: "Orden de Solo Cruce", en: "Crossing-Only Order" },
  crossingOrderInfoDesc: {
    es: "Te notificaremos cuando tus paquetes estén listos para recoger. No olvides traer una identificación.",
    en: "We'll notify you when your packages are ready for pickup. Don't forget to bring an ID.",
  },
  warehouseName: {
    es: "Colectivo Las Ferias La Cacho",
    en: "Colectivo Las Ferias La Cacho",
  },
  warehouseAddress: {
    es: "Blvd. Insurgentes #18512, Río Tijuana 3ra Etapa",
    en: "Blvd. Insurgentes #18512, Río Tijuana 3ra Etapa",
  },
  getDirections: { es: "Obtener Direcciones", en: "Get Directions" },
  pickupHours: {
    es: "Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 2:00 PM",
    en: "Mon-Fri: 9:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM",
  },
};
const t = createTranslations(translations);

const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/orders/${route.params.id}`);
    order.value = response.data;
    checkBanners();
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error("Error loading order");
  } finally {
    loading.value = false;
  }
};

const checkBanners = () => {
  if (!order.value) return;

  const confettiKey = `order-${order.value.id}-confetti-shown`;
  const dismissedKey = `order-${order.value.id}-${order.value.status}-dismissed`;

  if (
    route.query.completed === "true" &&
    order.value.status === "awaiting_packages"
  ) {
    if (!localStorage.getItem(confettiKey)) {
      bannerTrigger.value = "just_completed";
      showSuccessBanner.value = true;
      localStorage.setItem(confettiKey, "true");
      router.replace({ path: route.path, query: {} });
    }
  } else if (
    order.value.status === "awaiting_packages" &&
    !localStorage.getItem(dismissedKey)
  ) {
    bannerTrigger.value = "auto";
    showSuccessBanner.value = true;
  }
};

const dismissSuccessBanner = () => {
  showSuccessBanner.value = false;
  if (order.value) {
    localStorage.setItem(
      `order-${order.value.id}-${order.value.status}-dismissed`,
      "true"
    );
  }
};

const handleRefresh = async (triggerConfetti = false) => {
  if (triggerConfetti) {
    bannerTrigger.value = "just_completed";
    showSuccessBanner.value = true;
  }
  await fetchOrder();
};

const handleDeleted = () => {
  router.push("/app/orders");
};

onMounted(() => {
  fetchOrder();
});
</script>
