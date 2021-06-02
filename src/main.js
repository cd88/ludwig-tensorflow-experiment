import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VuePapaParse from 'vue-papa-parse'

Vue.config.productionTip = false

Vue.use(VuePapaParse)
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
