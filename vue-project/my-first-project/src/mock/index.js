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
    text: Random.paragraph(5)
  }

  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
const demo2 = { // 模拟一组图片
  'data': [
    {
      'img': Random.dataImage('200x100')
    },
    {
      'img': Random.dataImage('200x100')
    },
    {
      'img': Random.dataImage('200x100')
    },
    {
      'img': Random.dataImage('200x100')
    },
    {
      'img': Random.dataImage('200x100')
    },
    {
      'img': Random.dataImage('200x100')
    }
  ]
}

const demo3 = function (pageindex) { // 模拟评论数据
  let demoList = [
    {
      name: Random.cname(),
      text: '我是第' + pageindex + '页的评论',
      date: '2020-06-06'
    }, {
      name: Random.cname(),
      text: '我是第' + pageindex + '页的评论',
      date: '2020-06-06'
    }, {
      name: Random.cname(),
      text: '我是第' + pageindex + '页的评论',
      date: '2020-06-06'
    }, {
      name: Random.cname(),
      text: '我是第' + pageindex + '页的评论',
      date: '2020-06-06'
    }
  ]

  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}

Mock.mock('/mocktest/photodetail', 'get', demo1)
Mock.mock('/mocktest/photodetailimg', 'get', demo2)
Mock.mock(/\/getcomment/, 'get', res => {
  console.log(res.url.split('?pageindex=')[1])
  return demo3(res.url.split('?pageindex=')[1])
})
