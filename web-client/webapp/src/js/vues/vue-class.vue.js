// maybe add axios/axios
import Vue from 'vue'
Vue.config.devtools = true
console.log('fp')
/*
export default class App extends Vue.Component {
    render() {
    }
}
*/
export default function () {
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
    })

    var App = new Vue({
        el: '#app-7',
        data: {
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ]
        }
    })

    App()
}
