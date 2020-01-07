import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 引入组件库模块
import ElementUI from 'element-ui'
import '@/assets/css/global.css'
// 注册
Vue.use(ElementUI)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
