import { createStore } from 'vuex'
import coachesModule from './modules/coaches';
import requestModule from './modules/requests';

let timer = ""

export const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestModule
    },
    state: {
        userId: null,
        token: null,
        didLogout: false
    },
    mutations: {
        updateUser(state, userId) {
            state.userId = userId;
        },
        setUser(state, payload) {
            state.userId = payload.userId,
                state.token = payload.token
                state.didLogout = false 
        },
        setDidLogout(state) {
            state.didLogout = true
        }

    },
    getters: {
        getUserId(state) {
            return state.userId
        },
        getToken(state) {
            return state.token
        },
        isAuthenticated(state) {
            return !!state.token
        },
        didAutoLogout(state){
            return state.didLogout
        }
    },
    actions: {
        async auth(context, payload) {
            const mode = payload.mode;
            delete payload.mode;
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUvfYsqYOnuHk2YOEUzM2lbFdZ9uhNXvM`
            if (mode === 'signup') {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUvfYsqYOnuHk2YOEUzM2lbFdZ9uhNXvM`
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    ...payload,
                    returnSecureToken: true
                })
            })
            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.error.message || "Failed to authenticate . check your login data")
                throw error
            }
            const expiresIn = +responseData.expiresIn * 1000;
            // const expiresIn = 5000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', responseData.idToken)
            localStorage.setItem('userId', responseData.userId)
            localStorage.setItem('tokenExpiration', expirationDate)

            timer = setInterval(function () {
                context.dispatch('autoLogout')
            }, expiresIn)

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
            })

        },
        async login(context, payload) {
            return context.dispatch('auth', { ...payload, mode: 'login' })
        },
        async signup(context, payload) {
            return context.dispatch('auth', { ...payload, mode: 'signup' })
        },
        logout(context) {
            clearInterval(timer)
            context.commit('setUser', {
                token: null,
                userId: null,
            })
            localStorage.clear()
        },
        tryLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpiration')
            const expiresIn = +tokenExpiration - new Date().getTime()
            if (expiresIn < 0) {
                return;
            }
            setTimeout(() => {
                context.dispatch('autoLogout')
            }, expiresIn)


            if (token && userId) {
                context.commit('setUser', {
                    token: token,
                    userId: userId,
                })
            }

        },
        autoLogout(context) {
            context.dispatch('logout')
            context.commit('setDidLogout')
        }
    }
})

export default store;