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
    job: '前端工程师'
  }

  return {
    status: 200,
    message: 'success',
    data: demoList
  }
}
Mock.mock('/mocktest/photodetail', 'get', demo1)
