const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    productionMode: "production",
    developmentMode: "development",
    currentMode: "",

    isProduction: function () {
        console.log("mode : " + this.currentMode);
        return this.currentMode === this.productionMode ? true : false
    },

    isDevelopment: function () {
        return !this.isProduction()
    },

    setUglifyInProduction: function () {
        return new UglifyJSPlugin({
            sourceMap: this.isDevelopment()
        });
    },

    setCssLoaders: function () {
        let cssLoaders = [ { loader: 'css-loader', options: {importLoaders: 1, minimize: this.isProduction()} } ]
        if(this.isProduction()) {
            cssLoaders.push({
                loader: 'postcss-loader'
                , options : {
                    ident: 'postcss',
                    plugins : (loader) => [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie > 8']
                    } ) ]
                }
            } )
        }

        return cssLoaders
    }
}