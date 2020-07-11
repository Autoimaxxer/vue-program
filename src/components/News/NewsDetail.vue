<template>
  <div class="tmp1">
    <nav-bar :title="title" />
    <div>
      <p class="news-title">{{newsDetail.text}}</p>
      <div class="news-tit-box">
        <span>点击第{{Number(id)+1}}个新闻</span>
        <span>分类：{{newsDetail.type}}</span>
        <span>时间：{{newsDetail.passtime | covertTime('YYYY年MM月DD日')}}</span>
      </div>
      <div v-html="newsDetail.name"></div>
      <div class="news-content">
        <img :src="newsDetail.images" alt />
        <p>神评：</p>
        <p class="comments">{{newsDetail.top_comments_name}}：{{newsDetail.top_comments_content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '', // 变化的标题
      id: '',
      newsDetail: {} // 新闻详情
    }
  },
  created () {

  },
  methods: {
    loadPhotoIfno () {
      this.$axios.get('/mocktest/photoInfo').then(res => {
        // console.log(res.data.result)
        this.newsDetail = res.data.data.info
      }).catch(res => {
        console.log(res)
      })
    }
  },
  // 路由确认前，组件渲染前的守卫函数
  beforeRouteEnter (to, from, next) {
    // 1、如果from为空，说明是粘贴地址栏过来
    // 2、如果from是新闻列表，给title为新闻详情
    // 3、如果from是商品详情，给title为商品图文介绍
    let title = ''
    if (from.name === null) {
      // news.detail
      // photo.info
      if (to.name === 'news.detail') {
        title = '新闻详情'
      } else if (to.name === 'photo.info') {
        title = '商品图文介绍'
      }
    } else if (from.name === 'news.list') {
      title = '新闻详情'
    } else if (from.name === 'goods.detail') {
      title = '商品图文介绍'
    }
    // 最终全部放行
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.title = title
      vm.loadPhotoIfno()
    })
  }
}
</script>
<style scoped>
.tmp1 {
  padding-bottom: 60px;
}
.news-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #024ef3a4;
}
.news-content img {
  display: block;
  margin: 20px auto;
}
.comments {
  text-indent: 3em;
}
</style>
