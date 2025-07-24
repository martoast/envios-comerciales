// middleware/complete-profile.js
export default defineNuxtRouteMiddleware(async (to) => {
    const userState = useState('user')
    
    // Skip check if no user
    if (!userState.value) {
      return
    }
    
    // Skip check for these routes
    const exemptRoutes = [
      '/app/account/complete-profile',
      '/app/account/edit',
      '/app/account/shipping-address',
      '/logout'
    ]
    
    if (exemptRoutes.some(route => to.path.startsWith(route))) {
      return
    }
    
    // Check if OAuth user without phone
    if (userState.value.provider && !userState.value.phone) {
      console.log('OAuth user needs to add phone number')
      
      // Preserve the intended destination
      const redirectPath = to.fullPath
      return navigateTo(`/app/account/complete-profile?redirect=${encodeURIComponent(redirectPath)}`)
    }
    
    // Profile is complete, continue
  })