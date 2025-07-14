<!-- pages/app/orders/success.vue -->
<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <!-- Success State -->
        <TransitionRoot
          :show="!error"
          enter="transition ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
        >
          <div v-if="!error" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <!-- Success Icon -->
            <div class="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg
                class="size-8 text-green-600"
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
  
            <!-- Success Message -->
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ t.paymentSuccess }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ t.processingOrder }}
            </p>
  
            <!-- Loading Animation -->
            <div class="flex items-center justify-center mb-6">
              <div class="flex space-x-2">
                <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
  
            <!-- Order Info (if available) -->
            <div v-if="order" class="bg-gray-50 rounded-xl p-4 mb-6">
              <p class="text-sm text-gray-600 mb-1">{{ t.orderNumber }}</p>
              <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
            </div>
  
            <!-- Manual Navigation Button (fallback) -->
            <NuxtLink
              to="/app/orders"
              class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {{ t.viewOrders }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
          </div>
        </TransitionRoot>
  
        <!-- Error State -->
        <TransitionRoot
          :show="error"
          enter="transition ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
        >
          <div v-if="error" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <!-- Error Icon -->
            <div class="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg
                class="size-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
  
            <!-- Error Message -->
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ t.errorTitle }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ errorMessage || t.errorMessage }}
            </p>
  
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <NuxtLink
                to="/app/orders"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {{ t.goToOrders }}
              </NuxtLink>
              <button
                @click="retry"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                {{ t.retry }}
              </button>
            </div>
          </div>
        </TransitionRoot>
      </div>
    </section>
  </template>
  
  <script setup>
  import { TransitionRoot } from "@headlessui/vue";
  
  // Define page meta
  definePageMeta({
    layout: "app",
    middleware: "auth"
  });
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp();
  const route = useRoute();
  
  // Use the language composable
  const { t: createTranslations } = useLanguage();
  
  // State
  const order = ref(null);
  const error = ref(false);
  const errorMessage = ref("");
  const attempts = ref(0);
  const maxAttempts = 10;
  const retryDelay = 1000; // Start with 1 second
  
  // Translations
  const translations = {
    paymentSuccess: {
      es: "¡Pago exitoso!",
      en: "Payment successful!"
    },
    processingOrder: {
      es: "Estamos preparando tu orden...",
      en: "We're preparing your order..."
    },
    orderNumber: {
      es: "Número de orden",
      en: "Order number"
    },
    viewOrders: {
      es: "Ver mis órdenes",
      en: "View my orders"
    },
    errorTitle: {
      es: "Algo salió mal",
      en: "Something went wrong"
    },
    errorMessage: {
      es: "No pudimos encontrar tu orden. Por favor, revisa tu lista de órdenes.",
      en: "We couldn't find your order. Please check your orders list."
    },
    goToOrders: {
      es: "Ir a mis órdenes",
      en: "Go to my orders"
    },
    retry: {
      es: "Reintentar",
      en: "Retry"
    }
  };
  
  // Get reactive translations
  const t = createTranslations(translations);
  
  // Get session ID from query
  const sessionId = route.query.session_id;
  
  // Function to find order by session
  const findOrderBySession = async () => {
    if (!sessionId) {
      error.value = true;
      errorMessage.value = "No session ID provided";
      return;
    }
  
    try {
      const response = await $customFetch(`/orders/by-session/${sessionId}`);
      
      if (response.data) {
        order.value = response.data;
        
        // Show success briefly before redirecting
        setTimeout(() => {
          navigateTo(`/app/orders/${order.value.id}`, { replace: true });
        }, 1500);
      } else {
        throw new Error("Order not found");
      }
    } catch (err) {
      console.error("Error finding order:", err);
      
      // If we haven't exceeded max attempts, retry with exponential backoff
      if (attempts.value < maxAttempts) {
        attempts.value++;
        const delay = retryDelay * Math.pow(1.5, attempts.value - 1);
        
        setTimeout(() => {
          findOrderBySession();
        }, Math.min(delay, 10000)); // Cap at 10 seconds
      } else {
        // Max attempts reached, show error
        error.value = true;
        errorMessage.value = err.data?.message || t.value.errorMessage;
      }
    }
  };
  
  // Retry function
  const retry = () => {
    error.value = false;
    attempts.value = 0;
    findOrderBySession();
  };
  
  // Start the process on mount
  onMounted(() => {
    findOrderBySession();
  });
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  </style>