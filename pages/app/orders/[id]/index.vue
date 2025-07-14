<template>
  <section
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20"
  >
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between gap-3">
          <!-- Left Section: Back Button and Title -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <NuxtLink 
              to="/app/orders" 
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 truncate">
                {{ order?.order_name }}
              </h1>
              <div class="mt-1">
                <p class="text-sm text-gray-600 mb-3">{{ order?.order_number }}</p>
                <!-- Status Badge (Mobile) -->
                <span v-if="order" :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs',
                  getStatusColor(order.status)
                ]">
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Section: Status Badge (Desktop) and Actions -->
          <div class="flex items-center gap-2">
            <!-- Actions Dropdown (Mobile - Always visible) -->
            <Menu as="div" class="relative sm:hidden" v-if="order?.status === 'collecting'">
              <MenuButton
                class="inline-flex items-center justify-center p-2 text-gray-600 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-300"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
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
                  class="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <NuxtLink
                        :to="`/app/orders/${order.id}/edit`"
                        :class="[
                          active ? 'bg-gray-50' : '',
                          'group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors'
                        ]"
                      >
                        <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        {{ t.editOrder }}
                      </NuxtLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="showDeleteOrderModal = true"
                        :class="[
                          active ? 'bg-red-50' : '',
                          'group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors'
                        ]"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        {{ t.deleteOrder }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <!-- Action Buttons (Desktop) -->
            <div v-if="order?.status === 'collecting'" class="hidden sm:flex items-center gap-2">
              <NuxtLink
                :to="`/app/orders/${order.id}/edit`"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                {{ t.editOrder }}
              </NuxtLink>
              <button
                @click="showDeleteOrderModal = true"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 font-medium rounded-xl border border-red-300 hover:bg-red-50 transition-all duration-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                {{ t.deleteOrder }}
              </button>
            </div>
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

      <div v-else-if="order" class="space-y-6">
        <!-- New Order Welcome Banner -->
        <div
          v-if="isNewOrder"
          class="bg-green-50 rounded-2xl p-6 border border-green-200/50"
        >
          <div class="flex items-start gap-4">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-green-900 mb-1">
                {{ t.orderCreatedSuccess }}
              </h3>
              <p class="text-sm text-green-700">
                {{ t.orderCreatedMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Info Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Status Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <p
                  class="text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  {{ t.status }}
                </p>
                <p class="mt-1 text-lg font-bold text-gray-900">
                  {{ getStatusLabel(order.status) }}
                </p>
              </div>
              <div class="p-2 bg-gray-100 rounded-lg">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-sm text-gray-500">
              {{ t.createdOn }} {{ formatDate(order.created_at) }}
            </p>
          </div>

          <!-- Payment Details Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  {{ t.paymentDetails }}
                </p>
                <p class="mt-1 text-lg font-bold text-gray-900">
                  ${{ order.amount_paid }} {{ order.currency?.toUpperCase() }}
                </p>
              </div>
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">{{ t.boxSize }}:</span>
                <span class="font-medium capitalize">{{ order.box_size }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">{{ t.declaredValue }}:</span>
                <span class="font-medium">${{ order.declared_value }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">{{ t.iva }}:</span>
                <span class="font-medium">${{ order.iva_amount }}</span>
              </div>
              <div v-if="order.is_rural" class="flex justify-between">
                <span class="text-gray-500">{{ t.ruralSurcharge }}:</span>
                <span class="font-medium">${{ order.rural_surcharge || 20 }}</span>
              </div>
            </div>
          </div>

          <!-- Items Progress Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <p
                  class="text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  {{ t.itemsProgress }}
                </p>
                <p class="mt-1 text-lg font-bold text-gray-900">
                  {{ order.items?.length || 0 }} {{ t.items }}
                </p>
              </div>
              <div class="p-2 bg-primary-100 rounded-lg">
                <svg
                  class="w-5 h-5 text-primary-600"
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
            <div v-if="order.status === 'awaiting_packages'" class="mt-3">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-gray-600">{{ t.arrived }}</span>
                <span class="font-medium text-gray-900"
                  >{{ arrivedCount }}/{{ order.items?.length || 0 }}</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  :style="`width: ${order.arrival_progress || 0}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery Address Card -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <p
                class="text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                {{ t.deliveryAddress }}
              </p>
            </div>
            <div class="p-2 bg-green-100 rounded-lg">
              <svg
                class="w-5 h-5 text-green-600"
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
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ order.delivery_address.street }}
                {{ order.delivery_address.exterior_number }}
                <span v-if="order.delivery_address.interior_number">
                  Int. {{ order.delivery_address.interior_number }}
                </span>
              </p>
              <p class="text-sm text-gray-500">
                {{ order.delivery_address.colonia }}
              </p>
              <p class="text-sm text-gray-500">
                {{ order.delivery_address.municipio }}, {{ order.delivery_address.estado }}
              </p>
              <p class="text-sm text-gray-500">
                C.P. {{ order.delivery_address.postal_code }}
              </p>
            </div>
            <div v-if="order.delivery_address.referencias" class="sm:col-span-2">
              <p class="text-sm font-medium text-gray-600 mb-1">{{ t.references }}:</p>
              <p class="text-sm text-gray-500">{{ order.delivery_address.referencias }}</p>
            </div>
          </div>
        </div>

        <!-- Reopen Order Banner (only show if order is awaiting_packages) -->
        <div
          v-if="order.status === 'awaiting_packages'"
          class="bg-primary-50 rounded-2xl p-6 border border-primary-200/50"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h3 class="font-bold text-primary-900 mb-1">
                {{ t.needToMakeChanges }}
              </h3>
              <p class="text-sm text-primary-700">{{ t.needToMakeChangesText }}</p>
            </div>
            <button
              @click="showReopenOrderModal = true"
              class="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              {{ t.reopenOrder }}
            </button>
          </div>
        </div>

        <!-- Add Item Section (only show if order is collecting) -->
        <div
          v-if="order.status === 'collecting'"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">{{ t.addNewItem }}</h2>
            <button
              @click="showAddForm = !showAddForm"
              class="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                :class="[
                  'w-5 h-5 text-gray-600 transition-transform',
                  showAddForm ? 'rotate-45' : '',
                ]"
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
            </button>
          </div>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <form
              v-show="showAddForm || !isMobile"
              @submit.prevent="handleAddItem"
              class="space-y-4"
            >
              <!-- Product Name -->
              <div>
                <label
                  for="product_name"
                  class="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {{ t.productNameLabel }}
                </label>
                <input
                  v-model="itemForm.product_name"
                  type="text"
                  id="product_name"
                  :placeholder="t.productNamePlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <!-- Product URL -->
              <div>
                <label
                  for="product_url"
                  class="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {{ t.productUrlLabel }}
                </label>
                <input
                  v-model="itemForm.product_url"
                  type="url"
                  id="product_url"
                  :placeholder="t.productUrlPlaceholder"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <!-- Quantity and Price -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="quantity"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.quantityLabel }}
                  </label>
                  <input
                    v-model.number="itemForm.quantity"
                    type="number"
                    id="quantity"
                    min="1"
                    max="99"
                    :placeholder="t.quantityPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label
                    for="declared_value"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.priceLabel }}
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >$</span
                    >
                    <input
                      v-model.number="itemForm.declared_value"
                      type="number"
                      id="declared_value"
                      min="0.01"
                      max="9999.99"
                      step="0.01"
                      :placeholder="t.pricePlaceholder"
                      class="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Tracking Info (Optional) -->
              <div class="space-y-4 pt-2">
                <button
                  type="button"
                  @click="showTrackingFields = !showTrackingFields"
                  class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <svg
                    :class="[
                      'w-4 h-4 transition-transform',
                      showTrackingFields ? 'rotate-90' : '',
                    ]"
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
                  {{ t.addTrackingInfo }}
                </button>

                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <div
                    v-if="showTrackingFields"
                    class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div>
                      <label
                        for="tracking_number"
                        class="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        {{ t.trackingNumberLabel }}
                      </label>
                      <input
                        v-model="itemForm.tracking_number"
                        type="text"
                        id="tracking_number"
                        :placeholder="t.trackingNumberPlaceholder"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        for="carrier"
                        class="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        {{ t.carrierLabel }}
                      </label>
                      <select
                        v-model="itemForm.carrier"
                        id="carrier"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">{{ t.selectCarrier }}</option>
                        <option
                          v-for="(label, value) in carriers"
                          :key="value"
                          :value="value"
                        >
                          {{ label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  :disabled="addingItem"
                  class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <svg
                    v-if="addingItem"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
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
                  {{ addingItem ? t.addingItem : t.addItem }}
                </button>
              </div>
            </form>
          </Transition>
        </div>

        <!-- Complete Order Banner (only show if order is collecting and has items) -->
        <div
          v-if="order.status === 'collecting' && order.items?.length > 0"
          class="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200/50"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h3 class="font-bold text-primary-900 mb-1">
                {{ t.readyToShip }}
              </h3>
              <p class="text-sm text-primary-700">{{ t.readyToShipText }}</p>
            </div>
            <button
              @click="showCompleteOrderModal = true"
              :disabled="completingOrder"
              class="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {{ completingOrder ? t.completing : t.completeOrder }}
            </button>
          </div>
        </div>

        <!-- Items List - Improved Mobile First Design -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div class="px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">{{ t.orderItems }}</h2>
          </div>

          <!-- Empty State -->
          <div
            v-if="!order.items || order.items.length === 0"
            class="px-6 py-12 text-center"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4"
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
            <h3 class="text-base font-semibold text-gray-900 mb-1">
              {{ t.noItemsYet }}
            </h3>
            <p class="text-sm text-gray-500">{{ t.startAddingItems }}</p>
          </div>

          <!-- Items List - Clean Mobile Design -->
          <div v-else class="divide-y divide-gray-100">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <!-- Mobile Layout -->
              <div class="space-y-3">
                <!-- Top Row: Product Link and Delete Button -->
                <div class="flex items-start justify-between gap-3">
                  <a
                    :href="item.product_url"
                    target="_blank"
                    class="flex-1 group"
                  >
                    <div class="flex items-center gap-2">
                      <span
                        class="text-sm font-medium text-primary-600 group-hover:text-primary-700 group-hover:underline line-clamp-2"
                      >
                        {{ item.product_name }}
                      </span>
                    </div>
                  </a>

                  <!-- Delete button (only if order is collecting) -->
                  <button
                    v-if="order.status === 'collecting'"
                    @click="selectedItemToDelete = item"
                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                    :title="t.deleteItem"
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
                  </button>
                </div>

                <!-- Middle Row: Key Info -->
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-4">
                    <!-- Quantity -->
                    <div class="flex items-center gap-1.5">
                      <span class="text-gray-500">{{ t.quantity }}:</span>
                      <span class="font-medium text-gray-900">{{
                        item.quantity
                      }}</span>
                    </div>

                    <!-- Price -->
                    <div class="flex items-center gap-1.5">
                      <span class="text-gray-500">{{ t.price }}:</span>
                      <span class="font-medium text-gray-900"
                        >${{ item.declared_value }}</span
                      >
                    </div>
                  </div>

                  <!-- Status Badge -->
                  <span
                    v-if="item.arrived"
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                  >
                    {{ t.arrived }}
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                  >
                    {{ t.inTransit }}
                  </span>
                </div>

                <!-- Bottom Row: Additional Info -->
                <div
                  class="flex flex-wrap items-center gap-3 text-xs text-gray-500"
                >
                  <!-- Retailer -->
                  <span
                    v-if="item.retailer"
                    class="inline-flex items-center gap-1"
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {{ item.retailer }}
                  </span>

                  <!-- Tracking Info -->
                  <span
                    v-if="item.tracking_number"
                    class="inline-flex items-center gap-1"
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
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    {{ item.carrier_name || item.carrier || "Tracking" }}:
                    {{ item.tracking_number }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Order Modal -->
    <TransitionRoot as="template" :show="showCompleteOrderModal">
      <Dialog class="relative z-10" @close="showCompleteOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100"
                  >
                    <svg
                      class="size-6 text-primary-600"
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
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                      >{{ t.confirmCompleteOrder }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ t.confirmCompleteOrderText }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                    @click="handleCompleteOrder"
                    :disabled="completingOrder"
                  >
                    {{ completingOrder ? t.completing : t.confirmComplete }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="showCompleteOrderModal = false"
                  >
                    {{ t.cancel }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Item Modal -->
    <TransitionRoot as="template" :show="!!selectedItemToDelete">
      <Dialog class="relative z-10" @close="selectedItemToDelete = null">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100"
                  >
                    <svg
                      class="size-6 text-red-600"
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
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                      >{{ t.confirmDeleteTitle }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ t.confirmDeleteText }}
                      </p>
                      <p
                        v-if="selectedItemToDelete"
                        class="mt-2 text-sm font-medium text-gray-700"
                      >
                        {{
                          selectedItemToDelete.product_name ||
                          formatProductUrl(selectedItemToDelete.product_url)
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                    @click="handleDeleteItem(selectedItemToDelete.id)"
                  >
                    {{ t.confirmDelete }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="selectedItemToDelete = null"
                  >
                    {{ t.cancel }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Order Modal -->
    <TransitionRoot as="template" :show="showDeleteOrderModal">
      <Dialog class="relative z-10" @close="showDeleteOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100"
                  >
                    <svg
                      class="size-6 text-red-600"
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
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                      >{{ t.confirmDeleteOrderTitle }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ t.confirmDeleteOrderText }}
                      </p>
                      <p
                        v-if="order"
                        class="mt-3 text-sm font-medium text-gray-700"
                      >
                        {{ order.order_name }}
                      </p>
                      <p
                        v-if="order?.items?.length > 0"
                        class="mt-1 text-xs text-gray-500"
                      >
                        {{ t.orderContains }} {{ order.items.length }}
                        {{ order.items.length === 1 ? t.item : t.items }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                    @click="handleDeleteOrder"
                    :disabled="deletingOrder"
                  >
                    {{ deletingOrder ? t.deleting : t.confirmDeleteOrder }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="showDeleteOrderModal = false"
                  >
                    {{ t.cancel }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Reopen Order Modal -->
    <TransitionRoot as="template" :show="showReopenOrderModal">
      <Dialog class="relative z-10" @close="showReopenOrderModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100"
                  >
                    <svg
                      class="size-6 text-primary-600"
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
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                      >{{ t.confirmReopenOrder }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ t.confirmReopenOrderText }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                    @click="handleReopenOrder"
                    :disabled="reopeningOrder"
                  >
                    {{ reopeningOrder ? t.reopening : t.confirmReopen }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="showReopenOrderModal = false"
                  >
                    {{ t.cancel }}
                  </button>
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
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
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
  middleware: ['auth', 'customer']
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
const showAddForm = ref(false);
const showTrackingFields = ref(false);
const addingItem = ref(false);
const completingOrder = ref(false);
const isMobile = ref(false);
const showCompleteOrderModal = ref(false);
const selectedItemToDelete = ref(null);
const showDeleteOrderModal = ref(false);
const deletingOrder = ref(false);
const showReopenOrderModal = ref(false);
const reopeningOrder = ref(false);

// Form for new item
const itemForm = ref({
  product_name: "",
  product_url: "",
  quantity: 1,
  declared_value: "",
  tracking_number: "",
  carrier: "",
});

// Carriers
const carriers = {
  ups: "UPS",
  fedex: "FedEx",
  usps: "USPS",
  amazon: "Amazon",
  dhl: "DHL",
  other: "Other",
};

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
    es: "Detalles del Pago",
    en: "Payment Details",
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
    es: "Progreso de Artículos",
    en: "Items Progress",
  },
  items: {
    es: "artículos",
    en: "items",
  },
  arrived: {
    es: "Llegados",
    en: "Arrived",
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
    es: "Ya puedes comenzar a agregar los productos que comprarás. Tu caja ya está pagada y lista para recibir tus compras.",
    en: "You can now start adding products you'll purchase. Your box is already paid and ready to receive your shopping items.",
  },
  addNewItem: {
    es: "Agregar Nuevo Artículo",
    en: "Add New Item",
  },
  productUrlLabel: {
    es: "URL del Producto",
    en: "Product URL",
  },
  productUrlPlaceholder: {
    es: "https://www.amazon.com/...",
    en: "https://www.amazon.com/...",
  },
  quantityLabel: {
    es: "Cantidad",
    en: "Quantity",
  },
  quantityPlaceholder: {
    es: "1",
    en: "1",
  },
  priceLabel: {
    es: "Precio (USD)",
    en: "Price (USD)",
  },
  pricePlaceholder: {
    es: "0.00",
    en: "0.00",
  },
  addTrackingInfo: {
    es: "Agregar información de rastreo (opcional)",
    en: "Add tracking info (optional)",
  },
  trackingNumberLabel: {
    es: "Número de Rastreo",
    en: "Tracking Number",
  },
  trackingNumberPlaceholder: {
    es: "1Z999AA1234567890",
    en: "1Z999AA1234567890",
  },
  carrierLabel: {
    es: "Transportista",
    en: "Carrier",
  },
  selectCarrier: {
    es: "Selecciona transportista",
    en: "Select carrier",
  },
  addItem: {
    es: "Agregar Artículo",
    en: "Add Item",
  },
  addingItem: {
    es: "Agregando...",
    en: "Adding...",
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
    es: "Una vez que completes tu orden, te notificaremos cuando lleguen todos tus paquetes.",
    en: "Once you complete your order, we'll notify you when all your packages arrive.",
  },
  completeOrder: {
    es: "Completar Orden",
    en: "Complete Order",
  },
  completing: {
    es: "Completando...",
    en: "Completing...",
  },
  itemAddedSuccess: {
    es: "Artículo agregado exitosamente",
    en: "Item added successfully",
  },
  itemDeletedSuccess: {
    es: "Artículo eliminado",
    en: "Item deleted",
  },
  orderCompletedSuccess: {
    es: "¡Orden completada! Te notificaremos cuando lleguen tus paquetes.",
    en: "Order completed! We'll notify you when your packages arrive.",
  },
  errorAddingItem: {
    es: "Error al agregar el artículo",
    en: "Error adding item",
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
    es: "Editar",
    en: "Edit",
  },
  // Modal translations
  confirmCompleteOrder: {
    es: "¿Completar orden?",
    en: "Complete order?",
  },
  confirmCompleteOrderText: {
    es: "Una vez completada, no podrás agregar más artículos. Te notificaremos cuando lleguen todos tus paquetes.",
    en: "Once completed, you won't be able to add more items. We'll notify you when all your packages arrive.",
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
    es: "Esta acción no se puede deshacer. El artículo será eliminado permanentemente de tu orden.",
    en: "This action cannot be undone. The item will be permanently deleted from your order.",
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
    es: "Puedes reabrir tu orden para agregar o eliminar artículos antes de que lleguen los paquetes.",
    en: "You can reopen your order to add or remove items before packages arrive.",
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
    es: "Tu orden volverá al estado de recolección y podrás agregar, eliminar o editar artículos. Tendrás que completar la orden nuevamente cuando termines.",
    en: "Your order will return to collecting status and you can add, remove, or edit items. You'll need to complete the order again when finished.",
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
    es: "Orden reabierta exitosamente",
    en: "Order reopened successfully",
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
  productNameLabel: {
    es: "Nombre del Producto",
    en: "Product Name",
  },
  productNamePlaceholder: {
    es: "Ej: Cepillo de dientes eléctrico Oral-B",
    en: "Ex: Oral-B Electric Toothbrush",
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
  return diffMinutes < 5;
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

const handleAddItem = async () => {
  if (!itemForm.value.product_name || !itemForm.value.product_url || !itemForm.value.declared_value) return;

  addingItem.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}/items`, {
      method: "POST",
      body: itemForm.value,
    });

    $toast.success(t.value.itemAddedSuccess);

    // Reset form
    itemForm.value = {
      product_name: "",
      product_url: "",
      quantity: 1,
      declared_value: "",
      tracking_number: "",
      carrier: "",
    };
    showTrackingFields.value = false;
    showAddForm.value = false;

    // Refresh order
    await fetchOrder();
  } catch (error) {
    console.error("Error adding item:", error);
    $toast.error(error.data?.message || t.value.errorAddingItem);
  } finally {
    addingItem.value = false;
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

const handleDeleteOrder = async () => {
  deletingOrder.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}`, {
      method: "DELETE",
    });

    $toast.success(t.value.orderDeletedSuccess);
    showDeleteOrderModal.value = false;

    // Redirect to orders list after a short delay
    setTimeout(() => {
      navigateTo("/app/orders");
    }, 500);
  } catch (error) {
    console.error("Error deleting order:", error);
    $toast.error(error.data?.message || t.value.errorDeletingOrder);
  } finally {
    deletingOrder.value = false;
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
    awaiting_packages: "bg-yellow-100 text-yellow-700",
    packages_complete: "bg-purple-100 text-purple-700",
    quote_sent: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-gray-100 text-gray-700",
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

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
  showAddForm.value = !isMobile.value;
};

// Lifecycle
onMounted(() => {
  fetchOrder();
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
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
</style>