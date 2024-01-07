import {ref, computed} from 'vue'
import {defineStore, storeToRefs} from 'pinia'

export interface User {
    uid: string,
    accessToken: string,
    // isAuthenticated: boolean,

    displayName?: string,
    email?: string,
    avatarURL?: string
}

export const useUserData = defineStore('userData', () => {
    const user = ref<User>({
        uid: '',
        accessToken: ''
    })

    function setUser(newUser: User) {
        user.value = newUser
    }

    function clearUser() {
        user.value = {
            uid: '',
            accessToken: ''
        }
    }

    return {
        user,
        setUser,
        clearUser
    }
}, {persist: true})

export const useUserStore = () => storeToRefs(useUserData())