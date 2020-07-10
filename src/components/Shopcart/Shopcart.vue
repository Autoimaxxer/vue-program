<template>
  <div>
    <nav-bar title="购物车"></nav-bar>
    <div class="pay-box">
      <ul>
        <li class="p-list" v-for="(goods,index) in shopcart" :key="goods.id">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.image" alt />
          <div class="p-detail">
            <p>{{goods.title}}</p>
            <div class="p-handle">
              <span>￥{{goods.price}}</span>
              <span @click="substract(goods)">-</span>
              <span>{{goods.num}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="g-all">
        <p>总计（不含运费）：</p>
        <div>
          已经选择商品{{payment.count}}件，总价￥{{payment.price}}元
          <mt-button type="danger" size="small">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsTools from '@/GoodsTools'

export default {
  // 导航离开该组件的对应路由调用
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      // 保存当前的剩余购物车数据
      let obj = {}
      this.shopcart.forEach(goods => {
        obj[goods.g_id] = goods.num
      })
      GoodsTools.saveGoods(obj)
      next()
    } else {
      next(false) // 取消导航行为
    }
  },

  // 计算属性
  computed: {
    payment () {
      let price = 0
      let count = 0
      this.shopcart.forEach(goods => {
        if (goods.isSelected) {
          count += goods.num
          price += goods.num * goods.price
        }
      })
      return {
        count, price
      }
    }
  },
  data () {
    return {
      msg: 'Shopcart',
      shopcart: []
    }
  },
  created () {
    let goodsList = GoodsTools.getGoodsList()
    let count = Object.keys(goodsList).length
    this.$axios.get('/mocktest/getshopcarlist?count=' + count).then(res => {
      // 给this.shopcart添加属性，丰富好对象的值，最后再一次性赋值
      // res.data.data.list.forEach((goods, i) => {
      //   // 判断是否有该商品(模拟数据不执行这块)
      //   // if (goodsList[goods.id]) {
      //   //   goods.num = goodsList[goods.id]
      //   // }

      //   // 模拟数据
      //   goods.num = Object.values(goodsList)[i]
      //   goods.g_id = Object.keys(goodsList)[i]

      //   // 不管有无，都需打勾
      //   goods.isSelected = true
      // })

      // this.shopcart = res.data.data.list
      /* Object.defineProperty(this, 'shopcart', {
        set: function (resData) {
            // 遍历resData的所有属性，并为Shopcart的元素逐个添加这些属性，并设置其set
            // 遍历并监视其所有属性的set
        }
      }) */
      // 在上面这个操作之后再给Shopcart加属性无效

      // 如果一定是在数据不完整的情况下添加属性，就需要手动通知vue完成响应式 -> 双向数据绑定
      this.shopcart = res.data.data.list
      this.shopcart.forEach((goods, i) => {
        // 判断是否有该商品(模拟数据不执行这块)
        // if (goodsList[goods.id]) {
        //   goods.num = goodsList[goods.id]
        // }

        // 模拟数据
        // goods.num = Object.values(goodsList)[i]
        this.$set(goods, 'num', Object.values(goodsList)[i])
        this.$set(goods, 'g_id', Object.keys(goodsList)[i])
        // 不管有无，都需打勾
        // goods.isSelected = true
        this.$set(goods, 'isSelected', true)
      })
    }).catch(res => {
      console.log('购物车数据异常')
    })
  },
  methods: {
    add (goods) {
      goods.num++
    },
    substract (goods) {
      goods.num--
    },
    del (index) {
      this.shopcart.splice(index, 1)
    }
  }
}
</script>
<style  scoped>
.p-handle {
  display: flex;
}
.p-handle span:nth-child(2),
.p-handle span:nth-child(4) {
  border: 1px solid #000;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  margin: 0 5px;
}
.g-all {
  margin-top: 20px;
  background: #999;
}
</style>
