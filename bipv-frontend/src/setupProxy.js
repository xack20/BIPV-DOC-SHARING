const {createProxyMiddleware}=require('http-proxy-middleware');
module.exports = function(app) {
    
    app.use(createProxyMiddleware('/users',{target:'http://localhost:9096'})),
    



    app.use(createProxyMiddleware('/assets',{target:'http://localhost:9095'})),

    app.use(createProxyMiddleware('/addAsset',{target:'http://localhost:9095'})),
    app.use(createProxyMiddleware('/updateAsset',{target:'http://localhost:9095'})),
    app.use(createProxyMiddleware('/deleteAsset',{target:'http://localhost:9095'})),

    app.use(createProxyMiddleware('/getAllAssets',{target:'http://localhost:9095'})),
    app.use(createProxyMiddleware('/transferAsset',{target:'http://localhost:9095'})),
    app.use(createProxyMiddleware('/asset',{target:'http://localhost:9095'})),



    app.use(createProxyMiddleware('/enrollAdmin',{target:'http://localhost:9095'})),
    app.use(createProxyMiddleware('/registerUser',{target:'http://localhost:9095'}))
}