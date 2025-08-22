<template>
    <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <NuxtLink 
                :to="`/app/admin/orders/${orderId}`" 
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.editOrder }}</h1>
                <p class="text-sm text-gray-600 mt-1">{{ order?.order_number }} - {{ order?.user?.name }}</p>
              </div>
            </div>
            <!-- Status Badge -->
            <span v-if="order" :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getStatusColor(order.status)
            ]">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
            <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
  
        <!-- Admin Power Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="order" class="mb-6 bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-500 rounded-lg p-4 shadow-sm">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <h3 class="text-sm font-medium text-primary-800">{{ t.adminModeTitle }}</h3>
                <p class="text-sm text-primary-700 mt-1">{{ t.adminModeMessage }}</p>
              </div>
            </div>
          </div>
        </Transition>
  
        <!-- Error Alert -->
        <Transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-shake">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
              </div>
              <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
                <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
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
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
                <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.orderInformation }}</h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Status -->
                  <div>
                    <label for="status" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.statusLabel }}
                    </label>
                    <select
                      v-model="form.status"
                      id="status"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="collecting">{{ t.collecting }}</option>
                      <option value="awaiting_packages">{{ t.awaitingPackages }}</option>
                      <option value="packages_complete">{{ t.packagesComplete }}</option>
                      <option value="processing">{{ t.processing }}</option>
                      <option value="quote_sent">{{ t.quoteSent }}</option>
                      <option value="paid">{{ t.paid }}</option>
                      <option value="shipped">{{ t.shipped }}</option>
                      <option value="delivered">{{ t.delivered }}</option>
                      <option value="cancelled">{{ t.cancelled }}</option>
                    </select>
                  </div>
  
                  <!-- Box Size -->
                  <div>
                    <label for="box_size" class="block text-sm font-semibold text-gray-900 mb-2">
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
                    <label for="total_weight" class="block text-sm font-semibold text-gray-900 mb-2">
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
                      >
                      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span class="text-gray-500">kg</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Actual Weight -->
                  <div>
                    <label for="actual_weight" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.actualWeightLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.actual_weight"
                        type="number"
                        step="0.01"
                        id="actual_weight"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span class="text-gray-500">kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Financial Information -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn" style="animation-delay: 0.1s">
                <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.financialInformation }}</h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Declared Value -->
                  <div>
                    <label for="declared_value" class="block text-sm font-semibold text-gray-900 mb-2">
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
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- IVA Amount -->
                  <div>
                    <label for="iva_amount" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.ivaAmountLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.iva_amount"
                        type="number"
                        step="0.01"
                        id="iva_amount"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Shipping Cost -->
                  <div>
                    <label for="shipping_cost" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.shippingCostLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.shipping_cost"
                        type="number"
                        step="0.01"
                        id="shipping_cost"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Handling Fee -->
                  <div>
                    <label for="handling_fee" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.handlingFeeLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.handling_fee"
                        type="number"
                        step="0.01"
                        id="handling_fee"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Quoted Amount -->
                  <div>
                    <label for="quoted_amount" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.quotedAmountLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.quoted_amount"
                        type="number"
                        step="0.01"
                        id="quoted_amount"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Amount Paid -->
                  <div>
                    <label for="amount_paid" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.amountPaidLabel }}
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.amount_paid"
                        type="number"
                        step="0.01"
                        id="amount_paid"
                        placeholder="0.00"
                        class="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Delivery Address Section -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn" style="animation-delay: 0.2s">
                <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.deliveryAddressTitle }}</h2>
                
                <div class="space-y-4">
                  <!-- Street -->
                  <div>
                    <label for="street" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.streetLabel }}
                    </label>
                    <input
                      v-model="form.delivery_address.street"
                      type="text"
                      id="street"
                      :placeholder="t.streetPlaceholder"
                      class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                  </div>
  
                  <!-- Numbers -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="exterior_number" class="block text-sm font-semibold text-gray-900 mb-2">
                        {{ t.exteriorNumberLabel }}
                      </label>
                      <input
                        v-model="form.delivery_address.exterior_number"
                        type="text"
                        id="exterior_number"
                        :placeholder="t.exteriorNumberPlaceholder"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                    </div>
                    <div>
                      <label for="interior_number" class="block text-sm font-semibold text-gray-900 mb-2">
                        {{ t.interiorNumberLabel }}
                      </label>
                      <input
                        v-model="form.delivery_address.interior_number"
                        type="text"
                        id="interior_number"
                        :placeholder="t.interiorNumberPlaceholder"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                    </div>
                  </div>
  
                  <!-- Colonia and Municipio -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="colonia" class="block text-sm font-semibold text-gray-900 mb-2">
                        {{ t.coloniaLabel }}
                      </label>
                      <input
                        v-model="form.delivery_address.colonia"
                        type="text"
                        id="colonia"
                        :placeholder="t.coloniaPlaceholder"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                    </div>
                    <div>
                      <label for="municipio" class="block text-sm font-semibold text-gray-900 mb-2">
                        {{ t.municipioLabel }}
                      </label>
                      <input
                        v-model="form.delivery_address.municipio"
                        type="text"
                        id="municipio"
                        :placeholder="t.municipioPlaceholder"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                    </div>
                  </div>
  
                  <!-- Estado and Postal Code -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="estado" class="block text-sm font-semibold text-gray-900 mb-2">
                        {{ t.estadoLabel }}
                      </label>
                      <select
                        v-model="form.delivery_address.estado"
                        id="estado"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">{{ t.selectEstado }}</option>
                        <option v-for="estado in mexicanStates" :key="estado" :value="estado">
                          {{ estado }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label for="postal_code" class="block text-sm font-semibold text-gray-900 mb-2">
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
                      >
                    </div>
                  </div>
  
                  <!-- Referencias -->
                  <div>
                    <label for="referencias" class="block text-sm font-semibold text-gray-900 mb-2">
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
                  <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input
                        v-model="form.is_rural"
                        type="checkbox"
                        class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      >
                      <div class="flex-1">
                        <span class="text-sm font-semibold text-gray-900">{{ t.ruralAreaLabel }}</span>
                        <p class="text-sm text-gray-600 mt-1">{{ t.ruralAreaDescription }}</p>
                        <div v-if="form.is_rural" class="mt-2">
                          <label class="block text-xs font-medium text-yellow-700 mb-1">{{ t.ruralSurchargeLabel }}</label>
                          <div class="relative">
                            <input
                              v-model.number="form.rural_surcharge"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              class="w-full px-3 py-2 pl-6 rounded-lg border border-yellow-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                            <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
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
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.3s">
                <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.shippingInformation }}</h2>
                
                <div class="space-y-4">
                  <!-- DHL Waybill -->
                  <div>
                    <label for="dhl_waybill_number" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.dhlWaybillLabel }}
                    </label>
                    <input
                      v-model="form.dhl_waybill_number"
                      type="text"
                      id="dhl_waybill_number"
                      placeholder="84 1597 5142"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
  
                  <!-- Payment Link -->
                  <div>
                    <label for="payment_link" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.paymentLinkLabel }}
                    </label>
                    <input
                      v-model="form.payment_link"
                      type="url"
                      id="payment_link"
                      placeholder="https://..."
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
                </div>
              </div>
  
              <!-- Important Dates -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.4s">
                <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.importantDates }}</h2>
                
                <div class="space-y-4">
                  <!-- Paid At -->
                  <div>
                    <label for="paid_at" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.paidAtLabel }}
                    </label>
                    <input
                      v-model="form.paid_at"
                      type="datetime-local"
                      id="paid_at"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
  
                  <!-- Quote Sent At -->
                  <div>
                    <label for="quote_sent_at" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.quoteSentAtLabel }}
                    </label>
                    <input
                      v-model="form.quote_sent_at"
                      type="datetime-local"
                      id="quote_sent_at"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
  
                  <!-- Shipped At -->
                  <div>
                    <label for="shipped_at" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.shippedAtLabel }}
                    </label>
                    <input
                      v-model="form.shipped_at"
                      type="datetime-local"
                      id="shipped_at"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
  
                  <!-- Delivered At -->
                  <div>
                    <label for="delivered_at" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.deliveredAtLabel }}
                    </label>
                    <input
                      v-model="form.delivered_at"
                      type="datetime-local"
                      id="delivered_at"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
  
                  <!-- Estimated Delivery -->
                  <div>
                    <label for="estimated_delivery_date" class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ t.estimatedDeliveryLabel }}
                    </label>
                    <input
                      v-model="form.estimated_delivery_date"
                      type="date"
                      id="estimated_delivery_date"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                  </div>
                </div>
              </div>
  
              <!-- Notes -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn" style="animation-delay: 0.5s">
                <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.notesTitle }}</h2>
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
              <svg v-if="saving" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!saving">{{ t.saveChanges }}</span>
              <span v-else>{{ t.saving }}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })
  
  // Nuxt imports
  const { $customFetch, $toast } = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  
  // Use language composable
  const { t: createTranslations } = useLanguage()
  
  // State
  const orderId = route.params.id
  const order = ref(null)
  const loading = ref(true)
  const saving = ref(false)
  const errorMessage = ref('')
  const originalData = ref(null)
  
  // Form data
  const form = ref({
    status: '',
    box_size: '',
    box_price: null,
    declared_value: null,
    iva_amount: null,
    is_rural: false,
    rural_surcharge: null,
    delivery_address: {
      street: '',
      exterior_number: '',
      interior_number: '',
      colonia: '',
      municipio: '',
      estado: '',
      postal_code: '',
      referencias: ''
    },
    total_weight: null,
    actual_weight: null,
    shipping_cost: null,
    handling_fee: null,
    insurance_fee: null,
    quoted_amount: null,
    amount_paid: null,
    currency: 'mxn',
    notes: '',
    paid_at: null,
    completed_at: null,
    processing_started_at: null,
    quote_sent_at: null,
    quote_expires_at: null,
    shipped_at: null,
    delivered_at: null,
    estimated_delivery_date: null,
    actual_delivery_date: null,
    dhl_waybill_number: '',
    stripe_invoice_id: '',
    payment_link: ''
  })
  
  // Mexican states
  const mexicanStates = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ]
  
  // Translations
  const translations = {
    editOrder: {
      es: 'Editar Orden (Admin)',
      en: 'Edit Order (Admin)'
    },
    adminModeTitle: {
      es: 'Modo Administrador',
      en: 'Administrator Mode'
    },
    adminModeMessage: {
      es: 'Tienes control total sobre todos los campos de esta orden. Los cambios se aplicarán inmediatamente.',
      en: 'You have full control over all fields in this order. Changes will be applied immediately.'
    },
    orderInformation: {
      es: 'Información de la Orden',
      en: 'Order Information'
    },
    financialInformation: {
      es: 'Información Financiera',
      en: 'Financial Information'
    },
    shippingInformation: {
      es: 'Información de Envío',
      en: 'Shipping Information'
    },
    importantDates: {
      es: 'Fechas Importantes',
      en: 'Important Dates'
    },
    notesTitle: {
      es: 'Notas',
      en: 'Notes'
    },
    statusLabel: {
      es: 'Estado',
      en: 'Status'
    },
    boxSizeLabel: {
      es: 'Tamaño de Caja',
      en: 'Box Size'
    },
    selectBoxSize: {
      es: 'Seleccionar tamaño',
      en: 'Select size'
    },
    totalWeightLabel: {
      es: 'Peso Total',
      en: 'Total Weight'
    },
    actualWeightLabel: {
      es: 'Peso Real',
      en: 'Actual Weight'
    },
    declaredValueLabel: {
      es: 'Valor Declarado',
      en: 'Declared Value'
    },
    ivaAmountLabel: {
      es: 'Monto IVA',
      en: 'IVA Amount'
    },
    shippingCostLabel: {
      es: 'Costo de Envío',
      en: 'Shipping Cost'
    },
    handlingFeeLabel: {
      es: 'Tarifa de Manejo',
      en: 'Handling Fee'
    },
    quotedAmountLabel: {
      es: 'Monto Cotizado',
      en: 'Quoted Amount'
    },
    amountPaidLabel: {
      es: 'Monto Pagado',
      en: 'Amount Paid'
    },
    dhlWaybillLabel: {
      es: 'Número de Guía DHL',
      en: 'DHL Waybill Number'
    },
    paymentLinkLabel: {
      es: 'Link de Pago',
      en: 'Payment Link'
    },
    paidAtLabel: {
      es: 'Fecha de Pago',
      en: 'Paid At'
    },
    quoteSentAtLabel: {
      es: 'Cotización Enviada',
      en: 'Quote Sent At'
    },
    shippedAtLabel: {
      es: 'Fecha de Envío',
      en: 'Shipped At'
    },
    deliveredAtLabel: {
      es: 'Fecha de Entrega',
      en: 'Delivered At'
    },
    estimatedDeliveryLabel: {
      es: 'Entrega Estimada',
      en: 'Estimated Delivery'
    },
    notesPlaceholder: {
      es: 'Notas internas sobre esta orden...',
      en: 'Internal notes about this order...'
    },
    deliveryAddressTitle: {
      es: 'Dirección de Entrega',
      en: 'Delivery Address'
    },
    streetLabel: {
      es: 'Calle',
      en: 'Street'
    },
    streetPlaceholder: {
      es: 'Nombre de la calle',
      en: 'Street name'
    },
    exteriorNumberLabel: {
      es: 'Número Exterior',
      en: 'Exterior Number'
    },
    exteriorNumberPlaceholder: {
      es: '123',
      en: '123'
    },
    interiorNumberLabel: {
      es: 'Número Interior',
      en: 'Interior Number'
    },
    interiorNumberPlaceholder: {
      es: 'Opcional',
      en: 'Optional'
    },
    coloniaLabel: {
      es: 'Colonia',
      en: 'Neighborhood'
    },
    coloniaPlaceholder: {
      es: 'Nombre de la colonia',
      en: 'Neighborhood name'
    },
    municipioLabel: {
      es: 'Municipio/Delegación',
      en: 'Municipality'
    },
    municipioPlaceholder: {
      es: 'Municipio o delegación',
      en: 'Municipality'
    },
    estadoLabel: {
      es: 'Estado',
      en: 'State'
    },
    selectEstado: {
      es: 'Selecciona un estado',
      en: 'Select a state'
    },
    postalCodeLabel: {
      es: 'Código Postal',
      en: 'Postal Code'
    },
    postalCodePlaceholder: {
      es: '12345',
      en: '12345'
    },
    referenciasLabel: {
      es: 'Referencias',
      en: 'References'
    },
    referenciasPlaceholder: {
      es: 'Entre calles, puntos de referencia, color de la casa, etc.',
      en: 'Between streets, landmarks, house color, etc.'
    },
    ruralAreaLabel: {
      es: 'Zona Rural',
      en: 'Rural Area'
    },
    ruralAreaDescription: {
      es: 'Marca si la dirección está en una zona rural.',
      en: 'Check if the address is in a rural area.'
    },
    ruralSurchargeLabel: {
      es: 'Recargo Rural',
      en: 'Rural Surcharge'
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel'
    },
    saveChanges: {
      es: 'Guardar Cambios',
      en: 'Save Changes'
    },
    saving: {
      es: 'Guardando...',
      en: 'Saving...'
    },
    orderUpdatedSuccess: {
      es: 'Orden actualizada exitosamente',
      en: 'Order updated successfully'
    },
    generalError: {
      es: 'Ocurrió un error. Por favor, intenta de nuevo.',
      en: 'An error occurred. Please try again.'
    },
    // Status translations
    collecting: {
      es: 'Agregando Artículos',
      en: 'Adding Items'
    },
    awaitingPackages: {
      es: 'Esperando Paquetes',
      en: 'Awaiting Packages'
    },
    packagesComplete: {
      es: 'Paquetes Completos',
      en: 'Packages Complete'
    },
    processing: {
      es: 'Procesando',
      en: 'Processing'
    },
    quoteSent: {
      es: 'Cotización Enviada',
      en: 'Quote Sent'
    },
    paid: {
      es: 'Pagado',
      en: 'Paid'
    },
    shipped: {
      es: 'Enviado',
      en: 'Shipped'
    },
    delivered: {
      es: 'Entregado',
      en: 'Delivered'
    },
    cancelled: {
      es: 'Cancelado',
      en: 'Cancelled'
    }
  }
  
  // Get reactive translations
  const t = createTranslations(translations)
  
  // Computed
  const hasChanges = computed(() => {
    return JSON.stringify(form.value) !== JSON.stringify(originalData.value)
  })
  
  const getStatusColor = (status) => {
    const colors = {
      collecting: 'bg-primary-100 text-primary-700',
      awaiting_packages: 'bg-amber-100 text-amber-700',
      packages_complete: 'bg-primary-100 text-primary-700',
      processing: 'bg-primary-100 text-primary-700',
      quote_sent: 'bg-orange-100 text-orange-700',
      paid: 'bg-green-100 text-green-700',
      shipped: 'bg-primary-100 text-primary-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }
  
  const getStatusLabel = (status) => {
    return t.value[status.replace('_', '')] || status
  }
  
  // Helper function to format datetime for input
  const formatDateTimeForInput = (date) => {
    if (!date) return null
    const d = new Date(date)
    if (isNaN(d.getTime())) return null
    // Format as YYYY-MM-DDTHH:mm for datetime-local input
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }
  
  // Helper function to format date for input
  const formatDateForInput = (date) => {
    if (!date) return null
    const d = new Date(date)
    if (isNaN(d.getTime())) return null
    // Format as YYYY-MM-DD for date input
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  // Methods
  const fetchOrder = async () => {
    loading.value = true
    try {
      const response = await $customFetch(`/admin/orders/${orderId}`)
      order.value = response.data
      
      // Populate form with current data
      form.value = {
        status: order.value.status || '',
        box_size: order.value.box_size || '',
        box_price: order.value.box_price || null,
        declared_value: order.value.declared_value || null,
        iva_amount: order.value.iva_amount || null,
        is_rural: order.value.is_rural || false,
        rural_surcharge: order.value.rural_surcharge || null,
        delivery_address: {
          street: order.value.delivery_address?.street || '',
          exterior_number: order.value.delivery_address?.exterior_number || '',
          interior_number: order.value.delivery_address?.interior_number || '',
          colonia: order.value.delivery_address?.colonia || '',
          municipio: order.value.delivery_address?.municipio || '',
          estado: order.value.delivery_address?.estado || '',
          postal_code: order.value.delivery_address?.postal_code || '',
          referencias: order.value.delivery_address?.referencias || ''
        },
        total_weight: order.value.total_weight || null,
        actual_weight: order.value.actual_weight || null,
        shipping_cost: order.value.shipping_cost || null,
        handling_fee: order.value.handling_fee || null,
        insurance_fee: order.value.insurance_fee || null,
        quoted_amount: order.value.quoted_amount || null,
        amount_paid: order.value.amount_paid || null,
        currency: order.value.currency || 'mxn',
        notes: order.value.notes || '',
        paid_at: formatDateTimeForInput(order.value.paid_at),
        completed_at: formatDateTimeForInput(order.value.completed_at),
        processing_started_at: formatDateTimeForInput(order.value.processing_started_at),
        quote_sent_at: formatDateTimeForInput(order.value.quote_sent_at),
        quote_expires_at: formatDateTimeForInput(order.value.quote_expires_at),
        shipped_at: formatDateTimeForInput(order.value.shipped_at),
        delivered_at: formatDateTimeForInput(order.value.delivered_at),
        estimated_delivery_date: formatDateForInput(order.value.estimated_delivery_date),
        actual_delivery_date: formatDateForInput(order.value.actual_delivery_date),
        dhl_waybill_number: order.value.dhl_waybill_number || '',
        stripe_invoice_id: order.value.stripe_invoice_id || '',
        payment_link: order.value.payment_link || ''
      }
      
      // Store original data for comparison
      originalData.value = JSON.parse(JSON.stringify(form.value))
      
    } catch (error) {
      console.error('Error fetching order:', error)
      $toast.error(t.value.generalError)
      await router.push('/app/admin/orders')
    } finally {
      loading.value = false
    }
  }
  
  const handleSubmit = async () => {
    if (!hasChanges.value) return
  
    saving.value = true
    errorMessage.value = ''
  
    try {
      // Prepare the data - only send changed fields
      const updates = {}
      
      // Check each field for changes
      if (form.value.status !== originalData.value.status) updates.status = form.value.status
      if (form.value.box_size !== originalData.value.box_size) updates.box_size = form.value.box_size
      if (form.value.box_price !== originalData.value.box_price) updates.box_price = form.value.box_price
      if (form.value.declared_value !== originalData.value.declared_value) updates.declared_value = form.value.declared_value
      if (form.value.iva_amount !== originalData.value.iva_amount) updates.iva_amount = form.value.iva_amount
      if (form.value.is_rural !== originalData.value.is_rural) updates.is_rural = form.value.is_rural
      if (form.value.rural_surcharge !== originalData.value.rural_surcharge) updates.rural_surcharge = form.value.rural_surcharge
      if (JSON.stringify(form.value.delivery_address) !== JSON.stringify(originalData.value.delivery_address)) {
        updates.delivery_address = form.value.delivery_address
      }
      if (form.value.total_weight !== originalData.value.total_weight) updates.total_weight = form.value.total_weight
      if (form.value.actual_weight !== originalData.value.actual_weight) updates.actual_weight = form.value.actual_weight
      if (form.value.shipping_cost !== originalData.value.shipping_cost) updates.shipping_cost = form.value.shipping_cost
      if (form.value.handling_fee !== originalData.value.handling_fee) updates.handling_fee = form.value.handling_fee
      if (form.value.insurance_fee !== originalData.value.insurance_fee) updates.insurance_fee = form.value.insurance_fee
      if (form.value.quoted_amount !== originalData.value.quoted_amount) updates.quoted_amount = form.value.quoted_amount
      if (form.value.amount_paid !== originalData.value.amount_paid) updates.amount_paid = form.value.amount_paid
      if (form.value.currency !== originalData.value.currency) updates.currency = form.value.currency
      if (form.value.notes !== originalData.value.notes) updates.notes = form.value.notes
      if (form.value.paid_at !== originalData.value.paid_at) updates.paid_at = form.value.paid_at
      if (form.value.quote_sent_at !== originalData.value.quote_sent_at) updates.quote_sent_at = form.value.quote_sent_at
      if (form.value.shipped_at !== originalData.value.shipped_at) updates.shipped_at = form.value.shipped_at
      if (form.value.delivered_at !== originalData.value.delivered_at) updates.delivered_at = form.value.delivered_at
      if (form.value.estimated_delivery_date !== originalData.value.estimated_delivery_date) updates.estimated_delivery_date = form.value.estimated_delivery_date
      if (form.value.dhl_waybill_number !== originalData.value.dhl_waybill_number) updates.dhl_waybill_number = form.value.dhl_waybill_number
      if (form.value.payment_link !== originalData.value.payment_link) updates.payment_link = form.value.payment_link
  
      const response = await $customFetch(`/admin/management/orders/${orderId}`, {
        method: 'PUT',
        body: updates
      })
  
      if (response.success) {
        $toast.success(t.value.orderUpdatedSuccess)
        await router.push(`/app/admin/orders/${orderId}`)
      }
    } catch (error) {
      console.error('Error updating order:', error)
      errorMessage.value = error.data?.message || t.value.generalError
      $toast.error(errorMessage.value)
    } finally {
      saving.value = false
    }
  }
  
  // Lifecycle
  onMounted(() => {
    fetchOrder()
  })
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
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  </style>