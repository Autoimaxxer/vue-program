<template>
  <div class="tmp1">
    <nav-bar title="段子详情" />
    <div>
        <p class="news-title">{{newsDetail.text}}</p>
        <div class="news-tit-box">
            <span>点击第{{Number(id)+1}}个段子</span>
            <span>分类：{{newsDetail.type}}</span>
            <span>时间：{{newsDetail.passtime | covertTime('YYYY年MM月DD日')}}</span>
        </div>
        <div v-html="newsDetail.name"></div>
        <div class="news-content">
            <img :src="newsDetail.images" alt="">
            <img :src="newsDetail.images" alt="">
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
      id: '',
      newsDetail: {} // 段子详情
    }
  },
  created () {
    // 这里获取地址栏参数是 route，不是router
    console.log(this.$route.query.id)
    var _this = this
    _this.id = this.$route.query.id
    const sid = this.$route.query.sid
    // this.$axios.get('https://weixin.ytzq.com/servlet/json', {
    //   params: { weixinpk: 'gh_9a6fe4a350e3', openid: 'oheoxs-KkM5N2FKVvYolifOeGNwA', funcNo: '1002004', article_id: '204' }
    // }).then(function (res) {
    //   console.log(res.data.dataOut[0])
    //   _this.zx_content = res.data.dataOut[0]
    // }).catch(function (res) {
    //   console.log(res)
    // })
    this.$axios.get('/apiopenjk/getSingleJoke', {
      params: { sid: sid }
    }).then(function (res) {
      console.log(res.data.result)
      _this.newsDetail = res.data.result
      console.log(this.newsDetail)
    }).catch(function (res) {
      console.log(res)
    })
  }
}
</script>
<style scoped>
.tmp1{
    padding-bottom: 60px;
}
.news-title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #024ef3a4;
}
.news-content img{
    display: block;
    margin: 20px auto;
}
.comments{
    text-indent: 3em;
}
</style>
