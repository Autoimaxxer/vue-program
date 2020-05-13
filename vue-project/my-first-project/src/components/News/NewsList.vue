<template>
  <div class="tmp1">
    <nav-bar title="段子列表" />
    <div class="demo">
      <ul>
        <li v-for="(news,index) in newsList"
            :key="index">
          <router-link :to="{name:'news.detail',query:{'id':index,'sid':news.sid}}" class="news-link">
            <img class="news-img"
                 :src="news.images==null? news.thumbnail : news.images" />
            <div>
              <span>{{news.text}}</span>
              <div class="news-dec">
                <p>{{news.passtime | covertTime('YYYY-MM-DD')}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newsList: [] // 新闻列表
    }
  },
  created () {
    // console.log(JSON.parse(window.localStorage.getItem('tydInfo')))
    this.$axios
    //   .get('/apiopenjk/getWangYiNews')
      .post('/apiopenjk/getJoke?type=gif&count=10',
        {params: {type: 'gif', //  type可选参数(all/video/image/gif/text)
          page: 1, // page页码(传0或者不传会随机推荐)
          count: 20}})// count每页返回数量
      .then(res => {
        this.newsList = res.data.result
        console.log(this.newsList)
      })
      .catch(res => {
        console.log('新闻列表异常')
      })
  }
}
</script>
<style scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul {
  height: 100%;
  overflow-y: scroll;
  padding: 0 0 60px;
}
li {
  margin-top: 5px;
}
.news-link {
  display: flex;
  justify-content: space-around;
  text-decoration: none;
}
.news-img {
  flex: 0.15;
  width: 50%;
}
</style>
