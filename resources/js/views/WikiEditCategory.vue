<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Edit Wiki Category</h1>
			</div>
            <div class="card mt-40">
                <div class="grid-2">
                    <input type="text" :class="{error: errors.name_ru}" v-model="category.name_ru" class="form-control" placeholder="Name Ru">
                    <input type="text" :class="{error: errors.name_en}" v-model="category.name_en" class="form-control" placeholder="Name En">
                </div>
            </div>
            <div class="card mt-20">
                <input type="text" :class="{error: errors.slug}" v-model="category.slug" class="form-control" placeholder="Slug">
            </div>
            <div class="btn-wrap sides">
                <button class="btn btn-blue" @click="$router.push({name:'WikiCategories'})">Back</button>
                <button class="btn btn-green" @click="verifyData()">Update</button>
            </div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import {mapGetters,mapActions} from 'vuex'
Vue.use(Toasted)
export default {
	name:'WikiCreatePost',
	data: function(){
		return {
            category: {
                id:this.$route.params.id,
                name_en:'',
                name_ru:'',
                slug:''
            },
            errors: {
                name_en:false,
                name_ru:false,
                slug:false
            },
            hasErrors:false
        }
	},
	computed: {
		...mapGetters(['is_logged','user','wiki']),

	},
    mounted: async function() {
        await this.getWikiCategory(this.$route.params.id)
        this.setCategory()
    },
	methods: {
		...mapActions(['updateWikiCategory','getWikiCategory']),
        setCategory: function() {
            this.category.name_en = this.wiki.category.name_en
            this.category.name_ru = this.wiki.category.name_ru
            this.category.slug = this.wiki.category.slug
        },
        verifyData: async function() {
            this.hasErrors = false
            this.errors = {
                name_en:false,
                name_ru:false,
                slug:false
            }
            if(this.category.name_ru.length == 0) {
                this.errors.name_ru = true
                this.hasErrors = true
            }
            if(this.category.name_en.length == 0) {
                this.errors.name_en = true
                this.hasErrors = true
            }
            if(this.category.slug.length == 0) {
                this.errors.slug = true
                this.hasErrors = true
            }
            if(!this.hasErrors) {
                let status = await this.updateWikiCategory(this.category)
                if(status) {
                    this.$toasted.show("Category updated successfuly", { 
                        position: "top-center",
                        icon: 'info',
                        className: 'success',
                        duration : 2000
                    })
                    this.$router.push({name:'WikiCategories'})
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