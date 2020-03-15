//整个程序入口
import Vue from '../../../js/vue.js';
import App from './App.js';

new Vue({
    el:'#app',
    components:{
        app:App
    },
    template:`<app/>`
});