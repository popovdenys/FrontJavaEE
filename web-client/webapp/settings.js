const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const ManifestPlugin = require( 'webpack-manifest-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )
const path = require( 'path' )

module.exports = {
    // input
    imagesDir : './src/styles/images/',
    sassDir : './src/styles/sass/',
    jsDir : './src/js/',
    // output
    publicOutputPath : 'public/assets/',
    //modes
    productionMode: 'production',
    developmentMode: 'development',
    currentMode: '',

    isProduction: function () {
        return this.currentMode === this.productionMode ? true : false
    },

    isDevelopment: function () {
        return !this.isProduction()
    },

    // return all path after 'public' in 'public/assets/' => '/assets/'
    getRelativePublicPath: function() {
        let publicPath = /(?=\/)[^']+/.exec(this.publicOutputPath)[0]
        console.log('PATH : get public path to : ' + publicPath )
        return publicPath
    },

    // return path of 'public' in 'public/assets'
    getDevServerPublicPath: function() {
        let devServerPublicPath = /.+?(?=\/)/.exec(this.publicOutputPath)[0]
        console.log('PATH : get Dev Server public path to : ' + devServerPublicPath )
        return path.resolve( __dirname, devServerPublicPath )
    },

    getAbsolutOutputPath: function() {
        console.log('PATH : get absolut output path to : ' + this.publicOutputPath )
        return path.resolve( __dirname, this.publicOutputPath )
    },

    setAlias: function() {
        return {
            alias: {
                '@images': path.resolve(__dirname, this.imagesDir),
                '@sass': path.resolve(__dirname, this.sassDir),
                '@js': path.resolve(__dirname, this.jsDir)
            }
        }
    },

    setUglifyInProduction: function () {
        return new UglifyJSPlugin({
            sourceMap: this.isDevelopment()
        });
    },

    setHtmlWebpackInProduction: function () {
        /*
        let htmlWebpackPlugin = new HtmlWebpackPlugin({
            filename : '../public/index.html'
            , template : 'public/index.html'
        });

        console.log(htmlWebpackPlugin.files)

        return htmlWebpackPlugin
        */
        /*
        return new HtmlWebpackPlugin({
            template : 'public/index.html'
        });
        */

        return new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: 'public/index.html'
        })
    },

    setManifest: function() {
        return new ManifestPlugin()
    },

    setCleanWebpack: function() {
        let pathsToClean = [ this.publicOutputPath ]
        let cleanOptions = { root : path.resolve( __dirname ), verbose : true }
        return new CleanWebpackPlugin( pathsToClean, cleanOptions )
    },

    // ToDo : move options to config file => postcss.config.js
    setCssLoaders: function () {
        let cssLoaders = [ { loader: 'css-loader', options: {importLoaders: 1, minimize: this.isProduction() } } ]
        if(this.isProduction()) {
            cssLoaders.push({
                loader: 'postcss-loader'
                , options : {
                    ident: 'postcss',
                    plugins : ( loader ) => [
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'ie > 8']
                    } ) ]
                }
            } )
        }

        return cssLoaders
    }
}