<template>
    <div id="appheader">
		<div class="wrapper">
			<div class="logo" @click="$router.push({name:'Dashboard'})">
				<img src="/img/logo-sm-square.png">
				<div class="pl-20">
					<h1 class="pb-0 mt-0 mb-0">EGA</h1>
					<p class="mb-0 mt-5">Eternal Games Admin</p>
				</div>
			</div>
			<div class="user">
				Logged as {{user.name}}<br/>
				<span class="logout" @click="userLogout()">
					<span class="material-icons">logout</span>
					Logout
				</span>
			</div>
		</div>
		<nav>
			<div class="wrapper">
				<div
					class="menu-item"
					:class="{active:menu.active}"
					v-for="menu in mainmenu"
					:key="menu.id">
					<div @click="$router.push({name:menu.alias})">
						<span class="material-icons">{{menu.icon}}</span>
						{{menu.name}}
					</div>
					<ul class="sub-menu" v-if="menu.children.length > 0">
						<li
							class="sub-item"
							:class="{active:sub.active}"
							v-for="sub in menu.children"
							:key="sub.id"
							@click="$router.push({name:sub.alias})"
							>
							{{sub.name}}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions,mapMutations} from 'vuex'
Vue.use(Toasted)
export default {
	name:'appheader',
	data: function(){
		return {
		}
	},
	watch: {
		'$route.name': function(){
			this.setActiveMenu(this.$route.name)
		}
	},
	computed: {
		...mapGetters(['is_logged','token','user','mainmenu'])
	},
	mounted: async function() {
		this.setActiveMenu(this.$route.name)
		if(localStorage.getItem('token') && !this.is_logged) {
			this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			let tada = await this.checkToken()
			if(!tada) {
				this.$router.push({name:'Login'})
			} else {
				localStorage.token = 'Bearer ' + this.token
				this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			}
		} else if(!this.is_logged) {
			this.$router.push({name:'Login'})
		}
	},
	methods: {
		...mapActions(['checkToken','Logout']),
		...mapMutations(['setActiveMenu']),
		userLogout: async function(){
			await this.Logout()
			localStorage.token = ''
			this.$router.push({name:'Login'})
		}
	}
}
</script>