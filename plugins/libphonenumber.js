import { parsePhoneNumber, isValidPhoneNumber, AsYouType } from 'libphonenumber-js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      phone: {
        parse: parsePhoneNumber,
        isValid: isValidPhoneNumber,
        asYouType: AsYouType
      }
    }
  }
})