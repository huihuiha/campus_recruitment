<template>
	<view class="form">

		<uni-forms ref="form" :value="formData" :rules="rules">

			<uni-forms-item label="岗位名称: " label-width=70 label-align="left" label-position="left" name="job" required>
				<uni-easyinput type="text" required v-model="formData.job" placeholder="请输入姓名" />
			</uni-forms-item>

			<uni-forms-item label="公司名称: " required label-width=70 label-align="left" label-position="left" name="name">

				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>

			<uni-forms-item label="岗位类型: " required label-width=70 label-align="left" label-position="left" name="type">
				<div class="picker">
					<uni-data-picker class="picker-item" :localdata="job_types" popup-title="请选择岗位类型"
						v-model="formData.type">
					</uni-data-picker>
				</div>
			</uni-forms-item>

			<uni-forms-item label="工资范围: " required label-width=70 label-align="left" label-position="left">
				<div class="money-select">
					<uni-number-box :min="0" :max="9" v-model="formData.min_money">

					</uni-number-box>
					<text>到</text>
					<uni-number-box v-model="formData.max_money"></uni-number-box>
				</div>
			</uni-forms-item>

			<uni-forms-item label="学历要求: " required label-width=70 label-align="left" label-position="left"
				name="education">
				<div class="picker">
					<uni-data-picker class="picker-item" :localdata="items" popup-title="请选择学历"
						v-model="formData.education">
					</uni-data-picker>
				</div>
			</uni-forms-item>

			<uni-forms-item label="经验要求: " required label-width=70 label-align="left" label-position="left"
				name="experience">
				<div class="picker">
					<uni-number-box :min="0" :max="9"></uni-number-box> <text>年</text>
				</div>
			</uni-forms-item>


			<uni-forms-item label="公司地点: " required label-width=70 label-align="left" label-position="left"
				name="place">
				<uni-easyinput type="text" v-model="formData.place" placeholder="请输入姓名" />
			</uni-forms-item>


			<uni-forms-item label="职位描述: " label-width=70 label-align="left" label-position="top" name="description">
				<textarea v-model="formData.description" placeholder="请输入职位描述" />
			</uni-forms-item>

			<uni-forms-item label="任职需求: " label-width=70 label-align="left" label-position="top" name="requirement">
				<textarea v-model="formData.requirement" placeholder="请输入任职需求" />
			</uni-forms-item>

			<uni-forms-item label="公司图标: " label-width=70 label-align="left" label-position="top" name="image">
				<uni-file-picker v-model="formData.image" file-mediatype="image" mode="grid" file-extname="png,jpg"
					:limit="1" @success="success" />
			</uni-forms-item>


			<button type="primary" class="btn" @click="submit">发布</button>

		</uni-forms>
	</view>
</template>

<script>
	import uniForm from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormsItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	import uniNumberBox from '@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue'
	import uniDataPicker from '@/uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue'


	export const rules = {
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入姓名',
			}]
		},
		description: {
			rules: [{
				required: true,
				errorMessage: '请输入正确的职位描述',
			}]
		},
		education: {
			rules: [{
				required: true,
				errorMessage: '请输入正确的学历要求',
			}]
		},
		experience: {
			rules: [{
				required: true,
				errorMessage: '请输入正确的工作经验',
			}]
		},
		place: {
			rules: [{
				required: true,
				errorMessage: '请输入正确的公司地址',
			}]
		},
		requirment: {
			rules: [{
				required: true,
				errorMessage: '请输入正确的职位需求',
			}]
		},
		type: {
			rules: [{
				required: true,
				errorMessage: '请选择正确的职业类型',
			}]
		}
	}
	const items = [{
			text: "专科",
			value: "专科",
		},
		{
			text: "本科",
			value: "本科"
		},
		{
			text: "研究生",
			value: "研究生"
		},
		{
			text: "博士",
			value: "博士"
		}
	]
	const job_types = [{
			text: "前端开发",
			value: 0,
		}, {
			text: "后端开发",
			value: 1,
		},
		{
			text: "测试",
			value: 2,
		},
		{
			text: "实习",
			value: 3,
		},
		{
			text: "勤工俭学",
			value: 4,
		},
		{
			text: "兼职",
			value: 5,
		}
	]

	export default {
		components: {
			uniForm,
			uniFormsItem,
			uniDataCheckbox,
			uniDataCheckbox,
			uniNumberBox,
			uniDataPicker
		},
		data() {
			return {
				job_types,
				items,
				formData: {},
				rules,
				value: [0, 2],
				image:""
			}
		},
		methods: {
			onchange(e) {
				const value = e.detail.value
			},

			onnodeclick(node) {},
			submit() {
				this.$refs.form.submit().then(res => {
					console.log(this.rules)
					res.min_money = this.formData.min_money
					res.max_money = this.formData.max_money
					res.image= this.image
					console.log('表单数据信息：', res);

				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			success(e) {
				const filePath = e.tempFilePaths[0]
				console.log(e)
				const filename = e.tempFiles[0].name

				uniCloud.getTempFileURL({
						fileList: [filePath]
					})
					.then(res => {
						console.log(res)
						this.image = res.fileList[0].download_url
					});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		width: 100vw;
		box-sizing: border-box;
		padding: 40rpx;
		margin: 0 auto;

		.btn {
			width: 80%;
			margin: 0 auto;
		}

		.money-select {
			display: flex;
			width: 100%;
			vertical-align: middle;
			align-items: center;
			justify-content: flex-start;
		}

		.picker {
			display: flex;
			width: 100%;
			vertical-align: middle;
			align-items: center;
			justify-content: flex-start;

			.picker-item {
				width: 100%;
			}
		}
	}
</style>
