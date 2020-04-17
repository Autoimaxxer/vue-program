<template>
  <div class="tmp1">
    <nav-bar title="新闻详情" />
    <div class="demo">
        点击第{{id+1}}个新闻
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: ''
    }
  },
  created () {
    // 这里获取地址栏参数是 route，不是router
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.$axios.get('https://weixin.ytzq.com/servlet/json', {
      params: { weixinpk: 'gh_9a6fe4a350e3', openid: 'oheoxs-KkM5N2FKVvYolifOeGNwA', funcNo: '5001009' }
    }).then(function (res) {
      console.log(res)
    }).catch(function (res) {
      console.log(res)
    })
  }
}
</script>
<style scoped>
</style>
