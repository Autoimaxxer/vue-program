<template>
  <div class>
    <nav-bar title="图文详情" />
    <p>{{newsDtail.title}}</p>
    <button @click="testMock(1)">点击切换随机颜色图片</button>
    <img :src="mockTest.img" alt />
    <p>
      <span>点击次数</span>
      <span>{{mockTest.click}}</span>
    </p>
    <p>
      <span>日期</span>
      <span>{{new Date()| covertTime('YYYY-MM-DD')}}</span>
    </p>
    <p>{{mockTest.text}}</p>
    <div class="imglist">
      <!-- <img v-for="(img,index) in mockImg" :key="index" :src="img.img" alt /> -->
      <vue-preview :slides="mockImg"></vue-preview>
    </div>
    <!-- <p>以下为内嵌页面</p>
    <iframe :src="newsDtail.url" frameborder="0"></iframe>-->

    <!-- 使用评论组件 -->
    <comment :cid="$route.query.id"></comment>
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
      newsDtail: '',
      mockTest: {
        img: '',
        click: ''
      },
      mockImg: []
    }
  },
  methods: {
    testMock (type) {
      this.$axios.get('/mocktest/photodetail').then(res => {
        let _data = res.data.data
        this.mockTest.img = _data.img
        if (type === 1) {
          this.mockTest.click++
        } else {
          this.mockTest.text = _data.text
          this.mockTest.click = _data.click
        }
      }).catch(res => {

      })
    }
  },
  created () {
    let title = encodeURIComponent(this.$route.query.title)
    let id = this.$route.query.id
    this.testMock(0)
    this.$axios.get('/mocktest/photodetailimg', {
      data: {
        title, id
      }
    }).then(res => {
      console.log(res)
      this.mockImg = res.data.data.list
      this.mockImg.forEach(
        (img, index) => {
          img.msrc = img.img
          img.src = img.img
          img.title = index + 1
          img.w = 400
          img.h = 200
        }
      )
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
