import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		users:[],
		user:{},
		editUser:{},
		token:'',
		is_logged:false
	},
	actions: {
		async loginUser(ctx,user) {
			let status = false
			await Api().post('auth/login',{
					email:user.email,
					password: user.password
				})
				.then(response => {
					if(response.data.access_token) {
						ctx.commit('setToken',response.data.access_token)
						ctx.commit('setUser',response.data.user)
						ctx.commit('setAuthStatus',true)
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
		async checkToken(ctx) {
			let status = false
			await Api().post('auth/refresh').then(response => {
				if(response.data.access_token) {
					ctx.commit('setToken',response.data.access_token)
					ctx.commit('setUser',response.data.user)
					ctx.commit('setAuthStatus',true)
					status = true
				} else {
					status = false
				}
			}).catch(error => {
				console.log(error)
			})
			return status
		},
		async Logout(ctx) {
			await Api().post('auth/refresh').then(() => {
				ctx.commit('setToken','')
				ctx.commit('setUser',{})
				ctx.commit('setAuthStatus',false)
				return true
			})
		},
		getUsers: async function({commit},page){
			let users = await fetch(process.env.MIX_APP_API_GATE+'usersAll/?page='+page)
			.then(response => {
				return response.json()
			})
			commit('setUsers',users)
		},
		getUser: async function({commit},id){
			let user = await fetch(process.env.MIX_APP_API_GATE+'userGet/'+id)
			.then(response => {
				return response.json()
			})
			commit('setEditUser',user)
		},
	},
	mutations: {
		setToken: function(state,token) {
			state.token = token
			axios.defaults.headers.common['Authorization'] = state.token
		},
		setUser: function(state,user) {
			state.user = user
		},
		setEditUser: function(state,user) {
			state.editUser = user
		},
		setAuthStatus: function(state,status) {
			state.is_logged = status
		},
		logoutUser: function(state) {
			state.user = {}
			state.token = ''
			state.is_logged = false
		},
		setUsers: function(state,users) {
			state.users = users
		},
	},
	getters:{
		user(state) {
			return state.user
		},
		editUser(state) {
			return state.editUser
		},
		token(state) {
			return state.token
		},
		is_logged(state) {
			return state.is_logged
		},
		users(state) {
			return state.users
		},
	}
})