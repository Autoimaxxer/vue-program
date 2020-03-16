var app = {
    template: `
        <div>我是app组件</div>
    `
};

//声明并导出
export var num1 = 1;//作为一整个对象中的key导出

//声明再导出
var num2 = 2;
export { num2 }

export default app;