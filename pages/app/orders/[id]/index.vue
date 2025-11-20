<!-- pages/app/orders/[id]/index.vue -->
<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header - Simplified & Clean -->
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Back & Title -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/app/orders"
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
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
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

            <!-- More Actions -->
            <Menu
              as="div"
              class="relative"
              v-if="order?.status === 'collecting' && canManageItems"
            >
              <MenuButton
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 divide-y divide-gray-100"
                >
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <NuxtLink
                        :to="`/app/orders/${order.id}/edit`"
                        :class="[
                          active ? 'bg-gray-50' : '',
                          'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                        ]"
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        {{ t.editOrder }}
                      </NuxtLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="showDeleteOrderModal = true"
                        :class="[
                          active ? 'bg-red-50' : '',
                          'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-red-600 w-full',
                        ]"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        {{ t.deleteOrder }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

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
      <!-- Success Banner -->
      <SuccessBanner
        :show="showSuccessBanner"
        :order="order"
        :trigger="bannerTrigger"
        @dismiss="dismissSuccessBanner"
      />

      <!-- Status Banners -->

      <!-- COLLECTING STATUS - Add Items CTA (No Items) -->
      <div
        v-if="
          order.status === 'collecting' &&
          (!order.items || order.items.length === 0)
        "
        class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">
              {{ t.collectingNoItemsTitle }}
            </h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.collectingNoItemsDescription }}
            </p>
          </div>
          <NuxtLink
            :to="`/app/orders/${order.id}/items`"
            class="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {{ t.addItems }}
          </NuxtLink>
        </div>
      </div>

      <!-- AWAITING_PACKAGES STATUS -->
      <div
        v-if="order.status === 'awaiting_packages'"
        class="bg-amber-50 border border-amber-200 rounded-xl p-6"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-amber-900">
              {{ t.awaitingPackagesTitle }}
            </h3>
            <p class="text-sm text-amber-700 mt-1">
              {{ t.awaitingPackagesDescription }}
            </p>
          </div>
          <button
            @click="showReopenOrderModal = true"
            class="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            {{ t.reopenOrder }}
          </button>
        </div>
      </div>

      <!-- PACKAGES_COMPLETE STATUS -->
      <div
        v-if="order.status === 'packages_complete'"
        class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.packagesCompleteTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.packagesCompleteDescription }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <button
              @click="showReopenOrderModal = true"
              class="px-4 py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              {{ t.reopenOrder }}
            </button>
            <div class="px-6 py-3 bg-white/20 rounded-lg border border-white/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span class="text-sm font-medium">{{ t.preparing }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROCESSING STATUS -->
      <div
        v-if="order.status === 'processing'"
        class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.processingTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.processingDescription }}
            </p>
          </div>
          <div class="px-6 py-3 bg-white/20 rounded-lg border border-white/30">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span class="text-sm font-medium">{{ t.inProgress }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SHIPPED STATUS -->
      <div
        v-if="order.status === 'shipped'"
        class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.shippedTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.shippedDescription }}
            </p>
            <p
              v-if="order.estimated_delivery_date"
              class="text-sm text-white/90 mt-2 font-medium"
            >
              {{ t.estimatedArrival }}:
              {{ formatDate(order.estimated_delivery_date) }}
            </p>
          </div>
          <NuxtLink
            to="https://www.estafeta.com/en/rastrear-envio?rastreo=true"
            external
            target="_blank"
            class="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {{ t.trackShipment }}
          </NuxtLink>
        </div>
      </div>

      <!-- DELIVERED STATUS -->
      <div
        v-if="order.status === 'delivered'"
        class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.deliveredTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.deliveredDescription }}
            </p>
          </div>
          <div class="px-6 py-3 bg-white/20 rounded-lg border border-white/30">
            <div class="flex items-center gap-2">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-sm font-medium">{{ t.completed }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AWAITING_PAYMENT STATUS -->
      <div
        v-if="order.status === 'awaiting_payment'"
        class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.awaitingPaymentTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.awaitingPaymentDescription }}
            </p>
            <p v-if="order.quoted_amount" class="text-xl font-bold mt-2">
              ${{ order.quoted_amount }} {{ order.currency.toUpperCase() }}
            </p>
          </div>
          <NuxtLink
            v-if="order.payment_link"
            :to="order.payment_link"
            external
            target="_blank"
            class="px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
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
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {{ t.payNow }}
          </NuxtLink>
        </div>
      </div>

      <!-- PAID STATUS -->
      <div
        v-if="order.status === 'paid'"
        class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.paidTitle }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.paidDescription }}
            </p>
            <p v-if="order.quoted_amount" class="text-lg font-medium mt-2">
              {{ t.amountPaid }}: ${{ order.quoted_amount }}
              {{ order.currency.toUpperCase() }}
            </p>
          </div>
          <div class="px-6 py-3 bg-white/20 rounded-lg border border-white/30">
            <div class="flex items-center gap-2">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-sm font-medium">{{ t.paymentComplete }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CANCELLED STATUS -->
      <div
        v-if="order.status === 'cancelled'"
        class="bg-red-50 border border-red-200 rounded-xl p-6"
      >
        <div
          class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div
            class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 text-red-600"
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
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-red-900">
              {{ t.cancelledTitle }}
            </h3>
            <p class="text-sm text-red-700 mt-1">
              {{ t.cancelledDescription }}
            </p>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ t.orderItems }}
            </h2>
            <!-- Manage Items Button - Only show if can manage items -->
            <NuxtLink
              v-if="canManageItems"
              :to="`/app/orders/${order.id}/items`"
              class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span class="hidden sm:inline">{{ t.manageItems }}</span>
              <span class="sm:hidden">{{ t.manage }}</span>
            </NuxtLink>
            <!-- Info message when all items arrived -->
            <div v-else-if="allItemsArrived && order.status !== 'collecting'" class="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
              {{ t.allItemsReceived }}
            </div>
          </div>
        </div>

        <!-- Items Content -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start gap-3 sm:gap-4">
              <!-- Mobile-optimized Item Info -->
              <div class="flex-1 min-w-0">
                <!-- Product name with conditional link -->
                <NuxtLink
                  v-if="item.product_url"
                  :to="item.product_url"
                  external
                  target="_blank"
                  class="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 inline-flex items-center gap-1"
                >
                  {{ item.product_name }}
                  <svg
                    class="w-3 h-3 flex-shrink-0"
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
                </NuxtLink>
                <p
                  v-else
                  class="text-sm font-medium text-gray-900 line-clamp-2"
                >
                  {{ item.product_name }}
                </p>

                <!-- Quantity and status - Stacked on mobile -->
                <div class="flex flex-wrap items-center gap-2 mt-2">
                  <span class="text-sm text-gray-500">
                    {{ t.quantity }}: {{ item.quantity }}
                  </span>

                  <!-- Status badges -->
                  <span
                    v-if="order.status !== 'collecting' && item.arrived"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{{ t.arrived }}</span>
                  </span>

                  <span
                    v-else-if="order.status !== 'collecting' && !item.arrived"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ t.inTransit }}
                  </span>

                  <!-- Receipt link -->
                  <NuxtLink
                    v-if="item.proof_of_purchase_url"
                    :to="item.proof_of_purchase_url"
                    external
                    target="_blank"
                    class="inline-flex items-center gap-1 text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <svg
                      class="w-3.5 h-3.5"
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
                    {{ t.receipt }}
                  </NuxtLink>
                </div>

                <!-- Estimated Delivery Date (NEW) - Only show if NOT arrived -->
                <div v-if="item.estimated_delivery_date && !item.arrived" class="mt-3 bg-blue-50 rounded-lg p-3">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-blue-900">{{ t.expectedDelivery }}</p>
                      <p class="text-sm font-semibold text-blue-700">
                        {{ formatDeliveryDate(item.estimated_delivery_date) }}
                      </p>
                      <!-- Status indicator -->
                      <p v-if="getDeliveryStatus(item.estimated_delivery_date) === 'overdue'" class="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                      </p>
                      <p v-else-if="getDeliveryStatus(item.estimated_delivery_date) === 'today'" class="text-xs text-blue-600 font-medium mt-1">
                        {{ t.expectedToday }}
                      </p>
                      <p v-else-if="getDeliveryStatus(item.estimated_delivery_date) === 'soon'" class="text-xs text-amber-600 mt-1">
                        {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                      </p>
                      <p v-else class="text-xs text-gray-600 mt-1">
                        {{ getDaysUntilDelivery(item.estimated_delivery_date) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Arrived Date (NEW) - Only show if arrived -->
                <div v-if="item.arrived && item.arrived_at" class="mt-3 bg-green-50 rounded-lg p-3">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <div>
                      <p class="text-xs font-medium text-green-900">{{ t.arrivedAt }}</p>
                      <p class="text-sm font-semibold text-green-700">
                        {{ formatDate(item.arrived_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="!order.items || order.items.length === 0"
          class="py-8 sm:py-12 px-4 text-center"
        >
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          </div>
          <p class="text-gray-500 text-sm sm:text-base">{{ t.noItemsYet }}</p>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            {{ t.startAddingItems }}
          </p>

          <!-- CTA Button when empty -->
          <NuxtLink
            v-if="canManageItems"
            :to="`/app/orders/${order.id}/items`"
            class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ t.addFirstItem }}
          </NuxtLink>
        </div>
      </div>

      <!-- Shipping Details (DHL & GIA) -->
      <div
        v-if="order.dhl_waybill_number || order.gia_url"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t.shippingDetails }}
          </h2>
        </div>

        <div class="p-4 sm:p-6 space-y-4">
          <!-- DHL Tracking -->
          <div v-if="order.dhl_waybill_number">
            <p class="text-sm text-gray-600 mb-2">{{ t.dhlWaybillNumber }}</p>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <p class="font-mono text-lg font-medium text-gray-900">
                {{ order.dhl_waybill_number }}
              </p>
              <NuxtLink
                to="https://www.estafeta.com/en/rastrear-envio?rastreo=true"
                external
                target="_blank"
                class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {{ t.trackWithDHL }}
              </NuxtLink>
            </div>
          </div>

          <!-- GIA Document -->
          <div v-if="order.gia_url" class="pt-4 border-t border-gray-100">
            <p class="text-sm text-gray-600 mb-3">
              {{ t.giaDocumentDescription }}
            </p>
            <NuxtLink
              :to="order.gia_url"
              external
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {{ t.downloadGIA }}
            </NuxtLink>
            <p v-if="order.gia_filename" class="text-xs text-gray-500 mt-2">
              {{ order.gia_filename }}
            </p>
          </div>

          <!-- Delivery Timeline -->
          <div
            v-if="order.shipped_at || order.estimated_delivery_date"
            class="pt-4 border-t border-gray-100"
          >
            <div class="grid sm:grid-cols-2 gap-3">
              <div v-if="order.shipped_at">
                <p class="text-xs text-gray-500 uppercase tracking-wider">
                  {{ t.shippedOn }}
                </p>
                <p class="text-sm font-medium text-gray-900 mt-1">
                  {{ formatDate(order.shipped_at) }}
                </p>
              </div>
              <div v-if="order.estimated_delivery_date">
                <p class="text-xs text-gray-500 uppercase tracking-wider">
                  {{ t.estimatedDelivery }}
                </p>
                <p class="text-sm font-medium text-gray-900 mt-1">
                  {{ formatDate(order.estimated_delivery_date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery Address -->
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ t.deliveryAddress }}
      </h2>

      <!-- Edit Address Button - Show for editable statuses -->
      <NuxtLink
        v-if="canEditAddress"
        :to="`/app/orders/${order.id}/edit`"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <span class="hidden sm:inline">{{ t.editAddress }}</span>
        <span class="sm:hidden">{{ t.edit }}</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Address Content - Mobile optimized -->
  <div class="p-4 sm:p-6">
    <div class="space-y-3">
      <!-- Main Address -->
      <div>
        <p class="text-sm font-medium text-gray-900">
          {{ order.delivery_address.street }}
          {{ order.delivery_address.exterior_number
          }}<span v-if="order.delivery_address.interior_number"
            >, Int. {{ order.delivery_address.interior_number }}</span
          >
        </p>
        <p class="text-sm text-gray-600 mt-1">
          {{ order.delivery_address.colonia }}
        </p>
        <p class="text-sm text-gray-600">
          {{ order.delivery_address.municipio }},
          {{ order.delivery_address.estado }}
        </p>
        <p class="text-sm text-gray-600">
          C.P. {{ order.delivery_address.postal_code }}
        </p>
      </div>

      <!-- References - if exists -->
      <div
        v-if="order.delivery_address.referencias"
        class="pt-3 border-t border-gray-100"
      >
        <p
          class="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1"
        >
          {{ t.references }}
        </p>
        <p class="text-sm text-gray-700">
          {{ order.delivery_address.referencias }}
        </p>
      </div>
    </div>
  </div>
</div>

      <!-- Progress Timeline Component -->
      <OrderProgressTimeline :order="order" />
    </div>

    <!-- Modals -->
    <!-- Complete Order Modal -->
    <TransitionRoot as="template" :show="showCompleteOrderModal">
      <Dialog class="relative z-50" @close="showCompleteOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
              >
                <div class="text-center">
                  <div
                    class="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-6 h-6 text-green-600"
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
                  <DialogTitle
                    as="h3"
                    class="text-lg font-semibold text-gray-900 mb-2"
                  >
                    {{ t.confirmCompleteOrder }}
                  </DialogTitle>
                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.confirmCompleteOrderText }}
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click="showCompleteOrderModal = false"
                      class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {{ t.cancel }}
                    </button>
                    <button
                      @click="handleCompleteOrder"
                      :disabled="completingOrder"
                      class="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {{ completingOrder ? t.completing : t.confirmComplete }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Reopen Order Modal -->
    <TransitionRoot as="template" :show="showReopenOrderModal">
      <Dialog class="relative z-50" @close="showReopenOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
              >
                <div class="text-center">
                  <div
                    class="mx-auto w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <DialogTitle
                    as="h3"
                    class="text-lg font-semibold text-gray-900 mb-2"
                  >
                    {{ t.confirmReopenOrder }}
                  </DialogTitle>
                  <p class="text-sm text-gray-600 mb-6">
                    {{ t.confirmReopenOrderText }}
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click="showReopenOrderModal = false"
                      class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {{ t.cancel }}
                    </button>
                    <button
                      @click="handleReopenOrder"
                      :disabled="reopeningOrder"
                      class="flex-1 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      {{ reopeningOrder ? t.reopening : t.confirmReopen }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Order Modal -->
    <TransitionRoot as="template" :show="showDeleteOrderModal">
      <Dialog class="relative z-50" @close="showDeleteOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
              >
                <div class="text-center">
                  <div
                    class="mx-auto w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <DialogTitle
                    as="h3"
                    class="text-lg font-semibold text-gray-900 mb-2"
                  >
                    {{ t.confirmDeleteOrder }}
                  </DialogTitle>
                  <p class="text-sm text-gray-600 mb-2">
                    {{ t.confirmDeleteOrderText }}
                  </p>
                  <p class="text-xs text-red-600 bg-red-50 rounded-lg p-3 mb-6">
                    {{ t.deleteOrderWarning }}
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click="showDeleteOrderModal = false"
                      class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {{ t.cancel }}
                    </button>
                    <button
                      @click="handleDeleteOrder"
                      :disabled="deletingOrder"
                      class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {{ deletingOrder ? t.deleting : t.confirmDelete }}
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
import { ref, onMounted, computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// Import components
import SuccessBanner from "~/components/SuccessBanner.vue";
import OrderProgressTimeline from "~/components/OrderProgressTimeline.vue";

// Define page meta
definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const user = useUser().value;

// Use the language composable
const { t: createTranslations } = useLanguage();

// State
const order = ref(null);
const loading = ref(true);
const completingOrder = ref(false);
const showCompleteOrderModal = ref(false);

const showReopenOrderModal = ref(false);
const reopeningOrder = ref(false);
const showSuccessBanner = ref(false);
const bannerTrigger = ref("auto");

const showDeleteOrderModal = ref(false);
const deletingOrder = ref(false);

// Computed properties
const allItemsArrived = computed(() => {
  if (!order.value?.items || order.value.items.length === 0) return false;
  return order.value.items.every(item => item.arrived);
});

const canManageItems = computed(() => {
  // Can manage items if:
  // 1. Order is in collecting status, OR
  // 2. Order is NOT in collecting status but NOT all items have arrived
  if (order.value?.status === 'collecting') return true;
  if (order.value?.status === 'awaiting_packages' && !allItemsArrived.value) return true;
  return false;
});

// Translations
const translations = {
  // Status
  status: {
    es: "Estado",
    en: "Status",
  },
  currentStatusLabel: {
    es: "Estado Actual",
    en: "Current Status",
  },
  createdOn: {
    es: "Creado el",
    en: "Created on",
  },
  paymentDetails: {
    es: "Total Pagado",
    en: "Total Paid",
  },
  boxSize: {
    es: "Tamaño de caja",
    en: "Box size",
  },
  itemsProgress: {
    es: "Artículos",
    en: "Items",
  },
  items: {
    es: "artículos",
    en: "items",
  },
  orderItems: {
    es: "Productos del Envio",
    en: "Order Items",
  },
  deliveryAddress: {
    es: "Dirección de Entrega",
    en: "Delivery Address",
  },
  references: {
    es: "Referencias",
    en: "References",
  },
  // Actions
  needToCompleteOrder: {
    es: "¡Completa tu orden!",
    en: "Complete your order!",
  },
  needToCompleteOrderText: {
    es: "Has agregado productos pero aún no has completado la orden. Complétala para empezar el rastreo.",
    en: "You've added products but haven't completed the order yet. Complete it to start tracking.",
  },
  addMoreItems: {
    es: "Agregar o quitar productos",
    en: "Add or Remove Products",
  },
  addItemsToOrder: {
    es: "Gestionar artículos de tu envío",
    en: "Manage Items in Your Shipment",
  },
  addItemsDescription: {
    es: "Agrega los productos que nos enviaste y quieres incluir en tu envio.",
    en: "Add products you've purchased and want to include in the shipment.",
  },
  addItems: {
    es: "Agregar Artículos",
    en: "Add Items",
  },
  completeOrder: {
    es: "Completar Orden",
    en: "Complete Order",
  },
  completing: {
    es: "Completando...",
    en: "Completing...",
  },
  editOrder: {
    es: "Editar Orden",
    en: "Edit Order",
  },
  needToMakeChanges: {
    es: "¿Necesitas hacer cambios?",
    en: "Need to make changes?",
  },
  needToMakeChangesText: {
    es: "Puedes reabrir tu caja para agregar o eliminar artículos y editar tu dirección de entrega.",
    en: "You can reopen your box to add or remove items and edit your delivery address.",
  },
  reopenOrder: {
    es: "Reabrir Orden",
    en: "Reopen Order",
  },
  reopening: {
    es: "Reabriendo...",
    en: "Reopening...",
  },
  // Payment
  paymentRequired: {
    es: "Pago pendiente",
    en: "Payment required",
  },
  paymentRequiredText: {
    es: "Tu paquete ha sido entregado. Por favor completa el pago para finalizar tu orden.",
    en: "Your package has been delivered. Please complete payment to finalize your order.",
  },
  payNow: {
    es: "Pagar ahora",
    en: "Pay now",
  },
  // Items
  noItemsYet: {
    es: "No hay artículos todavía",
    en: "No items yet",
  },
  startAddingItems: {
    es: "Comienza agregando los productos que compraste.",
    en: "Start by adding products you purchased.",
  },
  quantity: {
    es: "Cantidad",
    en: "Quantity",
  },
  receipt: {
    es: "Recibo",
    en: "Receipt",
  },
  inTransit: {
    es: "En tránsito",
    en: "In transit",
  },
  arrived: {
    es: "Llegó",
    en: "Arrived",
  },
  // Modals
  confirmCompleteOrder: {
    es: "¿Completar orden?",
    en: "Complete order?",
  },
  confirmCompleteOrderText: {
    es: "Una vez completada, te notificaremos cuando lleguen todos tus paquetes.",
    en: "Once completed, we'll notify you when all your packages arrive.",
  },
  confirmComplete: {
    es: "Sí, completar",
    en: "Yes, complete",
  },
  cancel: {
    es: "Cancelar",
    en: "Cancel",
  },
  confirmDeleteTitle: {
    es: "¿Eliminar artículo?",
    en: "Delete item?",
  },
  confirmDeleteText: {
    es: "Esta acción no se puede deshacer.",
    en: "This action cannot be undone.",
  },
  confirmDelete: {
    es: "Eliminar",
    en: "Delete",
  },
  confirmReopenOrder: {
    es: "¿Reabrir orden?",
    en: "Reopen order?",
  },
  confirmReopenOrderText: {
    es: "Podrás agregar, eliminar o editar artículos. Tendrás que completar la orden nuevamente.",
    en: "You'll be able to add, remove, or edit items. You'll need to complete the order again.",
  },
  confirmReopen: {
    es: "Sí, reabrir",
    en: "Yes, reopen",
  },
  // Messages
  itemDeletedSuccess: {
    es: "Artículo eliminado",
    en: "Item deleted",
  },
  orderCompletedSuccess: {
    es: "¡Orden completada! Te notificaremos cuando lleguen tus paquetes.",
    en: "Order completed! We'll notify you when your packages arrive.",
  },
  orderReopenedSuccess: {
    es: "Caja reabierta exitosamente",
    en: "Box reopened successfully",
  },
  errorDeletingItem: {
    es: "Error al eliminar el artículo",
    en: "Error deleting item",
  },
  errorCompletingOrder: {
    es: "Error al completar la orden",
    en: "Error completing order",
  },
  errorReopeningOrder: {
    es: "Error al reabrir la orden",
    en: "Error reopening order",
  },
  errorLoadingOrder: {
    es: "Error al cargar la orden",
    en: "Error loading order",
  },
  loadingOrder: {
    es: "Cargando detalles de la orden...",
    en: "Loading order details...",
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
  // Box size translations
  "extra-small": {
    es: "Extra Pequeña",
    en: "Extra Small",
  },
  small: {
    es: "Pequeña",
    en: "Small",
  },
  medium: {
    es: "Mediana",
    en: "Medium",
  },
  large: {
    es: "Grande",
    en: "Large",
  },
  "extra-large": {
    es: "Extra Grande",
    en: "Extra Large",
  },

  deleteOrder: {
    es: "Eliminar orden",
    en: "Delete order",
  },
  confirmDeleteOrder: {
    es: "¿Eliminar esta orden?",
    en: "Delete this order?",
  },
  confirmDeleteOrderText: {
    es: "Esta acción eliminará permanentemente esta orden y todos sus productos asociados.",
    en: "This will permanently delete this order and all associated items.",
  },
  deleteOrderWarning: {
    es: "⚠️ Esta acción no se puede deshacer. Todos los datos se perderán permanentemente.",
    en: "⚠️ This action cannot be undone. All data will be permanently lost.",
  },
  deleting: {
    es: "Eliminando...",
    en: "Deleting...",
  },
  orderDeletedSuccess: {
    es: "Orden eliminada exitosamente",
    en: "Order deleted successfully",
  },
  errorDeletingOrder: {
    es: "Error al eliminar la orden",
    en: "Error deleting order",
  },
  shippingDetails: {
    es: "Información de Envío",
    en: "Shipping Information",
  },
  dhlWaybillNumber: {
    es: "Número de guía",
    en: "Waybill Number",
  },
  trackWithDHL: {
    es: "Rastrear con Estafeta",
    en: "Track with Estafeta",
  },
  giaDocument: {
    es: "Documento GIA",
    en: "GIA Document",
  },
  giaDocumentDescription: {
    es: "Tu documento GIA (Guía de Importación Aduanal) está disponible para descarga:",
    en: "Your GIA document (Customs Import Guide) is available for download:",
  },
  downloadGIA: {
    es: "Descargar GIA",
    en: "Download GIA",
  },
  shippedOn: {
    es: "Enviado",
    en: "Shipped",
  },
  estimatedDelivery: {
    es: "Entrega estimada",
    en: "Estimated Delivery",
  },
  manage: {
    es: "Gestionar",
    en: "Manage",
  },
  manageItems: {
    es: "Gestionar artículos",
    en: "Manage items",
  },
  edit: {
    es: "Editar",
    en: "Edit",
  },
  editAddress: {
    es: "Editar dirección",
    en: "Edit address",
  },
  addFirstItem: {
    es: "Agregar primer artículo",
    en: "Add first item",
  },
  collectingNoItemsTitle: {
    es: "Gestionar artículos de tu envío",
    en: "Manage Items in Your Shipment",
  },
  collectingNoItemsDescription: {
    es: "Agrega los productos que nos enviaste y quieres incluir en tu envio.",
    en: "Add products you've purchased and want to include in the shipment.",
  },
  collectingWithItemsTitle: {
    es: "¡Completa tu orden!",
    en: "Complete your order!",
  },
  collectingWithItemsDescription: {
    es: "Has agregado productos pero aún no has completado la orden. Complétala para empezar el rastreo.",
    en: "You've added products but haven't completed the order yet. Complete it to start tracking.",
  },
  awaitingPackagesTitle: {
    es: "Esperando Paquetes",
    en: "Awaiting Packages",
  },
  awaitingPackagesDescription: {
    es: "Tu orden está completa. Estamos esperando que tus paquetes lleguen a nuestro almacén en San Diego.",
    en: "Your order is complete. We're waiting for your packages to arrive at our San Diego warehouse.",
  },
  packagesCompleteTitle: {
    es: "¡Todos los paquetes han llegado!",
    en: "All Packages Have Arrived!",
  },
  packagesCompleteDescription: {
    es: "Excelente noticia, todos tus paquetes están en nuestro almacén. Estamos preparando tu envío.",
    en: "Great news, all your packages are at our warehouse. We're preparing your shipment.",
  },
  processingTitle: {
    es: "Cruzando la Frontera",
    en: "Crossing the Border",
  },
  processingDescription: {
    es: "Tu paquete está en tránsito desde USA a México. Una vez que llegue a nuestro centro de distribución, lo enviaremos directamente a tu dirección.",
    en: "Your package is in transit from the USA to Mexico. Once it arrives at our distribution center, we'll ship it directly to your address.",
  },
  shippedTitle: {
    es: "¡En Camino!",
    en: "On Its Way!",
  },
  shippedDescription: {
    es: "Tu paquete ha sido enviado y está en camino a tu dirección en México.",
    en: "Your package has been shipped and is on its way to your address in Mexico.",
  },
  deliveredTitle: {
    es: "¡Entregado!",
    en: "Delivered!",
  },
  deliveredDescription: {
    es: "Tu paquete ha sido entregado exitosamente. ¡Esperamos que disfrutes tus productos!",
    en: "Your package has been delivered successfully. We hope you enjoy your products!",
  },
  awaitingPaymentTitle: {
    es: "Pago Pendiente",
    en: "Payment Required",
  },
  awaitingPaymentDescription: {
    es: "Tu paquete ha sido entregado. Por favor completa el pago para finalizar tu orden.",
    en: "Your package has been delivered. Please complete payment to finalize your order.",
  },
  paidTitle: {
    es: "¡Pago Completado!",
    en: "Payment Complete!",
  },
  paidDescription: {
    es: "Gracias por tu pago. Tu orden está completamente finalizada.",
    en: "Thank you for your payment. Your order is fully complete.",
  },
  cancelledTitle: {
    es: "Orden Cancelada",
    en: "Order Cancelled",
  },
  cancelledDescription: {
    es: "Esta orden ha sido cancelada. Si tienes preguntas, por favor contáctanos.",
    en: "This order has been cancelled. If you have questions, please contact us.",
  },
  preparing: {
    es: "Preparando",
    en: "Preparing",
  },
  inProgress: {
    es: "En Progreso",
    en: "In Progress",
  },
  completed: {
    es: "Completado",
    en: "Completed",
  },
  paymentComplete: {
    es: "Pago Completo",
    en: "Payment Complete",
  },
  amountPaid: {
    es: "Monto Pagado",
    en: "Amount Paid",
  },
  estimatedArrival: {
    es: "Llegada estimada",
    en: "Estimated arrival",
  },
  trackShipment: {
    es: "Rastrear Envío",
    en: "Track Shipment",
  },
  // NEW: Delivery date translations
  expectedDelivery: {
    es: "Entrega esperada",
    en: "Expected Delivery",
  },
  expectedToday: {
    es: "¡Se espera hoy!",
    en: "Expected today!",
  },
  arrivedAt: {
    es: "Llegó el",
    en: "Arrived on",
  },
  daysOverdue: {
    es: "días de retraso",
    en: "days overdue",
  },
  dayOverdue: {
    es: "día de retraso",
    en: "day overdue",
  },
  daysAway: {
    es: "días restantes",
    en: "days away",
  },
  dayAway: {
    es: "día restante",
    en: "day away",
  },
  allItemsReceived: {
    es: "Todos los artículos recibidos",
    en: "All items received",
  },
  editAddress: {
    es: 'Editar Dirección',
    en: 'Edit Address'
  },
  edit: {
    es: 'Editar',
    en: 'Edit'
  }
};

// Get reactive translations
const t = createTranslations(translations);

// Methods
const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/orders/${route.params.id}`);
    order.value = response.data;

    // Show banner for certain statuses if not dismissed
    const showBannerStatuses = [
      "awaiting_packages",
    ];

    if (showBannerStatuses.includes(order.value?.status)) {
      // Check if banner was dismissed for this status
      if (
        !localStorage.getItem(
          `order-${order.value.id}-${order.value.status}-dismissed`
        )
      ) {
        // For awaiting_packages with completed_at, check if it's the first time showing confetti
        if (
          order.value.status === "awaiting_packages" &&
          order.value.completed_at
        ) {
          // Check if confetti has been shown for this order completion
          const confettiKey = `order-${order.value.id}-confetti-shown`;
          const hasShownConfetti = localStorage.getItem(confettiKey);

          if (!hasShownConfetti) {
            bannerTrigger.value = "just_completed";
            // Mark that confetti has been shown for this order
            localStorage.setItem(confettiKey, "true");
          } else {
            bannerTrigger.value = "auto";
          }
        } else {
          bannerTrigger.value = "auto";
        }
        showSuccessBanner.value = true;
      }
    }

    // Check if coming from items page after completion
    if (
      route.query.completed === "true" &&
      order.value?.status === "awaiting_packages"
    ) {
      const confettiKey = `order-${order.value.id}-confetti-shown`;
      const hasShownConfetti = localStorage.getItem(confettiKey);

      if (!hasShownConfetti) {
        bannerTrigger.value = "just_completed";
        showSuccessBanner.value = true;
        localStorage.setItem(confettiKey, "true");
      }

      // Remove the query parameter from URL to prevent re-triggering on refresh
      router.replace({
        path: route.path,
        query: {},
      });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error(t.value.errorLoadingOrder);
  } finally {
    loading.value = false;
  }
};

const dismissSuccessBanner = () => {
  showSuccessBanner.value = false;
  // Remember that user dismissed the banner for this specific status
  localStorage.setItem(
    `order-${order.value.id}-${order.value.status}-dismissed`,
    "true"
  );
};

const canEditAddress = computed(() => {
  if (!order.value) return false
  const editableStatuses = ['collecting', 'awaiting_packages', 'packages_complete']
  return editableStatuses.includes(order.value.status)
})

const handleCompleteOrder = async () => {
  completingOrder.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}/complete`, {
      method: "PUT",
    });

    $toast.success(t.value.orderCompletedSuccess, {
      duration: 6000,
    });

    showCompleteOrderModal.value = false;
    await fetchOrder();

    // Show success banner with confetti after completion
    bannerTrigger.value = "just_completed";
    showSuccessBanner.value = true;
  } catch (error) {
    console.error("Error completing order:", error);
    $toast.error(error.data?.message || t.value.errorCompletingOrder);
  } finally {
    completingOrder.value = false;
  }
};

const handleReopenOrder = async () => {
  reopeningOrder.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}/reopen`, {
      method: "PUT",
    });

    $toast.success(t.value.orderReopenedSuccess);
    showReopenOrderModal.value = false;

    // Redirect to add items page
    return await navigateTo(`/app/orders/${order.value.id}/items`);
  } catch (error) {
    console.error("Error reopening order:", error);
    $toast.error(error.data?.message || t.value.errorReopeningOrder);
  } finally {
    reopeningOrder.value = false;
  }
};

// Status helper methods - Using your Tailwind config colors
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
  if (!date) return "";
  const d = new Date(date);
  const locale = user?.preferred_language === "es" ? "es-MX" : "en-US";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// NEW: Delivery date helper methods
const formatDeliveryDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const locale = user?.preferred_language === "es" ? "es-MX" : "en-US";
  
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getDeliveryStatus = (dateString) => {
  if (!dateString) return null;
  
  const deliveryDate = new Date(dateString);
  const today = new Date();
  
  // Reset time parts for accurate day comparison
  deliveryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = deliveryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays <= 3) return 'soon';
  return 'future';
};

const getDaysUntilDelivery = (dateString) => {
  if (!dateString) return "";
  
  const deliveryDate = new Date(dateString);
  const today = new Date();
  
  // Reset time parts for accurate day comparison
  deliveryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = deliveryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return absDays === 1 
      ? `1 ${t.value.dayOverdue}` 
      : `${absDays} ${t.value.daysOverdue}`;
  }
  
  if (diffDays === 0) return t.value.expectedToday;
  
  return diffDays === 1 
    ? `1 ${t.value.dayAway}` 
    : `${diffDays} ${t.value.daysAway}`;
};

const handleDeleteOrder = async () => {
  deletingOrder.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}`, {
      method: "DELETE",
    });

    $toast.success(t.value.orderDeletedSuccess);
    showDeleteOrderModal.value = false;

    // Redirect to orders list
    return await navigateTo("/app/orders");
  } catch (error) {
    console.error("Error deleting order:", error);
    $toast.error(error.data?.message || t.value.errorDeletingOrder);
  } finally {
    deletingOrder.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchOrder();
});
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation for status indicators */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

/* Smooth transitions for interactive elements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover states */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.hover\:text-primary-600:hover {
  color: var(--primary-600, #2563eb);
}

.hover\:text-primary-700:hover {
  color: var(--primary-700, #1d4ed8);
}

/* Focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--primary-600, #2563eb);
  outline-offset: 2px;
}
</style>