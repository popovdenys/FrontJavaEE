console.log('merde')

const webpack = require('webpack');
const path = require( 'path' )
const middleware = require('webpack-dev-middleware');
//const compiler = webpack({ .. webpack options .. });
const express = require('express');
const app = express();

app.use(middleware({}, {
    index : path.resolve( __dirname, './index.html' )
}));

app.listen(3000, () => console.log('Example app listening on port 3000!'))