<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Game Wiki Categories Manager</h1>
				<p>Appears on launcher and in-game.</p>
			</div>
			<div class="card mt-40">
					<div class="search">
						<input type="text" id="searchInput" class="form-control mr-10" placeholder="Search" v-model="searchParam" @keyup.enter="searchItem()">
						<select name="searchcolumn" id="searchcolumn" class="form-control mr-10" v-model="searchColumn">
							<option value="name_ru">Search by Name Ru</option>
							<option value="name_en">Search by Name En</option>
							<option value="slug">Search by Slug</option>
						</select>
						<button class="btn btn-green" @click="searchItem()" v-if="!searchStatus">Search</button>
						<button class="btn btn-red" @click="clearSearch()" v-if="searchStatus">X</button>
					</div>
				</div>
			<div class="card">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th style="width:30%" @click="setSorting('name_ru')">
								<div>
									<span>Name ru</span>
									<div class="sorting" :class="{desc:wiki.categoriesSort.order == 'desc'}" v-if="wiki.categoriesSort.key == 'name_ru'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:30%" @click="setSorting('name_en')">
								<div>
									<span>Name En</span>
									<div class="sorting" :class="{desc:wiki.categoriesSort.order == 'desc'}" v-if="wiki.categoriesSort.key == 'name_en'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:20%" @click="setSorting('slug')">
								<div>
									<span>Slug</span>
									<div class="sorting" :class="{desc:wiki.categoriesSort.order == 'desc'}" v-if="wiki.categoriesSort.key == 'slug'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:20%"><span>Actions</span></th>
						</thead>
						<tbody>
							<tr v-for="category in sortedItems" :key="category.id">
								<td style="width:30%"><span>{{formatName(category.name_ru)}}</span></td>
								<td style="width:30%"><span>{{formatName(category.name_en)}}</span></td>
								<td style="width:20%"><span>{{formatName(category.slug)}}</span></td>
								<td style="width:20%" class="buttons">
									<button class="btn btn-blue" @click="$router.push({name:'WikiEditCategory',params:{id:category.id}})">
										<span class="material-icons">
											edit
										</span>
									</button>
									<button class="btn btn-red" @click="removeCategory(category.id)">
										<span class="material-icons">
											delete
										</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						<li class="page-item">
							<button type="button" class="page-link" v-if="page != 1" @click="page--;"> Previous </button>
						</li>
						<li class="page-item">
							<button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :class="{active:page == pageNumber}" @click="page = pageNumber" :key="pageNumber"> {{pageNumber}} </button>
						</li>
						<li class="page-item">
							<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import arrayHelpers from '../helpers/arrayHelpers'
import {mapGetters,mapActions,mapMutations} from 'vuex'
Vue.use(Toasted)
export default {
	name:'WikiCategories',
	data: function(){
		return {
			categoriesList:[],
			searchParam:'',
			searchStatus:false,
			searchColumn:'name_ru',
			page: 1,
			perPage: 15,
			pages: [],
        }
	},
	computed: {
		...mapGetters(['is_logged','user','wiki']),
		sortedItems() {
			let sorted = []
			this.categoriesList.forEach(i => {
				sorted.push(i)
			})
			if(this.wiki.categoriesSort.key.length > 0) {
				sorted.sort(arrayHelpers.sortArray(this.wiki.categoriesSort.key, this.wiki.categoriesSort.order))
			}
			if(!this.searchStatus) {
				this.setPages(sorted)
				return this.paginate(sorted)
			} else {
				let i = this.searchItem(sorted)
				this.setPages(i)
				return this.paginate(i)
			}
		}
	},
    mounted: async function() {
        await this.getWikiCategories()
		await this.wiki.categories.forEach(i => {
			this.categoriesList.push(i)
		})
    },
	methods: {
		...mapActions(['getWikiCategories','deleteWikiCategory']),
		...mapMutations(['updateCategoriesSort','updateWikiCategoriesSearch']),
		formatName: function(str) {
			if(str.length > 20) str = str.substring(0,20)+'...'
			return str
		},
        removeCategory: async function(id) {
            await this.deleteWikiCategory(id)
            this.categoriesList = []
            await this.getWikiCategories()
            await this.wiki.categories.forEach(i => {
                this.categoriesList.push(i)
            })
        },
		searchItem: function(sorted) {
			let response = []
			this.updateWikiCategoriesSearch({status:true,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.searchStatus = true
            if(sorted) {
                response = arrayHelpers.filterArray(sorted,this.searchParam,this.searchColumn)
			    return response
            }
		},
		clearSearch: function() {
			this.searchStatus = false
			this.searchParam = ''
			this.searchColumn = 'name_ru'
			this.updateWikiCategoriesSearch({status:false,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.setPages(this.sortedItems)
		},
		setSorting: async function(column) {
			let sort = {
				key:column,
				order:''
			}
			if(this.wiki.categoriesSort.key == column) {
				sort.order = this.wiki.categoriesSort.order === 'desc' ? '' : 'desc'
			} else {
				sort.order = ''
			}
			this.updateCategoriesSort(sort)
			this.categoriesList = []
			await this.wiki.categories.forEach(i => {
				this.categoriesList.push(i)
			})
		},
		setPages: function(items) {
			this.pages = []
			let numberOfPages = Math.ceil(items.length / this.perPage)
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index)
			}
		},
		paginate: function(posts) {
			let page = this.page
			let perPage = this.perPage
			let from = (page * perPage) - perPage
			let to = (page * perPage)
			return  posts.slice(from, to)
		},
	}
}
</script>