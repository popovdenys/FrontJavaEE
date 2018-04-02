module.exports = {
    // input
    imagesDir : './src/styles/images',
    sassDir : './src/styles/sass',
    jsDir : './src/js',
    vuesDir : './src/js/vues',
    // output
    prodJsName : '[name].[chunkhash:8].js',
    prodCssName : '[name].[sha512:contenthash:8].css',
    allImagesName : '[name].[sha512:hash:base64:8].[ext]',
    publicOutputPath : 'public/assets/',
    localhost : 'http://localhost',
    localPort : 8080,
    serverPort : 8000,
    headersCORS : {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
    },
    // modes
    productionMode: 'production',
    developmentMode: 'development',
    // resources
    resourcesConfigPath: './rcs/',
    eslintConfig: '.eslint',
    babelConfig: '.babel'
}
