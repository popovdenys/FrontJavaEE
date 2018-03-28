const settings = require('./settings.js')
const HTMLPlugin = require( 'html-webpack-plugin' )
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require( 'path' )

let config = function( env, argv ) {

    settings.currentMode = argv.mode

    return {
        watch : settings.isDevelopment( )

        , entry: {
            app : './src/js/index.js'
        }

        // Let "source-map" in : uglifyjs-webpack-plugin
        , devtool: settings.isDevelopment( ) ? "cheap-module-eval-source-map" : false

        , output: {

            filename: '[name].js'

            , path: path.resolve(__dirname, 'build/assets')

            // => for lazy loading
            , publicPath: 'build/assets/'
        }
        , module: {
            rules: [{

                    // BABEL LOADER
                    test: /\.js$/
                    , exclude: /(node_modules|bower_components)/
                    , use: ['babel-loader?cacheDirectory=false']
                }, {

                    // CSS LOADER
                    test: /\.s[ca]ss$/
                    , use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [ ...settings.setCssLoaders(), 'sass-loader' ]
                    })
                }]
        }
        , plugins: [
            new HTMLPlugin()

            , new ExtractTextPlugin({
                filename: '[name].css'
                , disable : settings.isDevelopment()
            })

        ]
    }
}

module.exports = function( env, argv ) {

    config = config(env, argv)

    if( settings.isProduction( ) ) config.plugins.push(settings.setUglifyInProduction())

    return config
}