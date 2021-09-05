require('./bootstrap');

import Vue from 'vue'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import Main from './views/Main'

Vue.use(VueAxios, axios, Vuex)

new Vue({
    store,
    router,
    render: h => h(Main)
}).$mount('#app')