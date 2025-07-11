<template>
  <Disclosure
    as="nav"
    class="bg-white border-b border-gray-200 shadow-sm"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <a
              href="/app/admin/dashboard"
              @click.prevent="handleNavigation('/app/admin/dashboard')"
              class="flex items-center"
            >
              <!-- Logo -->
              <div class="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-3">
                <svg class="w-6 h-6" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  <g stroke="#0d2c4f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
                    <line x1="0" y1="35" x2="40" y2="35" />
                    <line x1="5" y1="50" x2="45" y2="50" />
                    <line x1="0" y1="65" x2="40" y2="65" />
                    <path fill="#FFC107" d="M 55,25 L 105,25 L 125,45 L 75,45 Z" />
                    <path fill="#FFA000" d="M 55,25 L 55,75 L 75,95 L 75,45 Z" />
                    <path fill="#FF8F00" d="M 75,95 L 125,95 L 125,45 L 75,45 Z" />
                  </g>
                </svg>
              </div>
            </a>
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <button
              @click="handleNavigation('/app/admin/dashboard')"
              :class="[
                isActiveRoute('/app/admin/dashboard')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.dashboard }}
            </button>
            
            <!-- Orders Dropdown -->
            <div
              class="relative inline-flex h-full group"
              @mouseenter="showDropdown('orders')"
              @mouseleave="hideDropdown('orders')"
            >
              <button
                type="button"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                :class="[
                  isActiveRoute('/app/admin/orders')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                ]"
              >
                {{ t.orders }}
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                v-show="dropdowns.orders"
                class="absolute left-0 top-full mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                style="position: absolute; z-index: 99999;"
                role="menu"
                aria-orientation="vertical"
              >
                <div class="py-1" role="none">
                  <a
                    href="/app/admin/orders"
                    @click.prevent="handleNavigation('/app/admin/orders')"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    role="menuitem"
                  >{{ t.allOrders }}</a>
                  <a
                    href="/app/admin/orders/ready-to-quote"
                    @click.prevent="handleNavigation('/app/admin/orders/ready-to-quote')"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    role="menuitem"
                  >{{ t.readyToQuote }}</a>
                </div>
              </div>
            </div>

            <!-- Packages - Now a single link -->
            <button
              @click="handleNavigation('/app/admin/packages')"
              :class="[
                isActiveRoute('/app/admin/packages')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.packages }}
            </button>

            <button
              @click="handleNavigation('/app/admin/customers')"
              :class="[
                isActiveRoute('/app/admin/customers')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.customers }}
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <!-- Admin Badge -->
            <span class="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mr-4 border border-primary-200">
              {{ t.adminRole }}
            </span>
            
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex items-center gap-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 px-3 py-2 hover:bg-gray-50 border border-gray-200"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-medium">{{ userInitials }}</span>
                  </div>
                  <span class="hidden lg:block text-gray-700">{{ user?.name }}</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-200">
                    <p class="text-sm text-gray-500">{{ t.signedInAs }}</p>
                    <p class="text-sm font-medium text-gray-900 truncate">{{ user?.email }}</p>
                  </div>
                  
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/app/account/"
                      @click.prevent="handleNavigation('/app/account/')"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ t.account }}
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click.prevent="handleLogout"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ t.logout }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/dashboard')"
          :class="[
            isActiveRoute('/app/admin/dashboard')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.dashboard }}</DisclosureButton>
        
        <!-- Mobile Orders Section -->
        <div class="pl-6">
          <p class="px-3 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase">{{ t.orders }}</p>
          <DisclosureButton
            as="a"
            href="/app/admin/orders"
            @click.prevent="handleNavigation('/app/admin/orders')"
            :class="[
              isActiveRoute('/app/admin/orders') && !isActiveRoute('/app/admin/orders/ready-to-quote')
                ? 'bg-primary-50 border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
              'block border-l-4 py-2 pl-6 pr-4 text-base font-medium',
            ]"
          >{{ t.allOrders }}</DisclosureButton>
          <DisclosureButton
            as="a"
            href="/app/admin/orders/ready-to-quote"
            @click.prevent="handleNavigation('/app/admin/orders/ready-to-quote')"
            :class="[
              isActiveRoute('/app/admin/orders/ready-to-quote')
                ? 'bg-primary-50 border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
              'block border-l-4 py-2 pl-6 pr-4 text-base font-medium',
            ]"
          >{{ t.readyToQuote }}</DisclosureButton>
        </div>

        <!-- Mobile Packages - Now a single link -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/packages')"
          :class="[
            isActiveRoute('/app/admin/packages')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.packages }}</DisclosureButton>

        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/customers')"
          :class="[
            isActiveRoute('/app/admin/customers')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.customers }}</DisclosureButton>
      </div>
      
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="px-4 sm:px-6">
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-primary-600 font-medium text-lg">{{ userInitials }}</span>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-900">{{ user?.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user?.email }}</div>
            </div>
            <span class="ml-auto px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full border border-primary-200">
              {{ t.adminRole }}
            </span>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          
          <DisclosureButton
            as="button"
            @click="handleNavigation('/app/account')"
            class="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 sm:px-6 w-full text-left"
          >{{ t.account }}</DisclosureButton>
          <DisclosureButton
            as="button"
            @click="handleLogout"
            class="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 sm:px-6 w-full text-left"
          >{{ t.logout }}</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, computed } from "vue";

const { $customFetch } = useNuxtApp();
const user = useUser().value;
const router = useRouter();

// Use the language composable
const { t: createTranslations } = useLanguage();

// Translations
const translations = {
  dashboard: {
    es: 'Panel de Control',
    en: 'Dashboard'
  },
  orders: {
    es: 'Órdenes',
    en: 'Orders'
  },
  allOrders: {
    es: 'Todas las Órdenes',
    en: 'All Orders'
  },
  readyToQuote: {
    es: 'Listas para Cotizar',
    en: 'Ready to Quote'
  },
  packages: {
    es: 'Paquetes',
    en: 'Packages'
  },
  customers: {
    es: 'Clientes',
    en: 'Customers'
  },
  adminRole: {
    es: 'Administrador',
    en: 'Administrator'
  },
  signedInAs: {
    es: 'Sesión iniciada como',
    en: 'Signed in as'
  },
  account: {
    es: 'Cuenta',
    en: 'Account'
  },
  logout: {
    es: 'Cerrar Sesión',
    en: 'Sign out'
  }
};

// Get reactive translations
const t = createTranslations(translations);

// Get user initials
const userInitials = computed(() => {
  if (!user?.name) return 'A';
  const names = user.name.split(' ');
  return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

// Dropdown state management - now only for orders
const dropdowns = reactive({
  orders: false,
});

const dropdownTimers = reactive({});

const showDropdown = (key) => {
  if (dropdownTimers[key]) {
    clearTimeout(dropdownTimers[key]);
  }
  dropdowns[key] = true;
};

const hideDropdown = (key) => {
  dropdownTimers[key] = setTimeout(() => {
    dropdowns[key] = false;
  }, 200); // 200ms delay before closing
};

const isActiveRoute = (route) => {
  const currentPath = router.currentRoute.value.path;
  if (route === "/app/admin/dashboard" && currentPath === "/app/admin/dashboard") {
    return true;
  }
  return (
    currentPath.startsWith(route) &&
    (currentPath === route || currentPath.charAt(route.length) === "/")
  );
};

const handleNavigation = async (path) => {
  // Check if we're already on the same page
  if (router.currentRoute.value.path === path) {
    // Force a page reload
    window.location.href = path;
  } else {
    await navigateTo(path);
  }
};

const handleLogout = async () => {
  try {
    await $customFetch("/auth/logout", {
      method: "POST",
    });
    useState("user", () => null);
    
    // Clear any stored data
    const csrfCookie = useCookie("XSRF-TOKEN");
    csrfCookie.value = null;
    
    window.location.href = "/login";
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>