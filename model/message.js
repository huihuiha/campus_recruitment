export const get_job_message = (index) => {
	return uniCloud.callFunction({
		name: "get_state",
		data: {
			index
		}
	})
}


