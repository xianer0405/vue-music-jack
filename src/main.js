import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('common/images/default.png')
})

require('common/stylus/index')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
