export default defineNuxtRouteMiddleware(async (to) => {
    const { $retriveUser, $redirectLogin } = useNuxtApp()
    const userState = useState('user')
    if (!userState.value) {
      try {
        await $retriveUser()
        console.log(userState.value)
      } catch (error) {
        console.error('Authentication failed:', error)
        return await $redirectLogin()
      }
    }
    if (!userState.value) {
      console.log(userState.value)
      return await $redirectLogin()
    }
  })