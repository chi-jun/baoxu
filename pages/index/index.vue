<template>
	<view class="content">
		<view class="access-item" data-access="../log-task/log-task" @tap="goDetail">
			<view class="access-item-inner">
				<view class="info-outer">
					<view class="info-inner">
						<image src="../../static/img/finish.png"></image>
						<view class="access-title">后勤工单</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="access-item" data-access="../log-address/log-address" @tap="goDetail">
			<view class="access-item-inner">
				<view class="info-outer">					
					<view class="info-inner">
						<image src="../../static/img/jiaoshi.png"></image>
						<view class="access-title">地址管理</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var utils=require( '../../common/utils').utils;
	export default {
		data: {
			task_num: 0
		},
		onLoad() {
			var _this=this;
			utils.checkAuth(function(res){
				_this.getTaskNum()
			});
			
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.access
				})
			},
			getTaskNum(){
				var _this = this;
				utils.requestGet('operation/task/unfinish/num',function(res){
					if(res.code==0&&res.data>0){
						_this.task_num=res.data;						
					}
					
				});
			}
		}
	}
</script>

<style>
	view {
		display: block;
		width: 100%;
	}

	.access-container {
		padding: 8px;
	}

	.access-item {
		display: block;
		float: left;
		width: 50%;
		overflow: hidden;
	}

	.access-item-inner {
		background: #6492FF;
		border-radius: 6px;
		margin: 0.1rem;
		text-align: center;
		width: 95%;
		height: 2.8rem;
	}


	.do-num-container {
		position: relative;
		left: 0.4rem;
		color: white;
		text-align: center;
		top: -2.2rem;
	}

	.do-num-inner {
		background: #F96A6A;
		width: 0.5rem;
		height: 0.5rem;
		line-height: 0.5rem;
		margin: 0 auto;
		border-radius: 0.25rem;
		font-size: 0.3rem;
		/* display: none; */
	}


	.access-title {
		font-size: 0.3rem;
		color: white;
		margin-top: 4px;
	}

	.info-outer {
		display: table;
		text-align: center;
		width: 100%;
		height: 2.8rem;
	}

	.info-inner {
		display: table-cell;
		vertical-align: middle;
	}

	.info-inner image {
		width: 0.7rem;
		height: 0.7rem;
	}
</style>
