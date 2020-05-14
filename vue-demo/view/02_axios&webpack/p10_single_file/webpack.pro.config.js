const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    //入口
    entry: {
        //可以有多个入口，也可以有一个，如果是一个，就默认从这个入口开始分析
        'main': './src/main.js'
    },
    //输出
    output: {
        //指定产出的目录
        path: path.resolve('./dist'),//相对转绝对
        filename: 'build.js'
    },

    //声明模块
    //包含各个loader
    module: {
        loaders: [//webpack后面版本可以叫做roles
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(jpg|png|gif|svg)$/, loader: 'url-loader?limit=4096' },
            //如果文件大于limit，则生成一个文件
            //如果小于limit，则生产base64到build.js中
            //建议比较小的图片，使用base64的方式
            {test:/\.less$/,loader:'style-loader!css-loader!less-loader'}
        ]
    },
    plugins:[
        //插件的执行顺序与元素索引有关
        new HtmlWebpackPlugin({
            template:'./src/index.html',//参照物
        })
    ]
}