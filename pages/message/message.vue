<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="content">
			<view class="msg_16">
				<view class="msg_2">
					<view class="msg_12">
						<image v-on:click="icon_4_click()"  src="/static/msg/images/msg_icon_4.jpg" mode="scaleToFill" border="0"    class="icon"></image>
						<text decode="true" class="word">评论</text>
					</view>
					<view class="msg_13">
						<image v-on:click="icon_5_click()"  src="/static/msg/images/msg_icon_5.jpg" mode="scaleToFill" border="0"    class="icon"></image>
						<text decode="true" class="word">粉丝</text>
					</view>
					<view class="msg_14">
						<image v-on:click="icon_6_click()"  src="/static/msg/images/msg_icon_6.jpg" mode="scaleToFill" border="0"    class="icon"></image>
						<text decode="true" class="word">点赞</text>
					</view>
				</view>
				<view class="Messages">
				<view v-for="(item_Messages, index) in list_Messages" :key="index" >
		
					<view class="row">
						<image v-on:click="icon_40_click(item_Messages)"  :src="item_Messages.icon" mode="scaleToFill" border="0"    class="icon"></image>
						<view class="msg_41">
							<view class="msg_42">
								<text decode="true" class="subject">{{item_Messages.subject}}</text>
								<text decode="true" class="time">{{item_Messages.time}}</text>
							</view>
							<view class="msg_43">
								<text decode="true" class="smallTitle">{{item_Messages.smallTitle}}</text>
								<text decode="true" class="vote">{{item_Messages.vote}}</text>
							</view>
						</view>
					</view>
				</view>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import message from "./message.js";
export default message;
</script>

<style lang="scss" scoped>
   @import './message.scss'
</style>