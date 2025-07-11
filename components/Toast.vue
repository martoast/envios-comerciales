<!-- components/Toast.vue -->
<template>
    <Teleport to="body">
      <div
        class="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-4 sm:right-4 z-50 pointer-events-none"
      >
        <TransitionGroup
          name="toast"
          tag="div"
          class="flex flex-col-reverse sm:flex-col sm:items-end"
        >
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="pointer-events-auto w-full sm:max-w-md"
          >
            <!-- Mobile: Full width with safe area padding -->
            <!-- Desktop: Max width with margin -->
            <div
              class="mx-2 mb-2 sm:mx-0 sm:mb-3 overflow-hidden rounded-xl shadow-2xl"
              :class="[
                toast.type === 'success' && 'bg-green-400',
                toast.type === 'error' && 'bg-red-500',
                toast.type === 'warning' && 'bg-amber-500',
                toast.type === 'info' && 'bg-gray-800'
              ]"
            >
              <div class="p-4">
                <div class="flex items-start">
                  <!-- Icon -->
                  <div class="flex-shrink-0">
                    <!-- Success icon -->
                    <svg
                      v-if="toast.type === 'success'"
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    
                    <!-- Error icon -->
                    <svg
                      v-else-if="toast.type === 'error'"
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    
                    <!-- Warning icon -->
                    <svg
                      v-else-if="toast.type === 'warning'"
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    
                    <!-- Info icon -->
                    <svg
                      v-else
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  
                  <!-- Content -->
                  <div class="ml-3 flex-1">
                    <p class="text-base font-medium text-white">
                      {{ toast.message }}
                    </p>
                    
                    <!-- Action button if provided -->
                    <button
                      v-if="toast.action"
                      @click="handleAction(toast)"
                      class="mt-2 text-sm font-semibold text-white underline decoration-2 underline-offset-2 hover:no-underline"
                    >
                      {{ toast.action.label }}
                    </button>
                  </div>
                  
                  <!-- Close button -->
                  <div class="ml-4 flex-shrink-0">
                    <button
                      @click="removeToast(toast.id)"
                      class="inline-flex rounded-md p-1.5 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span class="sr-only">Dismiss</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Progress bar -->
              <div class="h-1 w-full bg-black/20 overflow-hidden">
                <div
                  class="h-full bg-white/30 transition-all duration-100 ease-linear"
                  :style="`width: ${getProgress(toast)}%; transition-duration: ${toast.duration}ms;`"
                />
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const { toasts, remove } = useToast()
  
  // Track toast progress
  const toastProgress = ref({})
  
  const removeToast = (id) => {
    remove(id)
  }
  
  const handleAction = (toast) => {
    if (toast.action?.callback) {
      toast.action.callback()
    }
    removeToast(toast.id)
  }
  
  const getProgress = (toast) => {
    return toastProgress.value[toast.id] || 100
  }
  
  // Initialize progress tracking
  onMounted(() => {
    // Watch for new toasts and start their progress
    watch(toasts, (newToasts) => {
      newToasts.forEach(toast => {
        if (!toastProgress.value[toast.id]) {
          toastProgress.value[toast.id] = 100
          // Start progress animation
          setTimeout(() => {
            toastProgress.value[toast.id] = 0
          }, 50)
        }
      })
      
      // Clean up old progress entries
      const currentIds = newToasts.map(t => t.id)
      Object.keys(toastProgress.value).forEach(id => {
        if (!currentIds.includes(parseInt(id))) {
          delete toastProgress.value[id]
        }
      })
    }, { immediate: true })
  })
  </script>
  
  <style scoped>
  /* Toast animations */
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .toast-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }
  
  .toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .toast-move {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Mobile-specific animations */
  @media (max-width: 640px) {
    .toast-enter-from {
      transform: translateY(100%);
    }
    
    .toast-leave-to {
      transform: translateY(100%);
      opacity: 1;
    }
  }
  
  /* Safe area padding for mobile devices */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    @media (max-width: 640px) {
      .toast-enter-active > div,
      .toast-leave-active > div {
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
  }
  </style>