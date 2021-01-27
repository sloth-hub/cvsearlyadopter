const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    
    app.use(
        "/seven", 
        createProxyMiddleware({
            target : "http://www.7-eleven.co.kr",
            changeOrigin: true,
            pathRewrite: {
                "^/seven/": ""
            }
        })
    );
    app.use(
        "/gs", 
        createProxyMiddleware({
            target: "http://gs25.gsretail.com",
            changeOrigin: true,
            pathRewrite: {
                "^/gs": ""
            }
        })
    );
    app.use(
        "/cu", 
        createProxyMiddleware({
            target: "http://cu.bgfretail.com",
            changeOrigin: true,
            pathRewrite: {
                "^/cu": ""
            }
        })
    );

};