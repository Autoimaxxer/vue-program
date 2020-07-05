import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'

Vue.use(Router)
// 注册全局组件router-view和router-link
// 挂在Vue.prototype.$router||$router
// 未来所有的组件中的this对象，就具备该属性，所有的this其实就是Vue的子类对象

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      // 首先进行重定向的操作
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/Search',
      name: 'search',
      component: Search
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    // 次级路由，新闻列表
    {
      path: '/News/list',
      name: 'news.list',
      component: NewsList,
      meata: {
        keepAlive: true
      }
    },
    // 新闻详情页
    {
      path: '/News/detail',
      name: 'news.detail',
      component: NewsDetail
    },
    // 图文列表
    {
      path: '/Photo/list/:categoryId',
      name: 'photo.list',
      component: PhotoList
    },
    // 图文详情
    {
      name: 'photo.detail',
      path: '/Photo/detail',
      component: PhotoDetail
    }
  ]
})
