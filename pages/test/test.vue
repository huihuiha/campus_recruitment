<template>
	<view>
		<button type="default" @click="getUserInfo">UserInfo</button>
	</view>
</template>

<script>
	// import WXBizDataCrypt from "@/common/WXBizDataCrypt.js";



	export default {
		data() {
			return {
				Code: '',
				openid: '',
				session_key: ''
			};
		},
		methods: {
			getUserInfo() {
				wx.getUserProfile({
					desc: "qweqwe",
					success(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
