<template>
	<view class="container">
		<view class="top-tab">
			<view class="top-tab-item" :class="tab.active?'active':''" @click="switchTab(index)" v-for="(tab, index) in tabs" :key="index">{{tab.name}}</view>
		</view>
		<scroll-view class="tasks-container" v-for="(tasks, taskIndex) in taskList" :key="taskIndex" v-show="taskIndex==selectedIndex"
		 v-bind:style="{height:content_height+'px'}" @scrolltolower="lower" scroll-y v-bind:id="'tab'+taskIndex">
			<view class="task-item" v-for="(task, index) in tasks" :key="index">
				<view v-on:click="goDetail(task.fault_id)">
					<view class="item-header">
						<view> <img v-bind:src="task.head_img?task.head_img:'http://tuofu.likonget.com/operation/img/teacher.png'" class="user-avatar">
						</view>
						<view class="user-item-info">
							<view class="item-title-row">
								<view class="user-name"> <text>{{task.nick_name ? task.nick_name :"匿名用户"}}</text> </view>
								<view class="item-subtitle"> <text class="baoxiu-room">{{task.building_name}}/{{task.room_name}}</text> </view>
							</view>
						</view>
						<view class="status-inner"><text class="state" v-bind:class="'status-'+task.tag">{{task.status_str}}</text></view>
					</view>
					<view class="baoxiu-content"> {{task.fault_desc}}</view>
					<view class="item-images" v-if="task.file_type==1&&task.imgs.length>0">
						<image v-bind:src="img" v-for="(img,imgIndex) in task.imgs" :key="imgIndex"/>
					</view>
					<view class="video-preview" v-if="task.file_type==0&&task.imgs.length>0">
						<image v-bind:src="task.preview_img" />
						<view style="position: relative;">
							<view class="play-container"><text class="iconfont icon-play2"></text></view>
						</view>
					</view>
					<view class="detail-site">
						<text>{{task.ut}}</text>
					</view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	var utils = require('../../common/utils').utils;
	// import topTab from "../../components/top-tab.vue";
	export default {
		data: {
			tabs: [{
				name: "全部",
				active: true,
				status: 0,
				page: 0,
				loading: false
			}, {
				name: "待受理",
				active: false,
				status: 1,
				page: 0,
				loading: false
			}, {
				name: "已受理",
				active: false,
				status: 2,
				page: 0,
				loading: false
			}, {
				name: "处理中",
				active: false,
				status: 10,
				page: 0,
				loading: false
			}, {
				name: "已完成",
				active: false,
				status: 3,
				page: 0,
				loading: false
			}],
			content_height: 0,
			taskList: [],
			selectedIndex: 0
		},
		onLoad(e) {
			var _this = this;
			var ts = [];
			for (var i in this.tabs) {
				ts.push([]);
			}
			this.taskList = ts;
			switch (e.type) {
				case 1:
					this.tag = "task-status status-doing";
					this.status_str = "处理中"
					break;
				case 2:
					this.tag = "task-status status-finish";
					this.status_str = "已处理"
					break;
			}
			uni.getSystemInfo({
				success: function(res) {
					_this.content_height = res.windowHeight - 36;
				}
			})
			this.getList(0);
		},
		methods: {
			switchTab(index) {
				this.selectedIndex = index;
				for (var i in this.tabs) {
					this.tabs[i].active = (i == index + "");
				}
				this.getList(index);
			},
			lower: function(e) {
				this.getList(parseInt(e.currentTarget.id.replace("tab", "")));
			},
			getList(tab) {
				var _this = this;
				(function(tab) {
					utils.requestGet("operation/getmodifylist/" + _this.tabs[tab].page + "/" + _this.tabs[tab].status,
						function(res) {
							if (res.code == 0) {
								var data = res.data;
								if (data.length > 0) {
									_this.tabs[tab].page++;
									var status_str = "";
									for (var j in data) {
										data[j].ut = utils.formatTimeStr(data[j].ut);
										switch (data[j].status) {
											case 0:
												data[j].status_str = "待受理";
												data[j].tag = "undo";
												break;
											case 1:
												data[j].status_str = "已受理";
												data[j].tag = "doing";
												break;
											case 2:
												data[j].status_str = "已完成";
												data[j].tag = "finish";
												break;
											case 3:
												data[j].status_str = "误报";
												data[j].tag = "finish";
												break;
											case 9:
												data[j].status_str = "处理中";
												data[j].tag = "doing";
												break;
											default:
												data[j].status_str = "";
												break
										}
									}
									var list = _this.taskList[tab];
									var newList = list.concat(data);
									_this.taskList.splice(tab, 1, newList);
								}
								//_this.list = res.data;
							}
						})
				})(tab)

			},
			goDetail(e) {
				var dataset = e.currentTarget.dataset;
				uni.navigateTo({
					url: '../detail/detail?school_id=' + dataset.sl + "&fault_id=" + dataset.fault,
				})
			}
		}
// 		components: {
// 			topTab
// 		}
	}
</script>

<style>
	page {
		background: #EAEAEA;
	}

	.tasks-container {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.status-undo {
		border: 1px solid #F96A6A;
		color: #F96A6A;
	}

	.status-doing {
		border: 1px solid #6492FF;
		color: #6492FF;
	}

	.status-finish {
		border: 1px solid #27E1BA;
		color: #27E1BA;
	}
	
	.state{
		border-radius: 80upx;
	}

	.status-inner {
		position: relative;
		top: 10px;
		right: 20px;
		display: inline-block;
		width: 88upx;
		height:88upx;
		font-size: .25rem;
		color: #6492FF;
		text-align: center;
		display: table;
		text-align: center;
	}
	
	.status-inner text{
		display: table-cell;
		vertical-align: middle;
	}


	.play-container {
		position: absolute;
		left: 88upx;
		top: -300upx;
		display: table;
		width: 1.0rem;
		height: 1.0rem;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 1.2rem;
		text-align: center;
	}


	.play-container text {
		font-size: 0.4rem;
		color: white;
		display: table-cell;
		vertical-align: middle;
	}

	.user-item-info {
		margin-left: 16rpx;
		flex: 1;
	}


	.item-header {
		clear: both;
		padding: 8px 16px;
		display: flex;
	}

	.user-avatar {
		float: left;
		width: 0.8rem;
		height: 0.8rem;
		margin-top: 4px;
	}

	.user-name {
		font-size: .3rem;
		font-weight: normal;
		flex: 1;
	}

	.baoxiu-room {
		font-size: .25rem;
	}


	.baoxiu-status {
		position: absolute;
		right: 2px;
		top: 2px;
		background: #09BB07;
		color: white;
		font-size: 0.6rem;
		padding: 0 4px;
		border-radius: 2px;
	}

	.detail-site {
		margin-left: 16upx;
		font-size: 0.25rem;
		margin-top: 18upx;
	}

	.video-preview {
		margin-left: 16upx;
		margin-top: 8upx;
	}

	.video-preview image {
		width: 270upx;
		height: 480upx;
	}

	.item-images {
		width: 13rem;
		clear: both;
		margin-top: 8upx;
		padding: 0 16px;
		max-width: 100%;
	}

	.item-images image {
		width: 2rem;
		height: 2rem;
		max-width: 46%;
		margin-right: 8px;
	}

	.baoxiu-content {
		clear: both;
		font-size: 0.3rem;
		padding: 2px 8px 2px 16px;
	}

	.container {
		display: block;
		width: 100%;
	}

	.task-info {
		display: block;
	}

	.info-container {
		display: flex;
		height: 50px;
		line-height: 50px;
	}


	.task-item {
		background: white;
		padding: 16px 0 16px 16px;
		font-weight: 100;
		border-bottom: 20px solid #EAEAEA;
	}

	.task-item:last-child {
		border-bottom: none
	}

	.link-item {
		background-image: url(data:image/png;
		base64, iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAbFBMVEUAAACKioqKioqKioqUlJSJiYmJiYmIiIiKioqKioqJiYmHh4eNjY2JiYmKioqJiYmKioqKioqKioqIiIiLi4uJiYmJiYmKioqKioqJiYmSkpKKioqJiYmNjY2KioqKioqJiYmJiYmKioqKiorD6jXrAAAAI3RSTlMA+Ej8BN1lS6V1KBUP5tJsXkPyWFHtsjcwIAq9nBrKisWTfzPsyGwAAAINSURBVHja7d1pUsJQEEXhxsSQgSGYIEEZlLf/PeqfWFmAVdx36p4dfFVo5u74x87V49FG/lXpt9VL5N6pSAzJLSWEpEyJIWkTRLJJFMmWIukTRdJYItfeErk4ksoSuTjHE45k4EgKimS0RK61JXJxJAeOZGWJWhzJiSN5s0QtjmSyRK7pSJG0lsgFkmCen5wtkQskeaVIrpbI1VkilyV6dTuKZGOJXCDJjSL54Ei+LFELJPmkSEpL5AJJ3i1RyxK9ypoiCUv0skSviyVyfVsi190SuR4YSWOJXHtL5OJIKkvk6i2Ra+BICopkXEqmyLilZNtFxq0Xkkvk3EJSXCPnFpJ7ZN3hT7KLvBvT3Cbyrp4hWR9Llof4PvLuMEOayLuBAqkhP622gPyxN5B/v5QDIuUUhXLSSDmNp1xYUS51KTcfKLeDKDfoKA7KTWw7tKI8sKI4KI+nKQ7KKxyUl2ooDsqLZxQH5eVMO7SivIhth1SUD2EonybZoZUdWlE+1bVDK8qAAcrIB4wDMuCFMnKHMgTJDq0oDsoIOspQQDu0ogxltUMrygBmykhsO7SiDPKnrFawQyvKQhjKih6Kg7LGyg6tKMv3KOsQ7dCKssSVslbXDq0oy8ApDsrC/CExHL0dUlV2SEVx7O2QqrFDKsrvqoNc18Ya4ogK4ogR4ogW4oi4QBxRNrciHespntQPqIo42u5SG/8AAAAASUVORK5CYII=);
		background-size: 0.3rem;
		background-repeat: no-repeat;
		background-position: 97% center;
		background-position: -webkit-calc(100% - .2rem) center;
		background-position: calc(100% - .2rem) center;
	}

	.task-school {
		height: 68px;
		line-height: 68px;
		border-bottom: 1px solid gainsboro;
		border-top: 1px solid gainsboro;
		display: block;
	}

	.task-container {
		display: flex;
		border-bottom: 1px dashed #AEAEAE;
		overflow: hidden;
	}

	.task-info {
		flex: 1;
	}

	.task-status-inner {
		padding-top: 25px;
	}

	.task-status-container {
		width: 160px;
		text-align: center;
	}

	.task-status {
		width: 100px;
		height: 100px;
		line-height: 100px;
		border-radius: 50px;
		font-size: 0.3rem;
		text-align: center;
		margin: 0 auto;
	}

	.status-doing {
		border: 1px solid #6492FF;
		color: #6492FF;
	}

	.status-finish {
		border: 1px solid #27E1BA;
		color: #27E1BA;
	}

	.info-title {
		color: rgba(0, 0, 0, 0.5);
		font-size: 0.3rem;
	}

	.info-desc {
		flex: 1;
		font-size: 0.3rem;
	}
</style>

