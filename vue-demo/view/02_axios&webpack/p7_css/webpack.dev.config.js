module.exports = {
    //入口
    entry: {
        //可以有多个入口，也可以有一个，如果是一个，就默认从这个入口开始分析
        'main': './main.js'
    },
    //输出
    output: {
        filename: './build.js'
    },

    //声明模块
    //包含各个loader
    module: {
        loaders: [//webpack后面版本可以叫做roles
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test:/\.(jpg|png|gif|svg)$/,loader:'url-loader?limit=4096'}
            //如果文件大于limit，则生成一个文件
            //如果小于limit，则生产base64到build.js中
            //建议比较小的图片，使用base64的方式
        ]
    },

    watch: true,//监视文件改动，自动打包
}