import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
  }, {
    path: '/fans',
    name: 'fans',
    component: () =>
            import ('@/views/fans')
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let userInfo = window.sessionStorage.getItem('userInfo')
  if (!userInfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})

// 配置"全局后置路由"守卫
// 路由执行完毕，组件显示好了，该路由会执行"收尾"工作
router.afterEach((to, from) => {
  // 进度条完成
  NProgress.done()
})
export default router
