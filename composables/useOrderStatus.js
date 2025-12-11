// composables/useOrderStatus.js
export const useOrderStatus = () => {
    const { t: createTranslations } = useLanguage()

    const translations = {
      collecting: { es: 'Agregando Artículos', en: 'Adding Items' },
      awaiting_packages: { es: 'Esperando Paquetes', en: 'Awaiting Packages' },
      packages_complete: { es: 'Paquetes Completos', en: 'Packages Complete' },
      awaiting_payment: { es: 'Pago Pendiente', en: 'Payment Due' },
      paid: { es: 'Pagado', en: 'Paid' },
      processing: { es: 'Procesando', en: 'Processing' },
      shipped: { es: 'Enviado', en: 'Shipped' },
      delivered: { es: 'Entregado', en: 'Delivered' },
      cancelled: { es: 'Cancelado', en: 'Cancelled' },
    }

    const t = createTranslations(translations)

    // Define the correct order for the NEW flow
    // collecting → awaiting_packages → packages_complete → awaiting_payment → paid → shipped → delivered → cancelled
    const statusOrder = [
      'collecting',
      'awaiting_packages',
      'packages_complete',
      'awaiting_payment',
      'paid',
      'processing',  // Legacy status - keep for backwards compatibility
      'shipped',
      'delivered',
      'cancelled',
    ]

    const getStatusColor = (status) => {
      const colors = {
        collecting: "bg-blue-100 text-blue-700",
        awaiting_packages: "bg-amber-100 text-amber-700",
        packages_complete: "bg-purple-100 text-purple-700",
        awaiting_payment: "bg-orange-100 text-orange-700",
        paid: "bg-emerald-100 text-emerald-700",
        processing: "bg-indigo-100 text-indigo-700",
        shipped: "bg-cyan-100 text-cyan-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
      }
      return colors[status] || "bg-gray-100 text-gray-700"
    }

    const getStatusLabel = (status) => {
      if (!status) return ''
      // Use translation if available, otherwise format snake_case
      return t.value[status] || status.replace(/_/g, ' ').toUpperCase()
    }

    // Helper to get all statuses for dropdowns (in correct order)
    const getAllStatuses = () => {
      return statusOrder.map(key => ({
        value: key,
        label: t.value[key]
      }))
    }

    return {
      getStatusColor,
      getStatusLabel,
      getAllStatuses,
      statusOrder
    }
  }