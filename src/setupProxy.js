const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
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