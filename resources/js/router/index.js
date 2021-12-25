import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import News from '../views/News.vue'
import NewsCreatePost from '../views/NewsCreatePost.vue'
import NewsEditPost from '../views/NewsEditPost.vue'
import Wiki from '../views/Wiki.vue'
import WikiCreatePost from '../views/WikiCreatePost.vue'
import WikiEditPost from '../views/WikiEditPost.vue'
import WikiCategories from '../views/WikiCategories.vue'
import WikiCreateCategory from '../views/WikiCreateCategory.vue'
import WikiEditCategory from '../views/WikiEditCategory.vue'
import Distros from '../views/Distros.vue'
import Distro from '../views/Distro.vue'
import Maintenance from '../views/Maintenance.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/news',
		name: 'News',
		component: News
	},
	{
		path: '/news/create-post',
		name: 'NewsCreatePost',
		component: NewsCreatePost
	},
	{
		path: '/news/:id',
		name: 'NewsEditPost',
		component: NewsEditPost
	},
	{
		path: '/wiki',
		name: 'Wiki',
		component: Wiki
	},
	{
		path: '/wiki/create-post',
		name: 'WikiCreatePost',
		component: WikiCreatePost
	},
	{
		path: '/wiki/edit-post/:id',
		name: 'WikiEditPost',
		component: WikiEditPost
	},
	{
		path: '/wiki/categories',
		name: 'WikiCategories',
		component: WikiCategories
	},
	{
		path: '/wiki/create-category',
		name: 'WikiCreateCategory',
		component: WikiCreateCategory
	},
	{
		path: '/wiki/edit-category/:id',
		name: 'WikiEditCategory',
		component: WikiEditCategory
	},
	{
		path: '/distros',
		name: 'Distros',
		component: Distros
	},
	{
		path: '/distro/:id',
		name: 'Distro',
		component: Distro
	},
	{
		path: '/maintenance',
		name: 'Maintenance',
		component: Maintenance
	},
]

const router = new VueRouter({
    mode: 'history',
	base: '/',
	routes
})

export default router