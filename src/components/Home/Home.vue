<template>
  <div>
    <!-- 上有轮播图，下有九宫格 -->
    <my-swiper url="/mocktest/goodsImgList"></my-swiper>
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
            params: { categoryId: 0 } // 默认传0
          }
        },
        {
          className: 'g_icon3',
          title: '商品展示',
          router: {
            name: 'goods.list',
            query: { page: 1 }
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
  }
}
</script>
<style scoped>
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
