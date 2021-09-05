import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import mainmenu from './modules/mainmenu'
import wiki from './modules/wiki'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		mainmenu,
		wiki
	}
})