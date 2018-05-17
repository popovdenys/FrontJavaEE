import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: 1
  },
  mutations: {
    analyze (state) {
      if (this.id === 8) console.log('ok')
    }
  }
})
