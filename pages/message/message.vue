<template>
	<view>

		<uni-segmented-control 
			
			:current="current" 
			:values="items"
			 @clickItem="onClickItem" 
			 styleType="text"
				activeColor="#ff6364">
		</uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<msg-item></msg-item>
			</view>
			<view v-show="current === 1">
				
<uni-card 
    title="Dcloud" 
    mode="title" 
    :is-shadow="true" 
    thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" 
    extra="技术没有上限" 
    note="Tips"
>
    uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
</uni-card>
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>

	</view>
</template>

<script>
	import uniSegmentedControl from '@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue' //也可使用此方式引入组件
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue' //也可使用此方式引入组件
	import msgItem from './components/msgItem.vue'
	const items = ['初筛', '笔试', '面试','不合适']
	export default {
		components: {
			uniSegmentedControl,
			msgItem,
			uniCard
		},
		data: () => ({
			current: 0,
			items
		}),
		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
			},
		},
	}
</script>
