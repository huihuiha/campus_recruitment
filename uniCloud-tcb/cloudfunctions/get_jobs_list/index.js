'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const {
		type,
		page,
		limit = 5
	} = event
	
	const db = uniCloud.database();
	const collection = db.collection('jobs_lists');
	
	const start = page * 3
	// console.log(start)
	const res = await collection.where({
		type
	}).get()
	// console.log(typeof res)
	// console.log(res)
	const data = res.data.slice(start, limit)
	
	
	//返回数据给客户端
	return res
};
