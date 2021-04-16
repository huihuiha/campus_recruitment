

export const get_tabs =  ()=>{
	return uniCloud.callFunction({
		name:"get_tabs"
	})
}