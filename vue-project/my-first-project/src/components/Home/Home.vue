<template>
  <div>
    <!-- 上有轮播图，下有九宫格 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img :src="img.img" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
            <span :class="grid.className"></span>
            <div>{{grid.title}}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Home',
      imgs: [], // 轮播图数据
      grids: [
        {
          className: 'g_icon1',
          title: '新闻资讯',
          router: {
            name: 'news.list'
          }
        },
        {
          className: 'g_icon2',
          title: '图文分享',
          router: {
            name: 'photo.list',
            params: {categoryId: 0} // 默认传0
          }
        },
        {
          className: 'g_icon3',
          title: '商品展示',
          router: {
            name: 'news.list'
          }
        },
        {
          className: 'g_icon4',
          title: '留言反馈',
          router: {
            name: 'news.list'
          }
        },
        {
          className: 'g_icon5',
          title: '搜索资讯',
          router: {
            name: 'news.list'
          }
        },
        {
          className: 'g_icon6',
          title: '联系我们',
          router: {
            name: 'news.list'
          }
        }
      ]
    }
  },
  // created创建组件的生命周期函数中，可以操作数据
  created () {
    //   this.$axios.get('/doubanjk/v2/movie/top250?start=0&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a')
    //     .then(res => {
    //       // res.data.message=[{img:'图片地址'}]
    //       this.imgs = res.data.subjects
    //       console.log(res.data.subjects)
    //     })
    //     .catch(err => {
    //       console.log('轮播图获取异常', err)
    //     })
    // }
    this.$axios.post('/ytzqtydjk/middleware/api/login/getTestInfo.json', {yddh: '13699850234'})
      .then(res => {
        console.log(res.data.results[0])
        window.localStorage.setItem('tydInfo', JSON.stringify(res.data.results[0]))
      })
      .catch(err => {
        console.log('获取泰易达登录信息异常', err)
      })
    this.$axios.post('/apiopenjk/getImages?page=0&count=5')
      .then(res => {
        console.log(res.data.result)
        this.imgs = res.data.result
      })
      .catch(err => {
        console.log('轮播图获取异常', err)
      })
  }

}
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe img {
  margin: 0 auto;
  display: block;
  height: 100%;
}
/* 相当于全局（需要在上面的style标签加上scoped） */
div {
  /* background: red; */
  background: inherit;
}
/* 九宫格样式 */
.grid li {
  text-align: center;
  list-style: none;
  width: 33.3%;
  height: 100px;
}
.grid li span {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-size: 50px 50px;
}
.grid li span.g_icon1 {
  background-image: url(../../assets/img/g_icon1.png);
}
.grid li span.g_icon2 {
  background-image: url(../../assets/img/g_icon2.png);
}
.grid li span.g_icon3 {
  background-image: url(../../assets/img/g_icon3.png);
}
.grid li span.g_icon4 {
  background-image: url(../../assets/img/g_icon4.png);
}
.grid li span.g_icon5 {
  background-image: url(../../assets/img/g_icon5.png);
}
.grid li span.g_icon6 {
  background-image: url(../../assets/img/g_icon6.png);
}
a {
  text-decoration: none;
  color: #222;
}
</style>
