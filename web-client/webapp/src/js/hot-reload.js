import('./test.wasm').then(function (module) {
    console.log(module)
}).catch(console.log)

export default function printMe () {
    console.log('knok, knok...')
    console.log('Now it\'s on fly')
}
