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
