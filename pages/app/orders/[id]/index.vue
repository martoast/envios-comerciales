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
                {{ order?.order_number }}
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
              v-if="order?.status === 'collecting'"
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
        <p class="mt-4 text-sm text-gray-600">Loading order details...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div
      v-else-if="order"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
    >
      <!-- Success Banner (New Order) -->
      <div
        v-if="isNewOrder"
        class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3"
      >
        <svg
          class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
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
        <div>
          <h3 class="font-medium text-green-900">
            {{ t.orderCreatedSuccess }}
          </h3>
          <p class="text-sm text-green-700 mt-1">{{ t.orderCreatedMessage }}</p>
        </div>
      </div>

      <!-- Key Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Total Paid -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-600">{{ t.paymentDetails }}</p>
            <div
              class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p class="text-2xl font-bold text-gray-900">
            ${{ Number(order.amount_paid).toLocaleString() }}
            {{ order.currency?.toUpperCase() }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ t.boxSize }}: {{ getBoxSizeLabel(order.box_size) }}
          </p>
        </div>

        <!-- Items Count -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-600">{{ t.itemsProgress }}</p>
            <div
              class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-primary-600"
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
          </div>
          <p class="text-2xl font-bold text-gray-900">
            {{ order.items?.length || 0 }}
          </p>
          <p class="text-xs text-gray-500 mt-1">{{ t.items }}</p>
        </div>

        <!-- Order Status -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-gray-600">{{ t.status }}</p>
            <div
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center',
                getStatusIconBg(order.status),
              ]"
            >
              <svg
                v-if="order.status === 'shipped'"
                class="w-4 h-4"
                :class="getStatusIconColor(order.status)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <svg
                v-else-if="order.status === 'delivered'"
                class="w-4 h-4"
                :class="getStatusIconColor(order.status)"
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
              <svg
                v-else-if="order.status === 'paid'"
                class="w-4 h-4"
                :class="getStatusIconColor(order.status)"
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
              <svg
                v-else-if="
                  order.status === 'awaiting_packages' ||
                  order.status === 'packages_complete'
                "
                class="w-4 h-4"
                :class="getStatusIconColor(order.status)"
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
              <svg
                v-else
                class="w-4 h-4"
                :class="getStatusIconColor(order.status)"
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
            </div>
          </div>
          <p class="text-2xl font-bold text-gray-900">
            {{ getStatusLabel(order.status) }}
          </p>
          <!-- Show contextual info based on status -->
          <div
            v-if="
              order.status === 'awaiting_packages' ||
              order.status === 'packages_complete'
            "
            class="mt-2"
          >
            <p class="text-xs text-gray-500">
              {{ arrivedCount }}/{{ order.items?.length || 0 }}
              {{ t.itemsArrived }}
            </p>
          </div>
          <p
            v-else-if="order.status === 'shipped'"
            class="text-xs text-gray-500 mt-1"
          >
            {{ t.shippedDate }}: {{ formatDate(order.shipped_at) }}
          </p>
          <p
            v-else-if="order.status === 'delivered'"
            class="text-xs text-gray-500 mt-1"
          >
            {{ t.deliveredDate }}: {{ formatDate(order.delivered_at) }}
          </p>
          <p
            v-else-if="order.status === 'collecting'"
            class="text-xs text-gray-500 mt-1"
          >
            {{ t.createdOn }}: {{ formatDate(order.created_at) }}
          </p>
        </div>
      </div>

      <!-- Delivery Address -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
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
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t.deliveryAddress }}
          </h2>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
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
          </div>
          <div v-if="order.delivery_address.referencias">
            <p class="text-sm font-medium text-gray-900 mb-1">
              {{ t.references }}
            </p>
            <p class="text-sm text-gray-600">
              {{ order.delivery_address.referencias }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Banners -->
      <!-- Add Items CTA (Collecting Status) -->
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
            <h3 class="text-lg font-semibold">{{ t.addItemsToOrder }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.addItemsDescription }}
            </p>
          </div>
          <NuxtLink
            :to="`/app/orders/${order.id}/add-items`"
            class="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {{ t.addItems }}
          </NuxtLink>
        </div>
      </div>

      <!-- Complete Order Banner (Collecting Status with Items) -->
      <div
        v-if="order.status === 'collecting' && order.items?.length > 0"
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
            <h3 class="text-lg font-semibold">{{ t.readyToShip }}</h3>
            <p class="text-sm text-white/90 mt-1">{{ t.readyToShipText }}</p>
          </div>
          <button
            @click="showCompleteOrderModal = true"
            :disabled="completingOrder"
            class="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {{ completingOrder ? t.completing : t.completeOrder }}
          </button>
        </div>
      </div>

      <!-- Reopen Order Banner (Awaiting Packages) -->
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-amber-900">
              {{ t.needToMakeChanges }}
            </h3>
            <p class="text-sm text-amber-700 mt-1">
              {{ t.needToMakeChangesText }}
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

      <!-- Items List -->
      <div class="divide-y divide-gray-100">
        <div
          v-for="item in order.items"
          :key="item.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between gap-4">
            <!-- Item Info -->
            <div class="flex-1 min-w-0">
              <!-- Product name with conditional link -->
              <a
                v-if="item.product_url"
                :href="item.product_url"
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
              </a>
              <p v-else class="text-sm font-medium text-gray-900 line-clamp-2">
                {{ item.product_name }}
              </p>

              <!-- Quantity and other info -->
              <div class="flex items-center gap-3 mt-1">
                <p class="text-sm text-gray-500">
                  {{ t.quantity }}: {{ item.quantity }}
                </p>

                <!-- Proof of Purchase Link -->
                <a
                  v-if="item.proof_of_purchase_url"
                  :href="item.proof_of_purchase_url"
                  target="_blank"
                  class="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {{ t.receipt }}
                </a>
              </div>

              <!-- Show file details on hover/click -->
              <div
                v-if="item.proof_of_purchase_filename"
                class="text-xs text-gray-500 mt-1"
              >
                {{ item.proof_of_purchase_filename }}
              </div>
            </div>

            <!-- Delete Button -->
            <button
              v-if="order.status === 'collecting'"
              @click="selectedItemToDelete = item"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
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

    <!-- Delete Item Modal -->
    <TransitionRoot as="template" :show="!!selectedItemToDelete">
      <Dialog class="relative z-50" @close="selectedItemToDelete = null">
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
                    {{ t.confirmDeleteTitle }}
                  </DialogTitle>
                  <p class="text-sm text-gray-600 mb-3">
                    {{ t.confirmDeleteText }}
                  </p>
                  <p
                    v-if="selectedItemToDelete"
                    class="text-sm font-medium text-gray-900 mb-6 line-clamp-2"
                  >
                    {{
                      selectedItemToDelete.product_name ||
                      formatProductUrl(selectedItemToDelete.product_url)
                    }}
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click="selectedItemToDelete = null"
                      class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {{ t.cancel }}
                    </button>
                    <button
                      @click="handleDeleteItem(selectedItemToDelete.id)"
                      class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {{ t.confirmDelete }}
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
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// Define page meta
definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const user = useUser().value;

// Use the language composable
const { t: createTranslations } = useLanguage();

// State
const order = ref(null);
const loading = ref(true);
const completingOrder = ref(false);
const showCompleteOrderModal = ref(false);
const selectedItemToDelete = ref(null);
const showDeleteOrderModal = ref(false);
const deletingOrder = ref(false);
const showReopenOrderModal = ref(false);
const reopeningOrder = ref(false);

// Translations
const translations = {
  status: {
    es: "Estado",
    en: "Status",
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
  declaredValue: {
    es: "Valor declarado",
    en: "Declared value",
  },
  iva: {
    es: "IVA (16%)",
    en: "VAT (16%)",
  },
  ruralSurcharge: {
    es: "Cargo rural",
    en: "Rural surcharge",
  },
  itemsProgress: {
    es: "Artículos",
    en: "Items",
  },
  items: {
    es: "artículos",
    en: "items",
  },
  arrived: {
    es: "En nuestro almacén",
    en: "At our warehouse",
  },
  inTransit: {
    es: "En Tránsito",
    en: "In Transit",
  },
  deliveryAddress: {
    es: "Dirección de Entrega",
    en: "Delivery Address",
  },
  references: {
    es: "Referencias",
    en: "References",
  },
  orderCreatedSuccess: {
    es: "¡Tu orden ha sido creada exitosamente!",
    en: "Your order has been created successfully!",
  },
  orderCreatedMessage: {
    es: "Ya puedes comenzar a agregar los productos que compraste.",
    en: "You can now start adding products you've purchased.",
  },
  addItemsToOrder: {
    es: "Agregar Artículos a tu Orden",
    en: "Add Items to Your Order",
  },
  addItemsDescription: {
    es: "Agrega los productos que compraste y están en camino.",
    en: "Add products you've purchased that are on their way.",
  },
  addItems: {
    es: "Agregar Artículos",
    en: "Add Items",
  },
  orderItems: {
    es: "Artículos de la Orden",
    en: "Order Items",
  },
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
  price: {
    es: "Precio",
    en: "Price",
  },
  total: {
    es: "Total",
    en: "Total",
  },
  deleteItem: {
    es: "Eliminar artículo",
    en: "Delete item",
  },
  readyToShip: {
    es: "¿Listo para enviar?",
    en: "Ready to ship?",
  },
  readyToShipText: {
    es: "Completa tu caja y te notificaremos cuando lleguen tus paquetes.",
    en: "Complete your box and we'll notify you when your packages arrive.",
  },
  completeOrder: {
    es: "Completar Caja",
    en: "Complete Box",
  },
  completing: {
    es: "Completando...",
    en: "Completing...",
  },
  itemDeletedSuccess: {
    es: "Artículo eliminado",
    en: "Item deleted",
  },
  orderCompletedSuccess: {
    es: "¡Orden completada! Te notificaremos cuando lleguen tus paquetes.",
    en: "Order completed! We'll notify you when your packages arrive.",
  },
  errorDeletingItem: {
    es: "Error al eliminar el artículo",
    en: "Error deleting item",
  },
  errorCompletingOrder: {
    es: "Error al completar la orden",
    en: "Error completing order",
  },
  confirmDelete: {
    es: "Eliminar",
    en: "Delete",
  },
  editOrder: {
    es: "Editar Orden",
    en: "Edit Order",
  },
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
  deleteOrder: {
    es: "Eliminar",
    en: "Delete",
  },
  confirmDeleteOrderTitle: {
    es: "¿Eliminar orden?",
    en: "Delete order?",
  },
  confirmDeleteOrderText: {
    es: "Esta acción no se puede deshacer. La orden y todos sus artículos serán eliminados permanentemente.",
    en: "This action cannot be undone. The order and all its items will be permanently deleted.",
  },
  confirmDeleteOrder: {
    es: "Sí, eliminar orden",
    en: "Yes, delete order",
  },
  deleting: {
    es: "Eliminando...",
    en: "Deleting...",
  },
  orderContains: {
    es: "Esta orden contiene",
    en: "This order contains",
  },
  item: {
    es: "artículo",
    en: "item",
  },
  orderDeletedSuccess: {
    es: "Orden eliminada exitosamente",
    en: "Order deleted successfully",
  },
  errorDeletingOrder: {
    es: "Error al eliminar la orden",
    en: "Error deleting order",
  },
  needToMakeChanges: {
    es: "¿Necesitas hacer cambios?",
    en: "Need to make changes?",
  },
  needToMakeChangesText: {
    es: "Puedes reabrir tu caja para agregar o eliminar artículos.",
    en: "You can reopen your box to add or remove items.",
  },
  reopenOrder: {
    es: "Reabrir Orden",
    en: "Reopen Order",
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
  reopening: {
    es: "Reabriendo...",
    en: "Reopening...",
  },
  orderReopenedSuccess: {
    es: "Caja reabierta exitosamente",
    en: "Box reopened successfully",
  },
  errorReopeningOrder: {
    es: "Error al reabrir la orden",
    en: "Error reopening order",
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
  // Box size translations
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
  extra_large: {
    es: "Extra Grande",
    en: "Extra Large",
  },
  itemsArrived: {
    es: "artículos en almacén",
    en: "items at warehouse",
  },
  trackingNumber: {
    es: "Guía",
    en: "Tracking",
  },
  shippedDate: {
    es: "Enviado",
    en: "Shipped",
  },
  deliveredDate: {
    es: "Entregado",
    en: "Delivered",
  },
  receipt: {
    es: "Recibo",
    en: "Receipt",
  },
  viewReceipt: {
    es: "Ver Recibo",
    en: "View Receipt",
  },
};

// Get reactive translations
const t = createTranslations(translations);

// Computed
const arrivedCount = computed(() => {
  return order.value?.items?.filter((item) => item.arrived).length || 0;
});

const isNewOrder = computed(() => {
  // Check if order was created in the last 5 minutes
  if (!order.value?.created_at) return false;
  const createdAt = new Date(order.value.created_at);
  const now = new Date();
  const diffMinutes = (now - createdAt) / 1000 / 60;
  return diffMinutes < 1;
});

// Methods
const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/orders/${route.params.id}`);
    order.value = response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error(t.value.errorLoadingOrder || "Error loading order");
  } finally {
    loading.value = false;
  }
};

const handleDeleteItem = async (itemId) => {
  try {
    await $customFetch(`/orders/${order.value.id}/items/${itemId}`, {
      method: "DELETE",
    });

    $toast.success(t.value.itemDeletedSuccess);
    selectedItemToDelete.value = null;
    await fetchOrder();
  } catch (error) {
    console.error("Error deleting item:", error);
    $toast.error(t.value.errorDeletingItem);
  }
};

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

    // Refresh order
    await fetchOrder();
    return await navigateTo(`/app/orders/${order.value.id}/add-items`);
  } catch (error) {
    console.error("Error reopening order:", error);
    $toast.error(error.data?.message || t.value.errorReopeningOrder);
  } finally {
    reopeningOrder.value = false;
  }
};

const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-primary-100 text-primary-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-primary-100 text-primary-700",
    quote_sent: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    shipped: "bg-primary-100 text-primary-700",
    delivered: "bg-green-100 text-green-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusIconBg = (status) => {
  const colors = {
    collecting: "bg-primary-100",
    awaiting_packages: "bg-amber-100",
    packages_complete: "bg-primary-100",
    quote_sent: "bg-orange-100",
    paid: "bg-green-100",
    shipped: "bg-primary-100",
    delivered: "bg-green-100",
  };
  return colors[status] || "bg-gray-100";
};

const getStatusIconColor = (status) => {
  const colors = {
    collecting: "text-primary-600",
    awaiting_packages: "text-amber-600",
    packages_complete: "text-primary-600",
    quote_sent: "text-orange-600",
    paid: "text-green-600",
    shipped: "text-primary-600",
    delivered: "text-green-600",
  };
  return colors[status] || "text-gray-600";
};

const getStatusLabel = (status) => {
  return t.value[status] || status;
};

const getBoxSizeLabel = (size) => {
  return t.value[size] || size;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatProductUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace("www.", "");
    const pathParts = urlObj.pathname.split("/").filter(Boolean);

    // For Amazon URLs, try to get the product name
    if (domain.includes("amazon")) {
      const productIndex = pathParts.findIndex((part) => part.length > 20);
      if (productIndex > 0 && pathParts[productIndex - 1]) {
        return decodeURIComponent(
          pathParts[productIndex - 1].replace(/-/g, " ")
        );
      }
    }

    // For other URLs, return domain + shortened path
    return domain + (pathParts.length > 0 ? "/" + pathParts[0] + "..." : "");
  } catch {
    return url.substring(0, 40) + "...";
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
