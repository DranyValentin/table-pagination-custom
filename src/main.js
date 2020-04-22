const axios = require('axios')

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';

import Users from './components/Users.vue'
import Show from './components/Show.vue'

Vue.use(Vuex);
Vue.use(VueRouter)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUsers: state => state.users,
  },
  mutations: {
    ADD_USERS(state, payload) {
      state.users = [...state.users, ...payload];
    },
    CLEAR_USERS(state) {
			state.users = []
    }
  },
  actions: {
		SET_USERS({ commit }) {
			commit("CLEAR_USERS")
			axios.get('https://reqres.in/api/users').then(res => {
				commit("ADD_USERS", res.data.data)

				for ( let i = 1; i < res.data.total_pages; i++ ) {
					axios.get(`https://reqres.in/api/users?page=${i+1}`).then(res => {
						commit("ADD_USERS", res.data.data)
					})   
				}
			})
		}
	}
})

const router = new VueRouter({
  routes: [
    { path: '/', component: Users },
    { path: '/user/:id', name: 'user', component: Show, props: true }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
