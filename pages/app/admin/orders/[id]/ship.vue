<!-- pages/app/admin/orders/[id]/ship.vue -->
<template>
    <section class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Back & Title -->
            <div class="flex items-center gap-4">
              <NuxtLink
                :to="`/app/admin/orders/${route.params.id}`"
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
                  {{ t.shipOrder }}
                </h1>
                <p class="text-sm text-gray-500">{{ order?.tracking_number }}</p>
              </div>
            </div>
  
            <!-- Status Badge -->
            <span
              v-if="order"
              class="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
            >
              {{ t.processing }}
            </span>
          </div>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div
            class="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"
          ></div>
          <p class="mt-4 text-sm text-gray-600">{{ t.loading }}</p>
        </div>
      </div>
  
      <!-- Main Content -->
      <div v-else-if="order" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Alert if not ready to ship -->
        <div
          v-if="order.status !== 'processing'"
          class="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
        >
          <svg
            class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
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
          <div>
            <h3 class="font-medium text-amber-900">{{ t.notReadyToShip }}</h3>
            <p class="text-sm text-amber-700 mt-1">
              {{ t.notReadyToShipMessage }}
            </p>
          </div>
        </div>

  
        <!-- Shipping Form -->
        <form @submit.prevent="submitShipment" class="space-y-6">
          <!-- DHL Waybill Number -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {{ t.shippingInformation }}
            </h3>
  
            <div class="space-y-4">
              <!-- DHL Waybill -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.dhlWaybillNumber }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.dhl_waybill_number"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  :placeholder="t.dhlWaybillPlaceholder"
                />
                <p class="mt-1 text-xs text-gray-500">
                  {{ t.dhlWaybillHint }}
                </p>
              </div>
  
              <!-- Estimated Delivery Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t.estimatedDeliveryDate }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.estimated_delivery_date"
                  type="date"
                  required
                  :min="minDeliveryDate"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p class="mt-1 text-xs text-gray-500">
                  {{ t.estimatedDeliveryHint }}
                </p>
              </div>
            </div>
          </div>
  
          <!-- GIA Document Upload -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {{ t.giaDocument }}
            </h3>
  
            <div>
              <label
                class="block w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                :class="{ 'border-primary-500 bg-primary-50': selectedFile }"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept=".pdf,application/pdf"
                  required
                  @change="handleFileSelect"
                  class="hidden"
                />
                <div class="text-center">
                  <svg
                    v-if="!selectedFile"
                    class="mx-auto h-12 w-12 text-gray-400"
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
                  <div
                    v-else
                    class="flex items-center justify-center gap-3 text-primary-600"
                  >
                    <svg
                      class="w-12 h-12"
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
                  <p class="mt-2 text-sm font-medium text-gray-900">
                    {{ selectedFile ? selectedFile.name : t.clickToUpload }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500">
                    {{ selectedFile ? formatFileSize(selectedFile.size) : t.pdfOnly }}
                  </p>
                </div>
              </label>
  
              <!-- File Preview -->
              <div
                v-if="selectedFile"
                class="mt-4 bg-gray-50 rounded-lg p-4 flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-red-100 rounded-lg">
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
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ selectedFile.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatFileSize(selectedFile.size) }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeFile"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
  
              <p class="mt-2 text-xs text-gray-500">
                {{ t.giaDocumentHint }}
              </p>
            </div>
          </div>
  
          <!-- Notes (Optional) -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {{ t.additionalNotes }}
              <span class="text-sm font-normal text-gray-400">({{ t.optional }})</span>
            </h3>
  
            <textarea
              v-model="form.notes"
              rows="4"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              :placeholder="t.notesPlaceholder"
            ></textarea>
          </div>
  
          <!-- Form Actions -->
          <div class="flex gap-3 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t border-gray-200">
            <button
              type="submit"
              :disabled="shipping || !selectedFile || order.status !== 'processing'"
              class="flex-1 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                v-if="!shipping"
                class="w-5 h-5"
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
              <svg
                v-else
                class="animate-spin h-5 w-5"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>{{ shipping ? t.shipping : t.confirmShipment }}</span>
            </button>
            <NuxtLink
              :to="`/app/admin/orders/${route.params.id}`"
              class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
            >
              {{ t.cancel }}
            </NuxtLink>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Define page meta
  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
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
  const shipping = ref(false);
  const selectedFile = ref(null);
  const fileInput = ref(null);
  
  // Form state
  const form = ref({
    dhl_waybill_number: '',
    estimated_delivery_date: '',
    notes: '',
  });
  
  // Translations
  const translations = {
    loading: {
      es: 'Cargando orden...',
      en: 'Loading order...',
    },
    shipOrder: {
      es: 'Enviar Orden',
      en: 'Ship Order',
    },
    processing: {
      es: 'Procesando',
      en: 'Processing',
    },
    notReadyToShip: {
      es: 'Orden No Lista para Envío',
      en: 'Order Not Ready to Ship',
    },
    notReadyToShipMessage: {
      es: 'Esta orden debe estar en estado "Procesando" para poder ser enviada.',
      en: 'This order must be in "Processing" status to be shipped.',
    },
    orderSummary: {
      es: 'Resumen de la Orden',
      en: 'Order Summary',
    },
    customer: {
      es: 'Cliente',
      en: 'Customer',
    },
    trackingNumber: {
      es: 'Número de Rastreo',
      en: 'Tracking Number',
    },
    totalPackages: {
      es: 'Total de Paquetes',
      en: 'Total Packages',
    },
    boxType: {
      es: 'Tipo de Caja',
      en: 'Box Type',
    },
    deliveryAddress: {
      es: 'Dirección de Entrega',
      en: 'Delivery Address',
    },
    shippingInformation: {
      es: 'Información de Envío',
      en: 'Shipping Information',
    },
    dhlWaybillNumber: {
      es: 'Número de Guía',
      en: 'Waybill Number',
    },
    dhlWaybillPlaceholder: {
      es: 'Ej: 1234567890',
      en: 'Ex: 1234567890',
    },
    dhlWaybillHint: {
      es: 'Ingrese el número de guía de 10 dígitos',
      en: 'Enter the 10-digit DHL waybill number',
    },
    estimatedDeliveryDate: {
      es: 'Fecha Estimada de Entrega',
      en: 'Estimated Delivery Date',
    },
    estimatedDeliveryHint: {
      es: 'Seleccione la fecha estimada de entrega al cliente',
      en: 'Select the estimated delivery date to the customer',
    },
    giaDocument: {
      es: 'Documento GIA (Guía de Importación)',
      en: 'GIA Document (Import Guide)',
    },
    clickToUpload: {
      es: 'Haz clic para subir o arrastra el archivo',
      en: 'Click to upload or drag and drop',
    },
    pdfOnly: {
      es: 'Solo archivos PDF (Máx. 10MB)',
      en: 'PDF only (Max 10MB)',
    },
    giaDocumentHint: {
      es: 'El documento GIA debe estar firmado y sellado por las autoridades aduaneras',
      en: 'The GIA document must be signed and sealed by customs authorities',
    },
    additionalNotes: {
      es: 'Notas Adicionales',
      en: 'Additional Notes',
    },
    optional: {
      es: 'Opcional',
      en: 'Optional',
    },
    notesPlaceholder: {
      es: 'Agregue cualquier nota relevante sobre este envío...',
      en: 'Add any relevant notes about this shipment...',
    },
    confirmShipment: {
      es: 'Confirmar Envío',
      en: 'Confirm Shipment',
    },
    shipping: {
      es: 'Enviando...',
      en: 'Shipping...',
    },
    cancel: {
      es: 'Cancelar',
      en: 'Cancel',
    },
    shipmentSuccess: {
      es: 'Orden enviada exitosamente',
      en: 'Order shipped successfully',
    },
    shipmentError: {
      es: 'Error al enviar la orden',
      en: 'Error shipping order',
    },
    fileRequired: {
      es: 'Debe subir el documento GIA',
      en: 'You must upload the GIA document',
    },
    fileTooLarge: {
      es: 'El archivo es demasiado grande (máx. 10MB)',
      en: 'File is too large (max 10MB)',
    },
    invalidFileType: {
      es: 'Solo se permiten archivos PDF',
      en: 'Only PDF files are allowed',
    },
  };
  
  const t = createTranslations(translations);
  
  // Computed
  const minDeliveryDate = computed(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  
  // Methods
  const fetchOrder = async () => {
    loading.value = true;
    try {
      const response = await $customFetch(`/admin/orders/${route.params.id}`);
      order.value = response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      $toast.error('Error loading order');
      await router.push('/app/admin/orders');
    } finally {
      loading.value = false;
    }
  };
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Validate file type
    if (file.type !== 'application/pdf') {
      $toast.error(t.value.invalidFileType);
      event.target.value = '';
      return;
    }
  
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      $toast.error(t.value.fileTooLarge);
      event.target.value = '';
      return;
    }
  
    selectedFile.value = file;
  };
  
  const removeFile = () => {
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };
  
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };
  
  const submitShipment = async () => {
    if (!selectedFile.value) {
      $toast.error(t.value.fileRequired);
      return;
    }
  
    if (order.value.status !== 'processing') {
      $toast.error(t.value.notReadyToShipMessage);
      return;
    }
  
    shipping.value = true;
  
    try {
      const formData = new FormData();
      formData.append('dhl_waybill_number', form.value.dhl_waybill_number);
      formData.append('estimated_delivery_date', form.value.estimated_delivery_date);
      formData.append('gia_file', selectedFile.value);
      
      if (form.value.notes) {
        formData.append('notes', form.value.notes);
      }
  
      const response = await $customFetch(
        `/admin/orders/${order.value.id}/ship`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      $toast.success(t.value.shipmentSuccess);
      await router.push(`/app/admin/orders/${order.value.id}`);
    } catch (error) {
      console.error('Error shipping order:', error);
      $toast.error(error.data?.message || t.value.shipmentError);
    } finally {
      shipping.value = false;
    }
  };
  
  // Lifecycle
  onMounted(() => {
    fetchOrder();
  });
  </script>
  
  <style scoped>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Custom scrollbar */
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