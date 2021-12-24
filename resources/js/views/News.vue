<template>
	<div id="wiki">
		<div class="wrapper">
			<div class="wiki-head">
				<h1>News Manager</h1>
				<p>Appears on launcher as news feed.</p>
			</div>
			<div class="grid-1 mt-40">
				<div class="card">
					<div class="search">
						<input type="text" id="searchInput" class="form-control mr-10" placeholder="Search" v-model="searchParam" @keyup.enter="searchItem()">
						<select name="searchcolumn" id="searchcolumn" class="form-control mr-10" v-model="searchColumn">
							<option value="title_ru">Search by Title Ru</option>
							<option value="title_en">Search by Title En</option>
							<option value="slug">Search by Slug</option>
						</select>
						<button class="btn btn-green" @click="searchItem()" v-if="!searchStatus">Search</button>
						<button class="btn btn-red" @click="clearSearch()" v-if="searchStatus">X</button>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th style="width:25%">
								<div>
									<span>Title ru</span>
								</div>
							</th>
							<th style="width:25%">
								<div>
									<span>Title En</span>
								</div>
							</th>
							<th style="width:25%">
								<div>
									<span>Slug</span>
								</div>
							</th>
							<th style="width:25%"><span>Actions</span></th>
						</thead>
						<tbody>
							<tr v-for="post in postsList" :key="post.id">
								<td style="width:25%"><span>{{formatName(post.title_ru)}}</span></td>
								<td style="width:25%"><span>{{formatName(post.title_en)}}</span></td>
								<td style="width:25%"><span>{{formatName(post.slug)}}</span></td>
								<td style="width:25%" class="buttons">
									<button class="btn btn-blue" @click="$router.push({name:'NewsEditPost',params:{id:post.id}})">
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
	name:'News',
	data: function(){
		return {
			postsList:[],
			searchParam:'',
			searchStatus:false,
			searchColumn:'title_ru',
			page: 1,
			perPage: 15,
			pages: [],
        }
	},
	computed: {
		...mapGetters(['is_logged','user','news']),
	},
    mounted: async function() {
        await this.getNewsPosts()
		await this.news.posts.data.forEach(i => {
			this.postsList.push(i)
		})
    },
	methods: {
		...mapActions(['getNewsPosts','deleteNewsPost']),
		...mapMutations(['updateNewsPostsSearch']),
		formatName: function(str) {
			if(str.length > 20) str = str.substring(0,20)+'...'
			return str
		},
		removePost: async function(id) {
            await this.deleteNewsPost(id)
			this.postsList = []
            await this.getNewsPosts()
			await this.news.posts.forEach(i => {
				this.postsList.push(i)
			})
        },
		searchItem: function() {
			let response = []
			this.updateNewsPostsSearch({status:true,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.searchStatus = true
			response = arrayHelpers.filterArray(this.searchParam,this.searchColumn)
			return response
		},
		clearSearch: function() {
			this.searchStatus = false
			this.searchParam = ''
			this.searchColumn = 'title_ru'
			this.updateWikiPostsSearch({status:false,searchParam:this.searchParam,searchColumn:this.searchColumn})
			this.setPages(this.postsList)
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
		}
	}
}
</script>