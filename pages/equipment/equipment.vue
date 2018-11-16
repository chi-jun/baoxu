<template>
	<view class="container">
		<view class="designate" v-for="(item,index) in radioItems" :key="index" hover-class="uni-list-cell-hover">
			<radio-group class="group" @tap="tabClick(index)">
				<view class="label-2">
					<radio :id="item.device_id" :value="item.lable" :checked="item.checked"></radio>
					<label class="label-2-text" :for="item.lable">
						<text>{{item.lable}}</text>(<text>{{item.barcode}}</text>)
					</label>
				</view>
			</radio-group>
		</view>
		<view class="button" hover-class="button-hover">
			<button class="mini-btn" size="mini" @tap="checkboxChange">提交</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	var utils = require('../../common/utils').utils;
	export default {
		data() {
			return {
				equipments: [],
				radioItems: [],
				dev_id: [],
				lable: []
			};
		},
		computed: mapState(['fault_dev','lable']),
		onLoad(options) {
			this.getEquipment(options.room_id)
		},
		methods: {
			...mapMutations(['setFaults', 'setFaultDev','setLables']),
			getEquipment(id){
				var _this = this
				utils.requestGet('device/loadroomdevices/'+id, function(res){
					if(res.code === 0) {
						_this.radioItems = res.data
					}
				})
			},
			checkboxChange: function(e) {
				if (this.equipments.length === 0 ) {
					uni.showToast({
						title: '至少选择一项',
						duration: 2000,
						icon: 'none'
					});
				}else {
					this.setFaults(this.equipments);
					this.setFaultDev(this.dev_id);
					this.setLables(this.lable);
					uni.navigateBack({
						delta: 1
					});
				}
			},
			tabClick: function(idx,e) {
				this.radioItems[idx].checked = !this.radioItems[idx].checked
				var lable = this.radioItems[idx].lable;
				var device = this.radioItems[idx].device_id
				var barcode = this.radioItems[idx].barcode
				var val = lable + '('+ barcode + ')'
				if(this.radioItems[idx].checked === true) {
					this.equipments.push(val)
					this.dev_id.push(device)
					this.lable.push(lable)
				}else{
					this.dev_id.splice(device, 1)
					this.equipments.splice(val, 1)
					this.lable.splice(lable, 1)
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
	.container {
		position: relative;
		padding-top:.3rem;
		border-top: 1upx solid #CCCCCC;
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
		font-size: .36rem;
	}
	radio {
		margin-left: .1rem;
	}
	.button {
		/* font-size: .28rem; */
		position: absolute;
		right: .3rem;
		margin-top: .2rem;
		overflow: hidden;
	}
	.mini-btn {
		background: #6492FF;
		color: white;
	}
	.button-hover button {
		background: #007AFF;
	}
	button {
		float: right;
	}
</style>