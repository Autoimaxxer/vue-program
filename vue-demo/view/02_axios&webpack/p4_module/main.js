//整个程序入口
import Vue from '../../../js/vue.js';

// import App from './App.js';
// import { num1, num2 } from './App.js';
// console.log(num1, num2);

import * as obj from './App.js';
console.log(obj.num1);
console.log(obj.num2);

new Vue({
    el: '#app',
    components: {
        // app: App
        app: obj.default
    },
    template: `<app/>`
});