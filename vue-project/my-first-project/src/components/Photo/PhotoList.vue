<template>
    <div class="tmp1">
    <nav-bar title="图文列表" />
    <div class="photo-list">

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {name: '要闻', ext: 'news'},
        {name: '游戏', ext: 'games'},
        {name: '金融', ext: 'finance'},
        {name: '娱乐', ext: 'ent'},
        {name: '汽车', ext: 'auto'},
        {name: '教育', ext: 'edu'},
        {name: '文化', ext: 'cul'},
        {name: '游戏', ext: 'games'},
        {name: '游戏', ext: 'games'}
      ]
    }
  },
  created () {
    // 1、获取路由参数categoryId
    // 2、通过url拼接参数发送请求
    // 3、获取数据并渲染
    let _this = this
    let categoryId = Number(_this.$route.params.categoryId)
    _this.$axios.get('/txopenjk/irs/rcd', { params: {
      cid: 56,
      ext: _this.list[categoryId].ext,
      token: 'c786875b8e04da17b24ea5e332745e0f',
      num: 20,
      expIds: '20190106A13PFT%7C20190108A04MLS',
      page: 0
    }}).then(res => {
      console.log(res)
    }).catch(res => {

    })
  }
}
</script>
<style scoped>

</style>
