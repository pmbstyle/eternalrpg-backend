import { defineStore } from 'pinia'
import Api from '../helpers/api'
import axios from 'axios'

export const useUser = defineStore({
    id:'user',
    state: () => ({
        user:{
            profile: {
                id:'',
                name:'',
                email:''
            },
            auth:{
                token:''
            }
        }
    }),
    getters: {
        userToken: (state) => state.user.auth.token,
        isSignedIn: (state) => state.user.auth.token.length > 0,
        userId: (state) => state.user.profile.id,
        userName: (state) => state.user.profile.name,
        userEmail: (state) => state.user.profile.email
    },
    actions: {
        async loginUser(user) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE + 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    this.setUserToken(response.data.access_token)
                    this.setUser(response.data.user)
                    status = true
                } else {
                    status = false
                }
            })
            .catch(error => {
                console.log(error)
            })
            return status
        },
        async checkToken() {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE + 'auth/refresh').then(response => {
                if (response.data.access_token) {
                    this.setUserToken(response.data.access_token)
                    this.setUser(response.data.user)
                    status = true
                } else {
                    status = false
                }
            }).catch(error => {
                console.log(error)
            })
            return status
        },
        setUser(user) {
            this.user.profile = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        },
        setUserToken(token) {
            this.user.auth.token = token
        }
    }
})