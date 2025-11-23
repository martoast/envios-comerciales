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
        <div class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="mt-4 text-sm text-gray-600">{{ t.loadingOrder }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="order" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
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

      <!-- Shipping Details (Guia, GIA, Dates) -->
      <UserOrderShippingDetails :order="order" />

      <!-- Address -->
      <UserOrderAddress :order="order" />

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
import { ref, onMounted } from 'vue'
import UserOrderHeader from '~/components/user/UserOrderHeader.vue'
import UserOrderStatusBanner from '~/components/user/UserOrderStatusBanner.vue'
import UserOrderShippingDetails from '~/components/user/UserOrderShippingDetails.vue'
import UserOrderAddress from '~/components/user/UserOrderAddress.vue'
import UserOrderItemsList from '~/components/user/UserOrderItemsList.vue'
import UserOrderModals from '~/components/user/UserOrderModals.vue'
import SuccessBanner from '~/components/SuccessBanner.vue'
import OrderProgressTimeline from '~/components/OrderProgressTimeline.vue'

definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
})

const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { t: createTranslations } = useLanguage()

const order = ref(null)
const loading = ref(true)

// Modal States
const showCompleteOrderModal = ref(false)
const showReopenOrderModal = ref(false)
const showDeleteOrderModal = ref(false)

// Banner States
const showSuccessBanner = ref(false)
const bannerTrigger = ref("auto")

const translations = {
  loadingOrder: { es: "Cargando orden...", en: "Loading order..." },
}
const t = createTranslations(translations)

const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/orders/${route.params.id}`)
    order.value = response.data
    checkBanners()
  } catch (error) {
    console.error("Error fetching order:", error)
    $toast.error('Error loading order')
  } finally {
    loading.value = false
  }
}

const checkBanners = () => {
  if (!order.value) return
  
  // Confetti logic for completed orders
  const confettiKey = `order-${order.value.id}-confetti-shown`
  const dismissedKey = `order-${order.value.id}-${order.value.status}-dismissed`

  if (route.query.completed === "true" && order.value.status === "awaiting_packages") {
    if (!localStorage.getItem(confettiKey)) {
      bannerTrigger.value = "just_completed"
      showSuccessBanner.value = true
      localStorage.setItem(confettiKey, "true")
      router.replace({ path: route.path, query: {} })
    }
  } else if (order.value.status === "awaiting_packages" && !localStorage.getItem(dismissedKey)) {
    bannerTrigger.value = "auto"
    showSuccessBanner.value = true
  }
}

const dismissSuccessBanner = () => {
  showSuccessBanner.value = false
  if (order.value) {
    localStorage.setItem(`order-${order.value.id}-${order.value.status}-dismissed`, "true")
  }
}

const handleRefresh = async (triggerConfetti = false) => {
  if (triggerConfetti) {
    // Logic to show confetti after completion via modal
    bannerTrigger.value = "just_completed"
    showSuccessBanner.value = true
  }
  await fetchOrder()
}

const handleDeleted = () => {
  router.push('/app/orders')
}

onMounted(() => {
  fetchOrder()
})
</script>