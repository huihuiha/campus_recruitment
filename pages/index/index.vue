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

		<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<view class='nav'>
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
			
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="gotodetails">
					<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
						:scroll-into-view="toView">
						<view :id="'top'+listIndex" style="width: 100%;height: 120upx;"></view>
						<view class='content'>
							<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<image class="image" src="../../static/company/company.png">
								</image>
								<view class="message">
									<view class="name">
										广州凡科
									</view>
									<view class="money">
										8k-15K
									</view>
									<view class="other">
										广州 | 经验不限 | 本科
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
		get_tabs
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
		onShow() {

		},
		data() {
			return {
				menus,
				toView: '', //回到顶部id
				currentPage: 'longIndex',
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1, 1, 1, 1, 1, 1], //第几页存储 
				tabTitle: ['前端', '后端', '测试', '运营', '人工智能', '其它'], //导航栏格式
				list: [
					[1, 2, 3, 4, 5, 6],
					['a', 'b', 'c', 'd', 'e', 'f'],
					[],
					['2233', '4234', '13144', '324244'],
					[1, 2, 3, 4, 5, 6],
					['a', 'b', 'c', 'd', 'e', 'f'],
				] //数据格式
			};
		},
		onShow() {
			get_tabs().then(res => {
				this.tabTitle = res.result.data
				console.log(this.tabTitle)
			})
		},
		methods: {
			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			changeTab(index) {
				this.currentTab = index
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest(pages) {
				return new Promise((resolve, reject) => {
					this.pages[this.currentTab]++
					var that = this
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
						})
						let newData = ['新数据1', '新数据2', '新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
				console.log(`加载${this.currentTab}`) //currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.isRequest().then((res) => {
					let tempList = this.list
					tempList[this.currentTab] = tempList[this.currentTab].concat(res)
					console.log(tempList)
					this.list = tempList
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			},
			gotoNews(i) {
				if (i === 0) {
					uni.navigateTo({
						url: "../news/index"
					})
				} else if (i === 1) {
					uni.navigateTo({
						url: "../resume/resume"
					})
				}
			},
			gotodetails() {
				uni.navigateTo({
					url: "../job_content/job_content"
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import './index.scss'
</style>
