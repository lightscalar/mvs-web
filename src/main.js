// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

// For convenience.
window.router = app.$router
window.d3 = d3

