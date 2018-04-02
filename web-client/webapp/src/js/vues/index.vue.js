import vuejs from '@vue/vue-class.vue'

if (module.hot) {
    module.hot.accept('@vue/vue-class.vue.js', function () {
        console.log('Accepting the updated from vue.js module!')
        vuejs()
    })
}
