//引入css
// import CssObj from './main.css';
import './main.css';


import Vue from '../../../js/vue.js';
import App from './App.js';

new Vue({
    el:'#app',
    components: {
        app:App
    },
    template:`<app/>`
})