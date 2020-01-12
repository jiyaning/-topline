import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
        import ('@/views/login')
}, {
  path: '/home',
  name: 'home',
  redirect: '/welcome',
  component: () =>
        import ('@/views/home'),
  children: [{
    path: '/article',
    name: 'article',
    component: () =>
            import ('@/views/article')
  }, {
    path: '/welcome',
    name: 'welcome',
    component: () =>
            import ('@/views/welcome')
  }, {
    path: '/account',
    name: 'account',
    component: () =>
            import ('@/views/account')
  }, {
    path: '/articleadd',
    name: 'articleadd',
    component: () =>
            import ('@/views/articleadd')
  }, {
    path: '/comment',
    name: 'comment',
    component: () =>
            import ('@/views/comment')
  }, {
    path: '/material',
    name: 'material',
    component: () =>
            import ('@/views/material')
  }, {
    path: '/articleedit/:aid',
    name: 'articleedit',
    component: () =>
            import ('@/views/articleedit')
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let userInfo = window.sessionStorage.getItem('userInfo')
  if (!userInfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
