<template>
	<view>
		<view class="content">
			<view class="title">
				前端开发工程师
			</view>
			<view class="money">
				10k-12k
			</view>
			<view class="other">
				广州 | 经验不限 | 本科
			</view>
			<view class="company">
				<view class="company_name">
					广州凡科
					<view class="company_detail">
						上市公司 | 500人 | 可信赖
					</view>
				</view>
				<view class="image">
					<image src="../../static/company/company.png" mode=""></image>
				</view>

			</view>
			<view class="job_details">
				<view class="job_title">
					职位描述
				</view>
				<view class="job_content">
					1、负责PC端web页面、管理后台页面 和移动端h5工作开发</br>
					2、改进开发、构建、发布等前端工程化体系和组件化框架</br>
					3、负责在移动设备、移动浏览器及PC浏览器上的既定效果实现</br>
					4、熟悉前后端分离的工作流程、能够和后端人员高效对接相关接口事宜</br>
				</view>
				<view class="job_title">
					任职要求
				</view>
				<view class="job_require">
					1、专科以上学历，2年以上Web前端开发经验，计算机相关专业</br>
					2、必须具备一年以上VUE全家桶的开发经验，全程实际参与的Vue全家桶</br>
					4、有H5移动端、小程序、uni-app等具实际项目开发经验者优先</br>
				</view>
			</view>

		</view>
		<view class="function">
			<button type="default" class="collection">收藏</button>
			<button type="primary" class="submit" @click="submit">投递</button>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			submit(){
				uniCloud.callFunction({
					name:"get_news"
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
