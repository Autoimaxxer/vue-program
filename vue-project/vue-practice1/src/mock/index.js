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
const demo2 = function () { // 模拟一组图片
  let _data = Mock.mock({
    'list|6': [
      {
        img: '@dataImage(200x100)'
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
const demo4 = function () { // 模拟商品列表数据
  let demoList1 = Mock.mock({
    'list|5-50': [
      {
        img: '@dataImage(100x200)',
        newprice: '@natural(80,100)',
        oldprice: '@natural(500,1000)',
        name: '@cword(3,6)',
        desc: '@cword(20,30)',
        count: '@natural(666,999)'
      }
    ]
  })
  return {
    status: 200,
    message: 'success',
    data: demoList1
  }
}
Mock.mock('/mocktest/photodetail', 'get', demo1)
Mock.mock('/mocktest/photodetailimg', 'get', demo2)
Mock.mock(/\/getcomment/, 'get', res => {
  return demo3(res.url.split('?pageindex=')[1])
})
Mock.mock('/mocktest/goodslist', 'get', demo4)
