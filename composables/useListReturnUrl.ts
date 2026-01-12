const STORAGE_PREFIX = 'admin_return_url_'

const DEFAULT_URLS: Record<string, string> = {
  orders: '/app/admin/orders',
  customers: '/app/admin/customers',
  packages: '/app/admin/packages',
}

export const useListReturnUrl = (key: string) => {
  const storageKey = STORAGE_PREFIX + key
  const defaultUrl = DEFAULT_URLS[key] || `/app/admin/${key}`

  // Store the current list URL (with filters)
  const storeReturnUrl = (url: string) => {
    if (import.meta.client) {
      sessionStorage.setItem(storageKey, url)
    }
  }

  // Get the stored return URL, fallback to default
  const getReturnUrl = (): string => {
    if (import.meta.client) {
      return sessionStorage.getItem(storageKey) || defaultUrl
    }
    return defaultUrl
  }

  // Clear the stored URL
  const clearReturnUrl = () => {
    if (import.meta.client) {
      sessionStorage.removeItem(storageKey)
    }
  }

  return {
    storeReturnUrl,
    getReturnUrl,
    clearReturnUrl
  }
}
