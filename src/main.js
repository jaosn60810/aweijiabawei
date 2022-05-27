import Vue from 'vue' //當我們install vue的同時也install webpack
import App from './App.vue'
import router from './router'

import store from './Store.js'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'jquery'
import Swal from 'sweetalert2'
import VueFirestore from 'vue-firestore'
import VueRouter from 'vue-router'
import Vue2Filters from 'vue2-filters'
import VueCarousel from 'vue-carousel'
import Vuex from 'vuex'

require('firebase/firestore')

Vue.use(VueCarousel)
Vue.use(Vuex)
Vue.use(VueFirestore)
Vue.use(VueRouter)
Vue.use(Vue2Filters)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.config.devtools = true

window.Swal = Swal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
