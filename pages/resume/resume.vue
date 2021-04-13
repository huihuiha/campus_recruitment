<template>
	<view>

		<view>
			<view class="uni-padding-wrap uni-common-mt">
				<movable-area scale-area>
					<movable-view direction="all" @scale="onScale" scale="true" scale-min="1" scale-max="4"
						:scale-value="scale">
						<image src="https://static.vue-js.com/13a3cbf0-9c3a-11eb-ab90-d9ae814b240d.png" mode="widthFix">
						</image>
					</movable-view>
				</movable-area>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	movable-area {
		height: 100%;
		width: 100%;
		position: fixed;
		overflow: hidden;
	}

	movable-view image {
		width: 100%;
	}
</style>
