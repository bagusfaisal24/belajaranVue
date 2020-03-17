import UpdateForm from '../components/member/MemberFormUpdate'
import Member from '../components/member/Member'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes:[
    {
      path: '/',
      redirect: {
        name: 'Login',
      },
    },
    {
      path: '/update',
      component: UpdateForm,
      name: 'UpdateMember'
    },
  ]
})
