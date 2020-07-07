<template>
  <mt-swipe :auto="2000">
    <mt-swipe-item v-for="(img,index) in imgs" :key="index">
      <img :src="img.img||img.src" />
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: 'my-swiper',
  props: ['url'],
  data () {
    return {
      imgs: [] // 轮播图数据
    }
  },
  created () {
    this.$axios.get(this.url)
      .then(res => {
        console.log(res.data.result)
        if (res.data.result) {
          this.imgs = res.data.result
        } else {
          this.imgs = res.data.data.list
        }
        console.log(this.imgs)
      })
      .catch(err => {
        console.log('轮播图获取异常', err)
      })
  }
}
</script>
<style  scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe img {
  margin: 0 auto;
  display: block;
  height: 100%;
}
</style>
