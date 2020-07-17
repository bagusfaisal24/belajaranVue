import Vue from 'vue'
import App from './App'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import { BootstrapVue, FormDatepickerPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-icons/iconfont/material-icons.css'
import Home from './components/Home.vue'
import Member from './components/member/Member.vue'
import Ranting from './components/ranting/Ranting.vue'
import ProductType from './components/master.data/ProductType.vue'
import UpdateMember from './components/member/MemberFormUpdate.vue'
import UpdateRanting from './components/ranting/RantingFormUpdate.vue'
import ZakatList from './components/zakat.collection/ZakatList.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
axios.defaults.headers.common.Authorization = process.env.VUE_APP_AUTH_TOKEN

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuesax)
Vue.use(BootstrapVue)
Vue.use(FormDatepickerPlugin)

const routes = [
  { path: '/', component: Home },
  { path: '/member', component: Member },
  { path: '/member/:type/:id', component: UpdateMember, name: 'UpdateMember' },
  { path: '/member/create/:type', component: UpdateMember, name: 'CreateNewMember' },
  { path: '/ranting/create/:type', component: UpdateRanting, name: 'CreateNewRanting' },
  { path: '/ranting/:type/:id', component: UpdateRanting, name: 'UpdateRanting' },
  { path: '/ranting', component: Ranting },
  { path: '/type-zakat', component: ProductType },
  { path: '/zakat', component: ZakatList }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
