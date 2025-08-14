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
        <p class="mt-4 text-sm text-gray-600">Loading order details...</p>
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
            :to="`/app/orders/${order.id}/items`"
            class="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {{ t.addItems }}
          </NuxtLink>
        </div>
      </div>

      <!-- Complete Order Banner (Collecting Status with Items) -->
      <div
        v-if="order.status === 'collecting' && order.items?.length > 0"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ t.needToCompleteOrder }}</h3>
            <p class="text-sm text-white/90 mt-1">
              {{ t.needToCompleteOrderText }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <NuxtLink
              :to="`/app/orders/${order.id}/items`"
              class="px-4 py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              {{ t.addMoreItems }}
            </NuxtLink>
            <button
              @click="showCompleteOrderModal = true"
              :disabled="completingOrder"
              class="px-6 py-2.5 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {{ completingOrder ? t.completing : t.completeOrder }}
            </button>
          </div>
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
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ t.orderItems }}
            </h2>
            <!-- Manage Items Button - Always visible if collecting status -->
            <NuxtLink
              v-if="order.status === 'collecting'"
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
                    <span class="hidden sm:inline">{{ t.arrived }}</span>
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
                  <a
                    v-if="item.proof_of_purchase_url"
                    :href="item.proof_of_purchase_url"
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
                  </a>
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
          <img
            src="/empty-box.svg"
            alt="empty box"
            class="w-12 h-12 mx-auto mb-3"
          />
          <p class="text-gray-500 text-sm sm:text-base">{{ t.noItemsYet }}</p>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            {{ t.startAddingItems }}
          </p>

          <!-- CTA Button when empty -->
          <NuxtLink
            v-if="order.status === 'collecting'"
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

      <!-- Delivery Address -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ t.deliveryAddress }}
            </h2>

            <!-- Edit Address Button - Only show in collecting status -->
            <NuxtLink
              v-if="order.status === 'collecting'"
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
import { ref, onMounted } from "vue";
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
  confirmDelete: {
    es: "Sí, eliminar",
    en: "Yes, delete",
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
      "packages_complete",
      "shipped",
      "delivered",
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
        query: {}, // Remove all query params, or you can keep others if needed
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

// Status helper methods
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

const getStatusLabel = (status) => {
  return t.value[status] || status;
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
