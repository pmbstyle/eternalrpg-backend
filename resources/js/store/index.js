import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import mainmenu from './modules/mainmenu'
import wiki from './modules/wiki'
import distro from './modules/distro'
import maintenance from './modules/maintenance'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		mainmenu,
		wiki,
		distro,
		maintenance
	}
})