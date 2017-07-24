// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import routers from './router'
import base64url from "base64url"

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.prototype.HOST = 'http://xsx.jyeg.com'
// Vue.prototype.HOST = 'http://dg.jyeg.net:92'
// Vue.prototype.HOST = '/api'
// 获取时间差
function time_difference () {
  return (Date.parse(new Date())) / 1000;
}

Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;

Vue.http.interceptors.push(function(request, next) {
  let access_token = localStorage.getItem("access_token");
  // modify metho

  if (access_token && access_token != '' &&  access_token != null) {
 
    let Intercept = access_token.split('.')[1];
    let timexp = JSON.parse(base64url.decode(Intercept));
    let timesExp = timexp.exp;
    let time_rub = time_difference();

    if ( time_rub > timesExp ) {
      
       router.replace({
          path: 'login',
      })
     localStorage.removeItem("access_token");
    } else {
     next(); 
    }
  }else {
    next();
  }
});

const router = new VueRouter({
  mode: 'history',
  // base: '__dirname',
  // base: '/dg/',
  routes: routers
});

router.beforeEach((to,from,next) => {
  let access_token = localStorage.getItem("access_token");
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
 
    if ( !access_token || access_token == '' ) {
      next({
          path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})