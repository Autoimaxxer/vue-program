<template>
  <div class="temp1">
    <nav-bar title="图文列表" />
    <ul class="tit-list">
      <li v-for="(show,index) in list" :key="index">
        <a @click="changRouter(index)" href="javascript:;">{{show.name}}</a>
      </li>
    </ul>
    <ul class="news-list">
      <li v-for="(news,index) in newsList" :key="index">
        <router-link
          :to="{name:'photo.detail',query:{title:list[$route.params.categoryId].name,id:index}}"
        >
          <img v-lazy="news.img" alt />
          <div>
            <p>{{news.title}}</p>
            <p>
              <span>来源：{{news.source}}</span>
              <span>时间：{{news.time | covertTime('YYYY-MM-DD')}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        { name: '要闻', ext: 'news' },
        { name: '推荐', ext: 'recommend' },
        { name: '游戏', ext: 'games' },
        { name: '体育', ext: 'sports' },
        { name: '金融', ext: 'finance' },
        { name: '娱乐', ext: 'ent' },
        { name: '汽车', ext: 'auto' },
        { name: '教育', ext: 'edu' },
        { name: '文化', ext: 'cul' },
        { name: '手机', ext: 'mobile' },
        { name: '北京', ext: 'bj' },
        { name: '广东', ext: 'gd' },
        { name: '湖南', ext: 'hn' },
        { name: '海南', ext: 'hainan' },
        { name: '上海', ext: 'sh' },
        { name: '河南', ext: 'henan' },
        { name: '重庆', ext: 'cq' }
      ],
      newsList: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 该函数的触发：1、用户改变路由参数；2、用户点击按钮

    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`

    // 路由复用，参数改变触发，参数为query或params都行
    // console.log(to)
    this.getNewsById(to.params.categoryId)
    next()
  },
  created () {
    let categoryId = Number(this.$route.params.categoryId)
    this.getNewsById(categoryId)
  },
  methods: {
    // 1、获取路由参数categoryId
    // 2、通过url拼接参数发送请求
    // 3、获取数据并渲染

    changRouter: function (categoryId) {
      // 路由改变调取数据函数
      // 1、点击按钮，push触发路由改变
      // 2、用户改变url路由参数触发改变
      this.$router.push({
        name: 'photo.list',
        params: {
          // categoryId：categoryId,
          categoryId // es6可以写成这种方式
        }
      })
    },
    getNewsById (id) {
      this.$axios.get('/mocktest/photolist?title=' + this.list[id].name).then(res => {
        // console.log(res)
        this.newsList = res.data.data.list
        // 判断是否无数据
        if (this.newsList.length === 0) {
          this.$toast({
            message: '暂无数据',
            iconClass: 'no-data'
          })
        }
      }).catch(res => {

      })
    }
  }
}
</script>
<style scoped>
ul {
  padding: 0 5px;
}
li {
  list-style: none;
}
.tit-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.tit-list li {
  color: #4889f3;
  background: #e3f3fe;
  border-radius: 30%;
  width: 15%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-top: 5px;
}
.news-list a {
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.news-list img {
  width: 100px;
  margin-right: 5px;
}
/* 图片懒加载样式 */
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
