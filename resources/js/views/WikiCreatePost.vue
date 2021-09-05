<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Create New Wiki Post</h1>
			</div>
            <div class="card mt-40">
                <div class="grid-2">
                    <input type="text" :class="{error: errors.name_ru}" v-model="post.name_ru" class="form-control" placeholder="Name Ru">
                    <input type="text" :class="{error: errors.name_en}" v-model="post.name_en" class="form-control" placeholder="Name En">
                </div>
            </div>
            <div class="card mt-20">
                <div class="grid-2">
                    <input type="text" :class="{error: errors.slug}" v-model="post.slug" class="form-control" placeholder="Slug">
                    <select class="form-control" :class="{error: errors.wiki_category_id}" name="category" id="category" v-model="post.wiki_category_id">
                        <option value="" disabled>Category</option>
                        <option :value="cat.id" v-for="cat in wiki.categories" :key="cat.id">{{cat.name_ru}}/{{cat.name_en}}</option>
                    </select>
                </div>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.description_ru" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.description_en" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-blue" @click="$router.push({name:'Wiki'})">Back</button>
                <button class="btn btn-green" @click="verifyData()">Publish</button>
            </div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions} from 'vuex'
Vue.use(Toasted)
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
	name:'WikiCreatePost',
    components: {quillEditor},
	data: function(){
		return {
            post: {
                name_en:'',
                name_ru:'',
                slug:'',
                wiki_category_id:'',
                description_en:'<p>Description EN.</p>',
                description_ru:'<p>Description RU.</p>'
            },
            errors: {
                name_en:false,
                name_ru:false,
                slug:false,
                wiki_category_id:false
            },
            hasErrors:false
        }
	},
	computed: {
		...mapGetters(['is_logged','user','wiki']),

	},
    mounted: async function() {
        this.wiki.categories.length == 0 ? await this.getWikiCategories() : ''
    },
	methods: {
		...mapActions(['getWikiCategories','postWikiPost']),
        verifyData: async function() {
            this.hasErrors = false
            this.errors = {
                name_en:false,
                name_ru:false,
                slug:false,
                wiki_category_id:false
            }
            if(this.post.name_ru.length == 0) {
                this.errors.name_ru = true
                this.hasErrors = true
            }
            if(this.post.name_en.length == 0) {
                this.errors.name_en = true
                this.hasErrors = true
            }
            if(this.post.slug.length == 0) {
                this.errors.slug = true
                this.hasErrors = true
            }
            if(this.post.wiki_category_id.length == 0) {
                this.errors.wiki_category_id = true
                this.hasErrors = true
            }
            if(!this.hasErrors) {
                let status = await this.postWikiPost(this.post)
                if(status) {
                    this.$toasted.show("Post created successfuly", { 
                        position: "top-center",
                        icon: 'info',
                        className: 'success',
                        duration : 2000
                    })
                    this.$router.push({name:'Wiki'})
				} else {
                    this.$toasted.show("Something went wrong!", { 
                        position: "top-center",
                        icon: 'info',
                        className: 'error',
                        duration : 2000
                    })
				}
            } else {
                return false
            }
        }
	}
}
</script>