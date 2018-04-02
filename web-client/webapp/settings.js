const config = require('./settings.vars.js')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
    config : config,
    currentMode: '',

    isProduction: function () {
        return this.currentMode === this.config.productionMode ? true : false
    },

    isDevelopment: function () {
        return !this.isProduction()
    },

    // return all path after 'public' in 'public/assets/' => '/assets/'
    getRelativePublicPath: function() {
        let publicPath = /(?=\/)[^']+/.exec(this.config.publicOutputPath)[0]
        console.log('PATH : get public path to : ' + publicPath)
        return publicPath
    },

    // return path of 'public' in 'public/assets'
    getDevServerPublicPath: function() {
        let devServerPublicPath = /.+?(?=\/)/.exec(this.config.publicOutputPath)[0]
        console.log('PATH : get Dev Server public path to : ' + devServerPublicPath)
        return path.resolve(__dirname, devServerPublicPath)
    },

    getAbsolutOutputPath: function() {
        console.log('PATH : get absolut output path to : ' + this.config.publicOutputPath)
        return path.resolve(__dirname, this.config.publicOutputPath)
    },

    // set alias
    setAlias: function() {
        return {
            vue: 'vue/dist/vue.js',
            '@images': path.resolve(__dirname, this.config.imagesDir),
            '@sass': path.resolve(__dirname, this.config.sassDir),
            '@js': path.resolve(__dirname, this.config.jsDir),
            '@vue': path.resolve(__dirname, this.config.vuesDir)
        }
    },
    // ToDo : remove it /replaced by --hot/
    setHotInDevelopment: function(){
        return [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    },

    // js optimization
    setUglifyInProduction: function () {
        return new UglifyJSPlugin({
            sourceMap: this.isDevelopment()
        })
    },

    // js optimization
    setOccurrenceOrderInProduction: function () {
        return new webpack.optimize.OccurrenceOrderPlugin()
    },

    // clean output dir
    setCleanWebpack: function() {
        let pathsToClean = [this.config.publicOutputPath ]
        let cleanOptions = {root : path.resolve( __dirname ), verbose : true}
        return new CleanWebpackPlugin(pathsToClean, cleanOptions)
    },

    // ToDo : move options to config file => postcss.config.js
    setCssLoaders: function () {
        let cssLoaders = [{loader: 'css-loader', options: {importLoaders: 1, minimize: this.isProduction()}}]
        if(this.isProduction()) {
            cssLoaders.push({
                loader: 'postcss-loader'
                , options : {
                    ident: 'postcss',
                    plugins : ( loader ) => [
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'ie > 8']
                    })]
                }
            })
        }

        return cssLoaders
    }
}
