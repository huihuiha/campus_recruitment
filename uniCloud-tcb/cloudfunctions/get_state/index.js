'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	// 获取名为 `table1` 数据表的引用
	const collection = db.collection('job_message');
	
	const index = event.index
	
	const res = await collection.where({
		state:index
	}).get() // 获取表中的10条数据，结果为json格式
	
	console.log(res)
	
	
	//返回数据给客户端
	return res
};
