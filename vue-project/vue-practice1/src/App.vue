<template>
  <div>
    <mt-header title="我们的项目管理信息" fixed></mt-header>
    <transition name="rv" mode="out-in">
      <router-view class="temp1"></router-view>
    </transition>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img @click="changeHash" slot="icon" src="./assets/img/tab_i_on.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img @click="changeHash" slot="icon" src="./assets/img/tab_i_vip.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click="changeHash" slot="icon" src="./assets/img/tab_gwc.png" />
        购物车
        <mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/img/tab_search.png" />
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import EventBus from './EventBus.js'
import GoodsTools from './GoodsTools.js'
export default {
  data () {
    return {
      selected: '',
      num: 0
    }
  },
  created () {
    // 初始化小球数量
    this.num = GoodsTools.getTotalCount()

    EventBus.$on('addShopcart', data => {
      console.log(data)
      this.num += data
    })
  },
  methods: {
    changeHash () {
      var _that = this
      // 如果直接调用，那么该调用早于子组件赋值给父组件的selected
      //  console.log(this.selected)
      this.$nextTick(function () {
        // 在vue完成渲染之后才执行(一般是不需要加定时器也可以执行，但在调试时有时候不起效果，故加上定时器)
        setTimeout(function () {
          _that.$router.push({
            name: _that.selected
          })
        }, 0)
      })
    }
  },
  //   updated () {
  //     console.log(this.selected)
  //   },
  watch: {
    // selected (newV, oldV) {
    //   console.log(newV)
    //   this.$router.push({
    //     name: newV
    //   })
    // }
  }
}
</script>
<style scoped>
.rv-enter-active,
.rv-leave-active {
  transition: opacity 0.5s;
}
.rv-enter,
.rv-leave-to {
  opacity: 0;
}
</style>
