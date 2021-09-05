<template>
	<div id="login" v-if="showUI">
		<div class="login-title pb-20">
			<img src="img/eternal-logo-md.png">
			<!-- <div class="pl-20">
				<h1 class="pb-0 mt-0 mb-0">YCA</h1>
				<p class="mb-0 mt-5">ytyaCraft admin</p>
			</div> -->
		</div>
		<div class="login-form card mb-0">
			<div class="form-group pt-20">
				<input type="text" v-model="form.email" class="form-control" placeholder="Email">
			</div>
			<div class="form-group">
				<input type="password" v-model="form.password" class="form-control" placeholder="Password" v-on:keyup.enter="verifyLogin()">
			</div>
			<div class="form-group text-center pt-20">
				<button class="btn" :class="formRady || !inProgress ? 'btn-green' : 'btn-gray'" :disabled="!formRady || inProgress" @click="verifyLogin()">{{formRady ? 'Sign In' : '...'}}</button>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions} from 'vuex'
Vue.use(VueAxios, axios)
Vue.use(Toasted)
export default {
	name:'Login',
	data: function(){
		return {
			form: {
				email:'slava@trofimov.ca',
				password:''
			},
			showUI: false,
			inProgress: false
		}
	},
	computed: {
		...mapGetters(['is_logged','token']),
		formRady: function() {
			return this.form.email.length > 0 && this.form.password.length > 0
		}
	},
	mounted: async function() {
		if(localStorage.getItem('token')) {
			this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			let tada = await this.checkToken()
			if(tada) {
				this.redirectToDash()
			} else {
				this.showUI = true
			}
		} else {
			this.showUI = true
		}
	},
	methods: {
		...mapActions(['loginUser', 'checkToken']),
		verifyLogin: async function() {
			this.inProgress = true
			let tada = await this.loginUser(this.form)
			if(tada) {
				this.redirectToDash()
			} else {
				this.inProgress = false
				this.$toasted.show("Invalid credentials!", { 
					position: "top-center",
					icon: 'info',
					className: 'error',
					duration : 5000
				})
			}
		},
		redirectToDash: function() {
			localStorage.token = 'Bearer ' + this.token
			this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			this.$router.push({name:'Dashboard'})
		}
	}
}
</script>