export default defineNuxtRouteMiddleware(async (to) => {
    const userState = useState('user')
    
    // First check if user is authenticated
    if (!userState.value) {
      console.error('Customer middleware: No user found, redirecting to login')
      return navigateTo('/login')
    }
    
    // Check if user has valid role
    if (!userState.value.role) {
      console.error('Customer middleware: User has no role defined')
      return navigateTo('/login')
    }
    
    // Check if user has customer role
    if (userState.value.role !== 'customer') {
      console.error(`Customer middleware: User role is '${userState.value.role}', not 'customer'`)
      // If admin, redirect to admin area
      if (userState.value.role === 'admin') {
        return navigateTo('/app/admin/dashboard')
      }
      // Otherwise redirect to login
      return navigateTo('/login')
    }
    
    // User is authenticated and is a customer, allow access
    console.log('Customer middleware: Access granted')
    return
  })