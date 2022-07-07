<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import router from '../router'
//import { useMenu } from '../store/menu'
import { useRoute } from 'vue-router'
//const menu = useMenu()
const route = useRoute()

watch('route.name', () => {
	//menu.setActiveMenu(route.name)
})

const userLogout = async () => {
	await user.Logout()
	localStorage.token = ''
	router.push({ name: 'Login' })
}

onMounted(async () => {
	//menu.setActiveMenu(route.name)
	if (localStorage.getItem('token') && !user.is_logged) {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
		let tada = await user.checkToken()
		if (!tada) {
			router.push({ name: 'Login' })
		} else {
			localStorage.token = 'Bearer ' + user.auth.token
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
		}
	} else if (!this.is_logged) {
		router.push({ name: 'Login' })
	}
})
</script>



<template>
    <div id="appheader">
		<div class="wrapper">
			<div class="logo" @click="router.push({name:'Dashboard'})">
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
				<!-- <div
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
				</div> -->
			</div>
		</nav>
	</div>
</template>