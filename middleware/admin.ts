export default defineNuxtRouteMiddleware(async (to) => {
    const userState = useState('user')
    
    // First check if user is authenticated
    if (!userState.value) {
      console.error('No user found, redirecting to login')
      return navigateTo('/login')
    }
    
    // Check if user has admin role
    if (userState.value.role !== 'admin') {
      console.error('User is not an admin, redirecting to regular app')
      return navigateTo('/app/')
    }
    
    // User is authenticated and is an admin, allow access
    return
  })