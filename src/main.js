// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'lib-flexible/flexible'
// ***element-ui
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

//***axios 
import axios from 'axios'
const host = process.env.NODE_ENV === 'development' ? '/' : 'http://ccsserve.qilinpz.com' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host
})
Vue.prototype.$http = instance;

// ***剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import App from './App'
import router from './router'

Vue.config.productionTip = false
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

// 全局
Vue.prototype.name = "";
Vue.prototype.setname=function (e) { 
  Vue.prototype.name = e;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
