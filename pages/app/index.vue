<template>
    <div>
        <h1>Successfully in a auth protected page</h1>
        <pre>{{user}}</pre>
        <button 
            @click="handleLogout"
            :disabled="loading"
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
            {{ loading ? 'Logging out...' : 'Logout' }}
        </button>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

const { $customFetch } = useNuxtApp()
const user = useUser().value
const loading = ref(false)

const handleLogout = async () => {
    loading.value = true
    try {
        await $customFetch("/auth/logout", {
            method: "POST",
        })
        
        // Clear user state
        useState("user").value = null
        
        // Redirect to login
        await navigateTo('/login')
    } catch (error) {
        console.error('Logout error:', error)
        loading.value = false
    }
}
</script>