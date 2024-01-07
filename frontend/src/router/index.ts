import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Settings from "@/views/Settings.vue";
import Habits from "@/views/Habits.vue";
import Logout from "@/views/Logout.vue";
import Login from "@/views/Login.vue";
import {AuthService} from "@/servises/auth.service";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/Habits',
            name: 'Habits',
            component: Habits
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

const permittedPages = ['/login', '/logout']
router.beforeEach(async (to, from, next) => {
    let isAuthenticated =  await AuthService.isAuthenticated()
    console.log(to,isAuthenticated)

    if (permittedPages.includes(to.path) || await AuthService.isAuthenticated()) {
        next()
    } else {
        next( '/login')
    }
})

export default router
