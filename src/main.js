import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, FormDatepickerPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Home from './components/Home.vue'
import Member from './components/member/Member.vue'
import Ranting from './components/ranting/Ranting.vue'
import UpdateMember from './components/member/MemberFormUpdate.vue'
import UpdateRanting from './components/ranting/RantingFormUpdate.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
axios.defaults.headers.common.Authorization = process.env.VUE_APP_AUTH_TOKEN

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(FormDatepickerPlugin)

const routes = [
  { path: '/', component: Home },
  { path: '/member', component: Member },
  { path: '/:type/:id', component: UpdateMember, name: 'UpdateMember' },
  { path: '/create/:type', component: UpdateMember, name: 'CreateNewMember' },
  { path: '/create/:type/:id', component: UpdateRanting, name: 'CreateNewRanting' },
  { path: '/:type/:id', component: UpdateRanting, name: 'UpdateRanting' },
  { path: '/ranting', component: Ranting }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
