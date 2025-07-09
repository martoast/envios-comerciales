// composables/useToast.js
import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export const useToast = () => {
  const show = (options) => {
    const id = toastId++
    const toast = {
      id,
      message: options.message || '',
      type: options.type || 'info', // success, error, warning, info
      duration: options.duration || 4000,
      action: options.action || null, // { label: 'Undo', callback: () => {} }
    }
    
    toasts.value.push(toast)
    
    // Auto remove after duration
    if (toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }
    
    return id
  }
  
  const remove = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const success = (message, options = {}) => {
    return show({ ...options, message, type: 'success' })
  }
  
  const error = (message, options = {}) => {
    return show({ ...options, message, type: 'error' })
  }
  
  const warning = (message, options = {}) => {
    return show({ ...options, message, type: 'warning' })
  }
  
  const info = (message, options = {}) => {
    return show({ ...options, message, type: 'info' })
  }
  
  const clear = () => {
    toasts.value = []
  }
  
  return {
    toasts: readonly(toasts),
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear
  }
}