<template>
  <div class="navbar-header">
    <h1 @click="goback">&lt;</h1>
    <h1 class="page-title">{{title}}</h1>
  </div>
</template>
<script>
export default {
  name: 'nav-bar',
  props: ['title'],
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style  scoped>
.navbar-header {
  padding-top: 40px;
  height: 40px;
  background-color: #f7f7f7;
}
.page-title {
  margin-left: 25%;
}
h1 {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
</style>
