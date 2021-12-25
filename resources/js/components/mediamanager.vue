<template>
    <modal
        @before-close="$emit('managerclosed')"
        name="media"
		class="modal"
		:width="1200"
        :height="'50%'"
		v-body-scroll-lock="show"
    >
        <div class="modal-header">
			<div class="title">Media Manager</div>
			<span class="material-icons" @click="$modal.hide('media')">close</span>
		</div>
		<div class="actions-panel">
			<div class="left">
				<div @click="upload.show = !upload.show">
					<template v-if="!upload.show">
						<span class="material-icons">upload</span>
						Upload
					</template>
					<template v-if="upload.show">
						<span class="material-icons">close</span>
						Cancel
					</template>
				</div>
				<div v-if="selected.id != null" @click="deleteImage()">
					<span class="material-icons">delete_forever</span>
					Delete
				</div>
			</div>
			<div class="mid">
				<select class="form-control" name="imagetype" id="imagetype" v-model="type" @change="mediaTypeChange()">
					<option :value="type" v-for="(type,index) in mediaTypes" :key="index">{{type}}</option>
				</select>
			</div>
			<div class="right">
				<button class="btn btn-green" @click="sendMedia()" :disabled="selected.id == null" v-if="uiType == 'select'">
					Select Image
				</button>
			</div>
		</div>
		<div class="modal-body">
			<vue-custom-scrollbar :settings="scrollSettings" v-if="!loading && !upload.show">
				<div class="media-list">
					<div :class="{'selected':selected.id == image.id}" v-for="image in list" :key="image.id" @click="selectMedia(image)">
						<img :src="image.image_thumb_url">
					</div>
				</div>
			</vue-custom-scrollbar>
			<div class="loading" v-if="loading"><img src="/img/loading.svg"></div>
			<div class="upload" v-if="!loading && upload.show">
				<h2 class="pb-20">Drag & Drop here or choose images to upload</h2>
				<div class="add-media">
					<svg width="50" height="42" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M45.9785 41.4689H4.0295C1.80295 41.4689 0.000200272 39.6661 0.000200272 37.4396V4.56055C0.000200272 2.334 1.80295 0.53125 4.0295 0.53125H45.9785C48.2051 0.53125 50.0078 2.334 50.0078 4.56055V37.4396C50.0078 38.5079 49.584 39.5333 48.8281 40.2892C48.0722 41.045 47.0469 41.4689 45.9785 41.4689ZM4.0295 3.67185C3.53927 3.67185 3.14085 4.07029 3.14085 4.5605V37.4395C3.14085 37.9297 3.53929 38.3282 4.0295 38.3282H45.9785C46.4668 38.3242 46.8594 37.9278 46.8594 37.4395V4.5605C46.8594 4.07222 46.4668 3.67575 45.9785 3.67185H4.0295Z" fill="#EFEFEF"/>
					<path d="M9.4865 34.6598H40.514C41.0218 34.6734 41.4925 34.3981 41.7269 33.9488C41.9632 33.4996 41.9222 32.9566 41.6214 32.5465L37.3421 26.736C37.1156 26.4235 36.764 26.2243 36.3792 26.1911C35.9945 26.1579 35.6156 26.2946 35.3382 26.5641L30.9398 30.7497L20.7308 16.8882H20.7327C20.4749 16.5366 20.0608 16.3354 19.6233 16.3472C19.1878 16.3589 18.7874 16.5854 18.5491 16.9507L8.34013 32.6087V32.6106C8.07255 33.0227 8.05498 33.5501 8.29521 33.9817C8.53545 34.4114 8.99441 34.6712 9.48661 34.6595L9.4865 34.6598Z" fill="#EFEFEF"/>
					<path d="M39.3125 12.4043C39.3125 14.9765 37.2266 17.0625 34.6543 17.0625C32.084 17.0625 29.998 14.9765 29.998 12.4043C29.998 9.83205 32.084 7.74805 34.6543 7.74805C37.2266 7.74805 39.3125 9.83205 39.3125 12.4043Z" fill="#EFEFEF"/>
					</svg>
					<input type="file" accept="image/png,image/jpeg,image/gif" @change="setPhoto($event)" id="fileInput" multiple>
				</div>
			</div>
		</div>
    </modal>
</template>

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions,mapMutations} from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import VBodyScrollLock from 'v-body-scroll-lock'
Vue.use(VBodyScrollLock)
Vue.use(Toasted)
export default {
	name:'mediamanager',
	components: {
		vueCustomScrollbar
	},
	data: function(){
		return {
            list:{},
			type:'',
			mediaTypes:['news','wikis','images'],
			scrollSettings: {
				suppressScrollX: true
			},
			upload:{
				show:false,
				files:{}
			},
			selected:{
				id:null
			},
			loading:true
		}
	},
    props: ['show','defaultType','uiType'],
    watch: {
        show: function(newVal, oldVal){
            newVal ? this.$modal.show('media') : this.$modal.hide('media')
        }
    },
	computed: {
		...mapGetters(['is_logged','media'])
	},
	mounted: async function() {
		this.type = this.defaultType
		this.$modal.show('media')
		await this.getMedia({page:1,type:this.type})
		this.setList()
	},
	methods: {
		...mapActions(['getMedia','postMedia','deleteMedia']),
		...mapMutations([]),
		setList: function() {
			this.list = this.media.data
			this.loading = false
		},
		mediaTypeChange: async function() {
			this.loading = true
			await this.getMedia({page:1,type:this.type})
			this.setList()
		},
		setPhoto: async function(event){
			let files = []
            for await (const file of event.target.files) {
                files.push(file)
            }
			let inp = document.getElementById('fileInput')
            inp.value = ''
			this.loading = true
            for (const file of files) {
                await this.postMedia({type:this.type,image:file})
            }
			this.upload.show = false
			await this.getMedia({page:1,type:this.type})
			this.setList()
        },
		selectMedia: function(image) {
			if(this.selected.id != image.id) {
				this.selected = image
			} else {
				this.selected = {id:null}
			}
		},
		sendMedia: function(){
			if(this.uiType == 'select'){
				this.$emit('selectedMedia', this.selected.image_url)
				this.$modal.hide('media')
			} else {
				let imgs = []
				this.selected.forEach(sel => {
					imgs.push(sel.image_url)
				})
				this.$emit('selectedMedia', imgs)
			}
		},
		deleteImage: async function(){
			this.loading = true
			await this.deleteMedia(this.selected.id)
			await this.getMedia({page:1,type:this.type})
			this.setList()
		}
	}
}
</script>