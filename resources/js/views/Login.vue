<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '../router'
import { useUser } from '../store/user'
import Alert from '../components/alerts'
const user = useUser()

const form = ref({
	email: 'slava@trofimov.ca',
	password: ''
})
const showUI = ref(false)
const inProgress = ref(false)
const alertType = ref('alert-error')
const showError = ref(false)
const errorMessage = ref('Invalid credentials!')

const verifyLogin = async function() {
	inProgress.value = true
	showError.value = false
	let status = await user.loginUser(form.value)
	if (status) {
		redirectToDash()
	} else {
		inProgress.value = false
		showError.value = true
		setTimeout(() => {
			showError.value = false
		}, 5000)
	}
}

const redirectToDash = function() {
	localStorage.token = 'Bearer ' + user.userToken
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
	router.push({ name: 'Dashboard' })
}

const formReady = () => {
	return form.value.email.length > 0 && form.value.password.length > 0
}

onMounted(async () => {
	if (localStorage.getItem('token') !== null) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
		let status = await user.checkToken()
		if (status) {
			redirectToDash()
		} else {
			showUI.value = true
		}
	} else {
		showUI.value = true
	}
})

</script>

<template>
	<div id="login" class="w-screen h-screen flex justify-center items-center" v-if="showUI">
		<Alert :type="alertType" :show="showError" :msg="errorMessage" />
		<div class="card w-96 h-auto shadow-xl bg-neutral">
			<figure><img src="images/eternal-games-logo.png" alt="Shoes" /></figure>
			<div class="card-body">
				<div class="form-control">
					<label class="input-group input-group-md">
						<span class="w-20">Email</span>
						<input type="text" v-model="form.email" class="input input-bordered w-full max-w-xs">
					</label>
				</div>
				<div class="form-control">
					<label class="input-group input-group-md">
						<span class="w-20">Pwd</span>
						<input type="password" v-model="form.password" class="input input-bordered w-full max-w-xs"
							v-on:keyup.enter="verifyLogin()">
					</label>
				</div>
				<div class="form-group text-center pt-10">
					<button class="btn" :class="formReady() || !inProgress ? 'btn-primary' : ''"
						:disabled="!formReady() || inProgress" @click="verifyLogin()">{{ formReady() ? 'Sign In' :
						'...'
						}}</button>
				</div>
			</div>
		</div>
	</div>
</template>