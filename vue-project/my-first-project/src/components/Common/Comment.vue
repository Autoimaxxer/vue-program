<template>
  <div>
    <div class="c-head">
      <span>提交评论</span>
      <span>返回</span>
    </div>
    <textarea name id></textarea>
    <div class="c-btn-box">
      <mt-button size="large" type="primary">发表评论</mt-button>
      <mt-button size="large" type="danger" plain>加载更多</mt-button>
    </div>
    <ul class="comment-list">
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: ['cid'], // 评论需要的id
  data () {
    return {}
  },
  created () {
    // 使用此组件，判断是否有页码，无则默认为第1页，有则根据页码拉取不同数据
    let id = this.$route.query.page || '1'
    this.$axios.get(`/mocktest/getcomment/${this.cid}?pageindex=${id}`)
      .then(res => { console.log(res) })
      .catch(res => { console.log('评论获取失败') })
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
</style>
