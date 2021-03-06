// 首先引入Mock
const Mock = require('mockjs')
const Random = Mock.Random
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})

let configArray = []

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/)
files.keys().forEach((key) => {
  if (key === './index.js') return
  configArray = configArray.concat(files(key).default)
})

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split('|')
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target)
  }
})
const newslist = function () { // 模拟新闻列表
  let demoList = Mock.mock({
    'list|10': [
      {
        img: '@dataImage(100x200,新闻列表)',
        title: '@cword(10,20)',
        time: '@datetime()'
      }
    ]
  })
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const photolist = function (title) { // 模拟图文列表
  let demoList = Mock.mock({
    'list|10': [
      {
        img: '@dataImage(100x100,' + title + ')',
        title: '@cword(15,25)',
        source: '@cword(4)',
        time: '@datetime()'
      }
    ]
  })
  if (title === '推荐' || title === '娱乐') {
    demoList = { list: [] }
  }
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo1 = function () { // 模拟图文详情数据
  let demoList = {
    click: parseInt(Math.random() * 10 + 20),
    img: Random.dataImage('200x100', 'Hello Mock.js!'),
    text: Random.cword(100)
  }

  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo2 = function (title, id) { // 模拟一组图片
  console.log(title)
  console.log(id)
  let _data = Mock.mock({
    'list|6': [
      {
        img: '@dataImage(200x100,' + title + id + ')'
      }
    ]
  })
  return {
    status: 200,
    message: 'success',
    data: _data
  }
}

const demo3 = function (pageindex) { // 模拟评论数据
  let demoList1 = Mock.mock({
    'list|0-50': [
      {
        name: '@cname',
        // text: '@cword(20)' + '第' + pageindex + '页',
        text: '@cword(20,30)',
        date: '@now(day)'
      }
    ]
  })
  return {
    status: 200,
    message: 'success',
    data: demoList1
  }
}
const demo4 = function (page) { // 模拟商品列表数据
  let demoList = Mock.mock({
    'list|5-50': [
      {
        img: '@dataImage(100x200)',
        newprice: '@natural(80,100)',
        oldprice: '@natural(500,1000)',
        name: '@cword(15,25)',
        desc: '@cword(20,30)',
        count: '@natural(666,999)'
      }
    ]
  })
  if (Number(page) >= 3) {
    demoList = { list: [] }
  }
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo5 = function () { // 模拟商品详情轮播图
  let demoList = Mock.mock({
    'list|5': [
      {
        img: '@dataImage(100x200)'
      }
    ]
  })
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo6 = function () { // 模拟商品详情信息
  let demoList = Mock.mock({
    'info': {
      title: '@cword(20,30)',
      click: '@natural(3,30)',
      add_time: '@datetime()',
      content: '@cword(30.50)',
      newprice: '@natural(80,100)',
      oldprice: '@natural(500,1000)',
      rest: '@natural(5,100)',
      goods_id: '@string(upper,3)' + '@natural(11111,99999)'
    }

  })
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo7 = function () { // 模拟商品图文介绍信息
  let demoList = Mock.mock({
    'info': {
      type: '@cword(5)',
      name: '@cword(10)',
      top_comments_name: '@cword(3,8)',
      top_comments_content: '@cword(10,30)',
      passtime: '@datetime()',
      images: '@dataImage(100x200)'
    }

  })
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo8 = function (count) { // 模拟购物车数据
  let demoList = Mock.mock({
    'list|100': [
      {
        type: '@cword(5)',
        price: '@natural(200,500)',
        title: '@cword(3,8)',
        image: '@dataImage(100x200)'
      }
    ]
  })
  demoList = { list: demoList.list.slice(0, count) }
  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
Mock.mock(/\/newslist/, 'get', newslist)
Mock.mock(/\/photolist/, 'get', res => {
  return photolist(res.url.split('?title=')[1])
})
Mock.mock('/mocktest/photodetail', 'get', demo1)
Mock.mock(/\/photodetailimg/, 'get', res => {
  return demo2(decodeURIComponent(JSON.parse(res.body).title), JSON.parse(res.body).id)
})
Mock.mock(/\/getcomment/, 'get', res => {
  return demo3(res.url.split('?pageindex=')[1])
})
Mock.mock(/\/goodslist/, 'get', res => {
  return demo4(res.url.split('?pageindex=')[1])
})
Mock.mock(/\/goodsImgList/, 'get', demo5)
Mock.mock(/\/goodsInfo/, 'get', demo6)
Mock.mock(/\/photoInfo/, 'get', demo7)
Mock.mock(/\/getshopcarlist/, 'get', res => {
  return demo8(res.url.split('?count=')[1])
})
