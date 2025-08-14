<!-- pages/app/orders/[id]/items.vue -->
<template>
  <section class="min-h-screen bg-gray-50 pb-32 sm:pb-24">
    <!-- Fixed Header with Progress -->
    <div class="bg-white border-b sticky top-0 z-40">
      <div class="max-w-3xl mx-auto px-4 py-4">
        <div class="flex items-center gap-3 mb-4">
          <NuxtLink
            :to="'/app/orders/' + order?.id"
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
                d="M10 19l-7-7 7-7"
              />
            </svg>
          </NuxtLink>
          <div class="flex-1">
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
              {{ t.addYourProducts }}
            </h1>
            <p class="text-sm text-gray-500">
              {{ t.orderNumber }} {{ order?.tracking_number }}
            </p>
          </div>
          <!-- Mobile Item Counter -->
          <div
            v-if="hasItems"
            class="sm:hidden bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ totalItemQuantity }}
          </div>
        </div>

        <!-- Simplified Progress Bar -->
        <div class="relative">
          <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              :class="[
                'h-full bg-gradient-to-r from-green-500 to-primary-500 transition-all duration-500 ease-out',
                hasItems ? 'w-2/3' : 'w-1/3',
              ]"
            ></div>
          </div>
          <div class="flex justify-between mt-2 text-xs">
            <span class="text-green-600 font-medium"
              >✓ {{ t.stepAddress }}</span
            >
            <span
              :class="
                hasItems
                  ? 'text-green-600 font-medium'
                  : 'text-primary-600 font-medium'
              "
            >
              {{ hasItems ? "✓" : "•" }} {{ t.stepAddItems }}
            </span>
            <span class="text-gray-400">{{ t.stepComplete }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto px-4 py-6">
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin h-8 w-8 border-3 border-primary-600 border-t-transparent rounded-full"
        ></div>
      </div>

      <div v-else-if="order">
        <!-- Floating Add Product Card (Mobile) -->
        <div
          class="sm:hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6"
        >
          <button
            @click="showAddProductModal = true"
            class="w-full flex items-center justify-between py-3 px-4 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
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
              <span class="font-semibold">{{
                hasItems ? t.addAnotherProduct : t.addProduct
              }}</span>
            </div>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Desktop Add Product Form -->
        <div
          class="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
        >
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            {{ hasItems ? t.addAnotherProduct : t.addProduct }}
          </h2>

          <form @submit.prevent="handleAddItem" class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <!-- Product Name -->
              <div class="sm:col-span-1">
                <label
                  for="product_name_desktop"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  {{ t.productName }}
                </label>
                <input
                  v-model="itemForm.product_name"
                  type="text"
                  id="product_name_desktop"
                  :placeholder="t.productPlaceholder"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <!-- Quantity -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.quantity }}
                </label>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="decrementQuantity"
                    class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <input
                    v-model.number="itemForm.quantity"
                    type="number"
                    min="1"
                    max="9999"
                    @input="validateQuantity"
                    class="flex-1 text-center border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    type="button"
                    @click="incrementQuantity"
                    class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
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
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                for="declared_value_desktop"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                {{ t.declaredValue }}
                <span class="text-gray-400 font-normal"
                  >({{ t.optional }})</span
                >
              </label>
              <input
                v-model="itemForm.declared_value"
                type="number"
                step="0.01"
                min="0"
                max="999999.99"
                id="declared_value_desktop"
                :placeholder="t.declaredValuePlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <!-- Receipt -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t.receipt }}
                <span class="text-gray-400 font-normal"
                  >({{ t.optional }})</span
                >
              </label>
              <div
                @click="$refs.fileInputDesktop.click()"
                class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <input
                  ref="fileInputDesktop"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  @change="handleFileSelect"
                  class="hidden"
                />

                <div v-if="!selectedFile" class="text-sm text-gray-500">
                  <svg
                    class="w-8 h-8 mx-auto mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {{ t.clickToUpload }}
                </div>

                <div v-else class="flex items-center justify-between">
                  <span class="text-sm text-gray-700 truncate flex-1">{{
                    selectedFile.name
                  }}</span>
                  <button
                    type="button"
                    @click.stop="removeFile"
                    class="ml-2 text-sm text-red-600 hover:text-red-700"
                  >
                    {{ t.remove }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Add Button -->
            <button
              type="submit"
              :disabled="addingItem || !itemForm.product_name.trim()"
              class="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ addingItem ? t.adding : t.addProductButton }}
            </button>
          </form>
        </div>

        <!-- Products List -->
        <div v-if="hasItems" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ t.yourProducts }}
            </h3>
            <span
              class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ totalItemQuantity }}
              {{ totalItemQuantity === 1 ? t.product : t.products }}
            </span>
          </div>

          <!-- Product Cards with Animation -->
          <TransitionGroup name="list" tag="div" class="space-y-3">
            <div
              v-for="(item, index) in order.items"
              :key="item.id"
              class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span class="font-semibold text-gray-600">{{
                    index + 1
                  }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 truncate">
                    {{ item.product_name }}
                  </p>
                  <div class="flex items-center gap-3 mt-1">
                    <p class="text-sm text-gray-500">
                      {{ t.quantity }}: {{ item.quantity }}
                    </p>
                    <p
                      v-if="item.proof_of_purchase_url"
                      class="text-sm text-green-600 flex items-center gap-1"
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ t.receiptAttached }}
                    </p>
                  </div>
                </div>
                <button
                  @click="removeItem(item.id)"
                  class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          </TransitionGroup>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div
            class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <img src="/empty-box.svg" alt="empty box" class="w-12 h-12" />
          </div>
          <p class="text-gray-500 mb-2">{{ t.noProducts }}</p>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Action (Mobile & Desktop) -->
    <div
      v-if="hasItems && order"
      class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30"
    >
      <div class="max-w-3xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <p class="text-sm text-gray-600">{{ t.readyToContinue }}</p>
            <p class="font-semibold text-gray-900">
              {{ totalItemQuantity }}
              {{ totalItemQuantity === 1 ? t.product : t.products }}
              {{ t.added }}
            </p>
          </div>
          <button
            @click="showCompleteModal = true"
            class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            {{ t.continue }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Add Product Modal -->
    <TransitionRoot as="template" :show="showAddProductModal">
      <Dialog class="relative z-50" @close="showAddProductModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-full"
              enter-to="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0"
              leave-to="opacity-0 translate-y-full"
            >
              <DialogPanel class="w-full bg-white rounded-t-2xl shadow-xl">
                <div class="px-4 pb-4 pt-5">
                  <div class="flex items-center justify-between mb-4">
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      {{ t.addProduct }}
                    </DialogTitle>
                    <button
                      @click="showAddProductModal = false"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <form @submit.prevent="handleAddItemMobile" class="space-y-4">
                    <!-- Product Name -->
                    <div>
                      <label
                        for="product_name_mobile"
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.productName }}
                      </label>
                      <input
                        v-model="itemForm.product_name"
                        type="text"
                        id="product_name_mobile"
                        :placeholder="t.productPlaceholder"
                        class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                        autofocus
                      />
                    </div>

                    <!-- Quantity -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.quantity }}
                      </label>
                      <div class="flex items-center gap-3">
                        <button
                          type="button"
                          @click="decrementQuantity"
                          class="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <input
                          v-model.number="itemForm.quantity"
                          type="number"
                          min="1"
                          max="9999"
                          @input="validateQuantity"
                          class="flex-1 text-center text-lg font-semibold border border-gray-300 rounded-lg px-2 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button
                          type="button"
                          @click="incrementQuantity"
                          class="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
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
                        </button>
                      </div>
                    </div>

                    <!-- Declared Value -->
                    <div>
                      <label
                        for="declared_value_mobile"
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.declaredValue }}
                        <span class="text-gray-400 font-normal"
                          >({{ t.optional }})</span
                        >
                      </label>
                      <input
                        v-model="itemForm.declared_value"
                        type="number"
                        step="0.01"
                        min="0"
                        max="999999.99"
                        id="declared_value_mobile"
                        :placeholder="t.declaredValuePlaceholder"
                        class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <!-- Receipt -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {{ t.receipt }}
                        <span class="text-gray-400 font-normal"
                          >({{ t.optional }})</span
                        >
                      </label>
                      <div
                        @click="$refs.fileInputMobile.click()"
                        class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                      >
                        <input
                          ref="fileInputMobile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          @change="handleFileSelect"
                          class="hidden"
                        />

                        <div v-if="!selectedFile" class="text-sm text-gray-500">
                          <svg
                            class="w-8 h-8 mx-auto mb-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {{ t.tapToUpload }}
                        </div>

                        <div v-else class="flex items-center justify-between">
                          <span class="text-sm text-gray-700 truncate flex-1">{{
                            selectedFile.name
                          }}</span>
                          <button
                            type="button"
                            @click.stop="removeFile"
                            class="ml-2 text-sm text-red-600 hover:text-red-700"
                          >
                            {{ t.remove }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Add Button -->
                    <button
                      type="submit"
                      :disabled="addingItem || !itemForm.product_name.trim()"
                      class="w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                    >
                      {{ addingItem ? t.adding : t.addProductButton }}
                    </button>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Complete Order Modal -->
    <TransitionRoot as="template" :show="showCompleteModal">
      <Dialog class="relative z-50" @close="showCompleteModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30" />
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
                class="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-green-600"
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
                  <DialogTitle class="text-lg font-semibold text-gray-900 mb-2">
                    {{ t.confirmComplete }}
                  </DialogTitle>
                  <p class="text-gray-600">
                    {{ t.confirmCompleteText }}
                  </p>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 mb-6">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">{{ t.totalProducts }}:</span>
                    <span class="text-2xl font-bold text-gray-900">{{
                      totalItemQuantity
                    }}</span>
                  </div>
                </div>

                <div class="flex gap-3">
                  <button
                    @click="showCompleteModal = false"
                    class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    {{ t.cancel }}
                  </button>
                  <button
                    @click="handleCompleteOrder"
                    :disabled="completingOrder"
                    class="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition-colors"
                  >
                    {{ completingOrder ? "..." : t.confirm }}
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
import { ref, onMounted, computed } from "vue";
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
const router = useRouter();

// Use the language composable
const { t: createTranslations } = useLanguage();

// State
const order = ref(null);
const loading = ref(true);
const addingItem = ref(false);
const completingOrder = ref(false);
const showCompleteModal = ref(false);
const showAddProductModal = ref(false);
const showSuccessToast = ref(false);
const selectedFile = ref(null);

// Computed - check if user has items
const hasItems = computed(() => {
  return order.value?.items && order.value.items.length > 0;
});

// Total items quantity
const totalItemQuantity = computed(() => {
  if (!order.value?.items) return 0;
  return order.value.items.reduce((total, item) => total + item.quantity, 0);
});

// Form
const itemForm = ref({
  product_name: "",
  quantity: 1,
  declared_value: "",
});

// Translations
const translations = {
  addYourProducts: {
    es: "Agrega tus productos",
    en: "Add your products",
  },
  orderNumber: {
    es: "Orden",
    en: "Order",
  },
  // Progress Steps
  stepAddress: {
    es: "Dirección",
    en: "Address",
  },
  stepAddItems: {
    es: "Productos",
    en: "Products",
  },
  stepComplete: {
    es: "Completar",
    en: "Complete",
  },
  addProduct: {
    es: "Agregar producto",
    en: "Add product",
  },
  addAnotherProduct: {
    es: "Agregar otro producto",
    en: "Add another product",
  },
  productName: {
    es: "Nombre del producto",
    en: "Product name",
  },
  productPlaceholder: {
    es: "ej: iPhone 15 Pro",
    en: "e.g. iPhone 15 Pro",
  },
  quantity: {
    es: "Cantidad",
    en: "Quantity",
  },
  receipt: {
    es: "Recibo",
    en: "Receipt",
  },
  optional: {
    es: "opcional",
    en: "optional",
  },
  clickToUpload: {
    es: "Haz clic para subir archivo",
    en: "Click to upload file",
  },
  tapToUpload: {
    es: "Toca para subir archivo",
    en: "Tap to upload file",
  },
  remove: {
    es: "Quitar",
    en: "Remove",
  },
  adding: {
    es: "Agregando...",
    en: "Adding...",
  },
  addProductButton: {
    es: "Agregar producto",
    en: "Add product",
  },
  yourProducts: {
    es: "Tus productos",
    en: "Your products",
  },
  receiptAttached: {
    es: "Recibo adjunto",
    en: "Receipt attached",
  },
  noProducts: {
    es: "No has agregado productos al envio todavía",
    en: "You haven't added any products to the shipment yet",
  },
  tapToAdd: {
    es: "Toca el botón para agregar tu primer producto",
    en: "Tap the button to add your first product",
  },
  confirmComplete: {
    es: "¿Todo listo?",
    en: "All set?",
  },
  confirmCompleteText: {
    es: "¿Has agregado todos tus productos?",
    en: "Have you added all your products?",
  },
  totalProducts: {
    es: "Total de productos",
    en: "Total products",
  },
  product: {
    es: "producto",
    en: "product",
  },
  products: {
    es: "productos",
    en: "products",
  },
  cancel: {
    es: "Cancelar",
    en: "Cancel",
  },
  confirm: {
    es: "Confirmar",
    en: "Confirm",
  },
  readyToContinue: {
    es: "¿Listo para continuar?",
    en: "Ready to continue?",
  },
  added: {
    es: "agregados",
    en: "added",
  },
  continue: {
    es: "Continuar",
    en: "Continue",
  },
  productAdded: {
    es: "¡Producto agregado!",
    en: "Product added!",
  },
  declaredValue: {
    es: "Valor declarado",
    en: "Declared value",
  },
  declaredValuePlaceholder: {
    es: "ej: 999.99",
    en: "e.g. 999.99",
  },
};

// Get reactive translations
const t = createTranslations(translations);

// Methods
const incrementQuantity = () => {
  if (itemForm.value.quantity < 9999) {
    itemForm.value.quantity++;
  }
};

const decrementQuantity = () => {
  if (itemForm.value.quantity > 1) {
    itemForm.value.quantity--;
  }
};

const validateQuantity = () => {
  // Ensure quantity stays within bounds
  if (!itemForm.value.quantity || itemForm.value.quantity < 1) {
    itemForm.value.quantity = 1;
  } else if (itemForm.value.quantity > 9999) {
    itemForm.value.quantity = 9999;
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Simple validation
    if (file.size > 10 * 1024 * 1024) {
      $toast.error("File too large");
      return;
    }
    selectedFile.value = file;
  }
};

const removeFile = () => {
  selectedFile.value = null;
  // Clear all file inputs
  const fileInputs = ["fileInputMobile", "fileInputDesktop"];
  fileInputs.forEach((refName) => {
    if ($refs[refName]) {
      $refs[refName].value = "";
    }
  });
};

const fetchOrder = async () => {
  loading.value = true;
  try {
    const response = await $customFetch(`/orders/${route.params.id}`);
    order.value = response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    $toast.error("Error loading order");
    navigateTo("/app/orders");
  } finally {
    loading.value = false;
  }
};

const handleAddItem = async () => {
  if (!itemForm.value.product_name.trim()) return;

  addingItem.value = true;

  try {
    const formData = new FormData();
    formData.append("product_name", itemForm.value.product_name.trim());
    formData.append("quantity", itemForm.value.quantity);

    if (itemForm.value.declared_value) {
      formData.append("declared_value", itemForm.value.declared_value);
    }

    if (selectedFile.value) {
      formData.append("proof_of_purchase", selectedFile.value);
    }

    await $customFetch(`/orders/${order.value.id}/items`, {
      method: "POST",
      body: formData,
    });

    // Show success toast
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);

    // Reset form
    itemForm.value = {
      product_name: "",
      quantity: 1,
      declared_value: "",
    };
    selectedFile.value = null;

    // Refresh order
    await fetchOrder();
  } catch (error) {
    console.error("Error adding item:", error);
    $toast.error("Error adding product");
  } finally {
    addingItem.value = false;
  }
};

const handleAddItemMobile = async () => {
  await handleAddItem();
  if (!addingItem.value) {
    showAddProductModal.value = false;
  }
};

const removeItem = async (itemId) => {
  try {
    await $customFetch(`/orders/${order.value.id}/items/${itemId}`, {
      method: "DELETE",
    });

    $toast.success("Product removed");
    await fetchOrder();
  } catch (error) {
    console.error("Error removing item:", error);
    $toast.error("Error removing product");
  }
};

const handleCompleteOrder = async () => {
  completingOrder.value = true;
  try {
    await $customFetch(`/orders/${order.value.id}/complete`, {
      method: "PUT",
    });

    showCompleteModal.value = false;
    $toast.success("Order completed!");

    return navigateTo({
      path: `/app/orders/${order.value.id}`,
      query: { completed: "true" },
    });
  } catch (error) {
    console.error("Error completing order:", error);
    $toast.error("Error completing order");
  } finally {
    completingOrder.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchOrder();
});
</script>

<style scoped>
/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
