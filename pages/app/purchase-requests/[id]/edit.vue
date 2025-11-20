<template>
    <section class="min-h-screen bg-gray-50 pb-20">
      <!-- Sticky Header -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <div class="flex items-center gap-3">
            <NuxtLink
              :to="`/app/purchase-requests/${requestId}`"
              class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </NuxtLink>
            <div class="flex-1">
              <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
                {{ t.editRequest }}
              </h1>
              <p class="text-sm text-gray-500">
                {{ request?.request_number }}
              </p>
            </div>
            <div v-if="hasItems" class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
              {{ totalItems }} {{ t.items }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading -->
      <div v-if="loadingRequest" class="flex justify-center py-20">
         <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
  
      <!-- Main Content -->
      <div v-else-if="request" class="max-w-3xl mx-auto px-4 py-6 space-y-6">
  
        <!-- Add Item Button -->
        <button
          @click="openAddModal"
          class="w-full flex items-center justify-between py-4 px-5 bg-white border border-gray-200 shadow-sm rounded-xl hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            </div>
            <div class="text-left">
              <span class="block font-semibold text-gray-900">{{ t.addItem }}</span>
              <span class="block text-xs text-gray-500">{{ t.pasteLinkHint }}</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
  
        <!-- Items List -->
        <div v-if="hasItems" class="space-y-4">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">{{ t.yourList }}</h3>
          
          <TransitionGroup name="list" tag="div" class="space-y-3">
            <div
              v-for="(item, index) in form.items"
              :key="index"
              class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
              @click="editItem(index)"
            >
              <div class="flex justify-between items-start gap-3">
                <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                  {{ index + 1 }}
                </div>
  
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-900 truncate">{{ item.product_name }}</h4>
                  
                  <div class="text-xs text-primary-600 truncate mb-2 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    {{ truncateUrl(item.product_url) }}
                  </div>
  
                  <div class="flex flex-wrap gap-2 text-xs mb-2">
                    <span class="bg-gray-50 px-2 py-1 rounded-md text-gray-600 border border-gray-100">
                      {{ t.qty }}: <strong>{{ item.quantity }}</strong>
                    </span>
                    <span class="bg-gray-50 px-2 py-1 rounded-md text-gray-600 border border-gray-100">
                      {{ t.price }}: <strong>${{ item.price }}</strong>
                    </span>
                  </div>
                  
                  <!-- Options -->
                  <div v-if="item.options && Object.keys(item.options).length > 0" class="flex flex-wrap gap-2 mt-2">
                      <span v-for="(val, key) in item.options" :key="key" class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs border border-blue-100">
                          <span class="font-semibold">{{ key }}:</span> {{ val }}
                      </span>
                  </div>
  
                  <!-- Image Indicator -->
                  <div v-if="item.imagePreview || item.image_url" class="mt-2 flex items-center gap-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 w-fit">
                     <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                     {{ t.imageAttached }}
                  </div>
                </div>
  
                <!-- Actions -->
                <div class="flex flex-col gap-2">
                  <button @click.stop="editItem(index)" class="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button @click.stop="removeItem(index)" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>
  
          <!-- Summary Card -->
          <div class="bg-gray-900 rounded-2xl p-6 text-white shadow-lg mt-8">
            <div class="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
              <span class="text-gray-400 text-sm">{{ t.estimatedMerchandise }}</span>
              <span class="text-2xl font-bold">${{ estimatedTotal.toFixed(2) }} USD</span>
            </div>
            
            <button
              @click="submitUpdate"
              :disabled="saving"
              class="w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="saving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ saving ? t.saving : t.saveChanges }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Item Modal -->
      <TransitionRoot as="template" :show="showModal">
        <Dialog as="div" class="relative z-50" @close="closeModal">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center sm:items-center p-0 sm:p-4">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95">
                <DialogPanel class="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
                  <div class="px-4 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h3 class="text-lg font-semibold text-gray-900">{{ isEditing ? t.editItem : t.addItemTitle }}</h3>
                    <button @click="closeModal" class="p-1 rounded-full hover:bg-gray-200 transition-colors">
                      <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
  
                  <form @submit.prevent="saveItem" class="p-5 space-y-5">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.productUrl }}</label>
                      <div class="relative">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></div>
                          <input v-model="currentItem.product_url" type="text" required class="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 text-sm" :placeholder="t.urlPlaceholder">
                      </div>
                    </div>
  
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.productName }}</label>
                      <input v-model="currentItem.product_name" type="text" required class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 text-sm" :placeholder="t.namePlaceholder">
                    </div>
  
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.price }} (USD)</label>
                        <div class="relative">
                           <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span class="text-gray-500 font-bold">$</span></div>
                           <input v-model.number="currentItem.price" type="number" min="0.01" step="0.01" required class="pl-7 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 text-sm" placeholder="0.00">
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.quantity }}</label>
                        <input v-model.number="currentItem.quantity" type="number" min="1" required class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 text-sm text-center">
                      </div>
                    </div>
  
                    <!-- Options -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.productOptions }}</label>
                      <div class="flex gap-2 mb-2">
                          <select v-model="newOptionType" class="rounded-lg border-gray-300 text-sm flex-1 py-2">
                              <option value="" disabled selected>{{ t.selectOptionType }}</option>
                              <option value="Size">{{ t.size }}</option>
                              <option value="Color">{{ t.color }}</option>
                              <option value="Style">{{ t.style }}</option>
                              <option value="Model">{{ t.model }}</option>
                              <option value="Other">{{ t.other }}</option>
                          </select>
                          <input v-model="newOptionValue" type="text" :placeholder="t.optionValue" class="rounded-lg border-gray-300 text-sm flex-1 py-2">
                          <button type="button" @click="addOption" :disabled="!newOptionType || !newOptionValue" class="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></button>
                      </div>
                      <div class="space-y-2 mt-3">
                          <div v-for="(val, key) in currentItem.options" :key="key" class="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200 text-sm">
                              <span class="text-gray-700"><span class="font-medium">{{ key }}:</span> {{ val }}</span>
                              <button type="button" @click="removeOption(key)" class="text-red-500 hover:text-red-700 p-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                          </div>
                      </div>
                    </div>
  
                    <!-- Image Upload -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.productImage }} <span class="text-gray-400 font-normal">({{ t.optional }})</span></label>
                      <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 transition-colors" @click="$refs.imageInput.click()">
                          <input ref="imageInput" type="file" class="hidden" accept="image/*" @change="handleImageSelect">
                          
                          <div v-if="!currentItem.imagePreview && !currentItem.image_url" class="text-gray-500">
                              <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                              <span class="text-xs">{{ t.uploadImage }}</span>
                          </div>
                          <div v-else class="relative">
                              <img :src="currentItem.imagePreview || currentItem.image_full_url" class="h-24 mx-auto rounded-lg shadow-sm object-cover">
                              <button @click.stop="removeImage" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                          </div>
                      </div>
                    </div>
  
                    <!-- Notes -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">{{ t.notes }} <span class="text-gray-400 font-normal">({{ t.optional }})</span></label>
                      <textarea v-model="currentItem.notes" rows="2" class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm py-2" :placeholder="t.notesPlaceholder"></textarea>
                    </div>
  
                    <button type="submit" class="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition-all">{{ t.saveItem }}</button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
  
  definePageMeta({
    layout: 'app',
    middleware: ['auth', 'customer', 'complete-profile']
  });
  
  const { $customFetch, $toast } = useNuxtApp();
  const { t: createTranslations } = useLanguage();
  const route = useRoute();
  const router = useRouter();
  
  const translations = {
    editRequest: { es: 'Editar Solicitud', en: 'Edit Request' },
    createRequest: { es: 'Editar Solicitud', en: 'Edit Request' },
    stepAddItems: { es: 'Modificar Artículos', en: 'Modify Items' },
    howItWorks: { es: 'Modo Edición', en: 'Edit Mode' },
    howItWorksDesc: { 
      es: 'Puedes modificar los artículos, cantidades o agregar nuevos productos antes de que revisemos tu solicitud.', 
      en: 'You can modify items, quantities, or add new products before we review your request.'
    },
    addItem: { es: 'Agregar Artículo', en: 'Add Item' },
    addAnotherItem: { es: 'Agregar Otro Artículo', en: 'Add Another Item' },
    pasteLinkHint: { es: 'Pega el enlace, nombre y precio', en: 'Paste link, name and price' },
    yourList: { es: 'Tu Lista', en: 'Your List' },
    items: { es: 'Artículos', en: 'Items' },
    qty: { es: 'Cant', en: 'Qty' },
    price: { es: 'Precio', en: 'Price' },
    productOptions: { es: 'Opciones del Producto', en: 'Product Options' },
    selectOptionType: { es: 'Tipo de Opción', en: 'Option Type' },
    optionValue: { es: 'Valor (Ej: Rojo, M)', en: 'Value (Ex: Red, M)' },
    size: { es: 'Talla', en: 'Size' },
    color: { es: 'Color', en: 'Color' },
    style: { es: 'Estilo', en: 'Style' },
    model: { es: 'Modelo', en: 'Model' },
    other: { es: 'Otro', en: 'Other' },
    productImage: { es: 'Imagen del Producto', en: 'Product Image' },
    uploadImage: { es: 'Haz clic para subir imagen', en: 'Click to upload image' },
    imageAttached: { es: 'Imagen adjunta', en: 'Image attached' },
    notes: { es: 'Notas', en: 'Notes' },
    optional: { es: 'Opcional', en: 'Optional' },
    notesPlaceholder: { es: 'Notas adicionales...', en: 'Additional notes...' },
    productUrl: { es: 'Enlace', en: 'Link' },
    urlPlaceholder: { es: 'https://...', en: 'https://...' },
    productName: { es: 'Nombre', en: 'Name' },
    namePlaceholder: { es: 'Nombre del producto', en: 'Product name' },
    quantity: { es: 'Cantidad', en: 'Quantity' },
    estimatedMerchandise: { es: 'Estimado Mercancía', en: 'Est. Merchandise' },
    shippingTax: { es: 'Envío e Impuestos (USA)', en: 'Shipping & Tax (USA)' },
    serviceFee: { es: 'Tarifa', en: 'Fee' },
    tbd: { es: 'Por Calcular', en: 'TBD' },
    submitRequest: { es: 'Guardar Cambios', en: 'Save Changes' },
    submitting: { es: 'Guardando...', en: 'Saving...' },
    saving: { es: 'Guardando...', en: 'Saving...' },
    saveChanges: { es: 'Guardar Cambios', en: 'Save Changes' },
    saveItem: { es: 'Guardar Artículo', en: 'Save Item' },
    addItemTitle: { es: 'Agregar Artículo', en: 'Add Item' },
    editItem: { es: 'Editar Artículo', en: 'Edit Item' },
    successMsg: { es: 'Solicitud actualizada exitosamente', en: 'Request updated successfully' },
    errorMsg: { es: 'Error al actualizar solicitud', en: 'Error updating request' },
  };
  
  const t = createTranslations(translations);
  const requestId = route.params.id;
  const request = ref(null);
  const loadingRequest = ref(true);
  const saving = ref(false);
  
  // Form State
  const form = ref({ items: [] });
  const showModal = ref(false);
  const isEditing = ref(false);
  const editingIndex = ref(-1);
  
  // Current Item Model
  const currentItem = ref({
    id: null,
    product_url: '',
    product_name: '',
    price: null,
    quantity: 1,
    notes: '',
    options: {},
    image: null,
    imagePreview: null,
    image_url: null,
    image_full_url: null,
    remove_image: false
  });
  
  const newOptionType = ref('');
  const newOptionValue = ref('');
  
  // Load Data
  const fetchRequest = async () => {
    loadingRequest.value = true;
    try {
      const response = await $customFetch(`/purchase-requests/${requestId}`);
      request.value = response.data || response;
      
      // Map existing items to form
      form.value.items = request.value.items.map(item => ({
          id: item.id,
          product_url: item.product_url,
          product_name: item.product_name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          notes: item.notes || '',
          options: item.options || {},
          image_url: item.image_url,
          image_full_url: item.image_full_url,
          image: null,
          imagePreview: null,
          remove_image: false
      }));
  
      if(request.value.status !== 'pending_review') {
          $toast.error('Cannot edit processed requests');
          router.push(`/app/purchase-requests/${requestId}`);
      }
  
    } catch (e) {
      console.error(e);
      $toast.error('Error loading request');
    } finally {
      loadingRequest.value = false;
    }
  };
  
  // Computed
  const hasItems = computed(() => form.value.items.length > 0);
  const totalItems = computed(() => form.value.items.reduce((sum, i) => sum + i.quantity, 0));
  const estimatedTotal = computed(() => form.value.items.reduce((sum, i) => sum + (i.price * i.quantity), 0));
  
  // Modal Methods
  const openAddModal = () => {
    isEditing.value = false;
    editingIndex.value = -1;
    currentItem.value = { id: null, product_url: '', product_name: '', price: null, quantity: 1, notes: '', options: {}, image: null, imagePreview: null, image_url: null, remove_image: false };
    showModal.value = true;
  };
  
  const editItem = (index) => {
      isEditing.value = true;
      editingIndex.value = index;
      
      const itemToEdit = form.value.items[index];
      currentItem.value = {
          ...itemToEdit,
          options: { ...itemToEdit.options } 
      };
  
      if (form.value.items[index].image) {
          currentItem.value.image = form.value.items[index].image;
          currentItem.value.imagePreview = form.value.items[index].imagePreview;
      }
      showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  // Item Logic
  const incrementQty = () => { if (currentItem.value.quantity < 999) currentItem.value.quantity++; };
  const decrementQty = () => { if (currentItem.value.quantity > 1) currentItem.value.quantity--; };
  
  const addOption = () => {
      if (newOptionType.value && newOptionValue.value) {
          currentItem.value.options[newOptionType.value] = newOptionValue.value;
          newOptionType.value = '';
          newOptionValue.value = '';
      }
  };
  
  const removeOption = (key) => { delete currentItem.value.options[key]; };
  
  const handleImageSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
          currentItem.value.image = file;
          currentItem.value.imagePreview = URL.createObjectURL(file);
          currentItem.value.remove_image = false;
      }
  };
  
  const removeImage = () => {
      currentItem.value.image = null;
      currentItem.value.imagePreview = null;
      currentItem.value.image_url = null;
      currentItem.value.image_full_url = null;
      currentItem.value.remove_image = true; 
  };
  
  const fixUrl = (url) => {
    if (!url) return '';
    let cleanUrl = url.trim();
    if (!cleanUrl.match(/^https?:\/\//i)) return 'https://' + cleanUrl;
    return cleanUrl;
  };
  
  const saveItem = () => {
    // Auto-add pending option if user typed but forgot to click +
    if (newOptionType.value && newOptionValue.value) {
       currentItem.value.options[newOptionType.value] = newOptionValue.value;
       newOptionType.value = '';
       newOptionValue.value = '';
    }
  
    currentItem.value.product_url = fixUrl(currentItem.value.product_url);
    
    const newItemData = { 
        ...currentItem.value,
        options: { ...currentItem.value.options }
    };
  
    if (isEditing.value) {
        form.value.items[editingIndex.value] = newItemData;
    } else {
        form.value.items.push(newItemData);
    }
    closeModal();
  };
  
  const removeItem = (index) => {
    form.value.items.splice(index, 1);
  };
  
  const truncateUrl = (url) => {
    try {
      const { hostname } = new URL(fixUrl(url));
      return hostname.replace('www.', '');
    } catch { return 'Link'; }
  };
  
  const submitUpdate = async () => {
    saving.value = true;
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT'); 
  
      form.value.items.forEach((item, index) => {
          if (item.id) formData.append(`items[${index}][id]`, item.id);
          formData.append(`items[${index}][product_name]`, item.product_name);
          formData.append(`items[${index}][product_url]`, item.product_url);
          formData.append(`items[${index}][price]`, item.price);
          formData.append(`items[${index}][quantity]`, item.quantity);
          if (item.notes) formData.append(`items[${index}][notes]`, item.notes);
          
          if (item.image) {
              formData.append(`items[${index}][image]`, item.image);
          } else if (item.remove_image) {
              formData.append(`items[${index}][remove_image]`, 'true');
          }
  
          // FIX: Properly check and serialize options
          if (item.options && Object.keys(item.options).length > 0) {
              formData.append(`items[${index}][options]`, JSON.stringify(item.options));
          } else {
              formData.append(`items[${index}][options]`, '{}');
          }
      });
  
      await $customFetch(`/purchase-requests/${requestId}`, {
        method: 'POST', 
        body: formData
      });
  
      $toast.success(t.value.successMsg);
      router.push(`/app/purchase-requests/${requestId}`);
  
    } catch (error) {
      console.error(error);
      $toast.error(t.value.errorMsg);
    } finally {
      saving.value = false;
    }
  };
  
  onMounted(() => {
    fetchRequest();
  });
  </script>
  
  <style scoped>
  .list-enter-active, .list-leave-active { transition: all 0.3s ease; }
  .list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-20px); }
  </style>