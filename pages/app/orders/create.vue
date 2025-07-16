<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <NuxtLink 
              v-if="currentStep == 1"
              to="/app/orders" 
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
              v-for="i in 5" 
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
          <span class="text-sm font-medium text-gray-700">{{ t.step }} {{ currentStep }} {{ t.of }} 5</span>
          <span class="text-sm text-gray-500">{{ stepLabels[currentStep - 1] }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary-500 h-2 rounded-full transition-all duration-300"
            :style="`width: ${(currentStep / 5) * 100}%`"
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
                    <h3 class="font-semibold text-gray-900 text-lg">{{ getBoxTranslations(box).name }}</h3>
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
                    <div v-if="box.max_weight || box.metadata?.max_weight" class="flex items-center gap-2 text-sm">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                      </svg>
                      <span class="text-gray-700">
                        <span class="font-medium">{{ t.maxWeight }}:</span> 
                        {{ box.max_weight || box.metadata?.max_weight }}kg {{ t.maximum }}
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

        <!-- Step 2: USA Address Info -->
        <div v-show="currentStep === 2" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.usaAddressTitle }}</h2>
            
            <!-- USA Address Card -->
            <div class="mb-8 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 sm:p-8 border border-primary-200/50">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-primary-100 rounded-xl">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">{{ t.yourUSAddress }}</h3>
                  </div>
                  <div class="space-y-2">
                    <p class="text-lg font-semibold text-gray-900">{{ user?.name || 'Loading...' }}</p>
                    <p class="text-gray-700">{{ poBoxAddress.line1 }}</p>
                    <p class="text-gray-700">{{ poBoxAddress.line2 }}</p>
                    <p class="text-gray-700">{{ poBoxAddress.line3 }}</p>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    @click="copyAddress" 
                    class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ copied ? t.copied : t.copyAddress }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Instructions -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 class="font-semibold text-blue-900 mb-3">{{ t.importantInstructions }}</h4>
              <ul class="space-y-2 text-sm text-blue-800">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ t.instruction1 }}
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ t.instruction2 }}
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ t.instruction3 }}
                </li>
              </ul>
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
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {{ t.continue }}
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 3: Declared Value -->
        <div v-show="currentStep === 3" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t.declaredValueTitle }}</h2>

            <!-- Declared Value Section -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h3 class="font-semibold text-gray-900 mb-3">{{ t.declaredValueSubtitle }}</h3>
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
              <div v-if="form.declared_value && form.declared_value > 0" class="mt-4 pt-4 border-t border-yellow-200">
                <div v-if="form.declared_value >= 50" class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">{{ t.ivaLabel }}:</span>
                  <span class="font-semibold text-gray-900">${{ ivaAmount.toFixed(2) }} USD</span>
                </div>
                <div v-else class="text-sm text-green-600 font-medium">
                  {{ t.noIvaRequired }}
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
              :disabled="!form.declared_value"
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {{ t.continue }}
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 4: Mexico Delivery Address -->
        <div v-show="currentStep === 4" class="animate-fadeIn">
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
              :disabled="!isFormValid"
              class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {{ t.continue }}
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 5: Overview & Checkout - Clean Receipt Style -->
        <div v-show="currentStep === 5" class="animate-fadeIn">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Simple Header -->
            <div class="border-b border-gray-200 px-6 py-4">
              <h2 class="text-xl font-semibold text-gray-900">{{ t.orderOverview }}</h2>
              <p class="text-sm text-gray-600">{{ t.reviewBeforePayment }}</p>
            </div>

            <!-- Content -->
            <div class="p-6">
              <!-- Order Details Section -->
              <div class="space-y-6">
                <!-- Box Details -->
                <div>
                  <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">{{ t.orderDetails }}</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-gray-900 font-medium">{{ getBoxTranslations(selectedBox).name }}</p>
                        <p class="text-sm text-gray-500">{{ selectedBox?.dimensions || selectedBox?.metadata?.dimensions }}</p>
                      </div>
                      <p class="text-gray-900 font-medium">${{ selectedBox?.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-200"></div>

                <!-- Addresses -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Ship From -->
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">{{ t.shipFrom }}</h3>
                    <div class="text-sm text-gray-700 space-y-1">
                      <p class="font-medium">{{ user?.name }}</p>
                      <p>{{ poBoxAddress.line1 }}</p>
                      <p>{{ poBoxAddress.line2 }}</p>
                      <p>{{ poBoxAddress.line3 }}</p>
                    </div>
                  </div>

                  <!-- Ship To -->
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      {{ t.shipTo }}
                      <span v-if="form.is_rural" class="ml-2 text-xs font-normal text-orange-600">({{ t.ruralArea }})</span>
                    </h3>
                    <div class="text-sm text-gray-700 space-y-1">
                      <p>{{ form.delivery_address.street }} {{ form.delivery_address.exterior_number }}{{ form.delivery_address.interior_number ? ` Int. ${form.delivery_address.interior_number}` : '' }}</p>
                      <p>{{ form.delivery_address.colonia }}, {{ form.delivery_address.municipio }}</p>
                      <p>{{ form.delivery_address.estado }} {{ form.delivery_address.postal_code }}</p>
                      <p v-if="form.delivery_address.referencias" class="text-gray-500 italic">{{ form.delivery_address.referencias }}</p>
                    </div>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-200"></div>

                <!-- Price Breakdown -->
                <div>
                  <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">{{ t.priceBreakdown }}</h3>
                  <div class="space-y-2">
                    <!-- Box Price -->
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">{{ getBoxTranslations(selectedBox).name }}</span>
                      <span class="text-gray-900">${{ selectedBox?.price.toFixed(2) }}</span>
                    </div>

                    <!-- Declared Value Info -->
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">{{ t.declaredValue }}</span>
                      <span class="text-gray-900">${{ (form.declared_value || 0).toFixed(2) }}</span>
                    </div>

                    <!-- IVA if applicable -->
                    <div v-if="form.declared_value && form.declared_value >= 50" class="flex justify-between text-sm">
                      <span class="text-gray-600">{{ t.ivaLabel }} (16%)</span>
                      <span class="text-gray-900">${{ ivaAmount.toFixed(2) }}</span>
                    </div>

                    <!-- Rural Surcharge if applicable -->
                    <div v-if="form.is_rural && ruralSurcharge" class="flex justify-between text-sm">
                      <span class="text-gray-600">{{ t.ruralDeliveryFee }}</span>
                      <span class="text-gray-900">${{ ruralSurcharge.price.toFixed(2) }}</span>
                    </div>

                    <!-- Total Line -->
                    <div class="border-t border-gray-200 pt-3 mt-3">
                      <div class="flex justify-between">
                        <span class="text-base font-semibold text-gray-900">{{ t.total }}</span>
                        <span class="text-base font-semibold text-gray-900">${{ totalAmount.toFixed(2) }} USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="button"
              @click="previousStep"
              class="order-2 sm:order-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
              </svg>
              {{ t.back }}
            </button>
            
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="order-1 sm:order-2 px-8 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? t.processing : t.proceedToPayment }}</span>
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

// State for copy functionality
const copied = ref(false)

// PO Box Address
const poBoxAddress = computed(() => ({
  line1: `ETC`,
  line2: '2220 Otay Lakes Rd, Ste 502 PMB 95, ',
  line3: 'Chula Vista, CA 91915 USA'
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
  return (form.value.declared_value && form.value.declared_value >= 50) ? form.value.declared_value * 0.16 : 0
})

const totalAmount = computed(() => {
  const boxPrice = selectedBox.value?.price || 0
  const rural = (form.value.is_rural && ruralSurcharge.value) ? ruralSurcharge.value.price : 0
  return boxPrice + ivaAmount.value + rural
})

const isFormValid = computed(() => {
  if (currentStep.value === 4) {
    const addr = form.value.delivery_address
    return addr.street && addr.exterior_number && addr.colonia && 
           addr.municipio && addr.estado && addr.postal_code && 
           /^\d{5}$/.test(addr.postal_code)
  }
  return true
})

const stepLabels = computed(() => [
  t.value.selectBox,
  t.value.usaAddress,
  t.value.declaredValue,
  t.value.deliveryAddress,
  t.value.overview
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
  usaAddress: {
    es: 'Dirección USA',
    en: 'USA Address'
  },
  declaredValue: {
    es: 'Valor Declarado',
    en: 'Declared Value'
  },
  deliveryAddress: {
    es: 'Dirección de Entrega',
    en: 'Delivery Address'
  },
  overview: {
    es: 'Resumen',
    en: 'Overview'
  },
  selectBoxSize: {
    es: 'Selecciona el Tamaño de tu Caja',
    en: 'Select Your Box Size'
  },
  maxDimensions: {
    es: 'Dimensiones máximas',
    en: 'Maximum dimensions'
  },
  maxWeight: {
    es: 'Peso máximo',
    en: 'Max weight'
  },
  maximum: {
    es: 'máximo',
    en: 'maximum'
  },
  continue: {
    es: 'Continuar',
    en: 'Continue'
  },
  back: {
    es: 'Atrás',
    en: 'Back'
  },
  declaredValueTitle: {
    es: 'Valor Declarado para Aduana',
    en: 'Declared Value for Customs'
  },
  declaredValueSubtitle: {
    es: 'Valor Declarado',
    en: 'Declared Value'
  },
  usaAddressTitle: {
    es: 'Tu Dirección en Estados Unidos',
    en: 'Your USA Address'
  },
  yourUSAddress: {
    es: 'Tu Dirección en USA',
    en: 'Your USA Address'
  },
  copyAddress: {
    es: 'Copiar Dirección',
    en: 'Copy Address'
  },
  copied: {
    es: 'Copiado',
    en: 'Copied'
  },
  importantInstructions: {
    es: 'Instrucciones Importantes',
    en: 'Important Instructions'
  },
  instruction1: {
    es: 'Usa esta dirección exacta cuando compres en tiendas de Estados Unidos',
    en: 'Use this exact address when shopping at US stores'
  },
  instruction2: {
    es: 'Asegúrate de incluir tu código PC completo en la primera línea',
    en: 'Make sure to include your complete PC code in the first line'
  },
  instruction3: {
    es: 'Una vez que tus paquetes lleguen, los consolidaremos y enviaremos a México',
    en: 'Once your packages arrive, we will consolidate and ship them to Mexico'
  },
  declaredValueDescription: {
    es: 'Ingresa el valor total estimado de los productos que planeas enviar en esta orden. El IVA (16%) solo aplica para valores de $50 USD o más.',
    en: 'Enter the estimated total value of all items you plan to ship in this order. The 16% import tax (IVA) only applies to values of $50 USD or more.'
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
  noIvaRequired: {
    es: '✓ No se requiere IVA para valores menores a $50 USD',
    en: '✓ No VAT required for values under $50 USD'
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
  orderOverview: {
    es: 'Resumen de tu Orden',
    en: 'Order Overview'
  },
  selectedBox: {
    es: 'Caja Seleccionada',
    en: 'Selected Box'
  },
  shippingToUS: {
    es: 'Envío a Estados Unidos',
    en: 'Shipping to USA'
  },
  deliveryToMexico: {
    es: 'Entrega en México',
    en: 'Delivery to Mexico'
  },
  totalValue: {
    es: 'Valor total',
    en: 'Total value'
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
  },
  // Product translations
  extraSmallBoxName: {
    es: 'Caja Extra Pequeña',
    en: 'Extra Small Box'
  },
  smallBoxName: {
    es: 'Caja Pequeña',
    en: 'Small Box'
  },
  mediumBoxName: {
    es: 'Caja Mediana',
    en: 'Medium Box'
  },
  largeBoxName: {
    es: 'Caja Grande',
    en: 'Large Box'
  },
  extraLargeBoxName: {
    es: 'Caja Extra Grande',
    en: 'Extra Large Box'
  }
}

// Get reactive translations
const t = createTranslations(translations)

// Methods
const getBoxTranslations = (box) => {
  if (!box) return { name: '' }
  
  // Map Stripe product names to our translations
  const typeMapping = {
    'Extra Small': {
      name: t.value.extraSmallBoxName
    },
    'Small Box': {
      name: t.value.smallBoxName
    },
    'Medium Box': {
      name: t.value.mediumBoxName
    },
    'Large Box': {
      name: t.value.largeBoxName
    },
    'Extra Large': {
      name: t.value.extraLargeBoxName
    }
  }
  
  return typeMapping[box.name] || {
    name: box.name
  }
}

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
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

const copyAddress = async () => {
  const addressText = `\n${poBoxAddress.value.line1} ${user?.name || ''}\n${poBoxAddress.value.line2}\n${poBoxAddress.value.line3}`
  
  try {
    await navigator.clipboard.writeText(addressText)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy address:', err)
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