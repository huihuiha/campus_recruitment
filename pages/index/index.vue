<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header">
				<image src="/static/index/icon_main.png" class="btn"></image>
				<view class="input">
					<image src="/static/index/search.png" class="search"></image>
					<input type="text" value="" placeholder="搜索" />
				</view>
				<image src="/static/index/msg.png" class="btn"></image>
			</view>
			<view class="header_content">
				<view class="left">
					<text class="title">面试精品内容</text>
					<text class="sub_title">读懂考官套路，轻松备考面试</text>
					<text class="btn">努力学习</text>
				</view>
				<view>
					<image src="/static/index/right.png" style="width: 131px;height: 102px;"></image>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<template v-for="(it,i) in menus">
					<view class="item" :key="'menu_'+i" @click="gotoNews(i)">
						<view class="img_view" :style="{background: it.bg}">
							<image :src="it.icon" class="image"></image>
						</view>
						<text class="txt">{{it.txt}}</text>
					</view>
				</template>
			</view>
			<view class="s_menu">
				<template v-for="(it,i) in second_menus">
					<view class="item" :key="'s_menu_'+i">
						<image :src="it.icon" class="image"></image>
						<text class="txt">{{it.txt}}</text>
					</view>
				</template>
			</view>
		</view>

		<view class="container999" 
			@touchstart="refreshStart" 
			@touchmove="refreshMove" 
			@touchend="refreshEnd">
			<refresh 
			ref="refresh" 
			@isRefresh='isRefresh'></refresh>
			<view class='nav'>
				<navTab ref="navTab" 
				:tabTitle="tabTitle" 
				@changeTab='changeTab'
				>
				</navTab>
			</view>

			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height:50vh;" 
			
				:current="currentTab"
				 @change="swiperTab">
				<swiper-item 
					v-for="(listItem,listIndex) in list" 
					:key="listItem._id" 
					@click="gotodetails">
					<scroll-view 
						style="height: 100%;" 
						scroll-y="true" 
						scroll-x="true"
						@scrolltolower="lower1" 
						scroll-with-animation
						:scroll-into-view="toView">
						<view :id="'top'+listIndex" style="width: 100%;height: 120upx;">
						</view>
						<view class='content'>
							<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<image class="image" :src="item.image">
								</image>
								<view class="message">
									<view class="name">
										{{item.name}}
									</view>
									<view class="money">
										{{item.min_money}}k-{{item.max_money}}K
									</view>
									<view class="other">
										{{item.place}} | {{get_experience(item.exoerience)}} | {{item.education}}
									</view>
								</view>
							</view>
						</view>
						<view class='noCard' v-if="listItem.length===0">
							暂无信息
						</view>
						<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import refresh from './components/refresh.vue';
	import navTab from './components/navTab.vue';
	import tabBar4 from './components/tabBar4.vue';

	import {
		util
	} from '@/common/util.js'

	import {
		get_tabs,
		get_job_list
	} from '@/model/index.js'


	const menus = [{
			bg: 'linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))',
			icon: '/static/index/graduation.png',
			txt: '招聘动态',
			isFree: true
		},
		{
			bg: 'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
			icon: '/static/index/emblem.png',
			txt: '简历推荐',
			isFree: true
		},
		{
			bg: 'linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))',
			icon: '/static/index/question_bank.png',
			txt: '招聘发布',
			isFree: true
		}
	]


	export default {
		components: {
			refresh,
			navTab,
			tabBar4
		},
		data() {
			return {
				menus,
				toView: '', //回到顶部id
				currentPage: 'longIndex',
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1, 1, 1], //第几页存储 
				tabTitle: ['前端', '后端', '测试', '运营', '人工智能', '其它'], //导航栏格式
				list: [
					[],
					[],
					[],
					[],
					[],
					[],
				] //数据格式
			};
		},
		onShow() {
			get_tabs().then(res => {
				this.tabTitle = res.result.data
			})
			this.get_list(0)
		},
		methods: {
			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			get_list(index) {
				uni.showLoading({
					title: "加载中..."
				})
				get_job_list(index).then(res => {
					this.list[index] = res.result.data
					this.$forceUpdate()
					uni.hideLoading()
				})
			},
			changeTab(index) {
				this.currentTab = index
				this.get_list(index)
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				console.log(index)
				this.$refs.navTab.longClick(index);
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
			console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			uni.showLoading({
				title: '加载中',
				mask:true
			})
			
			get_job_list(this.currentTab,this.currentPage[this.currentTab]).then(res=>{
				this.pages[this.currentTab]++

				let tempList = this.list
				tempList[this.currentTab] = tempList[this.currentTab].concat(res.result.data)
				this.list = tempList
				uni.hideLoading()
				this.$forceUpdate() //二维数组，开启强制渲染
			})
			
			// this.isRequest().then((res)=>{
			// 	let tempList = this.list
			// 	tempList[this.currentTab] = tempList[this.currentTab].concat(res)
			// 	console.log(tempList)
			// 	this.list = tempList
			// 	this.$forceUpdate() //二维数组，开启强制渲染
			// })
		}, 300),
			
			
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
					setTimeout(() => {
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						})
						this.$refs.refresh.endAfter() //刷新结束调用
					}, 1000)
			},
			gotoNews(i) {
				const route = [
					{url:"../news/index"},
					{url:"../resume/resume"},
					{url:"../publish/publish"}
				]
				uni.navigateTo({
					url:route[i].url
				})

			},
			gotodetails() {
				uni.navigateTo({
					url: "../job_content/job_content"
				})
			},
			get_experience(experience){
				if(experience){
					return `${experience}年`
				}
				return '经验不限'
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import './index.scss'
</style>
