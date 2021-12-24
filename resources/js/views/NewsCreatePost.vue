<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Create News Post</h1>
			</div>
            <div class="card mt-40">
                <div class="grid-2">
                    <input type="text" :class="{error: errors.title_ru}" v-model="post.title_ru" class="form-control" placeholder="Title Ru">
                    <input type="text" :class="{error: errors.title_en}" v-model="post.title_en" class="form-control" placeholder="Title En">
                </div>
            </div>
            <div class="card mt-20">
                <input type="text" :class="{error: errors.slug}" v-model="post.slug" class="form-control" placeholder="Slug">
            </div>
            <div class="card mt-20">
                <img class="post-image-preview" :src="post.image" alt="" v-if="post.image">
                <div :class="{'grid-2':post.image,'mt-10':post.image}">
                    <button style="width:100%;" class="btn btn-green" @click="showMedia = true">
                        <template v-if="!post.image">Add Post Image</template>
                        <template v-if="post.image">Change Post Image</template>
                    </button>
                    <button class="btn btn-red" @click="removeImage()" v-if="post.image">Remove Image</button>
                </div>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.description_ru" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.description_en" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.full_text_ru" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="card mt-20">
                <quill-editor v-model="post.full_text_en" ref="myQuillEditor"></quill-editor>
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-blue" @click="$router.push({name:'News'})">Back</button>
                <button class="btn btn-green" @click="verifyData()">Publish</button>
            </div>
		</div>
        <mediamanager
            v-bind:show="showMedia"
            v-bind:defaultType="'news'"
            v-bind:uiType="'select'"
            v-on:managerclosed="showMedia = false"
            v-on:selectedMedia="setPostImage"
            v-if="showMedia"
        />
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
import mediamanager from '../components/mediamanager.vue'
export default {
	name:'NewsCreatePost',
    components: {
        quillEditor,
        mediamanager
    },
	data: function(){
		return {
            post: {
                image:null,
                title_en:'',
                title_ru:'',
                slug:'',
                description_en:'<p>Description EN.</p>',
                description_ru:'<p>Description RU.</p>',
                full_text_en:'<p>Full text EN.</p>',
                full_text_ru:'<p>Full text RU.</p>'
            },
            errors: {
                title_en:false,
                title_ru:false,
                slug:false,
                description_en:false,
                description_ru:false
            },
            hasErrors:false,
            showMedia: false
        }
	},
	computed: {
		...mapGetters(['is_logged','user']),

	},
    mounted: async function() {
    },
	methods: {
		...mapActions(['postNewsPost']),
        setPostImage: function(value){
			this.post.image = value
		},
        removeImage: function() {
            this.post.image = null
        },
        verifyData: async function() {
            this.hasErrors = false
            this.errors = {
                title_en:false,
                title_ru:false,
                slug:false,
                description_en:false,
                description_ru:false
            }
            if(this.post.title_ru.length == 0) {
                this.errors.title_ru = true
                this.hasErrors = true
            }
            if(this.post.title_en.length == 0) {
                this.errors.title_en = true
                this.hasErrors = true
            }
            if(this.post.slug.length == 0) {
                this.errors.slug = true
                this.hasErrors = true
            }
            if(this.post.description_en.length == 0) {
                this.errors.description_en = true
                this.hasErrors = true
            }
            if(this.post.description_ru.length == 0) {
                this.errors.description_ru = true
                this.hasErrors = true
            }
            if(!this.hasErrors) {
                let bodyFormData = new FormData()
				bodyFormData.set('title_en', this.post.title_en)
				bodyFormData.set('title_ru', this.post.title_ru)
				bodyFormData.set('slug', this.post.slug)
				bodyFormData.set('image', this.post.image)
				bodyFormData.set('description_en', this.post.description_en)
				bodyFormData.set('description_ru', this.post.description_ru)
				bodyFormData.set('full_text_en', this.post.full_text_en)
				bodyFormData.set('full_text_ru', this.post.full_text_ru)
                let status = await this.postNewsPost(bodyFormData)
                if(status) {
                    this.$toasted.show("Post created successfuly", { 
                        position: "top-center",
                        icon: 'info',
                        className: 'success',
                        duration : 2000
                    })
                    this.$router.push({name:'News'})
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