const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){ 
	app.use(
		"/backDb" ,
		createProxyMiddleware({
			target:"http://61.102.114.235:19090",
			changeOrigin:true,
			pathRewrite:{
				'^/backDb':''
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