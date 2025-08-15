<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <NuxtLink 
              :to="`/app/admin/orders/${order?.id}`" 
              class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">{{ t.quoteManagement }}</h1>
              <p class="text-sm text-gray-500">{{ order?.order_number }}</p>
            </div>
          </div>

          <span v-if="order" :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            getStatusColor(order.status)
          ]">
            {{ getStatusLabel(order.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="mt-4 text-sm text-gray-600">{{ t.loading }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="order" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Status Alerts -->
      <div v-if="order.status === 'quote_sent'" class="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="font-medium text-green-900">{{ t.quoteSentSuccess }}</h3>
            <p class="text-sm text-green-700 mt-1">
              {{ t.quoteSentAt }}: {{ formatDate(order.quote_sent_at) }}
            </p>
            <p class="text-sm text-green-700">
              {{ t.expiresAt }}: {{ formatDate(order.quote_expires_at) }}
            </p>
            <a 
              v-if="order.payment_link"
              :href="order.payment_link" 
              target="_blank"
              class="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium mt-2"
            >
              {{ t.viewPaymentLink }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Quote Already Prepared Notice -->
      <div v-else-if="order.quote_breakdown && order.status === 'processing'" class="mb-6 bg-primary-50 border border-primary-200 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div class="flex-1">
            <h3 class="font-medium text-primary-900">{{ t.quotePrepared }}</h3>
            <p class="text-sm text-primary-700 mt-1">
              {{ t.quotePreparedMessage }}
            </p>
          </div>
          <button
            @click="showReviewModal = true"
            class="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {{ t.reviewAndSend }}
          </button>
        </div>
      </div>



      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Quote Builder -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer & Order Info -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.orderInformation }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">{{ t.customer }}</p>
                <p class="font-medium">{{ order.user.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.deliveryAddress }}</p>
                <p class="text-sm font-medium">
                  {{ order.delivery_address.municipio }}, {{ order.delivery_address.estado }}
                  <span v-if="order.is_rural" class="ml-1 text-amber-600">({{ t.rural }})</span>
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.actualWeight }}</p>
                <p class="font-medium">{{ calculateTotalWeight() }} kg</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.volumetricWeight }}</p>
                <p class="font-medium text-primary-600">{{ calculateTotalVolumetricWeight() }} kg</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ t.totalDimensions }}</p>
                <p class="font-medium">{{ calculateTotalDimensions() }}</p>
              </div>
            </div>
          </div>

          <!-- Items Summary -->
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">{{ t.itemsSummary }}</h2>
            </div>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="px-6 py-4"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ item.product_name }}</p>
                    
                    <!-- Proof of Purchase Link -->
                    <a
                      v-if="item.proof_of_purchase_url"
                      :href="item.proof_of_purchase_url"
                      target="_blank"
                      class="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 mt-1"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      {{ t.viewProofOfPurchase }}
                    </a>
                    
                    <p class="text-xs text-gray-500 mt-1">
                    {{ t.quantity }}: {{ item.quantity }} |
                    {{ t.weight }}: {{ item.weight || 0 }} kg
                    <template v-if="item.declared_value">
                      | {{ t.value }}: ${{ item.declared_value }}
                    </template>
                  </p>
                    
                    <!-- Dimensions if available -->
                    <p v-if="item.dimensions && (item.dimensions.length || item.dimensions.width || item.dimensions.height)" class="text-xs text-gray-500">
                      {{ t.dimensions }}: {{ formatDimensions(item.dimensions) }}
                    </p>
                  </div>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    item.arrived ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  ]">
                    {{ item.arrived ? t.arrived : t.pending }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quote Builder - Only show if quote not yet prepared -->
          <div v-if="!order.quote_breakdown || order.status === 'packages_complete'" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.quoteBuilder }}</h2>

            <div class="space-y-4">
              <!-- Weight Range Selection from Products API -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.weightRange }}</label>
                
                <!-- Loading boxes -->
                <div v-if="loadingBoxes" class="flex items-center py-2">
                  <svg class="animate-spin h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span class="ml-2 text-sm text-gray-600">{{ t.loadingBoxes }}</span>
                </div>
                
                <!-- Weight range dropdown -->
                <select
                  v-else
                  v-model="selectedBoxId"
                  @change="selectBox"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{{ t.selectWeightRange }}</option>
                  <option
                    v-for="product in availableBoxes"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.name }} - ${{ product.price.toFixed(2) }} MXN
                  </option>
                </select>
                
                <!-- Show total weight for reference -->
                <div class="mt-2 p-2 bg-gray-50 rounded-lg">
                  
                  <p class="text-xs text-gray-600">
                    <strong>{{ t.volumetricWeight }}:</strong> {{ calculateTotalVolumetricWeight() }} kg
                  </p>
                  
                  <p class="text-xs text-gray-500 mt-1">
                    {{ t.selectBasedOnWeight }}
                  </p>
                </div>
              </div>

              <!-- IVA Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.ivaAmount }}
                  <span class="text-gray-400 text-xs ml-1">({{ t.optional }})</span>
                </label>
                <div class="flex items-center gap-2">
                  <input
                    v-model.number="quoteForm.iva_amount"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-500">MXN</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ t.ivaNote }}
                </p>
              </div>

              <!-- Additional Charges Section -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.additionalCharges }}
                  <span class="text-gray-400 text-xs ml-1">({{ t.optional }})</span>
                </label>
                
                <div class="space-y-2">
                  <div 
                    v-for="(charge, index) in additionalCharges" 
                    :key="index"
                    class="flex gap-2"
                  >
                    <input
                      v-model="charge.description"
                      type="text"
                      :placeholder="t.chargeDescription"
                      class="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      v-model.number="charge.amount"
                      type="number"
                      step="0.01"
                      :placeholder="t.amount"
                      class="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      @click="removeAdditionalCharge(index)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button
                  @click="addAdditionalCharge"
                  class="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  + {{ t.addCharge }}
                </button>
              </div>

              <!-- Rural Surcharge Notice -->
              <div v-if="order.is_rural" class="p-3 bg-amber-50 rounded-lg">
                <p class="text-sm text-amber-800">
                  <strong>{{ t.note }}:</strong> {{ t.ruralAreaDetected }}
                </p>
              </div>
            </div>
          </div>

          <!-- Display Existing Quote if Already Prepared -->
          <div v-else-if="order.quote_breakdown && order.status === 'processing'" class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">{{ t.preparedQuote }}</h2>
              <button
                @click="editQuote"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {{ t.editQuote }}
              </button>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="(item, index) in order.quote_breakdown" 
                :key="index"
                class="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ item.item }}</p>
                  <p class="text-xs text-gray-500">{{ item.description }}</p>
                </div>
                <span class="text-sm font-semibold text-gray-900">
                  ${{ parseFloat(item.amount).toFixed(2) }} {{ item.currency || 'MXN' }}
                </span>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">{{ t.total }}</span>
                <span class="text-xl font-bold text-primary-600">
                  ${{ parseFloat(order.quoted_amount || 0).toFixed(2) }} MXN
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Preview & Actions -->
        <div class="space-y-6">
          <!-- Quote Preview (Only show while building) -->
          <div v-if="!order.quote_breakdown || order.status === 'packages_complete'" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.quotePreview }}</h2>
            
            <div class="space-y-2 mb-4">
              <div 
                v-for="(item, index) in getQuotePreview()" 
                :key="index"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600">{{ item.item }}</span>
                <span class="font-medium text-gray-900">${{ item.amount.toFixed(2) }}</span>
              </div>
              
              <div v-if="getQuotePreview().length === 0" class="text-center py-4 text-sm text-gray-500">
                {{ t.noItemsInQuote }}
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-900">{{ t.total }}</span>
                <span class="font-bold text-xl text-gray-900">
                  ${{ calculateQuoteTotal().toFixed(2) }} MXN
                </span>
              </div>
            </div>

            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-xs text-gray-600">
                <strong>{{ t.note }}:</strong> {{ t.quoteNote }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.actions }}</h2>
            
            <div class="space-y-3">
              <!-- Prepare Quote Button -->
              <button
                v-if="!order.quote_breakdown && (order.status === 'packages_complete' || order.status === 'processing')"
                @click="prepareQuote"
                :disabled="!canPrepareQuote || preparingQuote"
                class="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="preparingQuote" class="inline-flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ t.preparing }}
                </span>
                <span v-else>{{ t.prepareQuote }}</span>
              </button>

              <!-- Review and Send Button -->
              <button
                v-if="order.status === 'processing' && order.quote_breakdown"
                @click="showReviewModal = true"
                class="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                {{ t.reviewAndSend }}
              </button>
          
              <!-- Cancel Quote Button -->
              <button
                v-if="order.status === 'quote_sent'"
                @click="showCancelModal = true"
                class="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ t.cancelQuote }}
              </button>

              <!-- View Invoice -->
              <a
                v-if="order.stripe_invoice_id"
                :href="`https://dashboard.stripe.com/invoices/${order.stripe_invoice_id}`"
                target="_blank"
                class="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center block"
              >
                {{ t.viewInStripe }}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Review Quote Modal -->
    <TransitionRoot :show="showReviewModal" as="template">
      <Dialog class="relative z-50" @close="showReviewModal = false">
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
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.reviewQuote }}
                  </DialogTitle>

                  <!-- Customer Info -->
                  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-xs text-gray-500">{{ t.customer }}</p>
                        <p class="text-sm font-medium">{{ order.user.name }}</p>
                        <p class="text-xs text-gray-600">{{ order.user.email }}</p>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500">{{ t.orderNumber }}</p>
                        <p class="text-sm font-medium">{{ order.order_number }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Quote Items -->
                  <div class="mb-6">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">{{ t.quoteDetails }}</h3>
                    <div class="space-y-2">
                      <div 
                        v-for="(item, index) in (order?.quote_breakdown || [])" 
                        :key="index"
                        class="flex justify-between items-start p-3 bg-white border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ item.item }}</p>
                          <p class="text-xs text-gray-500">{{ item.description }}</p>
                        </div>
                        <span class="text-sm font-semibold text-gray-900">
                          ${{ parseFloat(item.amount).toFixed(2) }} {{ item.currency || 'MXN' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Total -->
                  <div class="border-t border-gray-200 pt-4 mb-6">
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-semibold text-gray-900">{{ t.total }}</span>
                      <span class="text-xl font-bold text-primary-600">
                        ${{ parseFloat(order?.quoted_amount || 0).toFixed(2) }} MXN
                      </span>
                    </div>
                  </div>

                  <!-- Send Copy to Admin Option -->
                  <div class="mb-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        v-model="sendQuoteForm.send_copy_to_admin"
                        type="checkbox"
                        class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ t.sendCopyToAdmin }}</span>
                    </label>
                  </div>

                  <!-- Warning Message -->
                  <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                    <p class="text-sm text-amber-800">
                      <strong>{{ t.important }}:</strong> {{ t.sendQuoteWarning }}
                    </p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-3">
                    <button
                      @click="sendQuote"
                      :disabled="sendingQuote"
                      class="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!sendingQuote">{{ t.sendQuoteToCustomer }}</span>
                      <span v-else class="inline-flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ t.sending }}
                      </span>
                    </button>
                    <button
                      @click="showReviewModal = false"
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

    <!-- Cancel Quote Modal -->
    <TransitionRoot :show="showCancelModal" as="template">
      <Dialog class="relative z-50" @close="showCancelModal = false">
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div class="p-6">
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-4">
                    {{ t.cancelQuoteTitle }}
                  </DialogTitle>

                  <p class="text-sm text-gray-600 mb-4">
                    {{ t.cancelQuoteMessage }}
                  </p>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.reason }}
                      <span class="text-gray-400">({{ t.optional }})</span>
                    </label>
                    <textarea
                      v-model="cancelReason"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    ></textarea>
                  </div>

                  <div class="mt-6 flex gap-3">
                    <button
                      @click="cancelQuote"
                      :disabled="cancellingQuote"
                      class="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      <span v-if="!cancellingQuote">{{ t.confirmCancel }}</span>
                      <span v-else>{{ t.cancelling }}</span>
                    </button>
                    <button
                      @click="showCancelModal = false"
                      class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                    >
                      {{ t.close }}
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
import { ref, computed, onMounted } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

// Page meta
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

// Nuxt imports
const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()

// Language composable
const { t: createTranslations } = useLanguage()

// State
const order = ref(null)
const loading = ref(true)
const loadingBoxes = ref(false)
const availableBoxes = ref([])
const selectedBoxId = ref('')
const selectedBox = ref(null)
const preparingQuote = ref(false)
const sendingQuote = ref(false)
const resendingQuote = ref(false)
const cancellingQuote = ref(false)
const showReviewModal = ref(false)
const showCancelModal = ref(false)
const cancelReason = ref('')

// Quote form for preparing
const quoteForm = ref({
  box_size: null,
  box_charge: null,
  iva_amount: null,
})

// Send quote form (separate for sending)
const sendQuoteForm = ref({
  send_copy_to_admin: false,
})

// Additional charges array
const additionalCharges = ref([])

// Translations
const translations = {
  quoteManagement: {
    es: 'Gestión de Cotización',
    en: 'Quote Management',
  },
  loading: {
    es: 'Cargando orden...',
    en: 'Loading order...',
  },
  loadingBoxes: {
    es: 'Cargando opciones de peso...',
    en: 'Loading weight options...',
  },
  weightRange: {
    es: 'Rango de Peso',
    en: 'Weight Range',
  },
  selectWeightRange: {
    es: 'Seleccionar rango de peso',
    en: 'Select weight range',
  },
  selectBasedOnWeight: {
    es: 'Selecciona el rango que corresponda al peso total del envío',
    en: 'Select the range that matches the total shipment weight',
  },
  actualWeight: {
    es: 'Peso Real',
    en: 'Actual Weight',
  },
  volumetricWeight: {
    es: 'Peso Volumétrico',
    en: 'Volumetric Weight',
  },
  totalWeight: {
    es: 'Peso Total',
    en: 'Total Weight',
  },
  totalDimensions: {
    es: 'Dimensiones del Paquete Consolidado',
    en: 'Consolidated Package Dimensions',
  },
  quoteSentSuccess: {
    es: 'Cotización enviada exitosamente',
    en: 'Quote sent successfully',
  },
  quoteSentAt: {
    es: 'Enviada el',
    en: 'Sent on',
  },
  expiresAt: {
    es: 'Expira el',
    en: 'Expires on',
  },
  viewPaymentLink: {
    es: 'Ver link de pago',
    en: 'View payment link',
  },
  wrongStatus: {
    es: 'La orden debe estar en estado "paquetes completos" o "procesando"',
    en: 'Order must be in "packages complete" or "processing" status',
  },
  notAllArrived: {
    es: 'No todos los paquetes han llegado',
    en: 'Not all packages have arrived',
  },
  notAllWeighed: {
    es: 'No todos los paquetes han sido pesados',
    en: 'Not all packages have been weighed',
  },
  orderInformation: {
    es: 'Información de la Orden',
    en: 'Order Information',
  },
  customer: {
    es: 'Cliente',
    en: 'Customer',
  },
  deliveryAddress: {
    es: 'Dirección de Entrega',
    en: 'Delivery Address',
  },
  rural: {
    es: 'Rural',
    en: 'Rural',
  },
  totalWeight: {
    es: 'Peso Total',
    en: 'Total Weight',
  },
  totalDeclaredValue: {
    es: 'Valor Total Declarado',
    en: 'Total Declared Value',
  },
  itemsSummary: {
    es: 'Resumen de Artículos',
    en: 'Items Summary',
  },
  quantity: {
    es: 'Cantidad',
    en: 'Quantity',
  },
  weight: {
    es: 'Peso',
    en: 'Weight',
  },
  value: {
    es: 'Valor',
    en: 'Value',
  },
  arrived: {
    es: 'Llegó',
    en: 'Arrived',
  },
  pending: {
    es: 'Pendiente',
    en: 'Pending',
  },
  quoteBuilder: {
    es: 'Constructor de Cotización',
    en: 'Quote Builder',
  },
  boxSize: {
    es: 'Tamaño de Caja',
    en: 'Box Size',
  },
  selectBoxOption: {
    es: 'Seleccionar caja',
    en: 'Select box',
  },
  ivaAmount: {
    es: 'IVA (16%)',
    en: 'VAT (16%)',
  },
  ivaNote: {
    es: 'Solo aplica si el valor declarado es $50 USD o más',
    en: 'Only applies if declared value is $50 USD or more',
  },
  optional: {
    es: 'Opcional',
    en: 'Optional',
  },
  additionalCharges: {
    es: 'Cargos Adicionales',
    en: 'Additional Charges',
  },
  chargeDescription: {
    es: 'Descripción del cargo',
    en: 'Charge description',
  },
  addCharge: {
    es: 'Agregar cargo',
    en: 'Add charge',
  },
  ruralAreaDetected: {
    es: 'Se detectó área rural. Considera agregar un cargo rural.',
    en: 'Rural area detected. Consider adding a rural surcharge.',
  },
  amount: {
    es: 'Monto',
    en: 'Amount',
  },
  customMessage: {
    es: 'Mensaje Personalizado',
    en: 'Custom Message',
  },
  customMessagePlaceholder: {
    es: 'Mensaje opcional para incluir en el correo de cotización',
    en: 'Optional message to include in quote email',
  },
  expiresInDays: {
    es: 'Expira en (días)',
    en: 'Expires in (days)',
  },
  sendCopyToAdmin: {
    es: 'Enviar copia al admin',
    en: 'Send copy to admin',
  },
  quotePreview: {
    es: 'Vista Previa de Cotización',
    en: 'Quote Preview',
  },
  preparedQuote: {
    es: 'Cotización Preparada',
    en: 'Prepared Quote',
  },
  total: {
    es: 'Total',
    en: 'Total',
  },
  note: {
    es: 'Nota',
    en: 'Note',
  },
  quoteNote: {
    es: 'Esta cotización incluye todos los costos de consolidación y envío a México.',
    en: 'This quote includes all consolidation and shipping costs to Mexico.',
  },
  actions: {
    es: 'Acciones',
    en: 'Actions',
  },
  prepareQuote: {
    es: 'Preparar Cotización',
    en: 'Prepare Quote',
  },
  preparing: {
    es: 'Preparando...',
    en: 'Preparing...',
  },
  sendQuoteToCustomer: {
    es: 'Enviar Cotización al Cliente',
    en: 'Send Quote to Customer',
  },
  sending: {
    es: 'Enviando...',
    en: 'Sending...',
  },
  resending: {
    es: 'Reenviando...',
    en: 'Resending...',
  },
  cancelQuote: {
    es: 'Cancelar Cotización',
    en: 'Cancel Quote',
  },
  viewInStripe: {
    es: 'Ver en Stripe',
    en: 'View in Stripe',
  },
  statusHistory: {
    es: 'Historial de Estado',
    en: 'Status History',
  },
  orderCreated: {
    es: 'Orden creada',
    en: 'Order created',
  },
  orderSubmitted: {
    es: 'Orden enviada',
    en: 'Order submitted',
  },
  processingStarted: {
    es: 'Procesamiento iniciado',
    en: 'Processing started',
  },
  quoteSent: {
    es: 'Cotización enviada',
    en: 'Quote sent',
  },
  reviewAndSend: {
    es: 'Revisar y Enviar',
    en: 'Review & Send',
  },
  editQuote: {
    es: 'Editar Cotización',
    en: 'Edit Quote',
  },
  reviewQuote: {
    es: 'Revisar Cotización',
    en: 'Review Quote',
  },
  orderNumber: {
    es: 'Número de Orden',
    en: 'Order Number',
  },
  quoteDetails: {
    es: 'Detalles de la Cotización',
    en: 'Quote Details',
  },
  important: {
    es: 'Importante',
    en: 'Important',
  },
  sendQuoteWarning: {
    es: 'Al enviar la cotización se creará una factura en Stripe y se enviará al cliente por correo.',
    en: 'Sending the quote will create a Stripe invoice and email it to the customer.',
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel',
  },
  cancelQuoteTitle: {
    es: 'Cancelar Cotización',
    en: 'Cancel Quote',
  },
  cancelQuoteMessage: {
    es: 'Esto anulará la factura en Stripe y regresará la orden al estado de procesamiento.',
    en: 'This will void the invoice in Stripe and return the order to processing status.',
  },
  reason: {
    es: 'Razón',
    en: 'Reason',
  },
  confirmCancel: {
    es: 'Confirmar Cancelación',
    en: 'Confirm Cancel',
  },
  cancelling: {
    es: 'Cancelando...',
    en: 'Cancelling...',
  },
  close: {
    es: 'Cerrar',
    en: 'Close',
  },
  quotePrepared: {
    es: 'Cotización Preparada',
    en: 'Quote Prepared',
  },
  quotePreparedMessage: {
    es: 'La cotización está lista para ser revisada y enviada al cliente.',
    en: 'The quote is ready to be reviewed and sent to the customer.',
  },
  noItemsInQuote: {
    es: 'Agrega elementos a la cotización',
    en: 'Add items to the quote',
  },
  // Status labels
  collecting: {
    es: 'Agregando Artículos',
    en: 'Adding Items',
  },
  awaiting_packages: {
    es: 'Esperando Paquetes',
    en: 'Awaiting Packages',
  },
  packages_complete: {
    es: 'Paquetes Completos',
    en: 'Packages Complete',
  },
  processing: {
    es: 'Procesando',
    en: 'Processing',
  },
  quote_sent: {
    es: 'Cotización Enviada',
    en: 'Quote Sent',
  },
  paid: {
    es: 'Pagado',
    en: 'Paid',
  },
  dimensions: {
    es: 'Dimensiones',
    en: 'Dimensions',
  },
  viewProofOfPurchase: {
    es: 'Ver comprobante',
    en: 'View proof of purchase',
  },
}

const t = createTranslations(translations)

// Computed
const canSendQuote = computed(() => {
  if (!order.value) return false
  return (order.value.status === 'packages_complete' || order.value.status === 'processing') &&
         allItemsArrived.value &&
         allItemsWeighed.value
})

const canPrepareQuote = computed(() => {
  if (!canSendQuote.value) return false
  
  // A weight range must be selected
  if (!selectedBox.value) return false
  
  return true
})

const allItemsArrived = computed(() => {
  if (!order.value?.items) return false
  return order.value.items.every(item => item.arrived)
})

const allItemsWeighed = computed(() => {
  if (!order.value?.items) return false
  return order.value.items.every(item => item.weight && item.weight > 0)
})

const arrivedCount = computed(() => {
  if (!order.value?.items) return 0
  return order.value.items.filter(item => item.arrived).length
})

// Methods
const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/orders/${route.params.id}`)
    order.value = response.data
    
    // If quote already exists, populate form
    if (order.value.quote_breakdown && order.value.quote_breakdown.length > 0) {
      // Find box charge in breakdown
      const boxItem = order.value.quote_breakdown.find(item => item.type === 'box')
      if (boxItem && availableBoxes.value.length > 0) {
        const matchingBox = availableBoxes.value.find(box => 
          box.price === boxItem.amount
        )
        if (matchingBox) {
          selectedBoxId.value = matchingBox.id
          selectedBox.value = matchingBox
        }
      }
      
      // Find IVA in breakdown
      const ivaItem = order.value.quote_breakdown.find(item => item.type === 'tax')
      if (ivaItem) {
        quoteForm.value.iva_amount = ivaItem.amount
      }
      
      // Find additional charges
      const customCharges = order.value.quote_breakdown.filter(item => item.type === 'custom')
      additionalCharges.value = customCharges.map(charge => ({
        description: charge.item,
        amount: charge.amount
      }))
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    $toast.error('Error loading order')
    await router.push('/app/admin/orders')
  } finally {
    loading.value = false
  }
}

const fetchBoxProducts = async () => {
  loadingBoxes.value = true
  try {
    const response = await $customFetch('/products')
    // Just grab all products without filtering
    availableBoxes.value = response.data || []
    
    // If order has a previous selection, try to match it
    if (order.value?.quote_breakdown) {
      const boxItem = order.value.quote_breakdown.find(item => item.type === 'box')
      if (boxItem && availableBoxes.value.length > 0) {
        const matchingBox = availableBoxes.value.find(box => 
          box.price === boxItem.amount
        )
        if (matchingBox) {
          selectedBoxId.value = matchingBox.id
          selectedBox.value = matchingBox
        }
      }
    }
  } catch (error) {
    console.error('Error fetching box products:', error)
    $toast.error('Error loading products')
  } finally {
    loadingBoxes.value = false
  }
}

const selectBox = () => {
  const box = availableBoxes.value.find(b => b.id === selectedBoxId.value)
  if (box) {
    selectedBox.value = box
    quoteForm.value.box_size = box.name // Use name instead of type
    quoteForm.value.box_charge = box.price
  }
}

const calculateTotalWeight = () => {
  if (!order.value?.items) return 0
  return order.value.items.reduce((total, item) => {
    return total + (parseFloat(item.weight) || 0) * item.quantity
  }, 0).toFixed(2)
}

const calculateTotalVolumetricWeight = () => {
  if (!order.value?.items) return 0
  
  const totalVolumetric = order.value.items.reduce((total, item) => {
    // Check if item has dimensions
    if (item.dimensions) {
      const length = item.dimensions.length || item.dimensions.l || 0
      const width = item.dimensions.width || item.dimensions.w || 0
      const height = item.dimensions.height || item.dimensions.h || 0
      
      // Calculate volumetric weight for this item (L x W x H / 5000)
      const volumetricWeight = (length * width * height) / 5000
      
      // Multiply by quantity
      return total + (volumetricWeight * item.quantity)
    }
    return total
  }, 0)
  
  return totalVolumetric.toFixed(2)
}

const calculateTotalDimensions = () => {
  if (!order.value?.items) return '-'
  
  let totalVolume = 0
  let hasAnyDimensions = false
  let allDimensions = []
  
  order.value.items.forEach(item => {
    if (item.dimensions) {
      const length = item.dimensions.length || item.dimensions.l || 0
      const width = item.dimensions.width || item.dimensions.w || 0
      const height = item.dimensions.height || item.dimensions.h || 0
      
      if (length && width && height) {
        hasAnyDimensions = true
        // Store all dimensions for each item (considering quantity)
        for (let i = 0; i < item.quantity; i++) {
          allDimensions.push({ length, width, height })
        }
        totalVolume += (length * width * height * item.quantity)
      }
    }
  })
  
  if (!hasAnyDimensions) return '-'
  
  // Calculate the optimal box dimensions that would contain all items
  // This is a simplified approach - we'll sum volumes and estimate a box
  
  // Option 1: Stack items vertically (most common for shipping)
  let maxLength = 0
  let maxWidth = 0
  let totalHeight = 0
  
  allDimensions.forEach(dim => {
    maxLength = Math.max(maxLength, dim.length)
    maxWidth = Math.max(maxWidth, dim.width)
    totalHeight += dim.height
  })
  
  // Option 2: Arrange side by side (check which is more efficient)
  let sideBySideLength = 0
  let sideBySideWidth = 0
  let sideBySideHeight = 0
  
  allDimensions.forEach(dim => {
    sideBySideLength += dim.length
    sideBySideWidth = Math.max(sideBySideWidth, dim.width)
    sideBySideHeight = Math.max(sideBySideHeight, dim.height)
  })
  
  // Choose the arrangement with smaller volumetric weight
  const stackedVolume = maxLength * maxWidth * totalHeight
  const sideBySideVolume = sideBySideLength * sideBySideWidth * sideBySideHeight
  
  if (stackedVolume <= sideBySideVolume) {
    return `${maxLength} × ${maxWidth} × ${totalHeight} cm`
  } else {
    return `${sideBySideLength} × ${sideBySideWidth} × ${sideBySideHeight} cm`
  }
}

const calculateTotalDeclaredValue = () => {
  if (!order.value?.items) return 0
  return order.value.items.reduce((total, item) => {
    return total + (parseFloat(item.declared_value) || 0) * item.quantity
  }, 0).toFixed(2)
}

const getQuotePreview = () => {
  const items = []
  
  // Weight range charge from selected product (includes shipping to Mexico)
  if (selectedBox.value) {
    items.push({
      item: `Envío ${selectedBox.value.name} (incluye consolidación y envío)`,
      amount: selectedBox.value.price
    })
  }
  
  // IVA - only if admin explicitly sets it
  if (quoteForm.value.iva_amount && quoteForm.value.iva_amount > 0) {
    items.push({
      item: 'IVA (16%)',
      amount: quoteForm.value.iva_amount
    })
  }
  
  // Additional charges
  additionalCharges.value.forEach(charge => {
    if (charge.description && charge.amount && charge.amount > 0) {
      items.push({
        item: charge.description,
        amount: charge.amount
      })
    }
  })
  
  return items
}

const calculateQuoteTotal = () => {
  return getQuotePreview().reduce((total, item) => total + item.amount, 0)
}

const addAdditionalCharge = () => {
  additionalCharges.value.push({ description: '', amount: 0 })
}

const removeAdditionalCharge = (index) => {
  additionalCharges.value.splice(index, 1)
}

const editQuote = () => {
  // Clear the quote breakdown to allow editing
  order.value.quote_breakdown = null
  order.value.quoted_amount = null
}

const prepareQuote = async () => {
  preparingQuote.value = true
  try {
    // Build quote items array
    const quoteItems = []
    
    // Add weight range charge
    if (selectedBox.value) {
      quoteItems.push({
        item: `Envío ${selectedBox.value.name}`,
        description: `${selectedBox.value.name} - Incluye consolidación y envío a México`,
        amount: selectedBox.value.price,
        type: 'box'
      })
    }
    
    // Add IVA if set
    if (quoteForm.value.iva_amount && quoteForm.value.iva_amount > 0) {
      quoteItems.push({
        item: 'IVA',
        description: '16% de impuesto al valor agregado',
        amount: quoteForm.value.iva_amount,
        type: 'tax'
      })
    }
    
    // Add additional charges
    additionalCharges.value.forEach(charge => {
      if (charge.description && charge.amount && charge.amount > 0) {
        quoteItems.push({
          item: charge.description,
          description: charge.description,
          amount: charge.amount,
          type: 'custom'
        })
      }
    })
    
    const body = {
      quote_items: quoteItems,
      box_size: selectedBox.value.name, // Send the weight range name
      box_charge: selectedBox.value.price,
      iva_amount: quoteForm.value.iva_amount || 0
    }
    
    await $customFetch(`/admin/orders/${order.value.id}/prepare-quote`, {
      method: 'POST',
      body
    })
    
    $toast.success('Quote prepared successfully')
    await fetchOrder()
    
    // Show review modal after successful preparation
    showReviewModal.value = true
  } catch (error) {
    console.error('Error preparing quote:', error)
    $toast.error(error.data?.message || 'Error preparing quote')
  } finally {
    preparingQuote.value = false
  }
}

const sendQuote = async () => {
  sendingQuote.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/send-quote`, {
      method: 'POST',
      body: {
        send_copy_to_admin: sendQuoteForm.value.send_copy_to_admin,
      }
    })
    
    $toast.success('Quote sent to customer successfully')
    showReviewModal.value = false
    await fetchOrder()
  } catch (error) {
    console.error('Error sending quote:', error)
    $toast.error(error.data?.message || 'Error sending quote')
  } finally {
    sendingQuote.value = false
  }
}


const cancelQuote = async () => {
  cancellingQuote.value = true
  try {
    await $customFetch(`/admin/orders/${order.value.id}/cancel-quote`, {
      method: 'POST',
      body: { reason: cancelReason.value }
    })
    
    $toast.success('Quote cancelled successfully')
    showCancelModal.value = false
    cancelReason.value = ''
    await fetchOrder()
  } catch (error) {
    console.error('Error cancelling quote:', error)
    $toast.error(error.data?.message || 'Error cancelling quote')
  } finally {
    cancellingQuote.value = false
  }
}

const getStatusColor = (status) => {
  const colors = {
    collecting: 'bg-primary-100 text-primary-700',
    awaiting_packages: 'bg-amber-100 text-amber-700',
    packages_complete: 'bg-primary-100 text-primary-700',
    processing: 'bg-primary-100 text-primary-700',
    quote_sent: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
return t.value[status] || status
}
const formatDimensions = (dimensions) => {
if (!dimensions) return '-'

// Handle both formats: {length, width, height} or {l, w, h}
const length = dimensions.length || dimensions.l || 0
const width = dimensions.width || dimensions.w || 0
const height = dimensions.height || dimensions.h || 0

if (!length && !width && !height) return '-'

return `${length} × ${width} × ${height} cm`
}
const formatDate = (date) => {
if (!date) return '-'
return new Date(date).toLocaleDateString('es-MX', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
}
// Mount
onMounted(async () => {
// Fetch boxes first, then order
await fetchBoxProducts()
await fetchOrder()
})
</script>
<style scoped>
@keyframes spin {
to { transform: rotate(360deg); }
}
.animate-spin {
animation: spin 1s linear infinite;
}
</style>