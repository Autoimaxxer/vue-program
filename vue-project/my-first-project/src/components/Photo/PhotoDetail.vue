<template>
  <div>
    <nav-bar title="图文详情" />
    <p>{{newsDtail.title}}</p>
    <p>以下为内嵌页面</p>
    <iframe :src="newsDtail.url" frameborder="0"></iframe>
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
      newsDtail: ''
    }
  },
  created () {
    let _this = this
    let rId = _this.$route.query.r_id
    let _id = _this.$route.query.id
    this.$axios.get('/txopenjk/irs/rcd', {
      params: {
        cid: 56,
        ext: _this.list[rId].ext,
        token: 'c786875b8e04da17b24ea5e332745e0f',
        num: 20,
        expIds: '20190106A13PFT%7C20190108A04MLS',
        page: 0
      }
    }).then(res => {
      // console.log(res)
      let _data = res.data.data
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].id === _id) {
          _this.newsDtail = _data[i]
        }
      }
      console.log(_this.newsDtail)
    }).catch(res => {

    })
  }
}
</script>
<style scoped>
iframe {
  width: 100%;
  height: 500px;
}
</style>
