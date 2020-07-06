<template>
  <div>
    <nav-bar title="商品展示" />
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <a>
          <img :src="item.img" alt />
          <div class="title">{{item.name}}</div>
          <div class="desc">
            <div class="sell">
              <span>￥{{item.newprice}}</span>
              <s>￥{{item.oldprice}}</s>
            </div>
            <div class="detail">
              <div class="hot">热卖中</div>
              <div class="count">剩余{{item.count}}件</div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$axios.get('/mocktest/goodslist').then(res => {
      console.log(res.data.data)
      this.list = res.data.data.list
    }).catch(res => {

    })
  },
  methods: {

  }
}
</script>
<style scoped>
ul,
.detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
ul li {
  margin-top: 10px;
  margin-left: 1%;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 47%;
}
ul li img {
  width: 100%;
}
ul li:nth-child(even) {
  margin-left: 0;
  margin-right: 1%;
}
.desc {
  background: #ccc;
}
.title {
  text-align: center;
}
.sell span {
  color: red;
}
</style>
