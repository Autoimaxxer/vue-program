module.exports={
    //入口
    entry:{
        //可以有多个入口，也可以有一个，如果是一个，就默认从这个入口开始分析
        'main':'./main.js'
    },
    //输出
    output:{
        filename:'./build.js'
    },
    watch: true,//监视文件改动，自动打包
}