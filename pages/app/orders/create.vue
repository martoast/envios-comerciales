<!-- pages/app/orders/create.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/app/orders"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </NuxtLink>
          <div class="flex-1">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {{ t.createOrderTitle }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ t.createOrderSubtitle }}
            </p>
          </div>
        </div>

        <!-- Progress Steps -->
        <div class="mt-6 flex items-center justify-center">
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Step 1: Box Selection -->
            <div class="flex items-center">
              <div :class="[
                'flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-colors',
                currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
              ]">
                <svg v-if="currentStep > 1" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span v-else>1</span>
              </div>
              <span class="ml-2 text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{{ t.step1 }}</span>
            </div>

            <!-- Divider -->
            <div :class="['w-12 sm:w-16 h-0.5 transition-colors', currentStep >= 2 ? 'bg-primary-500' : 'bg-gray-200']"></div>

            <!-- Step 2: Delivery Address -->
            <div class="flex items-center">
              <div :class="[
                'flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-colors',
                currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
              ]">
                <svg v-if="currentStep > 2" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span v-else>2</span>
              </div>
              <span class="ml-2 text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{{ t.step2 }}</span>
            </div>

            <!-- Divider -->
            <div :class="['w-12 sm:w-16 h-0.5 transition-colors', currentStep >= 3 ? 'bg-primary-500' : 'bg-gray-200']"></div>

            <!-- Step 3: Add Products -->
            <div class="flex items-center">
              <div :class="[
                'flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-colors',
                currentStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
              ]">
                3
              </div>
              <span class="ml-2 text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{{ t.step3 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Error Alert -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="errorMessage"
          class="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
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
          </div>
        </div>
      </Transition>

      <!-- Step 1: Box Selection -->
      <div v-show="currentStep === 1">
        <BoxSelector
          v-model="form.box_stripe_product_id"
          v-model:selected-box-data="form.selectedBoxData"
          @box-selected="handleBoxSelected"
          @continue="goToStep(2)"
        />
      </div>

      <!-- Step 2: Delivery Address -->
      <div v-show="currentStep === 2">
        <!-- Loading State -->
        <div v-if="loadingProfile" class="flex items-center justify-center py-12">
          <div class="text-center">
            <svg class="inline-block w-12 h-12 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-4 text-gray-600">{{ t.loadingAddress }}</p>
          </div>
        </div>

        <form v-else @submit.prevent="handleCreateOrder">
          <DeliveryAddressStep
            :delivery-address="form.delivery_address"
            :is-rural="form.is_rural"
            :save-address="form.save_address"
            :rural-surcharge="null"
            :mexican-states="mexicanStates"
            :t="addressTranslations"
            @update:delivery-address="form.delivery_address = $event"
            @update:is-rural="form.is_rural = $event"
            @update:save-address="form.save_address = $event"
          />

          <div class="mt-8 flex justify-between px-4">
            <button
              type="button"
              @click="goToStep(1)"
              class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
            >
              <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ t.back }}
            </button>

            <button
              type="submit"
              :disabled="!isAddressValid || loading"
              class="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ t.creating }}
              </span>
              <span v-else>
                {{ t.createOrder }}
                <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BoxSelector from "~/components/BoxSelector.vue";
import DeliveryAddressStep from "~/components/CheckoutStep4.vue";

definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

const { $customFetch, $toast } = useNuxtApp();
const user = useUser().value;
const { t: createTranslations, language } = useLanguage();

const loading = ref(false);
const loadingProfile = ref(true);
const errorMessage = ref("");
const currentStep = ref(1);

const form = ref({
  box_stripe_product_id: null,
  selectedBoxData: null,
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
  is_rural: false,
  save_address: false,
  notes: "",
});

const mexicanStates = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

const isAddressValid = computed(() => {
  const addr = form.value.delivery_address;
  return (
    addr.street &&
    addr.exterior_number &&
    addr.colonia &&
    addr.municipio &&
    addr.estado &&
    addr.postal_code &&
    /^\d{5}$/.test(addr.postal_code)
  );
});

const translations = {
  createOrderTitle: { es: "Crear Nuevo Envío", en: "Create New Shipment" },
  createOrderSubtitle: { es: "Selecciona tu caja y configura tu envío", en: "Select your box and configure your shipment" },
  step1: { es: "Seleccionar Caja", en: "Select Box" },
  step2: { es: "Dirección", en: "Address" },
  step3: { es: "Agregar Productos", en: "Add Products" },
  continue: { es: "Continuar", en: "Continue" },
  back: { es: "Atrás", en: "Back" },
  createOrder: { es: "Crear Orden", en: "Create Order" },
  creating: { es: "Creando orden...", en: "Creating order..." },
  loadingAddress: { es: "Cargando tu dirección guardada...", en: "Loading your saved address..." },
};

const addressTranslationsRaw = {
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
  referenciasPlaceholder: { es: "Entre calles, puntos de referencia, color de la casa, etc.", en: "Between streets, landmarks, house color, etc." },
  ruralAreaLabel: { es: "Zona Rural", en: "Rural Area" },
  ruralAreaDescription: { es: "Marca esta casilla si tu dirección está en una zona rural.", en: "Check this box if your address is in a rural area." },
  saveAddressLabel: { es: "Guardar esta dirección para futuros pedidos", en: "Save this address for future orders" },
  saveAddressDescription: { es: "Guarda tu dirección de entrega para no tener que ingresarla nuevamente", en: "Save your delivery address so you don't have to enter it again" },
};

const t = createTranslations(translations);
const addressTranslations = createTranslations(addressTranslationsRaw);

const goToStep = (step) => {
  currentStep.value = step;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleBoxSelected = (box) => {
  console.log('Box selected:', box);
};

const fetchUserProfile = async () => {
  loadingProfile.value = true;
  try {
    const response = await $customFetch('/profile');
    
    if (response.success && response.data) {
      const profileData = response.data;
      
      if (profileData.has_complete_address && profileData.address) {
        form.value.delivery_address = {
          street: profileData.address.street || "",
          exterior_number: profileData.address.exterior_number || "",
          interior_number: profileData.address.interior_number || "",
          colonia: profileData.address.colonia || "",
          municipio: profileData.address.municipio || "",
          estado: profileData.address.estado || "",
          postal_code: profileData.address.postal_code || "",
          referencias: "",
        };
        form.value.save_address = false;
      } else {
        form.value.save_address = true;
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  } finally {
    loadingProfile.value = false;
  }
};

const handleCreateOrder = async () => {
  if (!isAddressValid.value || !form.value.box_stripe_product_id) return;

  loading.value = true;
  errorMessage.value = "";

  if (form.value.save_address) {
    try {
      await $customFetch("/profile", {
        method: "PUT",
        body: {
          street: form.value.delivery_address.street,
          exterior_number: form.value.delivery_address.exterior_number,
          interior_number: form.value.delivery_address.interior_number,
          colonia: form.value.delivery_address.colonia,
          municipio: form.value.delivery_address.municipio,
          estado: form.value.delivery_address.estado,
          postal_code: form.value.delivery_address.postal_code,
        },
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  }

  try {
    const response = await $customFetch("/orders", {
      method: "POST",
      body: {
        delivery_address: form.value.delivery_address,
        is_rural: form.value.is_rural,
        notes: form.value.notes,
        box_stripe_product_id: form.value.box_stripe_product_id,
        box_size: form.value.selectedBoxData?.name?.toLowerCase().replace(' box', '').replace(' ', '-') || null,
        box_price: form.value.selectedBoxData?.price || null,
      },
    });

    if (response.success) {
      $toast.success(language.value === 'es' 
        ? '¡Orden creada! Ahora agrega los productos que vas a comprar.'
        : 'Order created! Now add the products you plan to buy.');
      
      await navigateTo(`/app/orders/${response.data.order.id}/items`);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    const errorMsg = error.data?.message || (language.value === 'es' 
      ? 'Error al crear la orden. Por favor intenta de nuevo.'
      : 'Error creating order. Please try again.');
    $toast.error(errorMsg);
    errorMessage.value = errorMsg;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>