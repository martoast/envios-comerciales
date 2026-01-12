<template>
  <section
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20"
  >
    <!-- Header -->
    <div
      class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div v-if="customerData">
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {{ customerData.customer.name }}
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                {{ t.customerSince }} {{ customerData.stats.member_since }}
              </p>
            </div>
            <div v-else>
              <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div
                class="h-4 w-32 bg-gray-200 rounded animate-pulse mt-1"
              ></div>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="customerData?.customer" class="flex items-center gap-3">
            <NuxtLink
              :to="`/app/admin/customers/${$route.params.id}/edit`"
              class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {{ t.editCustomer }}
            </NuxtLink>
            <a
              :href="`mailto:${customerData.customer.email}`"
              class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ t.sendEmail }}
            </a>
            <a
              v-if="customerData.customer.phone"
              :href="`tel:${customerData.customer.phone}`"
              class="inline-flex items-center gap-2 px-4 py-2 bg-accent-green text-white font-medium rounded-lg hover:bg-green-600 transition-all"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ t.call }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl"
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
      </div>

      <!-- Customer Content -->
      <div v-else-if="customerData" class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(stat, index) in statsCards"
            :key="stat.label"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">
                  {{ stat.label }}
                </p>
                <p class="mt-2 text-2xl font-bold text-gray-900">
                  {{ stat.value }}
                </p>
              </div>
              <div :class="['p-3 rounded-xl', stat.bgColor]">
                <svg
                  class="w-6 h-6"
                  :class="stat.iconColor"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="stat.icon"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Contact Info -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            style="animation-delay: 0.4s"
          >
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ t.contactInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.email }}</p>
                <p class="font-medium text-gray-900">
                  {{ customerData.customer.email }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.phone }}</p>
                <p class="font-medium text-gray-900">
                  {{ customerData.customer.phone ?? "--" }}
                </p>
              </div>
              <div v-if="customerData.customer.user_type">
                <p class="text-sm text-gray-500">{{ t.userType }}</p>
                <p class="font-medium text-gray-900 capitalize">
                  {{ getUserTypeLabel(customerData.customer.user_type) }}
                </p>
              </div>
              <div v-if="customerData.customer.provider">
                <p class="text-sm text-gray-500">{{ t.signupMethod }}</p>
                <p class="font-medium text-gray-900 capitalize">
                  {{ customerData.customer.provider }}
                </p>
              </div>
              <div v-if="customerData.customer.email_verified_at">
                <p class="text-sm text-gray-500">{{ t.emailVerified }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(customerData.customer.email_verified_at) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Customer Address -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            style="animation-delay: 0.5s"
          >
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ t.customerAddress }}
            </h2>
            <!-- Individual address fields -->
            <div
              v-if="displayAddress.address"
              class="space-y-1 text-sm text-gray-900"
            >
              <p>
                {{ displayAddress.address.street }}
                {{ displayAddress.address.exterior_number }}
              </p>
              <p v-if="displayAddress.address.interior_number">
                Int. {{ displayAddress.address.interior_number }}
              </p>
              <p>{{ displayAddress.address.colonia }}</p>
              <p>
                {{ displayAddress.address.municipio }},
                {{ displayAddress.address.estado }}
              </p>
              <p>C.P. {{ displayAddress.address.postal_code }}</p>
              <p
                v-if="displayAddress.address.referencias"
                class="text-gray-500 mt-2"
              >
                <span class="font-medium">{{ t.references }}:</span>
                {{ displayAddress.address.referencias }}
              </p>
            </div>
            <!-- Full address string -->
            <div
              v-else-if="displayAddress.fullAddress"
              class="text-sm text-gray-900"
            >
              <p class="whitespace-pre-line">{{ displayAddress.fullAddress }}</p>
            </div>
            <div v-else class="text-center py-4">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-500 mb-2">{{ t.noAddress }}</p>
              <NuxtLink
                :to="`/app/admin/customers/${$route.params.id}/edit`"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.addAddress }}
              </NuxtLink>
            </div>
          </div>

          <!-- Payment Info -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            style="animation-delay: 0.6s"
          >
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              {{ t.paymentInfo }}
            </h2>
            <div v-if="customerData.customer.stripe_id" class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.stripeCustomer }}</p>
                <p class="font-medium text-gray-900 text-xs break-all">
                  {{ customerData.customer.stripe_id }}
                </p>
              </div>
              <div
                v-if="
                  customerData.customer.pm_type &&
                  customerData.customer.pm_last_four
                "
              >
                <p class="text-sm text-gray-500">{{ t.paymentMethod }}</p>
                <p class="font-medium text-gray-900">
                  <span class="capitalize">{{
                    customerData.customer.pm_type
                  }}</span>
                  •••• {{ customerData.customer.pm_last_four }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-4">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-500">{{ t.noPaymentMethod }}</p>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
          style="animation-delay: 0.7s"
        >
          <div
            class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
          >
            <h2
              class="text-lg font-semibold text-gray-900 flex items-center gap-2"
            >
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {{ t.recentOrders }}
            </h2>
            <button
              v-if="customerData.stats.total_orders > 5"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ t.viewAllOrders }} ({{ customerData.stats.total_orders }})
            </button>
          </div>

          <div
            v-if="
              customerData.customer.orders &&
              customerData.customer.orders.length > 0
            "
          >
            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.orderNumber }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.status }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.deliveryAddress }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.total }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ t.date }}
                    </th>
                    <th class="relative px-6 py-3">
                      <span class="sr-only">{{ t.actions }}</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="order in customerData.customer.orders"
                    :key="order.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ order.tracking_number }}
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
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <div v-if="order.delivery_address">
                        <p class="text-xs">
                          {{ order.delivery_address.municipio }},
                          {{ order.delivery_address.estado }}
                        </p>
                        <span
                          v-if="order.is_rural"
                          class="text-xs text-yellow-600"
                          >{{ t.rural }}</span
                        >
                      </div>
                      <span v-else class="text-gray-500">-</span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span v-if="order.amount_paid"
                        >${{ formatCurrency(order.amount_paid) }} MXN</span
                      >
                      <span v-else class="text-gray-500">-</span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ formatDate(order.created_at) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <NuxtLink
                        :to="`/app/admin/orders/${order.id}`"
                        class="text-primary-600 hover:text-primary-900"
                      >
                        {{ t.viewOrder }}
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Cards -->
            <div class="sm:hidden divide-y divide-gray-100">
              <NuxtLink
                v-for="order in customerData.customer.orders"
                :key="order.id"
                :to="`/app/admin/orders/${order.id}`"
                class="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <p class="font-medium text-gray-900">
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
                <div class="text-sm space-y-1">
                  <div v-if="order.delivery_address" class="text-gray-600">
                    <span class="font-medium">{{ t.address }}:</span>
                    {{ order.delivery_address.municipio }},
                    {{ order.delivery_address.estado }}
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">{{
                      formatDate(order.created_at)
                    }}</span>
                    <span class="font-medium text-gray-900">
                      <span v-if="order.amount_paid"
                        >${{ formatCurrency(order.amount_paid) }} MXN</span
                      >
                      <span v-else class="text-gray-500">-</span>
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div v-else class="px-6 py-8 text-center text-gray-500">
            {{ t.noOrders }}
          </div>
        </div>

        <!-- Customer Timeline -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
          style="animation-delay: 0.8s"
        >
          <h2
            class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2"
          >
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ t.customerTimeline }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="(event, index) in customerTimeline"
              :key="index"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <div
                  :class="[
                    'w-4 h-4 rounded-full',
                    event.completed ? 'bg-primary-500' : 'bg-gray-300',
                  ]"
                ></div>
                <div
                  v-if="index < customerTimeline.length - 1"
                  class="w-0.5 h-16 bg-gray-200"
                ></div>
              </div>
              <div class="flex-1 pb-8">
                <p class="font-medium text-gray-900">{{ event.label }}</p>
                <p v-if="event.date" class="text-sm text-gray-500">
                  {{ event.date }}
                </p>
                <p v-if="event.description" class="text-sm text-gray-600 mt-1">
                  {{ event.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Define page meta
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { getReturnUrl } = useListReturnUrl('customers');

// Navigation
const goBack = () => {
  router.push(getReturnUrl());
};

// Use language composable
const { t: createTranslations } = useLanguage();

// State
const customerData = ref(null);
const loading = ref(true);

// Translations
const translations = {
  customerSince: {
    es: "Cliente desde hace",
    en: "Customer since",
  },
  sendEmail: {
    es: "Enviar Email",
    en: "Send Email",
  },
  call: {
    es: "Llamar",
    en: "Call",
  },
  contactInfo: {
    es: "Información de Contacto",
    en: "Contact Information",
  },
  email: {
    es: "Correo Electrónico",
    en: "Email",
  },
  phone: {
    es: "Teléfono",
    en: "Phone",
  },
  userType: {
    es: "Tipo de Usuario",
    en: "User Type",
  },
  signupMethod: {
    es: "Método de Registro",
    en: "Signup Method",
  },
  emailVerified: {
    es: "Email Verificado",
    en: "Email Verified",
  },
  customerAddress: {
    es: "Dirección del Cliente",
    en: "Customer Address",
  },
  deliveryAddress: {
    es: "Dirección de Entrega",
    en: "Delivery Address",
  },
  references: {
    es: "Referencias",
    en: "References",
  },
  address: {
    es: "Dirección",
    en: "Address",
  },
  noAddress: {
    es: "No hay dirección registrada",
    en: "No address on file",
  },
  addAddress: {
    es: "Agregar dirección",
    en: "Add address",
  },
  paymentInfo: {
    es: "Información de Pago",
    en: "Payment Information",
  },
  stripeCustomer: {
    es: "ID de Cliente Stripe",
    en: "Stripe Customer ID",
  },
  paymentMethod: {
    es: "Método de Pago",
    en: "Payment Method",
  },
  noPaymentMethod: {
    es: "No hay método de pago registrado",
    en: "No payment method registered",
  },
  recentOrders: {
    es: "Órdenes Recientes",
    en: "Recent Orders",
  },
  viewAllOrders: {
    es: "Ver todas las órdenes",
    en: "View all orders",
  },
  orderNumber: {
    es: "Número",
    en: "Number",
  },
  status: {
    es: "Estado",
    en: "Status",
  },
  total: {
    es: "Total",
    en: "Total",
  },
  date: {
    es: "Fecha",
    en: "Date",
  },
  actions: {
    es: "Acciones",
    en: "Actions",
  },
  viewOrder: {
    es: "Ver",
    en: "View",
  },
  noOrders: {
    es: "Este cliente aún no tiene órdenes",
    en: "This customer has no orders yet",
  },
  customerTimeline: {
    es: "Línea de Tiempo",
    en: "Customer Timeline",
  },
  rural: {
    es: "Rural",
    en: "Rural",
  },
  // Stats
  totalSpent: {
    es: "Total Gastado",
    en: "Total Spent",
  },
  totalOrders: {
    es: "Total de Órdenes",
    en: "Total Orders",
  },
  activeOrders: {
    es: "Órdenes Activas",
    en: "Active Orders",
  },
  avgOrderValue: {
    es: "Valor Promedio",
    en: "Average Order Value",
  },
  // Timeline events
  accountCreated: {
    es: "Cuenta creada",
    en: "Account created",
  },
  firstOrder: {
    es: "Primera orden",
    en: "First order",
  },
  lastOrder: {
    es: "Última orden",
    en: "Last order",
  },
  // Status translations
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
  quote_sent: {
    es: "Cotización Enviada",
    en: "Quote Sent",
  },
  paid: {
    es: "Pagado",
    en: "Paid",
  },
  shipped: {
    es: "Enviado",
    en: "Shipped",
  },
  delivered: {
    es: "Entregado",
    en: "Delivered",
  },
  editCustomer: {
    es: "Editar Cliente",
    en: "Edit Customer",
  },
  // User types
  expat: {
    es: "Expat",
    en: "Expat",
  },
  business: {
    es: "Negocio",
    en: "Business",
  },
  shopper: {
    es: "Comprador en Línea",
    en: "Online Shopper",
  },
};

const t = createTranslations(translations);

// Computed - Display address from user's account only (not from orders)
const displayAddress = computed(() => {
  if (!customerData.value?.customer) {
    return { address: null, fullAddress: null };
  }

  const customer = customerData.value.customer;

  // Check if customer has a full_address string
  if (customer.full_address) {
    return {
      address: null,
      fullAddress: customer.full_address,
    };
  }

  // Check if customer has saved address (individual fields)
  const hasSavedAddress =
    customer.street &&
    customer.colonia &&
    customer.municipio &&
    customer.estado &&
    customer.postal_code;

  if (hasSavedAddress) {
    return {
      address: {
        street: customer.street,
        exterior_number: customer.exterior_number,
        interior_number: customer.interior_number,
        colonia: customer.colonia,
        municipio: customer.municipio,
        estado: customer.estado,
        postal_code: customer.postal_code,
      },
      fullAddress: null,
    };
  }

  // No saved address on user's account
  return { address: null, fullAddress: null };
});

const statsCards = computed(() => {
  if (!customerData.value?.stats) return [];

  return [
    {
      label: t.value.totalSpent,
      value: `$${formatCurrency(
        customerData.value.stats.total_spent || 0
      )} MXN`,
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: t.value.totalOrders,
      value: customerData.value.stats.total_orders || 0,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      label: t.value.activeOrders,
      value: customerData.value.stats.active_orders || 0,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      label: t.value.avgOrderValue,
      value: `$${formatCurrency(
        customerData.value.stats.average_order_value || 0
      )} MXN`,
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
    },
  ];
});

const customerTimeline = computed(() => {
  if (!customerData.value?.customer) return [];

  const events = [
    {
      label: t.value.accountCreated,
      date: formatDate(customerData.value.customer.created_at),
      description: customerData.value.customer.provider
        ? `Via ${customerData.value.customer.provider}`
        : null,
      completed: true,
    },
  ];

  // Add first order event if they have orders
  if (
    customerData.value.customer.orders &&
    customerData.value.customer.orders.length > 0
  ) {
    // Orders are already sorted by latest, so reverse to get oldest first
    const orders = [...customerData.value.customer.orders].reverse();
    const firstOrder = orders[0];

    events.push({
      label: t.value.firstOrder,
      date: formatDate(firstOrder.created_at),
      description: "",
      completed: true,
    });

    // Add last order event if different from first
    if (orders.length > 1) {
      const lastOrder = orders[orders.length - 1];
      events.push({
        label: t.value.lastOrder,
        date: formatDate(lastOrder.created_at),
        description: "",
        completed: true,
      });
    }
  }

  return events;
});

// Methods
const fetchCustomer = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/admin/customers/${route.params.id}`);
    customerData.value = response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    $toast.error("Error loading customer");
    await router.push("/app/admin/customers");
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-yellow-100 text-yellow-700",
    packages_complete: "bg-slate-100 text-slate-700",
    quote_sent: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    shipped: "bg-primary-100 text-primary-700",
    delivered: "bg-gray-100 text-gray-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusLabel = (status) => {
  return t.value[status] || status;
};

const getUserTypeLabel = (userType) => {
  const labels = {
    expat: t.value.expat,
    business: t.value.business,
    shopper: t.value.shopper,
  };
  return labels[userType] || userType;
};

// Fetch customer on mount
onMounted(() => {
  fetchCustomer();
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
</style>