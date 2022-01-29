import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import mainmenu from './modules/mainmenu'
import media from './modules/media'
import news from './modules/news'
import wiki from './modules/wiki'
import distro from './modules/distro'
import maintenance from './modules/maintenance'
import servers from './modules/servers'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		mainmenu,
		media,
		news,
		wiki,
		distro,
		maintenance,
		servers
	}
})