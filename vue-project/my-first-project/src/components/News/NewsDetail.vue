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
  }
}
</script>
<style scoped>
</style>
