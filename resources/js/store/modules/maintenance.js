import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
        maintenance:{}
	},
	actions: {
        async getMaintenance(ctx){
            await Api().get(process.env.MIX_APP_API_GATE+'maintenance')
            .then(response => {
                ctx.commit('setMaintenance',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async updateMaintenance(ctx,data) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'maintenance/'+data.id,data)
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
		setMaintenance: function(state,maintenance){
            state.maintenance = maintenance
        }
	},
	getters:{
		maintenance(state) {
			return state.maintenance
		}
	}
})