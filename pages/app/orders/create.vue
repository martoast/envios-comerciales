<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/pricing" 
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.checkoutTitle }}</h1>
              <p class="text-sm text-gray-600 mt-1">{{ t.checkoutSubtitle }}</p>
            </div>
          </div>
          
          <!-- Step indicator desktop -->
          <div class="hidden sm:flex items-center gap-2">
            <div 
              v-for="i in 3" 
              :key="i"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-300',
                currentStep >= i ? 'bg-primary-500 w-8' : 'bg-gray-300'
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Progress bar mobile -->
      <div class="sm:hidden mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">{{ t.step }} {{ currentStep }} {{ t.of }} 3</span>
          <span class="text-sm text-gray-500">{{ stepLabels[currentStep - 1] }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary-500 h-2 rounded-full transition-all duration-300"
            :style="`width: ${(currentStep / 3) * 100}%`"
          ></div>
        </div>
      </div>

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

      <!-- Form Steps -->
      <form @submit.prevent="handleCheckout" class="space-y-6">
        <!-- Step 1: Box Selection -->
        <div v-show="currentStep === 1" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.selectBoxSize }}</h2>
            
            <!-- Loading State -->
            <div v-if="loadingProducts" class="flex items-center justify-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
                <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <!-- Box Options -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <label
                v-for="box in availableBoxes"
                :key="box.id"
                :class="[
                  'relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200',
                  selectedBox?.id === box.id 
                    ? 'border-primary-500 bg-primary-50 shadow-lg scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                ]"
              >
                <input
                  type="radio"
                  name="box"
                  :value="box.id"
                  v-model="selectedBoxId"
                  class="sr-only"
                />
                <div class="space-y-3">
                  <!-- Header with icon and check -->
                  <div class="flex items-start justify-between">
                    <div :class="[
                      'p-2 rounded-lg',
                      selectedBox?.id === box.id ? 'bg-primary-100' : 'bg-gray-100'
                    ]">
                      <svg class="w-6 h-6" :class="selectedBox?.id === box.id ? 'text-primary-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 12H5V9h4v3z"/>
                      </svg>
                    </div>
                    <div v-if="selectedBox?.id === box.id" class="flex-shrink-0">
                      <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Box Info -->
                  <div>
                    <h3 class="font-semibold text-gray-900 text-lg">{{ box.name }}</h3>
                    <p class="text-sm text-gray-600 mt-1">{{ box.description }}</p>
                  </div>

                  <!-- Dimensions and Weight -->
                  <div class="space-y-2 pt-2 border-t border-gray-100">
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                      </svg>
                      <span class="text-gray-700">
                        <span class="font-medium">{{ t.maxDimensions }}:</span> 
                        {{ box.dimensions || box.metadata?.dimensions }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                      </svg>
                      <span class="text-gray-700">
                        <span class="font-medium">{{ t.volumetricWeight }}:</span> 
                        ~{{ box.volumetric_weight || box.metadata?.volumetric_weight }}kg
                      </span>
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="pt-3">
                    <p class="text-2xl font-bold text-primary-600">
                      ${{ box.price }} {{ box.currency }}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <!-- Info Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-blue-900 mb-1">{{ t.fastShipping }}</h3>
                    <p class="text-sm text-blue-700">{{ t.fastShippingText }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-green-50 rounded-xl p-4 border border-green-100">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-green-900 mb-1">{{ t.fullTracking }}</h3>
                    <p class="text-sm text-green-700">{{ t.fullTrackingText }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-end mt-6">
            <button
              type="button"
              @click="nextStep"
              :disabled="!selectedBox"
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {{ t.continue }}
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 2: Order Details & Declared Value -->
        <div v-show="currentStep === 2" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.orderDetails }}</h2>
            
            <!-- Order Name -->
            <div class="mb-6">
              <label for="order_name" class="block text-sm font-semibold text-gray-900 mb-2">
                {{ t.orderNameLabel }}
              </label>
              <input
                v-model="form.order_name"
                type="text"
                id="order_name"
                :placeholder="t.orderNamePlaceholder"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                required
              >
              <p class="mt-2 text-sm text-gray-500">{{ t.orderNameHint }}</p>
            </div>

            <!-- Declared Value Section -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">{{ t.declaredValueTitle }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ t.declaredValueDescription }}</p>
              
              <div>
                <label for="declared_value" class="block text-sm font-semibold text-gray-900 mb-2">
                  {{ t.totalDeclaredValue }}
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    v-model.number="form.declared_value"
                    type="number"
                    id="declared_value"
                    min="1"
                    max="99999"
                    step="0.01"
                    class="pl-8 w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    required
                  />
                </div>
                <p class="text-xs text-gray-500 mt-2">{{ t.declaredValueWarning }}</p>
              </div>
              
              <!-- IVA Calculation Display -->
              <div v-if="form.declared_value > 0" class="mt-4 pt-4 border-t border-yellow-200">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">{{ t.ivaLabel }}:</span>
                  <span class="font-semibold text-gray-900">${{ ivaAmount.toFixed(2) }} USD</span>
                </div>
              </div>
            </div>

            
          </div>

          <!-- Navigation -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              @click="previousStep"
              class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
              </svg>
              {{ t.back }}
            </button>
            
            <button
              type="button"
              @click="nextStep"
              :disabled="!form.order_name || !form.declared_value"
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {{ t.continue }}
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 3: Delivery Address -->
        <div v-show="currentStep === 3" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.deliveryAddressTitle }}</h2>
            
            <!-- Address Form -->
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
                  required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    <p v-if="ruralSurcharge" class="text-sm font-medium text-yellow-700 mt-1">
                      +${{ ruralSurcharge.price.toFixed(2) }} {{ ruralSurcharge.currency }}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 class="font-semibold text-gray-900 mb-4">{{ t.orderSummary }}</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ selectedBox?.name }}</span>
                  <span class="font-medium text-gray-900">${{ selectedBox?.price.toFixed(2) }}</span>
                </div>
                <div v-if="form.declared_value > 0" class="flex justify-between">
                  <span class="text-gray-600">{{ t.ivaLabel }} (16% {{ t.of }} ${{ form.declared_value }})</span>
                  <span class="font-medium text-gray-900">${{ ivaAmount.toFixed(2) }}</span>
                </div>
                <div v-if="form.is_rural && ruralSurcharge" class="flex justify-between">
                  <span class="text-gray-600">{{ t.ruralSurcharge }}</span>
                  <span class="font-medium text-gray-900">${{ ruralSurcharge.price.toFixed(2) }}</span>
                </div>
                <div class="border-t pt-3 font-semibold">
                  <div class="flex justify-between">
                    <span>{{ t.total }}</span>
                    <span class="text-lg text-primary-600">${{ totalAmount.toFixed(2) }} USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              @click="previousStep"
              class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
              </svg>
              {{ t.back }}
            </button>
            
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!loading">{{ t.proceedToPayment }}</span>
              <span v-else>{{ t.processing }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Define page meta
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer']
})

// Nuxt imports
const { $customFetch } = useNuxtApp()
const { $toast } = useNuxtApp()
const route = useRoute()
const user = useUser().value

// Use the language composable
const { t: createTranslations } = useLanguage()

// State
const currentStep = ref(1)
const loading = ref(false)
const loadingProducts = ref(true)
const errorMessage = ref('')
const availableBoxes = ref([])
const ruralSurcharge = ref(null)
const selectedBoxId = ref(route.query.box || null)

// Form data
const form = ref({
  order_name: '',
  declared_value: null,
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
  is_rural: false
})

// PO Box Address
const poBoxAddress = computed(() => ({
  line1: `PC-${user?.id || 'XXXX'}`,
  line2: '1234 E Aviation Blvd, Suite 200',
  line3: 'El Segundo, CA 90245, USA'
}))

// Mexican states
const mexicanStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit',
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

// Computed
const selectedBox = computed(() => {
  return availableBoxes.value.find(box => box.id === selectedBoxId.value)
})

const ivaAmount = computed(() => {
  return form.value.declared_value ? form.value.declared_value * 0.16 : 0
})

const totalAmount = computed(() => {
  const boxPrice = selectedBox.value?.price || 0
  const rural = (form.value.is_rural && ruralSurcharge.value) ? ruralSurcharge.value.price : 0
  return boxPrice + ivaAmount.value + rural
})

const isFormValid = computed(() => {
  if (currentStep.value === 3) {
    const addr = form.value.delivery_address
    return addr.street && addr.exterior_number && addr.colonia && 
           addr.municipio && addr.estado && addr.postal_code && 
           /^\d{5}$/.test(addr.postal_code)
  }
  return true
})

const stepLabels = computed(() => [
  t.value.selectBox,
  t.value.orderDetails,
  t.value.deliveryAddress
])

// Translations
const translations = {
  checkoutTitle: {
    es: 'Crear Nueva Orden',
    en: 'Create New Order'
  },
  checkoutSubtitle: {
    es: 'Selecciona tu caja y completa tu información',
    en: 'Select your box and complete your information'
  },
  step: {
    es: 'Paso',
    en: 'Step'
  },
  of: {
    es: 'de',
    en: 'of'
  },
  selectBox: {
    es: 'Seleccionar Caja',
    en: 'Select Box'
  },
  orderDetails: {
    es: 'Detalles de la Orden',
    en: 'Order Details'
  },
  deliveryAddress: {
    es: 'Dirección de Entrega',
    en: 'Delivery Address'
  },
  selectBoxSize: {
    es: 'Selecciona el Tamaño de tu Caja',
    en: 'Select Your Box Size'
  },
  maxDimensions: {
    es: 'Dimensiones máximas',
    en: 'Maximum dimensions'
  },
  volumetricWeight: {
    es: 'Peso volumétrico',
    en: 'Volumetric weight'
  },
  fastShipping: {
    es: 'Envío Rápido',
    en: 'Fast Shipping'
  },
  fastShippingText: {
    es: '3-5 días hábiles a cualquier parte de México',
    en: '3-5 business days anywhere in Mexico'
  },
  fullTracking: {
    es: 'Rastreo Completo',
    en: 'Full Tracking'
  },
  fullTrackingText: {
    es: 'Rastrea tu paquete desde USA hasta tu puerta',
    en: 'Track your package from USA to your door'
  },
  continue: {
    es: 'Continuar',
    en: 'Continue'
  },
  back: {
    es: 'Atrás',
    en: 'Back'
  },
  orderNameLabel: {
    es: 'Nombre de la Orden',
    en: 'Order Name'
  },
  orderNamePlaceholder: {
    es: 'Ej: Compras de Navidad',
    en: 'Ex: Christmas Shopping'
  },
  orderNameHint: {
    es: 'Dale un nombre descriptivo a tu orden para identificarla fácilmente',
    en: 'Give your order a descriptive name to easily identify it'
  },
  declaredValueTitle: {
    es: 'Valor Declarado para Aduana',
    en: 'Declared Value for Customs'
  },
  declaredValueDescription: {
    es: 'Ingresa el valor total estimado de los productos que planeas enviar en esta orden. Esto se usa para calcular el IVA (16%).',
    en: 'Enter the estimated total value of all items you plan to ship in this order. This is used to calculate the 16% import tax (IVA).'
  },
  totalDeclaredValue: {
    es: 'Valor Total Declarado (USD)',
    en: 'Total Declared Value (USD)'
  },
  declaredValueWarning: {
    es: 'Se preciso - la aduana puede verificar este valor',
    en: 'Be accurate - customs may verify this value'
  },
  ivaLabel: {
    es: 'IVA (16%)',
    en: 'VAT (16%)'
  },
  useThisAddress: {
    es: 'Usa esta dirección en tus compras:',
    en: 'Use this address for your purchases:'
  },
  deliveryAddressTitle: {
    es: 'Dirección de Entrega en México',
    en: 'Delivery Address in Mexico'
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
    es: 'Marca esta casilla si tu dirección está en una zona rural. Se aplicará un cargo adicional.',
    en: 'Check this box if your address is in a rural area. An additional charge will apply.'
  },
  ruralSurcharge: {
    es: 'Cargo por zona rural',
    en: 'Rural surcharge'
  },
  orderSummary: {
    es: 'Resumen de la Orden',
    en: 'Order Summary'
  },
  total: {
    es: 'Total',
    en: 'Total'
  },
  proceedToPayment: {
    es: 'Proceder al Pago',
    en: 'Proceed to Payment'
  },
  processing: {
    es: 'Procesando...',
    en: 'Processing...'
  },
  generalError: {
    es: 'Ocurrió un error. Por favor, intenta de nuevo.',
    en: 'An error occurred. Please try again.'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const fetchProducts = async () => {
  try {
    loadingProducts.value = true
    const response = await $customFetch('/products')
    
    // The response has data array and rural_surcharge
    availableBoxes.value = response.data
    ruralSurcharge.value = response.rural_surcharge
    
    // If box was pre-selected from query, validate it exists
    if (selectedBoxId.value && !selectedBox.value) {
      selectedBoxId.value = null
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    $toast.error('Error loading box options')
  } finally {
    loadingProducts.value = false
  }
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleCheckout = async () => {
  if (!isFormValid.value || !selectedBox.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $customFetch('/checkout', {
      method: 'POST',
      body: {
        price_id: selectedBox.value.stripe_price_id,
        order_name: form.value.order_name,
        declared_value: form.value.declared_value,
        delivery_address: form.value.delivery_address,
        is_rural: form.value.is_rural
      }
    })

    if (response.success && response.checkout_url) {
      // Redirect to Stripe Checkout
      window.location.href = response.checkout_url
    } else {
      throw new Error('Invalid response from server')
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    
    const errorMsg = error.data?.message || t.value.generalError
    $toast.error(errorMsg)
    errorMessage.value = errorMsg
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
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
  animation: fadeIn 0.6s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>