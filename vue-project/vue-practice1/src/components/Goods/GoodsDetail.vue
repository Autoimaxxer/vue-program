<template>
  <div>
    <nav-bar title="商品详情" />
    <my-swiper url="/mocktest/goodsImgList"></my-swiper>
    <div class="g-desc">
      <ul>
        <li>
          <span>{{goodsInfo.title}}</span>
        </li>
        <li class="g-price-li">
          市场价：
          <s>￥{{goodsInfo.oldprice}}</s>
          销售价：
          <span>￥{{goodsInfo.newprice}}</span>
        </li>
        <li class="g-number">
          购买数量：
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
        </li>
        <li>
          <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isExist"></div>
          </transition>
        </li>
      </ul>
    </div>

    <div class="g-data">
      <ul>
        <li>商品参数</li>
        <li>商品货号：{{goodsInfo.goods_id}}</li>
        <li>库存情况：{{goodsInfo.rest}}件</li>
        <li>上架时间：{{goodsInfo.add_time | covertTime('YYYY-MM-DD')}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isExist: false, // 小球移除
      goodsInfo: {} // 商品详情信息
    }
  },
  methods: {
    insertBall () {
      this.isExist = true
    },
    afterEnter () {
      this.isExist = false // 移除元素
      // xxDOM操作，接着VUE的DOM操作之后
    }
  },
  created () {
    let imgid = this.$route.params.id
    this.$axios.get('/mocktest/goodsInfo' + imgid).then(res => {
      console.log(res.data.data.info)
      this.goodsInfo = res.data.data.info
    }).catch(res => {

    })
  }
}
</script>
<style scoped>
.g-desc,
.g-data {
  margin: 20px auto 0;
  width: 90%;
}
.g-desc ul {
  position: relative;
}
.g-price-li span {
  color: red;
  font-size: 20px;
}
.g-number span {
  display: inline-block;
  width: 15%;
}
.ball {
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 40%;
}
.ball-enter-active {
  animation: bounce-in 1s;
}
.ball-leave {
  /* 元素离开后透明度为0，防止闪烁 */
  /* 元素离开默认是1，会闪烁，需要设置为0 */
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}
</style>
