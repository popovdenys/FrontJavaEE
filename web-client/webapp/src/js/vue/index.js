import Vue from 'vue'
import ChemAap from './ChemApp.vue'

import { store } from './store'
// import router from './router'

// Development config section
Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  el: '#chema',
  store,
  // router,
  render: r => r(ChemAap)
})

if (module.hot) {
  module.hot.accept('./ChemApp.vue', function () {
    console.log('Accepting the updated from module!')
  })
}
