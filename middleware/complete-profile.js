// middleware/complete-profile.js
export default defineNuxtRouteMiddleware(async (to) => {
  const userState = useState('user')
  
  // Skip check if no user
  if (!userState.value) {
    return
  }
  
  // Skip check ONLY for these specific routes
  const exemptRoutes = [
    '/app/account/complete-profile',
    '/logout'
  ]
  
  if (exemptRoutes.some(route => to.path === route)) {
    return
  }
  
  // Check if user is missing critical info (ONLY phone now, removed user_type check)
  if (!userState.value.phone) {
    console.log('User needs to complete profile', {
      hasPhone: !!userState.value.phone,
      provider: userState.value.provider
    })
    
    // Preserve the intended destination
    const redirectPath = to.fullPath
    return navigateTo(`/app/account/complete-profile?redirect=${encodeURIComponent(redirectPath)}`)
  }
  
  // Profile is complete, continue
})