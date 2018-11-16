<template>
	<view class="content">
		<view class="access-item" v-for="item in modules" :key="item.id" :data-access="item.access" @tap="goDetail">
			<view class="access-item-inner">
				<view class="info-outer">
					<view class="info-inner">
						<image :src='item.imgurl'></image>
						<view class="access-title">
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="do-num-container" v-if="item.num">
					<view class="do-num-inner">
						{{task_num}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var utils=require( '../../common/utils').utils;
	export default {
		data () {
			return {
				task_num: 0,
				modules: [
					{id: 1, title: '维修工单', imgurl: '../../static/img/index/0.png', access: '../repairs/repairs', num:true},
					{id: 2, title: '报修记录', imgurl: '../../static/img/index/1.png', access: '../log-address/log-address', num:false},
					{id: 3, title: '分组设置', imgurl: '../../static/img/index/2.png', access: '../tabbar/tabbar', num:false},
					{id: 4, title: '提醒设置', imgurl: '../../static/img/index/3.png', access: '../web/web', num:false},
					{id: 5, title: '数据统计', imgurl: '../../static/img/index/4.png', access: '../web/web', num:false},
					{id: 6, title: '邀请管理', imgurl: '../../static/img/index/5.png', access: '../regulate/regulate', num:false},
					{id: 7, title: '运维管理', imgurl: '../../static/img/index/6.png', access: '../web/web', num:false},
					{id: 8, title: '反馈信息', imgurl: '../../static/img/index/7.png', access: '../web/web', num:false},
					{id: 9, title: '教室设备', imgurl: '../../static/img/index/8.png', access: '../school/school', num:false},
					{id: 10, title: '通讯信息', imgurl: '../../static/img/index/9.png', access: '../repairs/repairs', num:false}
				]
			}
			
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
	}

	.content {
		padding: 4upx 0.26rem 0.26rem 0.26rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around ;
	}

	.access-item {
		/* display: block; */
		/* float: left; */
		width: 46%;
		/* overflow: hidden; */
	}

	.access-item-inner {
		background: #6492FF;
		border-radius: .16rem;
		margin-top: 0.22rem;
		text-align: center;
		width: 100%;
		height: 2.4rem;
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
		margin-top: 4upx;
	}

	.info-outer {
		display: table;
		text-align: center;
		width: 100%;
		height: 2.4rem;
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
