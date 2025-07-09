// plugins/toast.client.js
export default defineNuxtPlugin(() => {
    const { show, success, error, warning, info } = useToast()
    
    return {
      provide: {
        toast: {
          show,
          success,
          error,
          warning,
          info
        }
      }
    }
  })