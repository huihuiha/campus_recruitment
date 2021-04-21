const get_tabs = () => {
	return uniCloud.callFunction({
		name: "get_tabs"
	})
}

// 获取求职信息
const get_job_list = (type,page=0,limit=3) => {
	return uniCloud.callFunction({
		name: "get_jobs_list",
		data: {
			type,
			page,
			limit
		}
	})
}

export{
	get_tabs,
	get_job_list
}
