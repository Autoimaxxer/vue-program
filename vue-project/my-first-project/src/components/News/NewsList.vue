<template>
  <div class="tmp1">
    <nav-bar title="新闻列表" />
    <div class="demo">
      <ul>
        <li v-for="(news,index) in newsList"
            :key="index">
          <router-link :to="{name:'news.detail',query:{'id':index}}" class="news-link">
            <img class="news-img"
                 :src="news.image" />
            <div>
              <span>{{news.title}}</span>
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
      .get('/apiopenjk/getWangYiNews')
      .then(res => {
        this.newsList = res.data.result
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
}
</style>
