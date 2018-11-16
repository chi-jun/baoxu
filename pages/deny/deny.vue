<template>
	<view class="container">
		<view class="opt-icon">
			<text class="iconfont">&#xe685;</text>
		</view>
		<view class="opt-lable">
			<text>无权访问</text>
		</view>
		<view class="opt-desc">
			<text>您还不是任何学校管理人员。若您已经申请并通过成为学校管理人员，请点击以下按钮刷新授权。</text>
		</view>
		<view class="opt-button-container">
			<button type="default" :size="primarySize" @tap="defaultHandler">
			刷新授权 </button>
		</view>
	</view>
</template>

<script>
	export default {
       methods:{
		   defaultHandler:function(){
			   uni.redirectTo({
			   	url:'../login/login',
			   })
		   }
	   },
	}
</script>

<style>
	@import "../../static/css/iconfont.css";

	view {
		display: block;
	}

	.container {
		width: 100%;
		text-align: center;
	}

	.iconfont {
		font-size: 1.8rem;
		color: #F96A6A;
	}

	.opt-icon {
		margin-top: 15%;
	}


	.opt-lable {
		margin-top: 8px;
		font-size: 0.4rem;
	}

	.opt-desc {
		padding: 24px;
		font-size: 0.3rem;
		color: #888888;
	}
	
	.opt-button-container{
		padding: 24px;
		font-size: 0.3rem;
	}
	
	.primary-btn{
		background: #6492FF;
		color: white;
	}
</style>
