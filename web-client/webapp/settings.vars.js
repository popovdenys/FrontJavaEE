module.exports = {
    // input
    imagesDir : './src/styles/images/',
    sassDir : './src/styles/sass/',
    jsDir : './src/js/',
    // output
    prodJsName : '[name].[chunkhash:8].js',
    prodCssName : '[name].[sha512:contenthash:8].css',
    allImagesName : '[name].[sha512:hash:base64:8].[ext]',
    publicOutputPath : 'public/assets/',
    localhost : 'http://localhost',
    localPort : 8080,
    serverPort : 8000,
    // modes
    productionMode: 'production',
    developmentMode: 'development',
    // resources
    resourcesConfigPath: './rcs/',
    eslintConfig: '.eslint',
    babelConfig: '.babel'
}
