import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home/Home')
const Member = () => import('@/components/Member/Member')
const Search = () => import('@/components/Search/Search')
const Shopcart = () => import('@/components/Shopcart/Shopcart')
const NewsList = () => import('@/components/News/NewsList')
const NewsDetail = () => import('@/components/News/NewsDetail')
const PhotoList = () => import('@/components/Photo/PhotoList')
const PhotoDetail = () => import('@/components/Photo/PhotoDetail')
const GoodsList = () => import('@/components/Goods/GoodsList')
const GoodsDetail = () => import('@/components/Goods/GoodsDetail')
const GoodsComment = () => import('@/components/Goods/GoodsComment')

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
    },
    // 商品列表
    {
      name: 'goods.list',
      path: '/Goods/list',
      component: GoodsList
    },
    // 商品详情
    {
      name: 'goods.detail',
      path: '/Goods/detail/:id',
      component: GoodsDetail
    },
    // 商品图文介绍
    {
      name: 'photo.info',
      path: '/Goods/photo/info',
      component: NewsDetail
    },
    // 商品评论
    {
      name: 'goods.comment',
      path: '/Goods/comment',
      component: GoodsComment
    }
  ]
})
