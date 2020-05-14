<template>
  <ul>
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'my-ul',
  data () {
    return {}
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
