export default defineNuxtRouteMiddleware(async (to) => {
    const { $realtyradarFetch, $retriveUser } = useNuxtApp()
    const userState = useState('user')
  
    // Check if there's a CSRF token (assuming this is how you're managing the session)
    const csrfCookie = useCookie("XSRF-TOKEN");
  
    if (csrfCookie.value) {
      // If there's a CSRF token, attempt to retrieve the user
      try {
        if (!userState.value) {
          await $retriveUser()
        }
        
        // If retrieval is successful or we already have a user state, redirect to app
        return navigateTo('/app/')
      } catch (error) {
        // If retrieval fails, clear the user state and allow access to login/register
        useState('user', () => null)
        // Optionally, you might want to clear the CSRF token here as well
        csrfCookie.value = null
      }
    }
  
    // If there's no CSRF token or user retrieval failed, allow access to login/register page
    return
  })