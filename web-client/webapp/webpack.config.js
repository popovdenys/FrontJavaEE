const settings = require( './settings.js' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
var HtmlWebpackPlugin = require('html-webpack-plugin');

let config = function( env, argv ) {

    settings.currentMode = argv.mode

    return {
        watch : settings.isDevelopment( )

        , entry: {
            app : [ settings.sassDir + 'app.scss', settings.jsDir + 'index.js' ]
        }

        // Let "source-map" in : uglifyjs-webpack-plugin
        , devtool: settings.isDevelopment( ) ? "cheap-module-eval-source-map" : false

        , output: {

            filename: settings.isDevelopment() ? '[name].js' : '[name].[chunkhash:8].js'

            , path: settings.getAbsolutOutputPath()

            // => for lazy loading
            , publicPath: ( settings.isDevelopment() ? settings.localhost + ':' + settings.localPort : '' ) + settings.getRelativePublicPath()
        }
        , devServer: {
            overlay: { warnings: true, errors: true }
            , contentBase: settings.getDevServerPublicPath()
            , port : settings.localPort
            , proxy: {
                "/app": {
                    target: settings.localhost + ':' + settings.serverPort,
                    pathRewrite: { "^/app" : '' }
                }
            }
            , headers : {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD",
                "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
            }
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
                }, {
                    test: /\.(eot|ttf|otf|woff2?)$/,
                    use: 'file-loader'
                }, {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [{
                        loader: 'url-loader'
                        , options: {
                            limit: 10000
                            , name: '[name].[sha512:hash:base64:8].[ext]'
                        }
                    }]
                } ]
        }
        , plugins: [
            new ExtractTextPlugin({
                filename:  settings.isDevelopment() ? '[name].css' : '[name].[sha512:contenthash:8].css'
                , disable : settings.isDevelopment()
            })

        ]
    }
}

module.exports = function( env, argv ) {

    config = config(env, argv)

    // add production configuration
    if( settings.isProduction( ) ) {
        config.plugins.push( settings.setCleanWebpack() )
        config.plugins.push( settings.setUglifyInProduction() )
        // ToDo : remove it from 'plugins' or delete it at all
        // config.plugins.push( settings.setHtmlWebpackInProduction() )
        config.plugins.push( settings.setManifest() )
    }

    // add alias
    config.resolve = settings.setAlias()

    return config
}