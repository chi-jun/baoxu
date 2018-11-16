<template>
	<view class="index">
		<view class="nav">
			<view :class="['fea',tab.active ? 'on' : '']" v-for="(tab,index) in tabs" :key="index" :data-current="tab.idx" :id="tab.id" @tap="tapNav(index)">
				{{tab.name}}
			</view>
		</view>
		<scroll-view class="tasks-container" v-for="(tasks, taskIndex) in taskList" :key="taskIndex" v-show="taskIndex==selectedIndex"
				 :style="{height:content_height+'px'}" @scrolltolower="lower" scroll-y :id="'tab'+taskIndex">
			<view class="task-item" v-for="(task, index) in tasks" :key="index">
				<view @tap="goDetail(task.fault_id)" :data-num="schools_id">
					<view class="item-header">
						<view> <img :src="task.head_img?task.head_img:'http://tuofu.likonget.com/operation/img/teacher.png'" class="user-avatar">
						</view>
						<view class="user-item-info">
							<view class="item-title-row">
								<view class="user-name"> <text>{{task.nick_name?task.nick_name:"匿名用户"}}</text> </view>
								<view class="item-subtitle"> <text class="baoxiu-room">{{task.building_name}}/{{task.room_name}}</text> </view>
							</view>
						</view>
						<view class="status-inner"><text class="state" :class="'status-'+task.tag">{{task.status_str}}</text></view>
					</view>
					<view class="baoxiu-content"> {{task.fault_desc}}</view>
					<!-- 图片 -->
					<view class="item-images" v-if="task.file_type==1&&task.imgs.length>0">
						<image :src="img" v-for="(img,imgIndex) in task.imgs" :key="imgIndex" @tap.stop="changePreview(task.imgs)"/>
					</view>
					<!-- 视频 -->
					<view class="video-preview" v-if="task.file_type==0&&task.imgs.length>0">
						<image :src="task.preview_img" />
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
	export default {
		data () {
			return {
				tabs: [
					{ name: "全部", active: true, status: 0, page: 0, loading: false },
					{	name: "待受理", active: false, status: 1, page: 0, loading: false },
					{ name: "已受理", active: false, status: 2, page: 0, loading: false },
					{ name: "处理中", active: false, status: 10, page: 0, loading: false },
					{ name: "已完成", active: false, status: 3, page: 0, loading: false },
				],
				content_height: 0,
				taskList: [],
				selectedIndex: 0,
			}
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
					this.status_str = "已完成"
					break;
			}
			uni.getSystemInfo({
				success: function(res) {
					_this.content_height = res.windowHeight - 36;
				}
			})
			this.getOrders(0);
			// var schools = [];
			
		},
		onReachBottom(){   //页面上拉触底事件的处理函数
		},
		methods: {
			tapNav (index) {
				this.selectedIndex = index;
				for (var i in this.tabs) {
					this.tabs[i].active = (i == index + "");
				}
				this.getOrders(index);
				// console.log(this.taskList)
			},
			lower: function(e) {
				this.getOrders(parseInt(e.currentTarget.id.replace("tab", "")));
			},
			getOrders (tab) {
				var _this = this;
				(function(tab) {
					utils.requestGet("operation/getmodifylist/" + _this.tabs[tab].page + "/" + _this.tabs[tab].status,
						function(res) {
							// console.log(res)
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
							}
						})
				})(tab)
			},
			goDetail:function(fault_id) {
				uni.getStorage({
					key: 'userinfo',
					success: function (res) {
						var _id = JSON.parse(res.data).schools[0].id
						uni.navigateTo({
							url: '../detail/detail?school_id=' + _id + "&fault_id=" + fault_id
						})
					}
				});
			},
			changePreview(urls){
				uni.previewImage({
					urls: urls
				});
			}
		}
	}
</script>

<style>
	.index {
		background: #DCDCDC;
	}
	.nav {
		background: white;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around ;
		border-top: 2upx solid #EFEFF4;
		border-bottom: 1upx solid #EFEFF4;
	}
	.fea {
		width: 20%;
		text-align: center;
		color: #777777;
		font-size: .36rem;
		line-height: .64rem;
	}
	.on {
		color: #6492FF;
		border-bottom: 5upx solid #6492FF;
	}
	/* .item {
		height: 300upx;
	} */
	page {
		background: #EAEAEA;
	}

	.tasks-container {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.status-undo {
		border: 1upx solid #F96A6A;
		color: #F96A6A;
	}

	.status-doing {
		border: 1upx solid #6492FF;
		color: #6492FF;
	}

	.status-finish {
		border: 1upx solid #27E1BA;
		color: #27E1BA;
	}
	
	.state{
		border-radius: .8rem;
	}

	.status-inner {
		position: relative;
		top: .1rem;
		right: .2rem;
		display: inline-block;
		width: .88rem;
		height: .88rem;
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
		left: .88rem;
		top: -3rem;
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
		margin-left: .16rem;
		flex: 1;
	}

	.item-header {
		clear: both;
		padding: 8upx .16rem;
		display: flex;
	}

	.user-avatar {
		float: left;
		width: 0.8rem;
		height: 0.8rem;
		margin-top: 4upx;
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
		right: 2upx;
		top: 2upx;
		background: #09BB07;
		color: white;
		font-size: 0.6rem;
		padding: 0 4upx;
		border-radius: 2upx;
	}

	.detail-site {
		margin-left: .16rem;
		font-size: 0.25rem;
		margin-top: .18rem;
	}

	.video-preview {
		margin-left: .16rem;
		margin-top: 8upx;
	}

	.video-preview image {
		width: 2.70rem;
		height: 4.80rem;
	}

	.item-images {
		width: 13rem;
		clear: both;
		margin-top: 8upx;
		padding: 0 .16rem;
		max-width: 100%;
	}

	.item-images image {
		width: 2rem;
		height: 2rem;
		max-width: 46%;
		margin-right: 8px;
		z-index: 9999;
	}

	.baoxiu-content {
		clear: both;
		font-size: 0.3rem;
		padding: 2upx .08rem 2upx .16rem;
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
		height: .5rem;
		line-height: .5rem;
	}

	.task-item {
		background: white;
		padding: .16rem 0 .16rem .16rem;
		font-weight: 100;
		border-bottom: .20rem solid #EAEAEA;
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
		height: .68rem;
		line-height: .68rem;
		border-bottom: 1upx solid gainsboro;
		border-top: 1upx solid gainsboro;
		display: block;
	}

	.task-container {
		display: flex;
		border-bottom: 1upx dashed #AEAEAE;
		overflow: hidden;
	}

	.task-info {
		flex: 1;
	}

	.task-status-inner {
		padding-top: .25rem;
	}

	.task-status-container {
		width: 160upx;
		text-align: center;
	}

	.task-status {
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: .5rem;
		font-size: 0.3rem;
		text-align: center;
		margin: 0 auto;
	}

	.status-doing {
		border: 1upx solid #6492FF;
		color: #6492FF;
	}

	.status-finish {
		border: 1upx solid #27E1BA;
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
