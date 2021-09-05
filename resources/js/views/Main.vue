<template>
	<div id="app">
		<div class="layout">
			<appheader v-if="$route.name != 'Login'"/>
			<router-view/>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {mapGetters} from 'vuex'
import appheader from '../components/appheader'
Vue.use(VueAxios, axios)
export default {
	name:'Main',
	components: {
		appheader
	},
	computed: {}
}
</script>