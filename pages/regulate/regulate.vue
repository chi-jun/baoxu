<template>
	<!-- 邀请管理 -->
	<view class="container">
		<view class="variety" v-for="(variety,index) in varietys " :key="index" hover-class="uni-list-cell-hover" @tap="goDetail(variety.go)">
			<view class="variety-title">{{variety.name}}</view>
			<view class="icons uni-icon-arrowright uni-icon"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				varietys: [
					{name: '平台管理员', go: '../platform/platform'},
					{name: '维修工程师'},
					{name: '楼栋管理员'},
					{name: '学生助理'}
				]
			};
		},
		methods: {
			goDetail(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	@import '../../common/icon.css';
	page {
		border-top: 1upx solid #E5E5E5;
	}
	.container {
		margin-left: .4rem;
	}
	.variety {
		border-bottom: 1upx solid #E5E5E5;
		line-height: .9rem;
		font-size: 32upx;
		overflow: hidden;
	}
	.variety-title {
		float: left;
		margin-left: .1rem;
		color: #333333;
	}
	.icons {
		float: right;
		margin-right: .1rem;
	}
</style>
