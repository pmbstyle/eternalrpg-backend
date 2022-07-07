import { createRouter, createWebHistory } from 'vue-router'

let routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login')
	},
	// {
	// 	path: '/dashboard',
	// 	name: 'Dashboard',
	// 	component: () => import('../views/Dashboard')
	// },
	// {
	// 	path: '/news',
	// 	name: 'News',
	// 	component: () => import('../views/News')
	// },
	// {
	// 	path: '/news/create-post',
	// 	name: 'NewsCreatePost',
	// 	component: () => import('../views/NewsCreatePost')
	// },
	// {
	// 	path: '/news/:id',
	// 	name: 'NewsEditPost',
	// 	component: () => import('../views/NewsEditPost')
	// },
	// {
	// 	path: '/wiki',
	// 	name: 'Wiki',
	// 	component: () => import('../views/Wiki')
	// },
	// {
	// 	path: '/wiki/create-post',
	// 	name: 'WikiCreatePost',
	// 	component: () => import('../views/WikiCreatePost')
	// },
	// {
	// 	path: '/wiki/edit-post/:id',
	// 	name: 'WikiEditPost',
	// 	component: () => import('../views/WikiEditPost')
	// },
	// {
	// 	path: '/wiki/categories',
	// 	name: 'WikiCategories',
	// 	component: () => import('../views/')
	// },
	// {
	// 	path: '/wiki/create-category',
	// 	name: 'WikiCreateCategory',
	// 	component: () => import('../views/WikiCreateCategory')
	// },
	// {
	// 	path: '/wiki/edit-category/:id',
	// 	name: 'WikiEditCategory',
	// 	component: () => import('../views/WikiEditCategory')
	// },
	// {
	// 	path: '/distros',
	// 	name: 'Distros',
	// 	component: () => import('../views/Distros')
	// },
	// {
	// 	path: '/distro/:id',
	// 	name: 'Distro',
	// 	component: () => import('../views/Distro')
	// },
	// {
	// 	path: '/maintenance',
	// 	name: 'Maintenance',
	// 	component: () => import('../views/Maintenance')
	// },
	// {
	// 	path: '/servers',
	// 	name: 'Servers',
	// 	component: () => import('../views/Servers')
	// },
	// {
	// 	path: '/server/:id',
	// 	name: 'ServerEdit',
	// 	component: () => import('../views/ServerEdit')
	// },
	// {
	// 	path: '/create-server',
	// 	name: 'ServerCreate',
	// 	component: () => import('../views/ServerCreate')
	//},
	// {
	// 	path: '/404',
	// 	name: 'NotFound',
	// 	component: () => import('../views/NotFound')
	// },
	// {
	// 	path: '/:pathMatch(.*)*',
	// 	name: 'not-found',
	// 	component: () => import('../views/NotFound')
	// }
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
