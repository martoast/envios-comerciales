const STORAGE_KEY = 'admin_orders_return_url'
const DEFAULT_URL = '/app/admin/orders'

export const useOrdersReturnUrl = () => {
  // Store the current orders list URL (with filters)
  const storeReturnUrl = (url: string) => {
    if (import.meta.client) {
      sessionStorage.setItem(STORAGE_KEY, url)
    }
  }

  // Get the stored return URL, fallback to default
  const getReturnUrl = (): string => {
    if (import.meta.client) {
      return sessionStorage.getItem(STORAGE_KEY) || DEFAULT_URL
    }
    return DEFAULT_URL
  }

  // Clear the stored URL
  const clearReturnUrl = () => {
    if (import.meta.client) {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    storeReturnUrl,
    getReturnUrl,
    clearReturnUrl
  }
}
