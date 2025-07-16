// middleware/customer.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const userState = useState('user')
  
  // First check if user is authenticated
  if (!userState.value) {
    console.error('Customer middleware: No user found, redirecting to login')
    
    // Build redirect URL with current route + query params
    const redirectUrl = to.fullPath
    const queryParams = new URLSearchParams({
        redirect: redirectUrl
    });
    
    return navigateTo(`/login?${queryParams.toString()}`, {
        redirectCode: 302,
        external: false
    })
  }
  
  // Check if user has valid role
  if (!userState.value.role) {
    console.error('Customer middleware: User has no role defined')
    
    const redirectUrl = to.fullPath
    const queryParams = new URLSearchParams({
        redirect: redirectUrl
    });
    
    return navigateTo(`/login?${queryParams.toString()}`, {
        redirectCode: 302,
        external: false
    })
  }
  
  // Check if user has customer role
  if (userState.value.role !== 'customer') {
    console.error(`Customer middleware: User role is '${userState.value.role}', not 'customer'`)
    // If admin, redirect to admin area
    if (userState.value.role === 'admin') {
      return navigateTo('/app/admin/dashboard')
    }
    
    // Otherwise redirect to login with redirect
    const redirectUrl = to.fullPath
    const queryParams = new URLSearchParams({
        redirect: redirectUrl
    });
    
    return navigateTo(`/login?${queryParams.toString()}`, {
        redirectCode: 302,
        external: false
    })
  }
  
  // User is authenticated and is a customer, allow access
  console.log('Customer middleware: Access granted')
  return
})