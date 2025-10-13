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
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {{ t.createOrderTitle }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ t.createOrderSubtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

      <!-- Form Content (shown when not loading profile) -->
      <div v-else>
        <!-- Saved Address Notice -->
        

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

        <!-- Delivery Address Form -->
        <form @submit.prevent="handleCreateOrder">
          <DeliveryAddressStep
            :delivery-address="form.delivery_address"
            :is-rural="form.is_rural"
            :save-address="form.save_address"
            :rural-surcharge="null"
            :mexican-states="mexicanStates"
            :t="t"
            @update:delivery-address="form.delivery_address = $event"
            @update:is-rural="form.is_rural = $event"
            @update:save-address="form.save_address = $event"
          />

          <!-- Submit Button -->
          <div class="mt-8 flex justify-end">
            <button
              type="submit"
              :disabled="!isFormValid || loading"
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
import DeliveryAddressStep from "~/components/CheckoutStep4.vue";

// Define page meta
definePageMeta({
  layout: "app",
  middleware: ["auth", "customer", "complete-profile"],
});

// Nuxt imports
const { $customFetch } = useNuxtApp();
const { $toast } = useNuxtApp();
const user = useUser().value;

// Use the language composable
const { t: createTranslations, language } = useLanguage();

// State
const loading = ref(false);
const loadingProfile = ref(true);
const errorMessage = ref("");
const hasLoadedSavedAddress = ref(false);

// Form data - Initialize with empty values first
const form = ref({
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

// Computed
const isFormValid = computed(() => {
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

// Translations
const translations = {
  createOrderTitle: {
    es: "Crear Nuevo Envio",
    en: "Create New Shipment",
  },
  createOrderSubtitle: {
    es: "Ingresa tu dirección de entrega en México",
    en: "Enter your delivery address in Mexico",
  },
  declaredValueOptional: {
    es: "Valor Declarado (Opcional)",
    en: "Declared Value (Optional)",
  },
  declaredValueDescription: {
    es: "Ingresa el valor estimado de tus compras para calcular impuestos. Puedes actualizarlo después.",
    en: "Enter the estimated value of your purchases for tax calculation. You can update it later.",
  },
  ivaWarning: {
    es: "Se aplicará IVA del 16% para valores superiores a $50 USD",
    en: "16% VAT will apply for values over $50 USD",
  },
  createOrder: {
    es: "Continuar",
    en: "Continue",
  },
  creating: {
    es: "Creando envio...",
    en: "Creating shipment...",
  },
  loadingAddress: {
    es: "Cargando tu dirección guardada...",
    en: "Loading your saved address...",
  },
  savedAddressLoaded: {
    es: "Dirección guardada cargada",
    en: "Saved address loaded",
  },
  savedAddressLoadedDescription: {
    es: "Hemos cargado tu dirección guardada. Puedes modificarla si es necesario.",
    en: "We've loaded your saved address. You can modify it if needed.",
  },
  // Include all the translations from DeliveryAddressStep
  quickAddressSearchTitle: {
    es: 'Búsqueda Rápida de Dirección',
    en: 'Quick Address Search'
  },
  quickAddressSearchDescription: {
    es: 'Busca tu dirección para completar los campos automáticamente',
    en: 'Search for your address to automatically fill the fields'
  },
  searchPlaceholder: {
    es: 'Buscar dirección, ciudad o código postal',
    en: 'Search address, city or zip code'
  },
  addressFoundMessage: {
    es: 'Dirección encontrada. Por favor revisa y completa los campos faltantes.',
    en: 'Address found. Please review and complete any missing fields.'
  },
  streetLabel: {
    es: "Calle",
    en: "Street",
  },
  streetPlaceholder: {
    es: "Nombre de la calle",
    en: "Street name",
  },
  exteriorNumberLabel: {
    es: "Número Exterior",
    en: "Exterior Number",
  },
  exteriorNumberPlaceholder: {
    es: "123",
    en: "123",
  },
  interiorNumberLabel: {
    es: "Número Interior",
    en: "Interior Number",
  },
  interiorNumberPlaceholder: {
    es: "Opcional",
    en: "Optional",
  },
  coloniaLabel: {
    es: "Colonia",
    en: "Neighborhood",
  },
  coloniaPlaceholder: {
    es: "Nombre de la colonia",
    en: "Neighborhood name",
  },
  municipioLabel: {
    es: "Municipio/Delegación",
    en: "Municipality",
  },
  municipioPlaceholder: {
    es: "Municipio o delegación",
    en: "Municipality",
  },
  estadoLabel: {
    es: "Estado",
    en: "State",
  },
  selectEstado: {
    es: "Selecciona un estado",
    en: "Select a state",
  },
  postalCodeLabel: {
    es: "Código Postal",
    en: "Postal Code",
  },
  postalCodePlaceholder: {
    es: "12345",
    en: "12345",
  },
  referenciasLabel: {
    es: "Referencias",
    en: "References",
  },
  referenciasPlaceholder: {
    es: "Entre calles, puntos de referencia, color de la casa, etc.",
    en: "Between streets, landmarks, house color, etc.",
  },
  ruralAreaLabel: {
    es: "Zona Rural",
    en: "Rural Area",
  },
  ruralAreaDescription: {
    es: "Marca esta casilla si tu dirección está en una zona rural.",
    en: "Check this box if your address is in a rural area.",
  },
  saveAddressLabel: {
    es: "Guardar esta dirección para futuros pedidos",
    en: "Save this address for future orders",
  },
  saveAddressDescription: {
    es: "Guarda tu dirección de entrega para no tener que ingresarla nuevamente",
    en: "Save your delivery address so you don't have to enter it again",
  },
};

// Get reactive translations
const t = createTranslations(translations);

// Methods
const fetchUserProfile = async () => {
  loadingProfile.value = true;
  try {
    const response = await $customFetch('/profile');
    
    if (response.success && response.data) {
      const profileData = response.data;
      
      // Check if user has a complete address
      if (profileData.has_complete_address && profileData.address) {
        // Pre-populate the form with the saved address
        form.value.delivery_address = {
          street: profileData.address.street || "",
          exterior_number: profileData.address.exterior_number || "",
          interior_number: profileData.address.interior_number || "",
          colonia: profileData.address.colonia || "",
          municipio: profileData.address.municipio || "",
          estado: profileData.address.estado || "",
          postal_code: profileData.address.postal_code || "",
          referencias: "", // Referencias is not stored in profile, so leave empty
        };
        
        // Mark that we've loaded a saved address
        hasLoadedSavedAddress.value = true;
        
        // Since we have a saved address, don't check "save address" by default
        form.value.save_address = false;
      } else {
        // No saved address, use user data if available (fallback to old approach)
        if (user) {
          form.value.delivery_address = {
            street: user.street || "",
            exterior_number: user.exterior_number || "",
            interior_number: user.interior_number || "",
            colonia: user.colonia || "",
            municipio: user.municipio || "",
            estado: user.estado || "",
            postal_code: user.postal_code || "",
            referencias: "",
          };
        }
        
        // Suggest saving address if they don't have one
        form.value.save_address = true;
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // If error fetching profile, fallback to user data if available
    if (user) {
      form.value.delivery_address = {
        street: user.street || "",
        exterior_number: user.exterior_number || "",
        interior_number: user.interior_number || "",
        colonia: user.colonia || "",
        municipio: user.municipio || "",
        estado: user.estado || "",
        postal_code: user.postal_code || "",
        referencias: "",
      };
    }
  } finally {
    loadingProfile.value = false;
  }
};

const handleCreateOrder = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  errorMessage.value = "";

  // Save address if requested
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
      // Continue with order creation even if address save fails
    }
  }

  try {
    // Create the order with the new endpoint
    const response = await $customFetch("/orders", {
      method: "POST",
      body: {
        delivery_address: form.value.delivery_address,
        is_rural: form.value.is_rural,
        notes: form.value.notes,
      },
    });

    if (response.success) {
      // Show success message
      $toast.success(language.value === 'es' 
        ? '¡Orden creada! Ahora agrega los productos que vas a comprar.'
        : 'Order created! Now add the products you plan to buy.');
      
      // Redirect to add items page
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

// Fetch user profile on mount to pre-populate address
onMounted(() => {
  fetchUserProfile();
});
</script>