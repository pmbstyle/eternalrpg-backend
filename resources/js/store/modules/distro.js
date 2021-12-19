import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		distros:[],
        distro:{}
	},
	actions: {
        async getDistros(ctx){
            await Api().get(process.env.MIX_APP_API_GATE+'distro')
            .then(response => {
                ctx.commit('setDistros',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getDistro(ctx,id){
            await Api().get(process.env.MIX_APP_API_GATE+'distro/'+id)
            .then(response => {
                ctx.commit('setDistro',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async updateDistro(ctx,distro) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'distro/'+distro.id,distro)
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
		setDistros: function(state,distros){
            state.distros = distros
        },
		setDistro: function(state,distro){
            state.distro = distro
        }
	},
	getters:{
		distros(state) {
			return state.distros
		},
		distro(state) {
			return state.distro
		}
	}
})