<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="#ff6364">
		</uni-segmented-control>

		<view class="content">
			<view v-if="isshow">
				<uni-card v-for="item in job_message" :key="item._id" class="item.job" :title="item.name" mode="title"
					:is-shadow="true" :thumbnail="item.image" :extra="item.date">
					<view class="content">
						<view class="name">
							{{item.name}}
						</view>
						<view class="state">
							{{getState(item.state)}}
						</view>
					</view>
				</uni-card>
			</view>
			<view v-else class="no-message">
				暂时没有投递记录
			</view>
		</view>

	</view>
</template>

<script>
	import uniSegmentedControl from '@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue' //也可使用此方式引入组件
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue' //也可使用此方式引入组件
	import msgItem from './components/msgItem.vue'
	const items = ['初筛', '笔试', '面试', '不合适']

	import {
		get_job_message
	} from '@/model/message.js'


	export default {
		components: {
			uniSegmentedControl,
			msgItem,
			uniCard
		},
		data: () => ({
			current: 0,
			items,
			job_message: [],
			isshow: true
		}),
		onShow(){
			get_job_message(this.current).then(res => {
				this.job_message = res.result.data
				if (this.job_message.length === 0) {
					this.isshow = false
				} else {
					this.isshow = true
				}
			})
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
				get_job_message(index.currentIndex).then(res => {
					this.job_message = res.result.data
					if (this.job_message.length === 0) {
						this.isshow = false
					} else {
						this.isshow = true
					}
				})
			},
			getState(index) {
				const message = ['不合适', '初筛', '笔试', '面试']
				return message[index]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
	}

	.content {
		height: 100%;

		.name {
			float: left;
		}

		.state {
			float: right;
		}
	}
	.no-message{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		font-size: 40rpx;
		line-height: 40rpx;
		color:#ccc;
	}
</style>
