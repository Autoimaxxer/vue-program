// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 配置MintUI
import MintUI from 'mint-ui'
// 引入css
import 'mint-ui/lib/style.css'
// 安装插件，注册全局组件及挂载属性
// 配置axiox
import Axios from 'axios'
// 引入自己的css
import './assets/css/global.css'
// 引入图标css
import './assets/css/iconFont.css'
// 引入自己的ul和li组件
import MyUl from '@/components/Common/MyUl'
import MyLi from '@/components/Common/MyLi'
// 引入评论组件
import Comment from '@/components/Common/Comment'

// 引入navbar组件
import NavBar from '@/components/Common/NavBar'
// 定义moment全局日期过滤器
import Moment from 'moment'

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '玩命加载中...'
  })
  return config
})
// 配置响应拦截器，关闭loading图标
Axios.interceptors.response.use(function (response) {
  MintUI.Indicator.close()
  // response.config 类似 上面config
  return response
})

// 使用mock
require('./mock/index')

Vue.use(MintUI)
// 注册全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)

Vue.filter('covertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
Vue.filter('relativeTime', function (previousTime) {
  return Moment(previousTime).fromNow()
})
// 设置中文显示
Moment.locale('zh-cn')
// 配置公共URL
// Axios.defaults.baseURL = 'https://douban.uieee.com'
Vue.prototype.$axios = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
