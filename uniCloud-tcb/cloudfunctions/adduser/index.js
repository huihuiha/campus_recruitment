'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { openid,nickName,avatarUrl,city,gender} = event
	const db = uniCloud.database();
	// 获取名为 `table1` 数据表的引用
	const collection = db.collection('users');
	
	const res = await collection.where({
		openid
	}).get() // 获取表中的10条数据，结果为json格式
	
	if(!res.data.length){
		// 插入
		 collection.add({openid,nickName,avatarUrl,city,gender})
	}else{
		// 更新
	}
	console.log(res.data)
	
	//返回数据给客户端
	return {code:200}
};
