// plugins/retriveUser.ts
export default defineNuxtPlugin((nuxtApp) => {
    const retriveUser = async () => {
        try {
            const response = await nuxtApp.$customFetch('/user');
            const user: User = response
            const userState = useState('user')
            userState.value = user
            return user
        } catch(error) {
            console.error(error)
            const userState = useState('user')
            userState.value = null
            throw error
        }
    }
    
    return {
        provide: {
            retriveUser: retriveUser
        }
    }
})