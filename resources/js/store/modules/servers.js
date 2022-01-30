import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		servers:[],
		server:{}
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
        },
        async getServer(ctx,id){
            await Api().get(process.env.MIX_APP_API_GATE+'server/'+id)
            .then(response => {
                ctx.commit('setServer',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
		async postServer(ctx,server) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'server',server)
            .then(response => {
                if(response.data) {
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
        async updateServer(ctx,server) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'server/'+server.id,server)
            .then(response => {
                if(response.data) {
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
        async deleteServer(ctx,id) {
            let status = false
            await Api().delete(process.env.MIX_APP_API_GATE+'server/'+id)
            .then(response => {
                if(response.data) {
                    status = true
                } else {
                    status = false
                }
            })
            .catch(error => {
                console.log(error)
            })
            return status
        }
	},
	mutations: {
		setServers: function(state,servers){
            state.servers = servers
        },
		setServer: function(state,server){
            state.server = server
        }
	},
	getters:{
		servers(state) {
			return state.servers
		},
		server(state) {
			return state.server
		}
	}
})