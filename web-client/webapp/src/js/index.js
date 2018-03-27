/*var log = require('./logs.js')*/
//import log from './logs'
//import * as log from './logs'
//import config from './config'

// import css from './app.css'
// import './app.css'


let [b,,c,d] = [5,6,7,8]

//debugger

document.getElementById( 'btn-login' ).addEventListener( 'click', function ( ) {
    import( 'jquery' ).then( ( module ) => {
        var $ = module.default;
        $( 'body' ).css( 'backgroundColor', '#888' )
    } )
} )

//log.log('Salut : ' + d);

//console.log( config )

/*
import('./test.wasm').then( function ( module ) {
    console.log( module._Z5add38i( -5 ) )
} ).catch( console.log )
*/
console.log( 'Hi, Denys Popov' )
