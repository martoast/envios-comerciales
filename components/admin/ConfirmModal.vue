<template>
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="$emit('cancel')">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <!-- Icon -->
              <div class="p-6 text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                
                <h3 class="text-lg font-bold text-gray-900 mb-2">
                  {{ title }}
                </h3>
                
                <p class="text-sm text-gray-600">
                  {{ message }}
                </p>
              </div>
  
              <!-- Actions -->
              <div class="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 rounded-b-2xl">
                <button
                  @click="$emit('cancel')"
                  class="flex-1 px-4 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm"
                >
                  {{ cancelText }}
                </button>
                
                <button
                  @click="$emit('confirm')"
                  class="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-all duration-200 text-sm"
                >
                  {{ confirmText }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  })
  
  defineEmits(['confirm', 'cancel'])
  </script>