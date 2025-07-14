export default defineNuxtPlugin(() => {
    return {
        provide: {
            redirectLogin: async () => {
                const queryParams = new URLSearchParams({
                    redirect: window.location.href
                });

                console.log(queryParams)
            
                // return await navigateTo('/login' + 
                //     `?${queryParams.toString()}`, 
                //     {
                //         redirectCode: 302,
                //         external: true
                //     }
                // )
            }
        }
    }
})