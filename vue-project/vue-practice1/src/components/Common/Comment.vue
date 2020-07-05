<template>
  <div>
    <div class="c-head">
      <span>提交评论</span>
      <span>返回</span>
    </div>
    <textarea name id></textarea>
    <div class="c-btn-box">
      <mt-button size="large" type="primary">发表评论</mt-button>
      <br />
      <div class="c-flex">
        <span>评论列表</span>
        <span>{{allMsgs.length}}条评论</span>
      </div>
      <ul class="comment-list">
        <li v-for="(msg,index) in msgs" :key="index">
          {{msg.name}}：{{msg.text}}
          <span class="c-time">{{msg.date| relativeTime}}</span>
        </li>
      </ul>
      <mt-button size="large" type="danger" plain @click="loadMore">{{text}}{{this.page }}</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: ['cid'], // 评论需要的id
  data () {
    return {
      page: 1, // 组件内控制页码
      allMsgs: [],
      msgs: [],
      text: '加载更多'
    }
  },
  created () {
    // 使用此组件，判断是否有页码，无则默认为第1页，有则根据页码拉取不同数据
    this.page = this.$route.query.page || '1'
    this.loadFirst(1)
  },
  methods: {
    loadFirst () {
      this.$axios.get(`/mocktest/getcomment/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          console.log(res.data.data.list)
          if (res.data.data.list.length === 0) {
            this.$toast('暂无数据')
            this.text = '暂无数据'
          } else {
            this.allMsgs = res.data.data.list
            this.msgs = this.allMsgs.slice(0, 5 * this.page)
          }
        }).catch(res => {
          console.log('评论获取失败')
        })
    },
    // 根据页码发请求
    loadMore () {
      if (this.allMsgs.length === 0) {
        this.$toast('暂无数据')
      } else {
        this.page++ // 页码
        this.msgs = this.allMsgs.slice(0, 5 * this.page)
        if (this.msgs.length === this.allMsgs.length) {
          this.text = '加载完毕'
          this.$toast('没有数据了')
          this.page--
        }
      }
    }
  }
}
</script>
<style scoped>
.c-head {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
}
textarea {
  width: 90%;
  outline: none;
  display: block;
  margin: 0 auto;
}
.c-btn-box {
  width: 90%;
  margin: 0 auto;
}
.c-flex {
  display: flex;
  justify-content: space-between;
}
.comment-list {
  margin: 10px 0;
}
.comment-list li {
  margin-top: 5px;
}
.c-time {
  float: right;
}
</style>
