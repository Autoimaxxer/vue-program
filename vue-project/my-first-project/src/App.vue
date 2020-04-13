<template>
  <div>
    <mt-header title="我们的项目管理信息" fixed></mt-header>
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/img/tab_i_on.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/img/tab_i_vip.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/img/tab_gwc.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/tab_search.png" />
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
  watch: {
    selected (newV, oldV) {
      console.log(newV)
      this.$router.push({
        name: newV
      })
    }
  }
}
</script>
<style>
</style>
