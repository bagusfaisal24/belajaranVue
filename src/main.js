import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home.vue'
import About from './components/Member.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/member', component: About }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
