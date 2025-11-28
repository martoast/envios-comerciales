<template>
  <section
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20"
  >
    <!-- Header -->
    <div
      class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <NuxtLink
              :to="`/app/admin/orders/${orderId}`"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {{ t.editOrder }}
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ order?.order_number }} - {{ order?.user?.name }}
              </p>
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

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

      <!-- Error Alert -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to="opacity-0"
      >
        <div
          v-if="errorMessage"
          class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-shake"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="w-5 h-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
            </div>
            <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
              <svg
                class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Edit Form -->
      <form v-if="order" @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column - Main Fields -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Basic Order Info -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn"
            >
              <h2 class="text-xl font-bold text-gray-900 mb-6">
                {{ t.orderInformation }}
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Status -->
                <div>
                  <label
                    for="status"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.statusLabel }}
                  </label>
                  <select
                    v-model="form.status"
                    id="status"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="collecting">{{ t.collecting }}</option>
                    <option value="awaiting_packages">
                      {{ t.awaitingPackages }}
                    </option>
                    <option value="packages_complete">
                      {{ t.packagesComplete }}
                    </option>
                    <option value="processing">{{ t.processing }}</option>
                    <option value="shipped">{{ t.shipped }}</option>
                    <option value="delivered">{{ t.delivered }}</option>
                    <option value="awaiting_payment">
                      {{ t.awaitingPayment }}
                    </option>
                    <option value="paid">{{ t.paidStatus }}</option>
                    <option value="cancelled">{{ t.cancelled }}</option>
                  </select>
                </div>

                <!-- Legacy Box Size (only show if no multi-box) -->
                <div v-if="!hasMultipleBoxes">
                  <label
                    for="box_size"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.boxSizeLabel }}
                  </label>
                  <select
                    v-model="form.box_size"
                    id="box_size"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">{{ t.selectBoxSize }}</option>
                    <option value="extra-small">Extra Small</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>

                <!-- Total Weight -->
                <div>
                  <label
                    for="total_weight"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.totalWeightLabel }}
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.total_weight"
                      type="number"
                      step="0.01"
                      id="total_weight"
                      placeholder="0.00"
                      class="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                    <div
                      class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500">kg</span>
                    </div>
                  </div>
                </div>

                <!-- Declared Value -->
                <div>
                  <label
                    for="declared_value"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.declaredValueLabel }}
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.declared_value"
                      type="number"
                      step="0.01"
                      id="declared_value"
                      placeholder="0.00"
                      class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500">$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Multi-Box Section -->
            <div
              v-if="hasMultipleBoxes"
              class="bg-white rounded-2xl shadow-sm border border-indigo-200 p-6 sm:p-8 animate-fadeIn"
              style="animation-delay: 0.05s"
            >
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-indigo-100 rounded-lg">
                    <svg
                      class="w-5 h-5 text-indigo-600"
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
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">
                      {{ t.boxesSection }}
                    </h2>
                    <p class="text-sm text-gray-500">{{ t.multiBoxOrder }}</p>
                  </div>
                </div>
                <span
                  class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full"
                >
                  {{ totalBoxCount }}
                  {{ totalBoxCount === 1 ? t.box : t.boxesLabel }}
                </span>
              </div>

              <!-- Box List -->
              <div class="space-y-3 mb-4">
                <div
                  v-for="(box, index) in form.boxes"
                  :key="box.id || index"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center"
                      :class="getBoxSizeColorClass(box.box_size)"
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
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">
                        {{ box.box_name }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ formatBoxSizeLabel(box.box_size) }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <!-- Quantity Editor -->
                    <div class="flex items-center gap-2">
                      <label class="text-xs text-gray-500"
                        >{{ t.quantity }}:</label
                      >
                      <input
                        v-model.number="box.quantity"
                        type="number"
                        min="1"
                        max="10"
                        class="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <!-- Price per box -->
                    <div class="text-right">
                      <p class="text-sm text-gray-500">
                        @ ${{ formatNumber(box.box_price) }}
                      </p>
                      <p class="font-bold text-gray-900">
                        ${{
                          formatNumber(
                            parseFloat(box.box_price) * (box.quantity || 1)
                          )
                        }}
                      </p>
                    </div>

                    <!-- Remove Button -->
                    <button
                      v-if="form.boxes.length > 1"
                      type="button"
                      @click="removeBox(index)"
                      class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add Box Button -->
              <button
                type="button"
                @click="showAddBoxModal = true"
                class="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {{ t.addBox }}
              </button>

              <!-- Totals -->
              <div class="mt-6 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600"
                    >{{ t.totalBoxPrice }}:</span
                  >
                  <span class="text-lg font-bold text-gray-900"
                    >${{ formatNumber(calculatedTotalBoxPrice) }}</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-indigo-600 font-medium"
                    >{{ t.depositAmount }} (50%):</span
                  >
                  <span class="text-lg font-bold text-indigo-600"
                    >${{ formatNumber(calculatedTotalBoxPrice * 0.5) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Financial Information -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn"
              style="animation-delay: 0.1s"
            >
              <h2 class="text-xl font-bold text-gray-900 mb-6">
                {{ t.financialInformation }}
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Deposit Amount -->
                <div>
                  <label
                    for="deposit_amount"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.depositAmountLabel }} (50%)
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.deposit_amount"
                      type="number"
                      step="0.01"
                      id="deposit_amount"
                      class="w-full px-4 py-3 pl-8 rounded-xl border border-blue-200 bg-blue-50 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-blue-500">$</span>
                    </div>
                  </div>
                </div>

                <!-- Total Paid -->
                <div>
                  <label
                    for="amount_paid"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.amountPaidLabel }}
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.amount_paid"
                      type="number"
                      step="0.01"
                      id="amount_paid"
                      class="w-full px-4 py-3 pl-8 rounded-xl border border-green-200 bg-green-50 font-bold text-green-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-green-500">$</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ t.updatedViaStripe }}
                  </p>
                </div>
              </div>

              <!-- Payment Summary -->
              <div
                v-if="form.box_price > 0 || calculatedTotalBoxPrice > 0"
                class="mt-6 p-4 bg-gray-50 rounded-xl"
              >
                <h3 class="text-sm font-semibold text-gray-700 mb-3">
                  {{ t.paymentSummary }}
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">{{ t.totalBoxPrice }}:</span>
                    <span class="font-medium"
                      >${{
                        formatNumber(
                          hasMultipleBoxes
                            ? calculatedTotalBoxPrice
                            : form.box_price || 0
                        )
                      }}</span
                    >
                  </div>
                  <div class="flex justify-between text-blue-600">
                    <span>{{ t.depositAmount }} (50%):</span>
                    <span class="font-medium"
                      >${{ formatNumber(form.deposit_amount || 0) }}</span
                    >
                  </div>
                  <div
                    class="flex justify-between pt-2 border-t border-gray-200 text-green-600 font-bold"
                  >
                    <span>{{ t.totalPaid }}:</span>
                    <span>${{ formatNumber(form.amount_paid || 0) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Address Section -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn"
              style="animation-delay: 0.2s"
            >
              <h2 class="text-xl font-bold text-gray-900 mb-6">
                {{ t.deliveryAddressTitle }}
              </h2>

              <div class="space-y-4">
                <!-- Street -->
                <div>
                  <label
                    for="street"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.streetLabel }}
                  </label>
                  <input
                    v-model="form.delivery_address.street"
                    type="text"
                    id="street"
                    :placeholder="t.streetPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <!-- Numbers -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="exterior_number"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.exteriorNumberLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.exterior_number"
                      type="text"
                      id="exterior_number"
                      :placeholder="t.exteriorNumberPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label
                      for="interior_number"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.interiorNumberLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.interior_number"
                      type="text"
                      id="interior_number"
                      :placeholder="t.interiorNumberPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- Colonia and Municipio -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      for="colonia"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.coloniaLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.colonia"
                      type="text"
                      id="colonia"
                      :placeholder="t.coloniaPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label
                      for="municipio"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.municipioLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.municipio"
                      type="text"
                      id="municipio"
                      :placeholder="t.municipioPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- Estado and Postal Code -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      for="estado"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.estadoLabel }}
                    </label>
                    <select
                      v-model="form.delivery_address.estado"
                      id="estado"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">{{ t.selectEstado }}</option>
                      <option
                        v-for="estado in mexicanStates"
                        :key="estado"
                        :value="estado"
                      >
                        {{ estado }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="postal_code"
                      class="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {{ t.postalCodeLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.postal_code"
                      type="text"
                      id="postal_code"
                      :placeholder="t.postalCodePlaceholder"
                      maxlength="5"
                      pattern="[0-9]{5}"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- Referencias -->
                <div>
                  <label
                    for="referencias"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.referenciasLabel }}
                  </label>
                  <textarea
                    v-model="form.delivery_address.referencias"
                    id="referencias"
                    rows="3"
                    :placeholder="t.referenciasPlaceholder"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <!-- Rural Checkbox -->
                <div
                  class="bg-yellow-50 rounded-xl p-4 border border-yellow-200"
                >
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      v-model="form.is_rural"
                      type="checkbox"
                      class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <div class="flex-1">
                      <span class="text-sm font-semibold text-gray-900">{{
                        t.ruralAreaLabel
                      }}</span>
                      <p class="text-sm text-gray-600 mt-1">
                        {{ t.ruralAreaDescription }}
                      </p>
                      <div v-if="form.is_rural" class="mt-2">
                        <label
                          class="block text-xs font-medium text-yellow-700 mb-1"
                          >{{ t.ruralSurchargeLabel }}</label
                        >
                        <div class="relative">
                          <input
                            v-model.number="form.rural_surcharge"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            class="w-full px-3 py-2 pl-6 rounded-lg border border-yellow-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                          <div
                            class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
                          >
                            <span class="text-yellow-600 text-sm">$</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Additional Fields & Dates -->
          <div class="space-y-6">
            <!-- Shipping Information -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
              style="animation-delay: 0.3s"
            >
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                {{ t.shippingInformation }}
              </h2>

              <div class="space-y-4">
                <!-- Guia Number -->
                <div>
                  <label
                    for="guia_number"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.guiaNumberLabel }}
                  </label>
                  <input
                    v-model="form.guia_number"
                    type="text"
                    id="guia_number"
                    placeholder="1234567890"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <!-- Deposit Payment Link -->
                <div>
                  <label
                    for="deposit_payment_link"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.depositPaymentLinkLabel }}
                  </label>
                  <input
                    v-model="form.deposit_payment_link"
                    type="url"
                    id="deposit_payment_link"
                    placeholder="https://invoice.stripe.com/..."
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <a
                    v-if="form.deposit_payment_link"
                    :href="form.deposit_payment_link"
                    target="_blank"
                    class="text-xs text-primary-600 hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    {{ t.openLink }}
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

                <!-- Final Payment Link -->
                <div>
                  <label
                    for="payment_link"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.paymentLinkLabel }}
                  </label>
                  <input
                    v-model="form.payment_link"
                    type="url"
                    id="payment_link"
                    placeholder="https://invoice.stripe.com/..."
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <a
                    v-if="form.payment_link"
                    :href="form.payment_link"
                    target="_blank"
                    class="text-xs text-primary-600 hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    {{ t.openLink }}
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

            <!-- Important Dates -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
              style="animation-delay: 0.4s"
            >
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                {{ t.importantDates }}
              </h2>

              <div class="space-y-4">
                <!-- Deposit Paid At -->
                <div>
                  <label
                    for="deposit_paid_at"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.depositPaidAtLabel }}
                  </label>
                  <input
                    v-model="form.deposit_paid_at"
                    type="datetime-local"
                    id="deposit_paid_at"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <!-- Final Paid At -->
                <div>
                  <label
                    for="paid_at"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.paidAtLabel }}
                  </label>
                  <input
                    v-model="form.paid_at"
                    type="datetime-local"
                    id="paid_at"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <!-- Shipped At -->
                <div>
                  <label
                    for="shipped_at"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.shippedAtLabel }}
                  </label>
                  <input
                    v-model="form.shipped_at"
                    type="datetime-local"
                    id="shipped_at"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <!-- Delivered At -->
                <div>
                  <label
                    for="delivered_at"
                    class="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {{ t.deliveredAtLabel }}
                  </label>
                  <input
                    v-model="form.delivered_at"
                    type="datetime-local"
                    id="delivered_at"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
              style="animation-delay: 0.5s"
            >
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                {{ t.notesTitle }}
              </h2>
              <textarea
                v-model="form.notes"
                rows="4"
                :placeholder="t.notesPlaceholder"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8">
          <NuxtLink
            :to="`/app/admin/orders/${orderId}`"
            class="order-2 sm:order-1 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300 text-center"
          >
            {{ t.cancel }}
          </NuxtLink>

          <button
            type="submit"
            :disabled="saving || !hasChanges"
            class="order-1 sm:order-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <svg
              v-if="saving"
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
            <span v-if="!saving">{{ t.saveChanges }}</span>
            <span v-else>{{ t.saving }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Add Box Modal -->
    <TransitionRoot :show="showAddBoxModal" as="template">
      <Dialog class="relative z-50" @close="showAddBoxModal = false">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <DialogTitle class="text-lg font-semibold mb-4">{{
                t.addBoxTitle
              }}</DialogTitle>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{
                    t.selectProduct
                  }}</label>
                  <select
                    v-model="newBox.stripe_price_id"
                    class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="" disabled>{{ t.selectBoxSize }}</option>
                    <option
                      v-for="prod in products"
                      :key="prod.id"
                      :value="prod.price_id"
                    >
                      {{ prod.name }} - ${{ prod.price }} {{ prod.currency }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{
                    t.quantity
                  }}</label>
                  <input
                    v-model.number="newBox.quantity"
                    type="number"
                    min="1"
                    max="10"
                    class="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div class="mt-6 flex gap-3 justify-end">
                <button
                  @click="showAddBoxModal = false"
                  class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  {{ t.cancel }}
                </button>
                <button
                  @click="addNewBox"
                  :disabled="!newBox.stripe_price_id"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {{ t.addBox }}
                </button>
              </div>
            </DialogPanel>
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
  TransitionRoot,
} from "@headlessui/vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const { $customFetch, $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { t: createTranslations } = useLanguage();

// State
const orderId = route.params.id;
const order = ref(null);
const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const originalData = ref(null);
const products = ref([]);
const showAddBoxModal = ref(false);
const newBox = ref({ stripe_price_id: "", quantity: 1 });

// Form data
const form = ref({
  status: "",
  box_size: "",
  boxes: [],
  box_price: null,
  deposit_amount: null,
  amount_paid: null,
  declared_value: null,
  is_rural: false,
  rural_surcharge: null,
  delivery_address: {
    street: "",
    exterior_number: "",
    interior_number: "",
    colonia: "",
    municipio: "",
    estado: "",
    postal_code: "",
    referencias: "",
  },
  total_weight: null,
  shipping_cost: null,
  handling_fee: null,
  insurance_fee: null,
  currency: "mxn",
  notes: "",
  paid_at: null,
  deposit_paid_at: null,
  completed_at: null,
  processing_started_at: null,
  shipped_at: null,
  delivered_at: null,
  estimated_delivery_date: null,
  actual_delivery_date: null,
  guia_number: "",
  deposit_invoice_id: "",
  deposit_payment_link: "",
  stripe_invoice_id: "",
  payment_link: "",
});

// Mexican states
const mexicanStates = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

// Translations
const translations = {
  editOrder: { es: "Editar Orden (Admin)", en: "Edit Order (Admin)" },
  orderInformation: { es: "Información de la Orden", en: "Order Information" },
  financialInformation: {
    es: "Información Financiera",
    en: "Financial Information",
  },
  shippingInformation: {
    es: "Información de Envío",
    en: "Shipping Information",
  },
  importantDates: { es: "Fechas Importantes", en: "Important Dates" },
  notesTitle: { es: "Notas", en: "Notes" },
  statusLabel: { es: "Estado", en: "Status" },
  boxSizeLabel: { es: "Tamaño de Caja (Legado)", en: "Box Size (Legacy)" },
  selectBoxSize: { es: "Seleccionar tamaño", en: "Select size" },
  totalWeightLabel: { es: "Peso Total", en: "Total Weight" },
  declaredValueLabel: {
    es: "Valor Declarado (USD)",
    en: "Declared Value (USD)",
  },
  amountPaidLabel: { es: "Monto Pagado (Total)", en: "Amount Paid (Total)" },
  depositAmountLabel: { es: "Monto Depósito", en: "Deposit Amount" },
  depositAmount: { es: "Depósito", en: "Deposit" },
  totalBoxPriceLabel: { es: "Precio Total Cajas", en: "Total Box Price" },
  totalBoxPrice: { es: "Precio Total Cajas", en: "Total Box Price" },
  calculatedFromBoxes: {
    es: "Calculado automáticamente de las cajas",
    en: "Automatically calculated from boxes",
  },
  updatedViaStripe: {
    es: "Actualizado automáticamente vía Stripe",
    en: "Automatically updated via Stripe",
  },
  guiaNumberLabel: { es: "Número de Guía", en: "Waybill Number" },
  depositPaymentLinkLabel: { es: "Link Depósito", en: "Deposit Link" },
  paymentLinkLabel: { es: "Link Pago Final", en: "Final Payment Link" },
  openLink: { es: "Abrir enlace", en: "Open link" },
  paidAtLabel: { es: "Fecha Pago Final", en: "Final Paid At" },
  depositPaidAtLabel: { es: "Fecha Pago Depósito", en: "Deposit Paid At" },
  shippedAtLabel: { es: "Fecha de Envío", en: "Shipped At" },
  deliveredAtLabel: { es: "Fecha de Entrega", en: "Delivered At" },
  notesPlaceholder: {
    es: "Notas internas sobre esta orden...",
    en: "Internal notes about this order...",
  },
  deliveryAddressTitle: { es: "Dirección de Entrega", en: "Delivery Address" },
  streetLabel: { es: "Calle", en: "Street" },
  streetPlaceholder: { es: "Nombre de la calle", en: "Street name" },
  exteriorNumberLabel: { es: "Número Exterior", en: "Exterior Number" },
  exteriorNumberPlaceholder: { es: "123", en: "123" },
  interiorNumberLabel: { es: "Número Interior", en: "Interior Number" },
  interiorNumberPlaceholder: { es: "Opcional", en: "Optional" },
  coloniaLabel: { es: "Colonia", en: "Neighborhood" },
  coloniaPlaceholder: { es: "Nombre de la colonia", en: "Neighborhood name" },
  municipioLabel: { es: "Municipio/Delegación", en: "Municipality" },
  municipioPlaceholder: { es: "Municipio o delegación", en: "Municipality" },
  estadoLabel: { es: "Estado", en: "State" },
  selectEstado: { es: "Selecciona un estado", en: "Select a state" },
  postalCodeLabel: { es: "Código Postal", en: "Postal Code" },
  postalCodePlaceholder: { es: "12345", en: "12345" },
  referenciasLabel: { es: "Referencias", en: "References" },
  referenciasPlaceholder: {
    es: "Entre calles, puntos de referencia...",
    en: "Between streets, landmarks...",
  },
  ruralAreaLabel: { es: "Zona Rural", en: "Rural Area" },
  ruralAreaDescription: {
    es: "Marca si la dirección está en una zona rural.",
    en: "Check if the address is in a rural area.",
  },
  ruralSurchargeLabel: { es: "Recargo Rural", en: "Rural Surcharge" },
  cancel: { es: "Cancelar", en: "Cancel" },
  saveChanges: { es: "Guardar Cambios", en: "Save Changes" },
  saving: { es: "Guardando...", en: "Saving..." },
  orderUpdatedSuccess: {
    es: "Orden actualizada exitosamente",
    en: "Order updated successfully",
  },
  generalError: { es: "Ocurrió un error.", en: "An error occurred." },
  collecting: { es: "Agregando Artículos", en: "Adding Items" },
  awaitingPackages: { es: "Esperando Paquetes", en: "Awaiting Packages" },
  packagesComplete: { es: "Paquetes Completos", en: "Packages Complete" },
  processing: { es: "Procesando", en: "Processing" },
  shipped: { es: "Enviado", en: "Shipped" },
  delivered: { es: "Entregado", en: "Delivered" },
  awaitingPayment: { es: "Esperando Pago", en: "Awaiting Payment" },
  paidStatus: { es: "Pagado", en: "Paid" },
  cancelled: { es: "Cancelado", en: "Cancelled" },
  boxesSection: { es: "Cajas del Pedido", en: "Order Boxes" },
  multiBoxOrder: {
    es: "Este pedido tiene múltiples cajas",
    en: "This order has multiple boxes",
  },
  box: { es: "caja", en: "box" },
  boxesLabel: { es: "cajas", en: "boxes" },
  quantity: { es: "Cantidad", en: "Quantity" },
  addBox: { es: "Agregar Caja", en: "Add Box" },
  addBoxTitle: { es: "Agregar Nueva Caja", en: "Add New Box" },
  selectProduct: { es: "Seleccionar Producto", en: "Select Product" },
  paymentSummary: { es: "Resumen de Pagos", en: "Payment Summary" },
  totalPaid: { es: "Total Pagado", en: "Total Paid" },
};

const t = createTranslations(translations);

// Computed
const hasMultipleBoxes = computed(() => {
  return form.value.boxes && form.value.boxes.length > 0;
});

const totalBoxCount = computed(() => {
  if (!form.value.boxes || form.value.boxes.length === 0) return 0;
  return form.value.boxes.reduce((sum, box) => sum + (box.quantity || 1), 0);
});

const calculatedTotalBoxPrice = computed(() => {
  if (!form.value.boxes || form.value.boxes.length === 0) return 0;
  return form.value.boxes.reduce((sum, box) => {
    const price = parseFloat(box.box_price) || 0;
    const qty = box.quantity || 1;
    return sum + price * qty;
  }, 0);
});

const hasChanges = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalData.value);
});

// Helper function to safely format numbers
const formatNumber = (value) => {
  const num = parseFloat(value) || 0;
  return num.toFixed(2);
};

// Methods
const getStatusColor = (status) => {
  const colors = {
    collecting: "bg-blue-100 text-blue-700",
    awaiting_packages: "bg-amber-100 text-amber-700",
    packages_complete: "bg-purple-100 text-purple-700",
    processing: "bg-indigo-100 text-indigo-700",
    shipped: "bg-cyan-100 text-cyan-700",
    delivered: "bg-green-100 text-green-700",
    awaiting_payment: "bg-orange-100 text-orange-700",
    paid: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusLabel = (status) => {
  const statusKey = status?.replace(/_/g, "") || "";
  const camelCase =
    statusKey.charAt(0).toLowerCase() +
    statusKey.slice(1).replace(/([A-Z])/g, (match) => match.toLowerCase());
  return t.value[camelCase] || status;
};

const getBoxSizeColorClass = (size) => {
  const colors = {
    "extra-small": "bg-gray-100 text-gray-600",
    small: "bg-blue-100 text-blue-600",
    medium: "bg-green-100 text-green-600",
    large: "bg-amber-100 text-amber-600",
    "extra-large": "bg-red-100 text-red-600",
  };
  return colors[size] || "bg-gray-100 text-gray-600";
};

const formatBoxSizeLabel = (size) => {
  const labels = {
    "extra-small": "XS - Extra Small",
    small: "S - Small",
    medium: "M - Medium",
    large: "L - Large",
    "extra-large": "XL - Extra Large",
  };
  return labels[size] || size;
};

const formatDateTimeForInput = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formatDateForInput = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const removeBox = (index) => {
  if (form.value.boxes.length > 1) {
    form.value.boxes.splice(index, 1);
    form.value.box_price = calculatedTotalBoxPrice.value;
  }
};

const addNewBox = () => {
  const selectedProduct = products.value.find(
    (p) => p.price_id === newBox.value.stripe_price_id
  );
  if (!selectedProduct) return;

  form.value.boxes.push({
    id: null,
    stripe_price_id: selectedProduct.price_id,
    stripe_product_id: selectedProduct.stripe_product_id || null,
    box_size: selectedProduct.metadata?.type || null,
    box_name: selectedProduct.name,
    box_price: parseFloat(selectedProduct.price) || 0,
    currency: selectedProduct.currency || "mxn",
    quantity: newBox.value.quantity,
  });

  form.value.box_price = calculatedTotalBoxPrice.value;

  newBox.value = { stripe_price_id: "", quantity: 1 };
  showAddBoxModal.value = false;
};

const fetchProducts = async () => {
  try {
    const res = await $customFetch("/products");
    products.value = res.data;
  } catch (e) {
    console.error("Error fetching products:", e);
  }
};

const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/admin/orders/${orderId}`);
    order.value = response.data;

    form.value = {
      status: order.value.status || "",
      box_size: order.value.box_size || "",
      boxes:
        order.value.boxes?.map((box) => ({
          id: box.id,
          stripe_price_id: box.stripe_price_id,
          stripe_product_id: box.stripe_product_id,
          box_size: box.box_size,
          box_name: box.box_name,
          box_price: parseFloat(box.box_price) || 0,
          currency: box.currency || "mxn",
          quantity: box.quantity || 1,
        })) || [],
      box_price: parseFloat(order.value.box_price) || null,
      declared_value: parseFloat(order.value.declared_value) || null,
      is_rural: order.value.is_rural || false,
      rural_surcharge: parseFloat(order.value.rural_surcharge) || null,
      delivery_address: {
        street: order.value.delivery_address?.street || "",
        exterior_number: order.value.delivery_address?.exterior_number || "",
        interior_number: order.value.delivery_address?.interior_number || "",
        colonia: order.value.delivery_address?.colonia || "",
        municipio: order.value.delivery_address?.municipio || "",
        estado: order.value.delivery_address?.estado || "",
        postal_code: order.value.delivery_address?.postal_code || "",
        referencias: order.value.delivery_address?.referencias || "",
      },
      total_weight: parseFloat(order.value.total_weight) || null,
      shipping_cost: parseFloat(order.value.shipping_cost) || null,
      handling_fee: parseFloat(order.value.handling_fee) || null,
      insurance_fee: parseFloat(order.value.insurance_fee) || null,
      amount_paid: parseFloat(order.value.amount_paid) || null,
      currency: order.value.currency || "mxn",
      notes: order.value.notes || "",
      paid_at: formatDateTimeForInput(order.value.paid_at),
      deposit_paid_at: formatDateTimeForInput(order.value.deposit_paid_at),
      completed_at: formatDateTimeForInput(order.value.completed_at),
      processing_started_at: formatDateTimeForInput(
        order.value.processing_started_at
      ),
      shipped_at: formatDateTimeForInput(order.value.shipped_at),
      delivered_at: formatDateTimeForInput(order.value.delivered_at),
      estimated_delivery_date: formatDateForInput(
        order.value.estimated_delivery_date
      ),
      actual_delivery_date: formatDateForInput(
        order.value.actual_delivery_date
      ),
      guia_number: order.value.guia_number || "",
      deposit_amount: parseFloat(order.value.deposit_amount) || null,
      deposit_invoice_id: order.value.deposit_invoice_id || "",
      deposit_payment_link: order.value.deposit_payment_link || "",
      stripe_invoice_id: order.value.stripe_invoice_id || "",
      payment_link: order.value.payment_link || "",
    };

    originalData.value = JSON.parse(JSON.stringify(form.value));
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error(t.value.generalError);
    await router.push("/app/admin/orders");
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!hasChanges.value) return;

  saving.value = true;
  errorMessage.value = "";

  try {
    const updates = {};
    const keys = Object.keys(form.value);

    keys.forEach((key) => {
      if (key === "delivery_address") {
        if (
          JSON.stringify(form.value.delivery_address) !==
          JSON.stringify(originalData.value.delivery_address)
        ) {
          updates.delivery_address = form.value.delivery_address;
        }
      } else if (key === "boxes") {
        if (
          JSON.stringify(form.value.boxes) !==
          JSON.stringify(originalData.value.boxes)
        ) {
          updates.boxes = form.value.boxes;
        }
      } else {
        if (form.value[key] !== originalData.value[key]) {
          updates[key] = form.value[key];
        }
      }
    });

    if (updates.boxes) {
      updates.box_price = calculatedTotalBoxPrice.value;
    }

    const response = await $customFetch(`/admin/management/orders/${orderId}`, {
      method: "PUT",
      body: updates,
    });

    if (response.success) {
      $toast.success(t.value.orderUpdatedSuccess);
      await router.push(`/app/admin/orders/${orderId}`);
    }
  } catch (error) {
    console.error("Error updating order:", error);
    errorMessage.value = error.data?.message || t.value.generalError;
    $toast.error(errorMessage.value);
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchOrder();
  fetchProducts();
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

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
