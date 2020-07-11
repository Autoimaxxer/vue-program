<template>
  <div>
    <nav-bar title="商品展示" />
    <div class="c-div" :style="{height:wrapperHeight+'px'}">
      <mt-loadmore
        :auto-fill="false"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <router-link :to="{name:'goods.detail',params:{id:index}}">
              <img :src="item.img" alt />
              <div class="title">{{item.name | covertStr(18)}}</div>
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
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>

// 本地静态资源图片，需要告知到webpack，帮助移动到未来的dist目录
// import ImgSrc from '../xxx.png'
// <img :src='ImgSrc' />

export default {
  props: ['apprefs'],
  data () {
    return {
      wrapperHeight: '',
      allLoaded: false, // 全部数据是否加载完毕
      list: [],
      page: 1 // 页码
    }
  },
  mounted () {
    // 装载数据完毕，接收参数
    this.wrapperHeight = document.documentElement.clientHeight - this.apprefs.appHeader.$el.offsetHeight - this.apprefs.appFooter.$el.offsetHeight
  },
  created () {
    this.loadByPage(this.page)
  },
  methods: {
    loadByPage () {
      this.$axios.get('/mocktest/goodslist?pageindex=' + this.page).then(res => {
        this.list = res.data.data.list
        this.page++
      }).catch(res => {
        console.log('商品获取失败')
      })
    },
    addByPage () {
      this.$axios.get('/mocktest/goodslist?pageindex=' + this.page).then(res => {
        // 判断是否有数据
        if (res.data.data.list.length === 0) {
          this.$toast('没有更多数据了')
          // loademore的禁止调用属性来控制
          this.allLoaded = true
        }
        this.list = this.list.concat(res.data.data.list)
        this.page++
        this.$refs.loadmore.onBottomLoaded() // 通知元素重新定位
      }).catch(res => {
        console.log('商品获取失败')
      })
    },
    loadBottom () {
      console.log('上拉加载执行')
      this.addByPage(this.page)
    }
  }
}
</script>
<style scoped>
.c-div {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
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
.sell span {
  color: red;
}
</style>
