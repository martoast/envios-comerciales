<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header - Clean & Modern -->
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Back & Title -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/app/admin/orders"
              class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">
                {{ order?.tracking_number }}
              </h1>
              <p class="text-sm text-gray-500">{{ order?.user?.name }}</p>
            </div>
          </div>

          <!-- Status Badge -->
          <span
            v-if="order"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getStatusColor(order.status),
            ]"
          >
            {{ getStatusLabel(order.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div
          class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"
        ></div>
        <p class="mt-4 text-sm text-gray-600">{{ t.loading }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div
      v-else-if="order"
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
    >
      <!-- Alert Banner for Incomplete Orders -->
      <div
        v-if="order.status === 'collecting'"
        class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
      >
        <svg
          class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 class="font-medium text-amber-900">{{ t.orderIncomplete }}</h3>
          <p class="text-sm text-amber-700 mt-1">
            {{ t.orderIncompleteMessage }}
          </p>
        </div>
      </div>

      <!-- Quick Action Banner -->
      <div
        v-if="showQuickActions"
        :class="[
          'rounded-xl p-6 flex items-start gap-4',
          getActionBannerClass(),
        ]"
      >
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
            getActionIconClass(),
          ]"
        >
          <svg
            :class="['w-6 h-6', getActionIconColor()]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="order.status === 'packages_complete'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
            <path
              v-else-if="order.status === 'processing'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              v-else-if="order.status === 'paid'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 :class="['text-lg font-semibold', getActionTextColor()]">
            {{ t.actionRequired }}
          </h3>
          <p :class="['text-sm mt-1', getActionDescColor()]">
            {{ getActionMessage() }}
          </p>
          <!-- Process Order Button -->
          <button
            v-if="order.status === 'packages_complete'"
            @click="showProcessModal = true"
            class="mt-3 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {{ t.startProcessing }}
          </button>
          <!-- Send Quote Button -->

          <NuxtLink
            v-if="order.status === 'processing'"
            :to="`/app/admin/orders/${order.id}/quote`"
            class="mt-3 inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all"
          >
            {{ t.goToQuotePage }}
            <svg
              class="w-4 h-4 ml-2"
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
          </NuxtLink>
          <!-- Mark as Shipped Button -->
          <button
            v-if="order.status === 'paid'"
            @click="showShipModal = true"
            class="mt-3 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {{ t.markAsShipped }}
          </button>
          <!-- Mark as Delivered Button -->
          <button
            v-if="order.status === 'shipped'"
            @click="showDeliveredModal = true"
            class="mt-3 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            {{ t.markAsDelivered }}
          </button>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Customer & Order Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Details -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ t.customerInfo }}
            </h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">{{ t.name }}</p>
                <p class="font-medium text-gray-900">{{ order.user.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.email }}</p>
                <p class="font-medium text-gray-900 truncate">
                  {{ order.user.email }}
                </p>
              </div>
              <div v-if="order.user.phone">
                <p class="text-sm text-gray-500">{{ t.phone }}</p>
                <p class="font-medium text-gray-900">{{ order.user.phone }}</p>
              </div>
              <div>
                <NuxtLink
                  :to="`/app/admin/customers/${order.user.id}`"
                  class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ t.viewCustomer }}
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Delivery Address -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
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
              {{ t.deliveryAddress }}
            </h2>
            <div v-if="order.delivery_address">
              <p class="text-sm font-medium text-gray-900">
                {{ order.delivery_address.street }}
                {{ order.delivery_address.exterior_number }}
                <span v-if="order.delivery_address.interior_number">
                  Int. {{ order.delivery_address.interior_number }}
                </span>
              </p>
              <p class="text-sm text-gray-600 mt-1">
                {{ order.delivery_address.colonia }}<br />
                {{ order.delivery_address.municipio }},
                {{ order.delivery_address.estado }}<br />
                C.P. {{ order.delivery_address.postal_code }}
              </p>
              <span
                v-if="order.is_rural"
                class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full mt-3"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ t.ruralArea }}
              </span>
            </div>
          </div>

          <!-- Quote Details (if exists) -->
          <div
            v-if="
              order.quote_breakdown &&
              ['quote_sent', 'paid', 'shipped', 'delivered'].includes(
                order.status
              )
            "
            class="bg-white rounded-xl border border-gray-200 p-6"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {{ t.quoteDetails }}
            </h2>
            <div class="space-y-2">
              <div
                v-for="(item, index) in order.quote_breakdown"
                :key="index"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600">{{ item.description }}</span>
                <span class="font-medium text-gray-900"
                  >${{ item.amount.toFixed(2) }} MXN</span
                >
              </div>
              <div class="pt-2 border-t border-gray-200 flex justify-between">
                <span class="font-semibold text-gray-900">{{ t.total }}</span>
                <span class="font-semibold text-gray-900"
                  >${{
                    order.quoted_amount ?? order.quoted_amount.toFixed(2)
                  }}
                  MXN</span
                >
              </div>
              <div
                v-if="order.payment_link && order.status === 'quote_sent'"
                class="pt-3"
              >
                <a
                  :href="order.payment_link"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  {{ t.viewPaymentLink }}
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline & Actions -->
        <div class="space-y-6">
          <!-- Order Details -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {{ t.orderDetails }}
            </h2>
            <div class="space-y-3">
              <div v-if="order.box_size">
                <p class="text-sm text-gray-500">{{ t.boxType }}</p>
                <p class="font-medium text-gray-900 capitalize">
                  {{ order.box_size?.replace("-", " ") }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.created }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>
              <div v-if="order.completed_at">
                <p class="text-sm text-gray-500">{{ t.submittedAt }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.completed_at) }}
                </p>
              </div>
              <div v-if="order.quote_sent_at">
                <p class="text-sm text-gray-500">{{ t.quoteSentAt }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.quote_sent_at) }}
                </p>
              </div>
              <div v-if="order.paid_at">
                <p class="text-sm text-gray-500">{{ t.paidAt }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.paid_at) }}
                </p>
              </div>
              <div v-if="order.order_number">
                <p class="text-sm text-gray-500">{{ t.orderNumber }}</p>
                <p class="font-medium text-gray-900 font-mono text-xs">
                  {{ order.order_number }}
                </p>
              </div>
              <div v-if="order.tracking_number">
                <p class="text-sm text-gray-500">{{ t.trackingNumber }}</p>
                <p class="font-medium text-gray-900 font-mono text-xs">
                  {{ order.tracking_number }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ t.orderTimeline }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(event, index) in orderTimeline"
                :key="index"
                class="flex gap-3"
              >
                <div class="flex flex-col items-center">
                  <div
                    :class="[
                      'w-3 h-3 rounded-full',
                      event.completed ? 'bg-primary-500' : 'bg-gray-300',
                    ]"
                  ></div>
                  <div
                    v-if="index < orderTimeline.length - 1"
                    class="w-0.5 h-12 bg-gray-200"
                  ></div>
                </div>
                <div class="flex-1 pb-3">
                  <p class="text-sm font-medium text-gray-900">
                    {{ event.label }}
                  </p>
                  <p v-if="event.date" class="text-xs text-gray-500">
                    {{ formatDate(event.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
        >
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t.orderItems }}
          </h2>
         
        </div>

        <!-- Empty State -->
        <div
          v-if="!order.items || order.items.length === 0"
          class="px-6 py-16 text-center"
        >
          <div
            class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"
              />
            </svg>
          </div>
          <h3 class="font-medium text-gray-900 mb-1">{{ t.noItemsYet }}</h3>
          <p class="text-sm text-gray-500">{{ t.customerHasNotAddedItems }}</p>
        </div>

        <!-- Items List -->
        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between gap-4">
              <!-- Item Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start gap-3">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.product_name }}
                    </p>

                    <!-- Product URL & Proof of Purchase Links -->
                    <div class="flex flex-wrap items-center gap-3 mt-1">
                      <a
                        v-if="item.product_url"
                        :href="item.product_url"
                        target="_blank"
                        class="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                      >
                        {{ t.viewProduct }}
                        <svg
                          class="w-3 h-3"
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

                      <!-- Proof of Purchase Link -->
                      <a
                        v-if="item.proof_of_purchase_url"
                        :href="item.proof_of_purchase_url"
                        target="_blank"
                        class="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                      >
                        <svg
                          class="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {{ t.viewProofOfPurchase }}
                      </a>
                    </div>

                    <!-- Item Details Grid -->
                    <div class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <!-- Quantity -->
                      <div class="bg-gray-50 rounded-lg p-2">
                        <p class="text-xs text-gray-500">{{ t.quantity }}</p>
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.quantity }}
                        </p>
                      </div>

                      <!-- Weight -->
                      <div v-if="item.weight" class="bg-gray-50 rounded-lg p-2">
                        <p class="text-xs text-gray-500">{{ t.weight }}</p>
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.weight }} kg
                        </p>
                      </div>

                      <!-- Declared Value -->
                      <div
                        v-if="item.declared_value"
                        class="bg-gray-50 rounded-lg p-2"
                      >
                        <p class="text-xs text-gray-500">{{ t.value }}</p>
                        <p class="text-sm font-medium text-gray-900">
                          ${{ item.declared_value }}
                        </p>
                      </div>

                      <!-- Dimensions -->
                      <div
                        v-if="
                          item.dimensions &&
                          (item.dimensions.length ||
                            item.dimensions.width ||
                            item.dimensions.height)
                        "
                        class="bg-gray-50 rounded-lg p-2"
                      >
                        <p class="text-xs text-gray-500">{{ t.dimensions }}</p>
                        <p class="text-sm font-medium text-gray-900">
                          {{ formatDimensions(item.dimensions) }}
                        </p>
                      </div>
                    </div>

                    <!-- Tracking Information (if available) -->
                    <div
                      v-if="item.tracking_number || item.carrier"
                      class="mt-3 p-2 bg-blue-50 rounded-lg"
                    >
                      <div class="flex items-center gap-2">
                        <svg
                          class="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        <div class="flex-1">
                          <p class="text-xs text-blue-600 font-medium">
                            {{ t.packageTracking }}
                          </p>
                          <div class="flex items-center gap-3 mt-1">
                            <span
                              v-if="item.carrier"
                              class="text-xs text-blue-700"
                            >
                              {{ item.carrier }}
                            </span>
                            <span
                              v-if="item.tracking_number"
                              class="text-xs text-blue-700 font-mono"
                            >
                              {{ item.tracking_number }}
                            </span>
                            <a
                              v-if="item.tracking_url"
                              :href="item.tracking_url"
                              target="_blank"
                              class="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                            >
                              {{ t.track }}
                              <svg
                                class="w-3 h-3"
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Arrival Date (if arrived) -->
                    <div v-if="item.arrived && item.arrived_at" class="mt-2">
                      <p class="text-xs text-gray-500">
                        <span class="font-medium">{{ t.arrivedAt }}:</span>
                        {{ formatDate(item.arrived_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status & Actions -->
              <div class="flex items-start gap-3">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                    item.arrived
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700',
                  ]"
                >
                  {{ item.arrived ? t.arrived : t.pending }}
                </span>

                <!-- Only show Mark Arrived button if order is NOT collecting -->
                <button
                  v-if="!item.arrived && order.status !== 'collecting'"
                  @click="openMarkArrivedModal(item)"
                  class="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all"
                  :title="t.markArrived"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mark Arrived Modal -->
    <TransitionRoot :show="showMarkArrivedModal" as="template">
      <Dialog class="relative z-50" @close="showMarkArrivedModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all"
              >
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.markPackageArrived }}
                  </DialogTitle>

                  <div v-if="selectedItem" class="space-y-4">
                    <!-- Package Info -->
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-sm font-medium text-gray-900">
                        {{ selectedItem.product_name }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ t.quantity }}: {{ selectedItem.quantity }}
                      </p>
                    </div>

                    <!-- Weight Input -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.packageWeight }}
                        <span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model.number="arrivedForm.weight"
                          type="number"
                          step="0.01"
                          min="0.01"
                          max="999.99"
                          class="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          :placeholder="t.weightPlaceholder"
                        />
                        <div
                          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                        >
                          <span class="text-gray-500 text-sm">kg</span>
                        </div>
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ t.weightHint }}
                      </p>
                    </div>

                    <!-- Dimensions (Optional) -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.dimensions }}
                        <span class="text-gray-400">({{ t.optional }})</span>
                      </label>
                      <div class="grid grid-cols-3 gap-2">
                        <input
                          v-model.number="arrivedForm.dimensions.length"
                          type="number"
                          placeholder="L"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          v-model.number="arrivedForm.dimensions.width"
                          type="number"
                          placeholder="W"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          v-model.number="arrivedForm.dimensions.height"
                          type="number"
                          placeholder="H"
                          class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ t.dimensionsHint }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="confirmMarkArrived"
                      :disabled="!arrivedForm.weight || markingArrived"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!markingArrived">{{ t.confirmArrived }}</span>
                      <span
                        v-else
                        class="inline-flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        {{ t.marking }}
                      </span>
                    </button>
                    <button
                      @click="closeMarkArrivedModal"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                    >
                      {{ t.cancel }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Process Modal -->
    <TransitionRoot :show="showProcessModal" as="template">
      <Dialog class="relative z-50" @close="showProcessModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all"
              >
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.startProcessingTitle }}
                  </DialogTitle>

                  <div class="bg-primary-50 rounded-lg p-4">
                    <p class="text-sm text-primary-900">
                      {{ t.startProcessingMessage }}
                    </p>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="markAsProcessing"
                      :disabled="updatingStatus"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!updatingStatus">{{
                        t.confirmProcessing
                      }}</span>
                      <span
                        v-else
                        class="inline-flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        {{ t.updating }}
                      </span>
                    </button>
                    <button
                      @click="showProcessModal = false"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                    >
                      {{ t.cancel }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Quote Modal (Placeholder - actual implementation would be more complex) -->
    <TransitionRoot :show="showQuoteModal" as="template">
      <Dialog class="relative z-50" @close="showQuoteModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all"
              >
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.sendQuoteTitle }}
                  </DialogTitle>

                  <div class="bg-orange-50 rounded-lg p-4">
                    <p class="text-sm text-orange-900">
                      {{ t.sendQuoteMessage }}
                    </p>
                  </div>

                  <div class="mt-6 text-center">
                    <NuxtLink
                      :to="`/app/admin/orders/${order.id}/quote`"
                      class="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all"
                    >
                      {{ t.goToQuotePage }}
                      <svg
                        class="w-4 h-4 ml-2"
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
                    </NuxtLink>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Ship Modal -->
    <TransitionRoot :show="showShipModal" as="template">
      <Dialog class="relative z-50" @close="showShipModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all"
              >
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.markAsShipped }}
                  </DialogTitle>

                  <div class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.estimatedDelivery }}
                      </label>
                      <input
                        v-model="shipForm.estimated_delivery_date"
                        type="date"
                        :min="minDeliveryDate"
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="markAsShipped"
                      :disabled="
                        !shipForm.estimated_delivery_date || updatingStatus
                      "
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!updatingStatus">{{ t.confirmShip }}</span>
                      <span
                        v-else
                        class="inline-flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        {{ t.updating }}
                      </span>
                    </button>
                    <button
                      @click="showShipModal = false"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                    >
                      {{ t.cancel }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delivered Modal -->
    <TransitionRoot :show="showDeliveredModal" as="template">
      <Dialog class="relative z-50" @close="showDeliveredModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all"
              >
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.confirmDelivery }}
                  </DialogTitle>

                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-sm text-gray-600">
                      {{ t.confirmDeliveryMessage }}
                    </p>
                    <div class="mt-3 space-y-1 text-sm">
                      <p>
                        <span class="font-medium">{{ t.trackingNumber }}:</span>
                        {{ order.tracking_number }}
                      </p>
                      <p>
                        <span class="font-medium">{{ t.customer }}:</span>
                        {{ order.user.name }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="markAsDelivered"
                      :disabled="updatingStatus"
                      class="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!updatingStatus">{{
                        t.confirmDelivered
                      }}</span>
                      <span
                        v-else
                        class="inline-flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        {{ t.updating }}
                      </span>
                    </button>
                    <button
                      @click="showDeliveredModal = false"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                    >
                      {{ t.cancel }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// Define page meta
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Use language composable
const { t: createTranslations } = useLanguage();

// State
const order = ref(null);
const loading = ref(true);
const showShipModal = ref(false);
const showMarkArrivedModal = ref(false);
const showDeliveredModal = ref(false);
const showProcessModal = ref(false);
const showQuoteModal = ref(false);
const updatingStatus = ref(false);
const markingArrived = ref(false);
const selectedItem = ref(null);

const shipForm = ref({
  estimated_delivery_date: "",
});

const arrivedForm = ref({
  weight: null,
  declared_value: null,
  dimensions: {
    length: null,
    width: null,
    height: null,
  },
});

// Translations
const translations = {
  loading: {
    es: "Cargando detalles de la orden...",
    en: "Loading order details...",
  },
  orderIncomplete: {
    es: "Orden No Enviada",
    en: "Order Not Submitted",
  },
  orderIncompleteMessage: {
    es: "El cliente aún está agregando artículos a esta orden. No puedes marcar artículos como llegados hasta que el cliente envíe la orden.",
    en: "The customer is still adding items to this order. You cannot mark items as arrived until the customer submits the order.",
  },
  actionRequired: {
    es: "Acción Requerida",
    en: "Action Required",
  },
  startProcessing: {
    es: "Iniciar Procesamiento",
    en: "Start Processing",
  },
  startProcessingTitle: {
    es: "Iniciar Procesamiento de Orden",
    en: "Start Order Processing",
  },
  startProcessingMessage: {
    es: "Todos los paquetes han llegado. Puedes comenzar a procesar esta orden y preparar la cotización.",
    en: "All packages have arrived. You can start processing this order and prepare the quote.",
  },
  confirmProcessing: {
    es: "Confirmar Procesamiento",
    en: "Confirm Processing",
  },
  sendQuote: {
    es: "Enviar Cotización",
    en: "Send Quote",
  },
  sendQuoteTitle: {
    es: "Enviar Cotización al Cliente",
    en: "Send Quote to Customer",
  },
  sendQuoteMessage: {
    es: "Prepara y envía la cotización final al cliente para el pago.",
    en: "Prepare and send the final quote to the customer for payment.",
  },
  goToQuotePage: {
    es: "Ir a crear Cotización",
    en: "Go to create Invoice",
  },
  markAsShipped: {
    es: "Marcar como Enviado",
    en: "Mark as Shipped",
  },
  markAsDelivered: {
    es: "Marcar como Entregado",
    en: "Mark as Delivered",
  },
  customer: {
    es: "Cliente",
    en: "Customer",
  },
  customerInfo: {
    es: "Información del Cliente",
    en: "Customer Information",
  },
  name: {
    es: "Nombre",
    en: "Name",
  },
  email: {
    es: "Correo",
    en: "Email",
  },
  phone: {
    es: "Teléfono",
    en: "Phone",
  },
  viewCustomer: {
    es: "Ver Perfil del Cliente",
    en: "View Customer Profile",
  },
  orderDetails: {
    es: "Detalles de la Orden",
    en: "Order Details",
  },
  created: {
    es: "Creada",
    en: "Created",
  },
  submittedAt: {
    es: "Enviada",
    en: "Submitted",
  },
  quoteSentAt: {
    es: "Cotización Enviada",
    en: "Quote Sent",
  },
  paidAt: {
    es: "Pagada",
    en: "Paid",
  },
  totalWeight: {
    es: "Peso Total",
    en: "Total Weight",
  },
  totalPaid: {
    es: "Total Pagado",
    en: "Total Paid",
  },
  quotedAmount: {
    es: "Monto Cotizado",
    en: "Quoted Amount",
  },
  pendingQuote: {
    es: "Pendiente",
    en: "Pending",
  },
  items: {
    es: "Artículos",
    en: "Items",
  },
  item: {
    es: "artículo",
    en: "item",
  },
  boxType: {
    es: "Tipo de Caja",
    en: "Box Type",
  },
  deliveryAddress: {
    es: "Dirección de Entrega",
    en: "Delivery Address",
  },
  ruralArea: {
    es: "Área Rural",
    en: "Rural Area",
  },
  trackingNumber: {
    es: "Tracking Number",
    en: "Tracking Number",
  },
  orderNumber: {
    es: "Numero de Orden",
    en: "Tracking Number",
  },
  orderTimeline: {
    es: "Línea de Tiempo",
    en: "Order Timeline",
  },
  orderItems: {
    es: "Artículos de la Orden",
    en: "Order Items",
  },
  noItemsYet: {
    es: "No hay artículos todavía",
    en: "No items yet",
  },
  customerHasNotAddedItems: {
    es: "El cliente no ha agregado artículos a esta orden.",
    en: "The customer has not added items to this order.",
  },
  viewProduct: {
    es: "Ver producto",
    en: "View product",
  },
  quantity: {
    es: "Cantidad",
    en: "Quantity",
  },
  value: {
    es: "Valor",
    en: "Value",
  },
  weight: {
    es: "Peso",
    en: "Weight",
  },
  arrived: {
    es: "Llegó",
    en: "Arrived",
  },
  pending: {
    es: "Pendiente",
    en: "Pending",
  },
  markArrived: {
    es: "Marcar como Llegado",
    en: "Mark as Arrived",
  },
  cancel: {
    es: "Cancelar",
    en: "Cancel",
  },
  estimatedDelivery: {
    es: "Fecha Estimada de Entrega",
    en: "Estimated Delivery Date",
  },
  confirmShip: {
    es: "Confirmar Envío",
    en: "Confirm Shipment",
  },
  updating: {
    es: "Actualizando...",
    en: "Updating...",
  },
  markPackageArrived: {
    es: "Marcar Paquete como Llegado",
    en: "Mark Package as Arrived",
  },
  packageWeight: {
    es: "Peso del Paquete",
    en: "Package Weight",
  },
  weightPlaceholder: {
    es: "Ej: 1.5",
    en: "Ex: 1.5",
  },
  weightHint: {
    es: "Ingrese el peso en kilogramos con hasta 2 decimales",
    en: "Enter weight in kilograms with up to 2 decimal places",
  },
  dimensions: {
    es: "Dimensiones",
    en: "Dimensions",
  },
  optional: {
    es: "Opcional",
    en: "Optional",
  },
  dimensionsHint: {
    es: "Largo x Ancho x Alto en centímetros",
    en: "Length x Width x Height in centimeters",
  },
  confirmArrived: {
    es: "Confirmar Llegada",
    en: "Confirm Arrival",
  },
  marking: {
    es: "Marcando...",
    en: "Marking...",
  },
  confirmDelivery: {
    es: "Confirmar Entrega",
    en: "Confirm Delivery",
  },
  confirmDeliveryMessage: {
    es: "¿Confirma que este pedido ha sido entregado al cliente?",
    en: "Please confirm that this order has been delivered to the customer.",
  },
  confirmDelivered: {
    es: "Confirmar Entregado",
    en: "Confirm Delivered",
  },
  packagesCompleteMessage: {
    es: "Todos los paquetes han llegado. Puedes iniciar el procesamiento de esta orden.",
    en: "All packages have arrived. You can start processing this order.",
  },
  processingMessage: {
    es: "La orden está siendo procesada. Prepara y envía la cotización al cliente.",
    en: "Order is being processed. Prepare and send the quote to the customer.",
  },
  paidMessage: {
    es: "El pago ha sido recibido. Puedes marcar este pedido como enviado.",
    en: "Payment has been received. You can mark this order as shipped.",
  },
  shippedMessage: {
    es: "El pedido está en tránsito. Márcalo como entregado cuando el cliente lo reciba.",
    en: "Order is in transit. Mark as delivered when customer receives it.",
  },
  proofOfPurchase: {
    es: "Comprobante",
    en: "Proof of Purchase",
  },
  viewProofOfPurchase: {
    es: "Ver comprobante",
    en: "View proof",
  },
  quoteDetails: {
    es: "Detalles de Cotización",
    en: "Quote Details",
  },
  total: {
    es: "Total",
    en: "Total",
  },
  viewPaymentLink: {
    es: "Ver Link de Pago",
    en: "View Payment Link",
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
  processing: {
    es: "Procesando",
    en: "Processing",
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
  cancelled: {
    es: "Cancelado",
    en: "Cancelled",
  },
  dimensions: {
    es: "Dimensiones",
    en: "Dimensions",
  },
  packageTracking: {
    es: "Rastreo del Paquete",
    en: "Package Tracking",
  },
  track: {
    es: "Rastrear",
    en: "Track",
  },
  arrivedAt: {
    es: "Llegó el",
    en: "Arrived on",
  },
};

const t = createTranslations(translations);

// Computed
const showQuickActions = computed(() => {
  return (
    order.value &&
    ["packages_complete", "processing", "paid", "shipped"].includes(
      order.value.status
    )
  );
});

const minDeliveryDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
});

const arrivedCount = computed(() => {
  return order.value?.items?.filter((item) => item.arrived).length || 0;
});

const orderTimeline = computed(() => {
  if (!order.value) return [];

  const events = [
    {
      label: t.value.collecting,
      date: order.value.created_at,
      completed: true,
    },
    {
      label: t.value.awaiting_packages,
      date: order.value.completed_at,
      completed: !!order.value.completed_at,
    },
    {
      label: t.value.packages_complete,
      date: null,
      completed: [
        "packages_complete",
        "processing",
        "quote_sent",
        "paid",
        "shipped",
        "delivered",
      ].includes(order.value.status),
    },
    {
      label: t.value.processing,
      date: order.value.processing_started_at,
      completed: [
        "processing",
        "quote_sent",
        "paid",
        "shipped",
        "delivered",
      ].includes(order.value.status),
    },
    {
      label: t.value.quote_sent,
      date: order.value.quote_sent_at,
      completed: ["quote_sent", "paid", "shipped", "delivered"].includes(
        order.value.status
      ),
    },
    {
      label: t.value.paid,
      date: order.value.paid_at,
      completed: ["paid", "shipped", "delivered"].includes(order.value.status),
    },
    {
      label: t.value.shipped,
      date: order.value.shipped_at,
      completed: ["shipped", "delivered"].includes(order.value.status),
    },
    {
      label: t.value.delivered,
      date: order.value.delivered_at,
      completed: !!order.value.delivered_at,
    },
  ];

  return events;
});

// Methods
const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/admin/orders/${route.params.id}`);
    order.value = response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error("Error loading order");
    await router.push("/app/admin/orders");
  } finally {
    loading.value = false;
  }
};

const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-primary-100 text-primary-700",
    processing: "bg-primary-100 text-primary-700",
    quote_sent: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    shipped: "bg-primary-100 text-primary-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusLabel = (status) => {
  return t.value[status] || status;
};

const getActionBannerClass = () => {
  const status = order.value.status;
  if (status === "packages_complete") {
    return "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200";
  } else if (status === "processing") {
    return "bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200";
  } else if (status === "paid") {
    return "bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200";
  } else if (status === "shipped") {
    return "bg-gradient-to-r from-green-50 to-green-100 border border-green-200";
  }
  return "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200";
};

const formatDimensions = (dimensions) => {
  if (!dimensions) return "-";
  const { length, width, height } = dimensions;
  if (!length && !width && !height) return "-";
  return `${length || 0} × ${width || 0} × ${height || 0} cm`;
};

const getActionIconClass = () => {
  const status = order.value.status;
  if (status === "packages_complete") return "bg-primary-200";
  if (status === "processing") return "bg-orange-200";
  if (status === "paid") return "bg-primary-200";
  if (status === "shipped") return "bg-green-200";
  return "bg-gray-200";
};

const getActionIconColor = () => {
  const status = order.value.status;
  if (status === "packages_complete") return "text-primary-700";
  if (status === "processing") return "text-orange-700";
  if (status === "paid") return "text-primary-700";
  if (status === "shipped") return "text-green-700";
  return "text-gray-700";
};

const getActionTextColor = () => {
  const status = order.value.status;
  if (status === "packages_complete") return "text-primary-900";
  if (status === "processing") return "text-orange-900";
  if (status === "paid") return "text-primary-900";
  if (status === "shipped") return "text-green-900";
  return "text-gray-900";
};

const getActionDescColor = () => {
  const status = order.value.status;
  if (status === "packages_complete") return "text-primary-700";
  if (status === "processing") return "text-orange-700";
  if (status === "paid") return "text-primary-700";
  if (status === "shipped") return "text-green-700";
  return "text-gray-700";
};

const getActionMessage = () => {
  if (order.value.status === "packages_complete") {
    return t.value.packagesCompleteMessage;
  } else if (order.value.status === "processing") {
    return t.value.processingMessage;
  } else if (order.value.status === "paid") {
    return t.value.paidMessage;
  } else if (order.value.status === "shipped") {
    return t.value.shippedMessage;
  }
  return "";
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatFileSize = (bytes) => {
  if (!bytes) return "";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const markAsProcessing = async () => {
  updatingStatus.value = true;
  try {
    const response = await $customFetch(
      `/admin/orders/${order.value.id}/status`,
      {
        method: "PUT",
        body: {
          status: "processing",
        },
      }
    );

    $toast.success("Order marked as processing");
    order.value = response.data;
    showProcessModal.value = false;
  } catch (error) {
    console.error("Error updating status:", error);
    $toast.error("Error updating order status");
  } finally {
    updatingStatus.value = false;
  }
};

const markAsShipped = async () => {
  updatingStatus.value = true;
  try {
    const response = await $customFetch(
      `/admin/orders/${order.value.id}/status`,
      {
        method: "PUT",
        body: {
          status: "shipped",
          estimated_delivery_date: shipForm.value.estimated_delivery_date,
        },
      }
    );

    $toast.success("Order marked as shipped");
    order.value = response.data;
    showShipModal.value = false;
    shipForm.value = { estimated_delivery_date: "" };
  } catch (error) {
    console.error("Error updating status:", error);
    $toast.error("Error updating order status");
  } finally {
    updatingStatus.value = false;
  }
};

const markAsDelivered = async () => {
  updatingStatus.value = true;
  try {
    const response = await $customFetch(
      `/admin/orders/${order.value.id}/status`,
      {
        method: "PUT",
        body: {
          status: "delivered",
        },
      }
    );

    $toast.success("Order marked as delivered");
    order.value = response.data;
    showDeliveredModal.value = false;
  } catch (error) {
    console.error("Error updating status:", error);
    $toast.error("Error updating order status");
  } finally {
    updatingStatus.value = false;
  }
};

const openMarkArrivedModal = (item) => {
  selectedItem.value = item;
  arrivedForm.value = {
    weight: null,
    declared_value: item.declared_value || null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    },
  };
  showMarkArrivedModal.value = true;
};

const closeMarkArrivedModal = () => {
  showMarkArrivedModal.value = false;
  selectedItem.value = null;
  arrivedForm.value = {
    weight: null,
    declared_value: null,
    dimensions: {
      length: null,
      width: null,
      height: null,
    },
  };
};

const confirmMarkArrived = async () => {
  if (!selectedItem.value || !arrivedForm.value.weight) return;

  markingArrived.value = true;
  try {
    const body = {
      arrived: true,
      weight: parseFloat(arrivedForm.value.weight),
    };

    if (
      arrivedForm.value.declared_value !== null &&
      arrivedForm.value.declared_value !== ""
    ) {
      body.declared_value = parseFloat(arrivedForm.value.declared_value);
    }

    if (
      arrivedForm.value.dimensions.length &&
      arrivedForm.value.dimensions.width &&
      arrivedForm.value.dimensions.height
    ) {
      body.dimensions = arrivedForm.value.dimensions;
    }

    await $customFetch(
      `/admin/orders/${order.value.id}/items/${selectedItem.value.id}/arrived`,
      {
        method: "PUT",
        body,
      }
    );

    $toast.success("Item marked as arrived");
    await fetchOrder();
    closeMarkArrivedModal();
  } catch (error) {
    console.error("Error marking item arrived:", error);
    $toast.error("Error updating item");
  } finally {
    markingArrived.value = false;
  }
};

// Fetch order on mount
onMounted(() => {
  fetchOrder();
});
</script>

<style scoped>
/* Smooth loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
