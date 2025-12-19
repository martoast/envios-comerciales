const COOKIE_NAME = 'affiliate_ref'
const EXPIRY_DAYS = 30

export const useAffiliateRef = () => {
  const { $customFetch } = useNuxtApp()
  const route = useRoute()

  // SSR-friendly cookie storage - this works on both server and client
  const affiliateCookie = useCookie<string | null>(COOKIE_NAME, {
    maxAge: EXPIRY_DAYS * 24 * 60 * 60, // 30 days in seconds
    path: '/',
    sameSite: 'lax'
  })

  console.log('[AffiliateRef] Composable initialized, current cookie value:', affiliateCookie.value)

  // Get the stored affiliate code
  const getAffiliateCode = (): string | null => {
    const code = affiliateCookie.value || null
    console.log('[AffiliateRef] getAffiliateCode() called, returning:', code)
    return code
  }

  // Store affiliate code in cookie
  const storeRef = (code: string) => {
    console.log('[AffiliateRef] storeRef() storing code:', code)
    affiliateCookie.value = code
    console.log('[AffiliateRef] Cookie after store:', affiliateCookie.value)
  }

  // Clear stored ref
  const clearRef = () => {
    console.log('[AffiliateRef] clearRef() clearing cookie')
    affiliateCookie.value = null
  }

  // Validate code with API (async, non-blocking)
  const validateCode = async (code: string): Promise<boolean> => {
    console.log('[AffiliateRef] validateCode() validating:', code)
    try {
      const response = await $customFetch(`/affiliate/validate/${code}`)
      console.log('[AffiliateRef] Validation response:', response)
      // API returns {success: true, data: {...}} or {success: true, valid: true}
      const isValid = response.success === true || response.valid === true
      console.log('[AffiliateRef] Parsed isValid:', isValid)
      return isValid
    } catch (error) {
      console.error('[AffiliateRef] Validation error:', error)
      return false
    }
  }

  // Store immediately, then validate in background
  // If validation fails, we clear the cookie
  const validateAndStore = async (code: string): Promise<boolean> => {
    console.log('[AffiliateRef] validateAndStore() called with:', code)

    // STORE IMMEDIATELY - don't wait for validation
    storeRef(code)

    // Then validate in background
    const isValid = await validateCode(code)
    console.log('[AffiliateRef] Validation result:', isValid)

    if (!isValid) {
      // Clear if invalid
      console.log('[AffiliateRef] Code invalid, clearing cookie')
      clearRef()
      return false
    }

    console.log('[AffiliateRef] Code valid, cookie preserved')
    return true
  }

  // Check URL for ref param - call this in setup, not onMounted!
  const captureRefFromUrl = () => {
    const refCode = route.query.ref as string | undefined
    console.log('[AffiliateRef] captureRefFromUrl() - URL query.ref:', refCode)

    if (refCode && refCode.trim()) {
      // Store immediately in cookie - this is synchronous and SSR-safe
      console.log('[AffiliateRef] Found ref in URL, storing immediately:', refCode.trim())
      storeRef(refCode.trim())
      return refCode.trim()
    }

    console.log('[AffiliateRef] No ref in URL, current cookie:', affiliateCookie.value)
    return null
  }

  // Async version that also validates
  const captureAndValidateRef = async () => {
    const refCode = route.query.ref as string | undefined
    console.log('[AffiliateRef] captureAndValidateRef() - URL query.ref:', refCode)

    if (refCode && refCode.trim()) {
      await validateAndStore(refCode.trim())
    }
  }

  // Legacy function name for backwards compatibility
  const checkUrlForRef = captureAndValidateRef

  return {
    affiliateCode: affiliateCookie,
    getAffiliateCode,
    storeRef,
    clearRef,
    validateAndStore,
    captureRefFromUrl,
    captureAndValidateRef,
    checkUrlForRef
  }
}
