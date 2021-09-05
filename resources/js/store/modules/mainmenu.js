import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import Api from '../../helpers/api'
export default ({
	state: {
		mainmenu:[
            {
                id:0,
                name:'Dashboard',
                alias:'Dashboard',
                icon:'dashboard',
                active:false,
                children:[]
            },
            {
                id:1,
                name:'Wiki',
                alias:'Wiki',
                icon:'description',
                active:false,
                children:[
                    {
                        id:10,
                        name:'Categories',
                        alias:'WikiCategories',
                        active:false
                    },
                    {
                        id:11,
                        name:'Create Category',
                        alias:'WikiCreateCategory',
                        active:false
                    },
                    {
                        id:12,
                        name:'Create Post',
                        alias:'WikiCreatePost',
                        active:false
                    },
                ]
            },
            {
                id:2,
                name:'Users',
                alias:'Users',
                icon:'perm_identity',
                active:false,
                children:[
                    {
                        id:20,
                        name:'Create User',
                        alias:'UserCreate',
                        active:false
                    },
                ]
            },
            {
                id:3,
                name:'Buget & Sales',
                alias:'Buget',
                icon:'savings',
                active:false,
                children:[
                    {
                        id:30,
                        name:'Sales',
                        alias:'Sales',
                        active:false,
                    },
                    {
                        id:31,
                        name:'Spending',
                        alias:'Spending',
                        active:false,
                    },
                ]
            },
        ],
	},
	actions: {

	},
	mutations: {
		setActiveMenu: function(state,alias) {
			state.mainmenu.map(m => {
                m.active = m.alias == alias ? true : false
                if(m.children.length > 0) {
                    m.children.map(s => {
                        s.active = s.alias == alias ? true : false
                    })
                }
            })
		},
	},
	getters:{
		mainmenu(state) {
			return state.mainmenu
		}
	}
})