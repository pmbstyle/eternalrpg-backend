import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		media:{}
	},
	actions: {
        async getMedia(ctx,data){
            await Api().get(process.env.MIX_APP_API_GATE+'media',{query:{'page':data.page},params:{'type':data.type}})
            .then(response => {
                ctx.commit('setMedia',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async postMedia(ctx,media) {
            let bodyFormData = new FormData()
            let type = media.type.slice(0, -1); 
            bodyFormData.set('type', type)
            bodyFormData.set('image', media.image)
            await Api().post(process.env.MIX_APP_API_GATE+'media',bodyFormData)
            .then(response => {
                if(response.data) {
                    return response.data
                } else {
                    return false
                }
            })
            .catch(error => {
                return error
            })
        },
        async deleteMedia(ctx,id) {
            let status = false
            await Api().delete(process.env.MIX_APP_API_GATE+'media/'+id)
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
		setMedia: function(state,media){
            state.media = media
        }
	},
	getters:{
		media(state) {
			return state.media
		}
	}
})