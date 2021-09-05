<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>Game Wiki Manager</h1>
				<p>Appears on launcher and in-game.</p>
			</div>
			<div class="grid-2 mt-40">
				<div class="card">
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
					<select class="form-control" name="category" id="category" v-model="category_id" @change="getWikiPosts(category_id)">
                        <option value="" disabled>Category</option>
                        <option :value="cat.id" v-for="cat in wiki.categories" :key="cat.id">{{cat.name_ru}}/{{cat.name_en}}</option>
                    </select>
				</div>
			</div>
			<div class="card">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th style="width:20%" @click="setSorting('name_ru')">
								<div>
									<span>Name ru</span>
									<div class="sorting" :class="{desc:wiki.postsSort.order == 'desc'}" v-if="wiki.postsSort.key == 'name_ru'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:20%" @click="setSorting('name_en')">
								<div>
									<span>Name En</span>
									<div class="sorting" :class="{desc:wiki.postsSort.order == 'desc'}" v-if="wiki.postsSort.key == 'name_en'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:15%" @click="setSorting('slug')">
								<div>
									<span>Slug</span>
									<div class="sorting" :class="{desc:wiki.postsSort.order == 'desc'}" v-if="wiki.postsSort.key == 'slug'">
										<svg width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
											viewBox="0 0 386.257 386.257" style="enable-background:new 0 0 386.257 386.257;" xml:space="preserve">
											<polygon points="0,96.879 193.129,289.379 386.257,96.879 "/>
										</svg>
									</div>
								</div>
							</th>
							<th style="width:15%"><span>Category</span></th>
							<th style="width:10%"><span>Views</span></th>
							<th style="width:20%"><span>Actions</span></th>
						</thead>
						<tbody>
							<tr v-for="post in sortedItems" :key="post.id">
								<td style="width:20%"><span>{{formatName(post.name_ru)}}</span></td>
								<td style="width:20%"><span>{{formatName(post.name_en)}}</span></td>
								<td style="width:20%"><span>{{formatName(post.slug)}}</span></td>
								<td style="width:15%"><span>{{categoryName(post.wiki_category_id)}}</span></td>
								<td style="width:10%"><span>n/a</span></td>
								<td style="width:15%" class="buttons">
									<button class="btn btn-blue" @click="$router.push({name:'WikiEditPost',params:{id:post.id}})">
										<span class="material-icons">
											edit
										</span>
									</button>
									<button class="btn btn-red" @click="removePost(post.id)">
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
	name:'Wiki',
	data: function(){
		return {
			postsList:[],
			category_id:'',
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
			this.postsList.forEach(i => {
				sorted.push(i)
			})
			if(this.wiki.postsSort.key.length > 0) {
				sorted.sort(arrayHelpers.sortArray(this.wiki.postsSort.key, this.wiki.postsSort.order))
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
        await this.getWikiPosts(this.category_id)
		await this.wiki.posts.forEach(i => {
			this.postsList.push(i)
		})
    },
	methods: {
		...mapActions(['getWikiCategories','getWikiPosts','deleteWikiPost']),
		...mapMutations(['updatePostsSort','updateWikiPostsSearch']),
		formatName: function(str) {
			if(str.length > 20) str = str.substring(0,20)+'...'
			return str
		},
		categoryName: function(id) {
			let name = ''
			this.wiki.categories.forEach(cat => {
				if(cat.id === id) {
					name = cat.name_ru.length > 0 ? cat.name_ru : cat.name_en
				}
			})
			return name
		},
		categorySwitch: async function(){
			this.postsList = []
			await this.getWikiPosts(this.category_id)
			await this.wiki.posts.forEach(i => {
				this.postsList.push(i)
			})
		},
		removePost: async function(id) {
            await this.deleteWikiPost(id)
			this.postsList = []
            await this.getWikiPosts(this.category_id)
			await this.wiki.posts.forEach(i => {
				this.postsList.push(i)
			})
        },
		searchItem: function(sorted) {
			let response = []
			this.updateWikiPostsSearch({status:true,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.searchStatus = true
			response = arrayHelpers.filterArray(sorted,this.searchParam,this.searchColumn)
			return response
		},
		clearSearch: function() {
			this.searchStatus = false
			this.searchParam = ''
			this.searchColumn = 'name_ru'
			this.updateWikiPostsSearch({status:false,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.setPages(this.sortedItems)
		},
		setSorting: async function(column) {
			let sort = {
				key:column,
				order:''
			}
			if(this.wiki.postsSort.key == column) {
				sort.order = this.wiki.postsSort.order === 'desc' ? '' : 'desc'
			} else {
				sort.order = ''
			}
			this.updatePostsSort(sort)
			this.postsList = []
			await this.wiki.posts.forEach(i => {
				this.postsList.push(i)
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