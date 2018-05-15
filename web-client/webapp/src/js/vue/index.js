import Vue from 'vue'
import ChemAap from '@vue/ChemApp.vue'
// import router from './router'

// Development config section
Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  el: '#chema',
  // router,
  render: r => r(ChemAap)
})

if (module.hot) {
  module.hot.accept('@vue/ChemApp.vue', function () {
    console.log('Accepting the updated from module!')
  })
}
