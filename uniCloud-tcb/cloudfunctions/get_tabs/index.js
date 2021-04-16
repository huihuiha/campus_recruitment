'use strict';
exports.main = async (event, context) => {
const db = uniCloud.database();
	// 获取名为 `table1` 数据表的引用
	const collection = db.collection('tags');
	
	const index = event.index
	
	const res = await collection.get()
	
	//返回数据给客户端
	return res
};
