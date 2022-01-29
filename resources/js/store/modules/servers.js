import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		servers:[]
	},
	actions: {
        async getServers(ctx){
            await Api().get(process.env.MIX_APP_API_GATE+'servers')
            .then(response => {
                ctx.commit('setServers',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
	},
	mutations: {
		setServers: function(state,servers){
            state.servers = servers
        }
	},
	getters:{
		servers(state) {
			return state.servers
		}
	}
})