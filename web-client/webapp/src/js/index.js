'use strict'
// var log = require('./logs.js')
// import log from './logs'
// import css from '../styles/sass/app.scss'
import config from './config'

import * as log from './logs'
import img from '@images/joli.jpg'
import printMe from './hot-reload.js'

console.log(img)

// import './app.scss'

// console.log(css)

let [b, , c, d, x] = [5, 6, 7, 8, 9]

// debugger

console.log(x + b + c)

log.log('Salut 10 : ' + d)

console.log(config)

console.log('Hi, Master Sky Denys Popov!')

document.getElementById('btn-login').addEventListener('click', function () {
    import('jquery').then((module) => {
        var $ = module.default
        $('body').css('backgroundColor', '#888')
    })
})

/*
import('./test.wasm').then( function ( module ) {
    console.log( module._Z5add38i( -5 ) )
} ).catch( console.log )
*/

if (module.hot) {
    module.hot.accept('./hot-reload.js', function () {
        console.log('Accepting the updated printMe module!')
        printMe()
    })
}
