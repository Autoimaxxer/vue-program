<template>
  <div>
    <mt-header title="我们的项目管理信息" fixed></mt-header>
    <router-view></router-view>
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
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/img/tab_search.png" />
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    changeHash () {
      // 如果直接调用，那么该调用早于子组件赋值给父组件的selected
    //   console.log(this.selected)
      this.$nextTick(function () {
        // 在vue完成渲染之后才执行
        console.log(this.selected)
        // this.$router.push({
        //   name: this.selected
        // })
      })
    }
  },
  updated () {
    console.log(this.selected)
  },
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
<style>
</style>
