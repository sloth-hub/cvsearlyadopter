import { createProxyMiddleware } from "http-proxy-middleware";

export default (app) => {
    app.use(
        createProxyMiddleware(
            "/seven", {
            target: "http://www.7-eleven.co.kr",
            changeOrigin: true,
            pathRewrite: {
                "^/seven/": ""
            }
        }
        )
    );
    app.use(
        createProxyMiddleware(
            "/gs", {
            "target": "http://gs25.gsretail.com",
            "changeOrigin": true,
            "pathRewrite": {
                "^/gs": ""
            }
        }
        )
    );
    app.use(
        createProxyMiddleware(
            "/cu": {
            "target": "http://cu.bgfretail.com",
            "changeOrigin": true,
            "pathRewrite": {
                "^/cu": ""
            }
        }
        )
    );
};