<template>
	 <view class="form">
	         <uni-forms ref="form" :value="formData" :rules="rules">
	             <uni-forms-item label="姓名" name="name">
	                 <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
	             </uni-forms-item>
	             <uni-forms-item label="邮箱" required name="email">
	                 <input class="input" v-model="formData.email" type="text" placeholder="请输入用户名" @input="binddata('email',$event.detail.value)" />
	             </uni-forms-item>
	             <button @click="submit">Submit</button>
	         </uni-forms>
	     </view>
</template>

<script>
	import uniForm from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormsItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	
	
	export default {
		components:{
			uniForm,
			uniFormsItem,
			uniDataCheckbox
		},
	     data() {
	            return {
	                formData: {
	                    name: 'LiMing',
	                    email: 'dcloud@email.com'
	                },
	                rules: {
	                    // 对name字段进行必填验证
	                    name: {
	                        rules: [{
	                                required: true,
	                                errorMessage: '请输入姓名',
	                            },
	                            {
	                                minLength: 3,
	                                maxLength: 5,
	                                errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
	                            }
	                        ]
	                    },
	                    // 对email字段进行必填验证
	                    email: {
	                        rules: [{
	                            format: 'email',
	                            errorMessage: '请输入正确的邮箱地址',
	                        }]
	                    }
	                }
	            }
	        },
	        methods: {
	            submit() {
	                this.$refs.form.submit().then(res=>{
	                    console.log('表单数据信息：', res);
	                }).catch(err =>{
	                    console.log('表单错误信息：', err);
	                })
	            }
	        }
	}
</script>

<style lang="scss">
	.form{
		padding: 40rpx;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: space-between;
	}
</style>
