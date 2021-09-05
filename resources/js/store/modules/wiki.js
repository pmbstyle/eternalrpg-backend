import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		wiki:{
            categories:[],
            posts:[],
            category:{},
            post:{},
            postsSort: {
                key:'name_ru',
                order:''
            },
            categoriesSort: {
                key:'name_ru',
                order:''
            },
            search: {
                status:false,
                searchParam:'',
                searchColumn:'name_ru'
            },
            catsearch: {
                status:false,
                searchParam:'',
                searchColumn:'name_ru'
            }
        }
	},
	actions: {
        async getWikiCategories(ctx){
            await Api().get(process.env.MIX_APP_API_GATE+'wiki-categories')
            .then(response => {
                ctx.commit('setWikiCategories',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getWikiPosts(ctx,category){
            await Api().get(process.env.MIX_APP_API_GATE+'wiki-posts',{params:{category:category}})
            .then(response => {
                ctx.commit('setWikiPosts',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getWikiPost(ctx,id){
            await Api().get(process.env.MIX_APP_API_GATE+'wiki-post/'+id)
            .then(response => {
                ctx.commit('setWikiPost',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getWikiCategory(ctx,id){
            await Api().get(process.env.MIX_APP_API_GATE+'wiki-category/'+id)
            .then(response => {
                ctx.commit('setWikiCategory',response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        async postWikiPost(ctx,post) {
            let status = false
            let bodyFormData = new FormData()
            bodyFormData.set('name_ru', post.name_ru)
            bodyFormData.set('name_en', post.name_en)
            bodyFormData.set('slug', post.slug)
            bodyFormData.set('wiki_category_id', post.wiki_category_id)
            bodyFormData.set('description_en', post.description_en)
            bodyFormData.set('description_ru', post.description_ru)
            await Api().post(process.env.MIX_APP_API_GATE+'wiki-post',bodyFormData)
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
        async postWikiCategory(ctx,category) {
            let status = false
            let bodyFormData = new FormData()
            bodyFormData.set('name_ru', category.name_ru)
            bodyFormData.set('name_en', category.name_en)
            bodyFormData.set('slug', category.slug)
            await Api().post(process.env.MIX_APP_API_GATE+'wiki-category',bodyFormData)
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
        async updateWikiPost(ctx,post) {
            let status = false
            let bodyFormData = new FormData()
            bodyFormData.set('name_ru', post.name_ru)
            bodyFormData.set('name_en', post.name_en)
            bodyFormData.set('slug', post.slug)
            bodyFormData.set('wiki_category_id', post.wiki_category_id)
            bodyFormData.set('description_en', post.description_en)
            bodyFormData.set('description_ru', post.description_ru)
            await Api().post(process.env.MIX_APP_API_GATE+'wiki-post/'+post.id,bodyFormData)
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
        async updateWikiCategory(ctx,category) {
            let status = false
            let bodyFormData = new FormData()
            bodyFormData.set('name_ru', category.name_ru)
            bodyFormData.set('name_en', category.name_en)
            bodyFormData.set('slug', category.slug)
            await Api().post(process.env.MIX_APP_API_GATE+'wiki-category/'+category.id,bodyFormData)
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
        async deleteWikiPost(ctx,id) {
            let status = false
            await Api().delete(process.env.MIX_APP_API_GATE+'wiki-post/'+id)
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
        async deleteWikiCategory(ctx,id) {
            let status = false
            await Api().delete(process.env.MIX_APP_API_GATE+'wiki-category/'+id)
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
		setWikiCategories: function(state,categories){
            state.wiki.categories = categories
        },
		setWikiPosts: function(state,posts){
            state.wiki.posts = posts
        },
		setWikiPost: function(state,post){
            state.wiki.post = post
        },
		setWikiCategory: function(state,category){
            state.wiki.category = category
        },
        updatePostsSort(state,s) {
			state.wiki.postsSort.key = s.key
			state.wiki.postsSort.order = s.order
		},
        updateWikiPostsSearch(state,s) {
			state.wiki.search.status = s.status
			state.wiki.search.searchParam = s.searchParam
			state.wiki.search.searchColumn = s.searchColumn
		},
        updateCategoriesSort(state,s) {
			state.wiki.categoriesSort.key = s.key
			state.wiki.categoriesSort.order = s.order
		},
        updateWikiCategoriesSearch(state,s) {
			state.wiki.catsearch.status = s.status
			state.wiki.catsearch.searchParam = s.searchParam
			state.wiki.catsearch.searchColumn = s.searchColumn
		},
	},
	getters:{
		wiki(state) {
			return state.wiki
		}
	}
})