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
            <NuxtLink
              to="/app/admin/orders"
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
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {{ order?.order_name || t.loading }}
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                {{ order?.order_number }}
              </p>
            </div>
          </div>

          <!-- Status Badge -->
          <div v-if="order" class="flex items-center gap-3">
            <span
              :class="[
                'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium',
                getStatusColor(order.status),
              ]"
            >
              {{ getStatusLabel(order.status) }}
            </span>
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

      <!-- Order Content -->
      <div v-else-if="order" class="space-y-6">
        <!-- Quick Actions -->
        <div
          v-if="showQuickActions"
          class="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-6 animate-fadeIn"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-6 h-6 text-amber-600 mt-0.5"
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
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-amber-900">
                {{ t.actionRequired }}
              </h3>
              <p class="text-sm text-amber-700 mt-1">
                {{ getActionMessage() }}
              </p>
              <button
                v-if="order.status === 'packages_complete'"
                @click="showQuoteModal = true"
                class="mt-3 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-all"
              >
                {{ t.sendQuote }}
              </button>
              <button
                v-if="order.status === 'paid'"
                @click="showShipModal = true"
                class="mt-3 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-all"
              >
                {{ t.markAsShipped }}
              </button>
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Customer Info -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ t.customerInfo }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.name }}</p>
                <p class="font-medium text-gray-900">{{ order.user.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.email }}</p>
                <p class="font-medium text-gray-900">{{ order.user.email }}</p>
              </div>
              <div v-if="order.user.phone">
                <p class="text-sm text-gray-500">{{ t.phone }}</p>
                <p class="font-medium text-gray-900">{{ order.user.phone }}</p>
              </div>
              <NuxtLink
                :to="`/app/admin/customers/${order.user.id}`"
                class="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium mt-2"
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

          <!-- Order Details -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            style="animation-delay: 0.1s"
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
              {{ t.orderDetails }}
            </h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.created }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>
              <div v-if="order.completed_at">
                <p class="text-sm text-gray-500">{{ t.completedAt }}</p>
                <p class="font-medium text-gray-900">
                  {{ formatDate(order.completed_at) }}
                </p>
              </div>
              <div v-if="order.total_weight">
                <p class="text-sm text-gray-500">{{ t.totalWeight }}</p>
                <p class="font-medium text-gray-900">
                  {{ order.total_weight }} kg
                </p>
              </div>
              <div v-if="order.recommended_box_size">
                <p class="text-sm text-gray-500">{{ t.boxSize }}</p>
                <p class="font-medium text-gray-900 capitalize">
                  {{ order.recommended_box_size }}
                </p>
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
            style="animation-delay: 0.2s"
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
              {{ t.shippingInfo }}
            </h2>
            <div class="space-y-3">
              <div v-if="order.delivery_address">
                <p class="text-sm text-gray-500 mb-1">
                  {{ t.deliveryAddress }}
                </p>
                <div class="text-sm text-gray-900 space-y-1">
                  <p>
                    {{ order.delivery_address.street }}
                    {{ order.delivery_address.exterior_number }}
                  </p>
                  <p v-if="order.delivery_address.interior_number">
                    Int. {{ order.delivery_address.interior_number }}
                  </p>
                  <p>{{ order.delivery_address.colonia }}</p>
                  <p>
                    {{ order.delivery_address.municipio }},
                    {{ order.delivery_address.estado }}
                  </p>
                  <p>C.P. {{ order.delivery_address.postal_code }}</p>
                </div>
                <span
                  v-if="order.is_rural"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full mt-2"
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
              <div v-if="order.tracking_number">
                <p class="text-sm text-gray-500">{{ t.trackingNumber }}</p>
                <p class="font-medium text-gray-900">
                  {{ order.tracking_number }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Info (if quote sent) -->
        <div
          v-if="
            order.status !== 'collecting' &&
            order.status !== 'awaiting_packages' &&
            order.status !== 'packages_complete'
          "
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ t.financialInfo }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-500">{{ t.shippingCost }}</p>
              <p class="text-xl font-bold text-gray-900">
                ${{ formatCurrency(order.amount_paid || 0) }} MXN
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-500">{{ t.status }}</p>
              <p class="text-xl font-bold text-gray-900">
                {{ order.amount_paid ? t.paid : t.pending }}
              </p>
            </div>
            <div
              v-if="order.stripe_invoice_url"
              class="bg-gray-50 rounded-lg p-4"
            >
              <p class="text-sm text-gray-500">{{ t.invoice }}</p>
              <a
                :href="order.stripe_invoice_url"
                target="_blank"
                class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
              >
                {{ t.viewInvoice }}
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

        <!-- Items List -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
        >
          <div class="px-6 py-4 border-b border-gray-100">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              {{ t.orderItems }} ({{ order.items.length }})
            </h2>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.item }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.tracking }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.value }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.weight }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.status }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ t.actions }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="item in order.items"
                  :key="item.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4">
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        {{ item.product_name }}
                      </p>
                      <a
                        v-if="item.product_url"
                        :href="item.product_url"
                        target="_blank"
                        class="text-xs text-primary-600 hover:text-primary-700"
                      >
                        {{ t.viewProduct }}
                      </a>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div>
                      <p class="text-sm text-gray-900">
                        {{ item.tracking_number || "-" }}
                      </p>
                      <p v-if="item.carrier" class="text-xs text-gray-500">
                        {{ item.carrier }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    ${{ item.declared_value }} × {{ item.quantity }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {{ item.weight ? `${item.weight} kg` : "-" }}
                  </td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        item.arrived
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      {{ item.arrived ? t.arrived : t.pending }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <button
                      v-if="!item.arrived"
                      @click="openMarkArrivedModal(item)"
                      class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      {{ t.markArrived }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards -->
          <div class="sm:hidden divide-y divide-gray-100">
            <div v-for="item in order.items" :key="item.id" class="p-4">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <p class="font-medium text-gray-900">
                    {{ item.product_name }}
                  </p>
                  <a
                    v-if="item.product_url"
                    :href="item.product_url"
                    target="_blank"
                    class="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {{ t.viewProduct }}
                  </a>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    item.arrived
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700',
                  ]"
                >
                  {{ item.arrived ? t.arrived : t.pending }}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-gray-500">{{ t.value }}</p>
                  <p class="font-medium">
                    ${{ item.declared_value }} × {{ item.quantity }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-500">{{ t.weight }}</p>
                  <p class="font-medium">
                    {{ item.weight ? `${item.weight} kg` : "-" }}
                  </p>
                </div>
              </div>
              <button
                v-if="!item.arrived"
                @click="openMarkArrivedModal(item)"
                class="mt-3 w-full px-4 py-2 bg-primary-50 text-primary-600 font-medium rounded-lg hover:bg-primary-100 transition-all"
              >
                {{ t.markArrived }}
              </button>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
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
            {{ t.orderTimeline }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="(event, index) in orderTimeline"
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
                  v-if="index < orderTimeline.length - 1"
                  class="w-0.5 h-16 bg-gray-200"
                ></div>
              </div>
              <div class="flex-1 pb-8">
                <p class="font-medium text-gray-900">{{ event.label }}</p>
                <p v-if="event.date" class="text-sm text-gray-500">
                  {{ formatDate(event.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mark Arrived Modal -->
    <TransitionRoot :show="showMarkArrivedModal" as="template">
      <Dialog
        as="div"
        class="relative z-50"
        @close="showMarkArrivedModal = false"
      >
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
                      <p class="text-sm font-medium text-gray-900 mb-1">
                        {{ selectedItem.product_name }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ t.tracking }}:
                        {{ selectedItem.tracking_number || "N/A" }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ t.order }}: {{ order.order_number }}
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
                        <div>
                          <input
                            v-model.number="arrivedForm.dimensions.length"
                            type="number"
                            step="1"
                            min="1"
                            max="999"
                            class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="L"
                          />
                        </div>
                        <div>
                          <input
                            v-model.number="arrivedForm.dimensions.width"
                            type="number"
                            step="1"
                            min="1"
                            max="999"
                            class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="W"
                          />
                        </div>
                        <div>
                          <input
                            v-model.number="arrivedForm.dimensions.height"
                            type="number"
                            step="1"
                            min="1"
                            max="999"
                            class="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="H"
                          />
                        </div>
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ t.dimensionsHint }}
                      </p>
                    </div>

                    <!-- Warning Message -->
                    <div
                      class="bg-amber-50 border border-amber-200 rounded-lg p-3"
                    >
                      <div class="flex items-start gap-2">
                        <svg
                          class="w-5 h-5 text-amber-600 mt-0.5"
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
                        <p class="text-sm text-amber-700">
                          {{ t.arrivedWarning }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="confirmMarkArrived"
                      :disabled="!arrivedForm.weight || markingArrived"
                      class="flex-1 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="!markingArrived">{{ t.confirmArrived }}</span>
                      <span
                        v-else
                        class="flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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

    <!-- Quote Modal -->
    <TransitionRoot :show="showQuoteModal" as="template">
      <Dialog as="div" class="relative z-50" @close="showQuoteModal = false">
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
                    {{ t.confirmSendQuote }}
                  </DialogTitle>

                  <div class="space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-sm text-gray-600 mb-3">
                        {{ t.quoteDetails }}
                      </p>
                      <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600">{{ t.boxSize }}:</span>
                          <span class="font-medium capitalize">{{
                            order.recommended_box_size || calculateBoxSize()
                          }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600"
                            >{{ t.totalWeight }}:</span
                          >
                          <span class="font-medium"
                            >{{
                              order.total_weight || calculateTotalWeight()
                            }}
                            kg</span
                          >
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600"
                            >{{ t.shippingCost }}:</span
                          >
                          <span class="font-medium"
                            >${{
                              formatCurrency(calculateShippingCost())
                            }}
                            MXN</span
                          >
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600">{{ t.iva }}:</span>
                          <span class="font-medium"
                            >${{ formatCurrency(calculateIva()) }} MXN</span
                          >
                        </div>
                        <div class="border-t pt-2 flex justify-between">
                          <span class="font-medium">{{ t.total }}:</span>
                          <span class="font-bold text-lg"
                            >${{ formatCurrency(calculateTotal()) }} MXN</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="sendQuote"
                      :disabled="sendingQuote"
                      class="flex-1 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="!sendingQuote">{{ t.sendQuote }}</span>
                      <span
                        v-else
                        class="flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
                        {{ t.sending }}
                      </span>
                    </button>
                    <button
                      @click="showQuoteModal = false"
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

    <!-- Ship Modal -->
    <TransitionRoot :show="showShipModal" as="template">
      <Dialog as="div" class="relative z-50" @close="showShipModal = false">
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
                        {{ t.trackingNumber }}
                      </label>
                      <input
                        v-model="shipForm.tracking_number"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        :placeholder="t.trackingPlaceholder"
                      />
                    </div>

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
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="markAsShipped"
                      :disabled="
                        !shipForm.tracking_number ||
                        !shipForm.estimated_delivery_date ||
                        updatingStatus
                      "
                      class="flex-1 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="!updatingStatus">{{ t.confirmShip }}</span>
                      <span
                        v-else
                        class="flex items-center justify-center gap-2"
                      >
                        <svg
                          class="animate-spin h-4 w-4"
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
const showQuoteModal = ref(false);
const showShipModal = ref(false);
const showMarkArrivedModal = ref(false);
const sendingQuote = ref(false);
const updatingStatus = ref(false);
const markingArrived = ref(false);
const selectedItem = ref(null);

const shipForm = ref({
  tracking_number: "",
  estimated_delivery_date: "",
});

const arrivedForm = ref({
  weight: null,
  dimensions: {
    length: null,
    width: null,
    height: null,
  },
});

// Translations
const translations = {
  loading: {
    es: "Cargando...",
    en: "Loading...",
  },
  actionRequired: {
    es: "Acción Requerida",
    en: "Action Required",
  },
  sendQuote: {
    es: "Enviar Cotización",
    en: "Send Quote",
  },
  markAsShipped: {
    es: "Marcar como Enviado",
    en: "Mark as Shipped",
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
    es: "Ver Cliente",
    en: "View Customer",
  },
  orderDetails: {
    es: "Detalles de la Orden",
    en: "Order Details",
  },
  created: {
    es: "Creado",
    en: "Created",
  },
  completedAt: {
    es: "Completado",
    en: "Completed",
  },
  totalWeight: {
    es: "Peso Total",
    en: "Total Weight",
  },
  boxSize: {
    es: "Tamaño de Caja",
    en: "Box Size",
  },
  shippingInfo: {
    es: "Información de Envío",
    en: "Shipping Information",
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
    es: "Número de Rastreo",
    en: "Tracking Number",
  },
  financialInfo: {
    es: "Información Financiera",
    en: "Financial Information",
  },
  shippingCost: {
    es: "Costo de Envío",
    en: "Shipping Cost",
  },
  status: {
    es: "Estado",
    en: "Status",
  },
  paid: {
    es: "Pagado",
    en: "Paid",
  },
  pending: {
    es: "Pendiente",
    en: "Pending",
  },
  invoice: {
    es: "Factura",
    en: "Invoice",
  },
  viewInvoice: {
    es: "Ver Factura",
    en: "View Invoice",
  },
  orderItems: {
    es: "Artículos de la Orden",
    en: "Order Items",
  },
  item: {
    es: "Artículo",
    en: "Item",
  },
  tracking: {
    es: "Rastreo",
    en: "Tracking",
  },
  value: {
    es: "Valor",
    en: "Value",
  },
  weight: {
    es: "Peso",
    en: "Weight",
  },
  actions: {
    es: "Acciones",
    en: "Actions",
  },
  arrived: {
    es: "Llegó",
    en: "Arrived",
  },
  markArrived: {
    es: "Marcar como Llegado",
    en: "Mark as Arrived",
  },
  noName: {
    es: "Sin nombre",
    en: "No name",
  },
  viewProduct: {
    es: "Ver producto",
    en: "View product",
  },
  orderTimeline: {
    es: "Línea de Tiempo",
    en: "Order Timeline",
  },
  confirmSendQuote: {
    es: "Confirmar Envío de Cotización",
    en: "Confirm Send Quote",
  },
  quoteDetails: {
    es: "Detalles de la cotización:",
    en: "Quote details:",
  },
  iva: {
    es: "IVA (16%)",
    en: "VAT (16%)",
  },
  total: {
    es: "Total",
    en: "Total",
  },
  sending: {
    es: "Enviando...",
    en: "Sending...",
  },
  cancel: {
    es: "Cancelar",
    en: "Cancel",
  },
  trackingPlaceholder: {
    es: "Ej: 1Z999AA10123456784",
    en: "Ex: 1Z999AA10123456784",
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
  // Mark Arrived Modal translations
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
  arrivedWarning: {
    es: "Esta acción no se puede deshacer. Asegúrese de haber pesado el paquete correctamente.",
    en: "This action cannot be undone. Make sure you have weighed the package correctly.",
  },
  confirmArrived: {
    es: "Confirmar Llegada",
    en: "Confirm Arrival",
  },
  marking: {
    es: "Marcando...",
    en: "Marking...",
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
  shipped: {
    es: "Enviado",
    en: "Shipped",
  },
  delivered: {
    es: "Entregado",
    en: "Delivered",
  },
};

const t = createTranslations(translations);

// Computed
const showQuickActions = computed(() => {
  return (
    order.value &&
    (order.value.status === "packages_complete" ||
      order.value.status === "paid")
  );
});

const minDeliveryDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
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
      date: order.value.status === "packages_complete" ? new Date() : null,
      completed: [
        "packages_complete",
        "quote_sent",
        "paid",
        "shipped",
        "delivered",
      ].includes(order.value.status),
    },
    {
      label: t.value.quote_sent,
      date: order.value.quote_sent_at,
      completed: !!order.value.quote_sent_at,
    },
    {
      label: t.value.paid,
      date: order.value.paid_at,
      completed: !!order.value.paid_at,
    },
    {
      label: t.value.shipped,
      date: order.value.shipped_at,
      completed: !!order.value.shipped_at,
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

const getActionMessage = () => {
  if (order.value.status === "packages_complete") {
    return "All packages have arrived and been weighed. Ready to send quote to customer.";
  } else if (order.value.status === "paid") {
    return "Customer has paid. Ready to ship the consolidated package.";
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

const calculateBoxSize = () => {
  const weight = calculateTotalWeight();
  if (weight <= 10) return "small";
  if (weight <= 25) return "medium";
  if (weight <= 40) return "large";
  if (weight <= 60) return "xl";
  return null;
};

const calculateTotalWeight = () => {
  return order.value.items.reduce((sum, item) => sum + (item.weight || 0), 0);
};

const calculateShippingCost = () => {
  const boxSize = order.value.recommended_box_size || calculateBoxSize();
  const boxPrices = {
    small: 2200,
    medium: 3800,
    large: 5500,
    xl: 7000,
  };
  let cost = boxPrices[boxSize] || 0;
  if (order.value.is_rural) cost += 400;
  return cost;
};

const calculateIva = () => {
  const declaredTotal = order.value.items.reduce((sum, item) => {
    return sum + item.declared_value * item.quantity;
  }, 0);
  return declaredTotal * 0.16;
};

const calculateTotal = () => {
  return calculateShippingCost() + calculateIva();
};

const sendQuote = async () => {
  sendingQuote.value = true;
  try {
    const response = await $customFetch(
      `/admin/orders/${order.value.id}/send-quote`,
      {
        method: "POST",
      }
    );

    $toast.success("Quote sent successfully");
    order.value = response.data.order;
    showQuoteModal.value = false;
  } catch (error) {
    console.error("Error sending quote:", error);
    $toast.error(error.data?.message || "Error sending quote");
  } finally {
    sendingQuote.value = false;
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
          tracking_number: shipForm.value.tracking_number,
          estimated_delivery_date: shipForm.value.estimated_delivery_date,
        },
      }
    );

    $toast.success("Order marked as shipped");
    order.value = response.data;
    showShipModal.value = false;
    shipForm.value = { tracking_number: "", estimated_delivery_date: "" };
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

    // Only add dimensions if all three values are provided
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
    await fetchOrder(); // Refresh order data
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
