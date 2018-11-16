<template>
	<view class="container">
		<view class="designate" v-for="(item,index) in designates" :key="index" hover-class="uni-list-cell-hover">
			<radio-group class="group" @tap="tabClick(index)">
				<view class="label-2">
					<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
					<label class="label-2-text" :for="item.name">
						<text>{{item.name}}</text>(<text>{{item.text}}</text>)
					</label>
				</view>
			</radio-group>
		</view>
		<view class="button"  hover-class="button-hover">
			<button class="mini-btn" size="mini" @tap="checkboxChange">指派</button>
		</view>
	</view>
</template>

<script>
	var utils = require('../../common/utils').utils;
	export default {
		data() {
			return {
				designates: [],
				building_id: '',
				checked: false,
				radioItems: [],
				to_user: '',
				rec_id: '',
				extrs: []
			};
		},
		onLoad(options) {
			console.log(options)
			this.building_id = options.building_id;
			this.to_user = options.to_user;
			this.rec_id = options.rec_id;
			this.getDesignates(options.building_id)
		},
		methods: {
			getDesignates(building_id){
				var _this = this
				utils.requestGet('operation/loadmymodifier/' + building_id, function(res){
					if(res.code === 0) {
						var data = res.data
						_this.designates = data
						for(var j in data) {
							switch (data[j].role) {
								case 0:
									data[j].text = '平台管理员';
									break;
								case 1:
									data[j].text = data[j].building_name + '楼栋管理员';
									break;
								case 5:
									data[j].text = '运维商管理员';
									break;
								default:
									break;
							}
						}
					}
				})
			},
			checkboxChange: function(e) {
				var that = this
				if(that.radioItems.length === 0 ){
					uni.showToast({
						title: '至少选择一项',
						duration: 2000,
						icon: 'none'
					});
				}else {
					// console.log(String(that.radioItems))
					var _data = {
						status: 9,
						reply_imgs: '',
						reply_desc: '指派【'+ String(that.radioItems) + '】处理此故障',
						to_user: that.to_user,
						rec_id: that.rec_id,
						extrs: String(that.extrs)
					}
					utils.requestPost('operation/postreply', _data, function(res){
						if (res.code === 0) {
							uni.navigateTo({
								url: '../detail/detail?fault_id=' + that.rec_id
							})
						}
					})
				}
			},
			tabClick: function(idx,e) {
				this.designates[idx].checked = !this.designates[idx].checked
				var val = this.designates[idx].name;
				var id = this.designates[idx].user_id
				if(this.designates[idx].checked === true) {
					this.radioItems.push(val)
					this.extrs.push(id)
				}else{
					this.radioItems.splice(val, 1)
					this.extrs.splice(id, 1)
				}
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
	button {
		float: right;
	}
	.group {
		margin-left: .3rem;
	}
	.designate:nth-child(1) .group {
		margin-left: 0;
	}
	.designate:nth-child(1) .group radio {
		margin-left: .4rem;
	}
	.label-2 {
		border-top: 1upx solid #E5E5E5;
		line-height: .8rem;
	}
	.label-2-text {
		margin-left: .2rem;
	}
	radio {
		margin-left: .1rem;
	}
	.button {
		font-size: .28rem;
		position: absolute;
		right: .3rem;
		overflow: hidden;
		margin-bottom: .2rem;
	}
	.mini-btn {
		background: #6492FF;
		color: white;
	}
	.button-hover button {
		background: #007AFF;
	}
</style>