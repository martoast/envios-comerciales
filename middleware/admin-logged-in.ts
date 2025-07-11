export default defineNuxtRouteMiddleware(async (to) => {
    const { $retriveUser } = useNuxtApp()
    const userState = useState('user')
    
    // Check if there's a CSRF token
    const csrfCookie = useCookie("XSRF-TOKEN");
    
    if (csrfCookie.value) {
      try {
        if (!userState.value) {
          await $retriveUser()
        }
        
        // If user is an admin, redirect to admin dashboard
        if (userState.value?.role === 'admin') {
          return navigateTo('/app/admin/dashboard')
        }
        
        // Otherwise redirect to regular app
        return navigateTo('/app/')
      } catch (error) {
        // If retrieval fails, clear the user state
        useState('user', () => null)
        csrfCookie.value = null
      }
    }
    
    // Allow access to login page
    return
  })