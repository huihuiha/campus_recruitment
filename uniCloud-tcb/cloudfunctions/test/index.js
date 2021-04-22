'use strict';

var uuid  = require('node-uuid');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	console.log("=============",uuid.v4())
	//返回数据给客户端
	return event
};
