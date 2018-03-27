const HTMLPlugin = require( 'html-webpack-plugin' )
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require( 'path' )
const UglifyJS = require( 'uglifyjs-webpack-plugin' )
const production = process.env.NODE_ENV === "production"

let config = {
    /*watch : !production,*/
    entry : './src/js/index.js'
    , devtool: production ? "source-map" : "cheap-module-eval-source-map"
, output : {
        filename : 'app.js'
        , path : path.resolve( __dirname, 'build/assets' )
        /*, publicPath: 'build/assets/'*/
    }
    , module: {
        rules: [ {
            // BABEL LOADER
            test : /\.js$/
            , exclude: /(node_modules|bower_components)/
            , use : [ 'babel-loader?cacheDirectory=false' ]
        }
        , {
            // CSS LOADER
            test : /\.css$/
            , use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }]
    }
    , plugins: [
        new HTMLPlugin( )
        , new ExtractTextPlugin( "app.css" )
    ]
}

if ( production ) {
    config.plugins.push( new UglifyJS( {
        sourceMap : true
    } ) )
}

module.exports = config