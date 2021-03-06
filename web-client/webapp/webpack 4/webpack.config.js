const settings = require('./settings.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let webpackConfig = function(env, argv) {

    settings.currentMode = argv.mode

    return {
        watch : settings.isDevelopment()

        , resolve : {
            extensions: ['.js', '.json', '.vue']
            , alias: settings.setAlias()
        }

        , entry: {
            // '@vue/ChemApp.vue'
            app : ['@sass/app.scss', '@vue/index.js']
        }

        // Let "source-map" in : uglifyjs-webpack-plugin
        , devtool: settings.isDevelopment() ? "cheap-module-eval-source-map" : false

        , output: {

            filename: settings.isDevelopment() ? '[name].js' : settings.config.prodJsName

            , path: settings.getAbsolutOutputPath()

            // => for lazy loading
            , publicPath: ( settings.isDevelopment() ? settings.config.localhost + ':' + settings.config.localPort : '' ) + settings.getRelativePublicPath()
        }
        , devServer: {
            overlay: { warnings: true, errors: true }
            , contentBase: settings.getDevServerPublicPath()
            , port : settings.config.localPort
            , proxy: {
                '/app': {
                    target: settings.config.localhost + ':' + settings.config.serverPort,
                    // ToDo : doesn't work ???
                    pathRewrite: {'^/app' : ''}
                }
            }
            , headers : settings.config.headersCORS
            // ToDo : remove it /replaced by --hot/
            // , hot : settings.isDevelopment()
        }
        , module: {
            rules: [ {
                    enforce : 'pre'
                    , test: /\.js$/
                    , exclude: /(node_modules|bower_components)/
                    , use: [
                      {
                        loader: 'eslint-loader'
                          , options: {
                            configFile: settings.config.resourcesConfigPath + settings.config.eslintConfig
                          }
                        }
                    ]
                    ,
                }, {
                    // ToDo : remove VUE LOADER; vue-loader is used instead
                    // BABEL LOADER
                    test: /\.(js|vue)$/
                    , exclude: /(node_modules|bower_components)/
                    , use: [
                        { loader: 'babel-loader?cacheDirectory=' + settings.isDevelopment()
                            , options: {
                                extends:
                                    settings.config.resourcesConfigPath + settings.config.babelConfig
                                }
                            }
                        ]

                }, {
                    test: /\.vue$/
                    , loader: 'vue-loader'
                }, {
                    // CSS LOADER
                    test: /\.s[ca]ss$/
                    , use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [...settings.setCssLoaders(), 'sass-loader']
                    })
                }, {
                    // FILE LOADER
                    test: /\.(eot|ttf|otf|woff2?)$/,
                    use: 'file-loader'
                }, {
                    // URL LOADER
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [{
                        loader: 'url-loader'
                        , options: {
                            limit: 10000
                            , name: settings.config.allImagesName
                        }
                    }]
                } ]
        }, plugins: [
            new ExtractTextPlugin({
                filename:  settings.isDevelopment() ? '[name].css' : settings.config.prodCssName
                , disable : settings.isDevelopment()
            })
        ]
    }
}

module.exports = function(env, argv) {

    webpackConfig = webpackConfig(env, argv)

    // add production configuration
    if( settings.isProduction()) {
        webpackConfig.plugins.push(settings.setCleanWebpack())
        webpackConfig.plugins.push(settings.setUglifyInProduction())
        webpackConfig.plugins.push(settings.setOccurrenceOrderInProduction())
    }

    // add development configuration
    if( settings.isDevelopment()) {
        // ToDo : remove it /replaced by --hot/
        // webpackConfig.plugins.push(...settings.setHotInDevelopment())
    }

    return webpackConfig
}
