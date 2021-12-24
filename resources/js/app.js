require('./bootstrap');

import Vue from 'vue'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import Main from './views/Main'
import Paginate from 'vuejs-paginate'
import VModal from 'vue-js-modal'
Vue.component('paginate', Paginate)
Vue.use(VueAxios, axios, Vuex)
Vue.use(VModal)
new Vue({
    store,
    router,
    render: h => h(Main)
}).$mount('#app')