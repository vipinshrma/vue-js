import { createRouter, createWebHistory } from 'vue-router'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegistration from './pages/coaches/CoachRegister.vue'
import CoachContact from './pages/requests/ContactCoach.vue'
import RequestReceived from './pages/requests/RequestReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'

import NotFound from './pages/NotFound.vue'
import store from './store'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/coaches'
        },
        {
            path: '/auth', component: UserAuth, meta: { requiresUnauth: true }
        },
        {
            path: '/coaches', component: CoachesList
        },
        {
            path: '/coaches/:id',
            props: true,
            component: CoachDetails, children: [
                {
                    path: 'contact', component: CoachContact
                }
            ]
        },
        {
            path: '/register', component: CoachRegistration, meta: { requiresAuth: true }
        },
        {
            path: '/requests', component: RequestReceived, meta: { requiresAuth: true }
        },
        {
            path: '/:notFound(.*)', component: NotFound
        }

    ]
})

router.beforeEach((to,from,next)=>{
    if (to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth')
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next()
    }
})