import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		news:{
            posts:[],
            post:{},
            search: {
                status:false,
                searchParam:'',
                searchColumn:'title_ru'
            }
        }
	},
	actions: {
        async getNewsPosts(ctx){
            await Api().get(process.env.MIX_APP_API_GATE+'news')
            .then(response => {
                ctx.commit('setNewsPosts',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getNewsPost(ctx,id){
            await Api().get(process.env.MIX_APP_API_GATE+'news/'+id)
            .then(response => {
                ctx.commit('setNewsPost',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async postNewsPost(ctx,post) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'news',post)
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
        async updateNewsPost(ctx,post) {
            let status = false
            await Api().post(process.env.MIX_APP_API_GATE+'news/'+post.id,post)
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
        async deleteNewsPost(ctx,id) {
            let status = false
            await Api().delete(process.env.MIX_APP_API_GATE+'news/'+id)
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
		setNewsPosts: function(state,posts){
            state.news.posts = posts
        },
		setNewsPost: function(state,post){
            state.news.post = post
        },
        updateNewsPostsSearch(state,s) {
			state.news.search.status = s.status
			state.news.search.searchParam = s.searchParam
			state.news.search.searchColumn = s.searchColumn
		}
	},
	getters:{
		news(state) {
			return state.news
		}
	}
})