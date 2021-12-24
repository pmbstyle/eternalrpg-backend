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
                name:'Distros',
                alias:'Distros',
                icon:'extension',
                active:false,
                children:[]
            },
            {
                id:2,
                name:'Maintenance',
                alias:'Maintenance',
                icon:'engineering',
                active:false,
                children:[]
            },
            {
                id:3,
                name:'News',
                alias:'News',
                icon:'newspaper',
                active:false,
                children:[
                    {
                        id:32,
                        name:'Create Post',
                        alias:'NewsCreatePost',
                        active:false
                    }
                ]
            },
            {
                id:4,
                name:'Wiki',
                alias:'Wiki',
                icon:'description',
                active:false,
                children:[
                    {
                        id:40,
                        name:'Categories',
                        alias:'WikiCategories',
                        active:false
                    },
                    {
                        id:41,
                        name:'Create Category',
                        alias:'WikiCreateCategory',
                        active:false
                    },
                    {
                        id:42,
                        name:'Create Post',
                        alias:'WikiCreatePost',
                        active:false
                    }
                ]
            },
            {
                id:5,
                name:'Users',
                alias:'Users',
                icon:'perm_identity',
                active:false,
                children:[
                    {
                        id:50,
                        name:'Create User',
                        alias:'UserCreate',
                        active:false
                    }
                ]
            },
            {
                id:6,
                name:'Buget & Sales',
                alias:'Buget',
                icon:'savings',
                active:false,
                children:[
                    {
                        id:60,
                        name:'Sales',
                        alias:'Sales',
                        active:false,
                    },
                    {
                        id:61,
                        name:'Spending',
                        alias:'Spending',
                        active:false,
                    }
                ]
            },
        ],
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