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
          <span @click="substract">-</span>
          <span>{{pickNum}}</span>
          <span @click="add">+</span>
        </li>
        <li>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="insertBall">加入购物车</mt-button>
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
    <div class="g-info-btn">
      <mt-button @click="showPhotoInfo" plain type="primary" size="large">图文介绍</mt-button>
      <mt-button @click="goodsComment" plain type="danger" size="large">商品评论</mt-button>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus'
import GoodsTools from '@/GoodsTools'
export default {
  data () {
    return {
      isExist: false, // 小球移除
      goodsInfo: {}, // 商品详情信息
      pickNum: 1 // 加入购物车数量
    }
  },
  methods: {
    add () {
      if (this.goodsInfo.rest <= this.pickNum) {
        return
      }
      this.pickNum++
    },
    substract () {
      if (this.pickNum <= 1) {
        return
      }
      this.pickNum--
    },
    insertBall () {
      this.isExist = true
    },
    afterEnter () {
      // xxDOM操作，接着VUE的DOM操作之后
      this.isExist = false // 移除元素

      // 通知APP组件增加数量
      EventBus.$emit('addShopcart', this.pickNum)

      // 添加到本地存储
      GoodsTools.add({
        id: this.goodsInfo.goods_id,
        num: this.pickNum
      })
    },

    // 图文介绍
    showPhotoInfo () {
      // 编程导航
      this.$router.push({
        name: 'photo.info',
        querr: {
          id: this.$route.params.id
        }
      })
    },
    // 显示商品评论
    goodsComment () {
      // 编程导航 goods.comment -> 使用评论子组件
      // 需要商品的id
      this.$router.push({
        name: 'goods.comment',
        querr: {
          id: this.$route.params.id
        }
      })
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
