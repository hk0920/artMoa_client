const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		"/httpApi" ,
		createProxyMiddleware({
			target:"http://61.102.114.235:19090/",
			changeOrigin:true,
			pathRewrite:{
				'^/httpApi':''
			}
		})
	)
	app.use(
		"/artApi" ,
		createProxyMiddleware({
			target:"http://www.culture.go.kr/",
			changeOrigin:true,
			pathRewrite:{
				'^/artApi':''
			}
		})
	)
};
