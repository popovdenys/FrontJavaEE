var CleanWebpackPlugin = require( 'clean-webpack-plugin' );
var webpack = require( 'webpack' );
var path = require( 'path' );
var glob = require( 'glob' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var PurifyCSSPlugin = require( 'purifycss-webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

var isProduction = ( process.env.NODE_ENV === 'production' );

// the path to clean
let pathToClean = [ 'dist' ];
let cleanOptions = {
    root : __dirname
    , verbose : true
    , dry : false
}

module.exports = {
    entry : {
        app : [
            './src/main.js'
            , './src/styles/scss/app.scss'
        ]
    }
    , output : {
        path : path.resolve( __dirname, 'dist' )
        , filename : '[name].[chunkhash].js'
    }
    , module : {
        rules : [
            {
                test : /\.s[ca]ss$/
                , use :  /* [ { loader: 'style-loader' } ] */
                    ExtractTextPlugin.extract({

                    fallback : 'style-loader'
                            //'raw-loader'
                    , use : [ 'css-loader', 'sass-loader' ]
                        /*[ {
                                loader : 'css-loader'
                                , options : { url : false }
                            }

                            , 'sass-loader'
                        ]
                        */
                })
            }, {
                test : /\.(svg|ttf|jpe?g|png|gif)$/
                , loader : 'file-loader'
                , options : {
                    name : 'images/[name].[hash].[ext]'
                }
            } ]
    }
    , plugins : [

        new CleanWebpackPlugin( pathToClean, cleanOptions )

        , new ExtractTextPlugin( '[name].[chunkhash].css' )

        , new PurifyCSSPlugin( {
            paths : glob.sync( path.join( __dirname, 'index.html' ) )
            , minimize : isProduction

        } )

        , new HtmlWebpackPlugin( {
            template : 'index.base.html'
            , inject : false
        } )
    ]

};
/*
if (isProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}
*/
