<template>
	<view class="container">
		<view class="task-item" v-for="(school, index2) in list" :key="index2">
			<view class="task-school link-item" onclick="openMap('{school_name}','{gl_location}')">{{school.school_name}}</view>

			<view class="task-container" @tap="goDetail" :data-fault="item.fault_id" :data-sl="school.school_id" v-for="(item, index) in school.task"
			    :key="index">

				<view class="task-info">
					<view class="info-container">
						<view class="info-title">工单编号:</view>
						<view class="info-desc">{{item.task_num}}</view>

					</view>
					<view class="info-container">
						<view class="info-title">报修地址:</view>
						<view class="info-desc">{{item.building_name}}&nbsp;/&nbsp;{{item.room_name}}</view>
					</view>
					<view class="info-container">
						<view class="info-title">受理时间:</view>
						<view class="info-desc">{{item.accept_time}}</view>
					</view>
				</view>
				<view class="task-status-container">
					<view class="task-status-inner">
						<view :class="tag"> {{status_str}}</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var utils = require('../../common/utils').utils;
	export default {
		data () {
			return {
				list: [],
				tag: "task-status status-doing",
				status_str: "处理中"
			}
			
		},
		onLoad(e) {
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
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			getList() {
				var _this = this;
				var data = {
					type: 1
				}
				utils.requestGet("operation/getmodifylist/" + this.status_str + "/" + data, function (res) {
					console.log(res);
					if (res.code == 0) {
						_this.list = res.data;
					}
				})
			},
			goDetail(e){
				var dataset=e.currentTarget.dataset;
				uni.navigateTo({
					url:'../detail/detail?school_id='+dataset.sl+"&fault_id="+dataset.fault,
				})
			}
		}
	}
</script>

<style>
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
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAbFBMVEUAAACKioqKioqKioqUlJSJiYmJiYmIiIiKioqKioqJiYmHh4eNjY2JiYmKioqJiYmKioqKioqKioqIiIiLi4uJiYmJiYmKioqKioqJiYmSkpKKioqJiYmNjY2KioqKioqJiYmJiYmKioqKiorD6jXrAAAAI3RSTlMA+Ej8BN1lS6V1KBUP5tJsXkPyWFHtsjcwIAq9nBrKisWTfzPsyGwAAAINSURBVHja7d1pUsJQEEXhxsSQgSGYIEEZlLf/PeqfWFmAVdx36p4dfFVo5u74x87V49FG/lXpt9VL5N6pSAzJLSWEpEyJIWkTRLJJFMmWIukTRdJYItfeErk4ksoSuTjHE45k4EgKimS0RK61JXJxJAeOZGWJWhzJiSN5s0QtjmSyRK7pSJG0lsgFkmCen5wtkQskeaVIrpbI1VkilyV6dTuKZGOJXCDJjSL54Ei+LFELJPmkSEpL5AJJ3i1RyxK9ypoiCUv0skSviyVyfVsi190SuR4YSWOJXHtL5OJIKkvk6i2Ra+BICopkXEqmyLilZNtFxq0Xkkvk3EJSXCPnFpJ7ZN3hT7KLvBvT3Cbyrp4hWR9Llof4PvLuMEOayLuBAqkhP622gPyxN5B/v5QDIuUUhXLSSDmNp1xYUS51KTcfKLeDKDfoKA7KTWw7tKI8sKI4KI+nKQ7KKxyUl2ooDsqLZxQH5eVMO7SivIhth1SUD2EonybZoZUdWlE+1bVDK8qAAcrIB4wDMuCFMnKHMgTJDq0oDsoIOspQQDu0ogxltUMrygBmykhsO7SiDPKnrFawQyvKQhjKih6Kg7LGyg6tKMv3KOsQ7dCKssSVslbXDq0oy8ApDsrC/CExHL0dUlV2SEVx7O2QqrFDKsrvqoNc18Ya4ogK4ogR4ogW4oi4QBxRNrciHespntQPqIo42u5SG/8AAAAASUVORK5CYII=);
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
		color: rgba( 0, 0, 0, 0.5);
		font-size: 0.3rem;
	}

	.info-desc {
		flex: 1;
		font-size: 0.3rem;
	}
</style>
