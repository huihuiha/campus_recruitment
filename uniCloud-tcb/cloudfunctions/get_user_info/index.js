'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let js_code = event.code  
	const appid = 'wxf097a7021fa63267' //appid  
	const secret = '6f176e03e71d86ddfdfdb152a9f3bca0' //secret  
	const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'   
	
	let res = await uniCloud.httpclient.request(loginUrl, {  
	  data: {  
	    appid: appid,  
	    secret: secret,  
	    js_code: js_code,  
	    grant_type: 'authorization_code'  
	  },  
	  dataType: 'json'  
	  })  
	
	console.log("===========",res)
	
	let openid = res.data.openid  //用户openid
	
	console.log(openid)
	
	return openid
};
