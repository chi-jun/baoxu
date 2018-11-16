<!-- 维修工单 -->
<template>
	<view class="">
		<!-- index.wxml-->
		<button class="show-btn" @tap="showDialogBtn">弹窗</button>
		<view class="modal-mask" @tap="hideModal" catchtouchmove="preventTouchMove" v-if="showModal"></view>
		<!-- <view class="modal-dialog" v-if="showModal">
			<view class="modal-title">添加数量</view>
			<view class="modal-content">
				<view class="modal-input">
					<input placeholder-class="input-holder" type="number" maxlength="10" @input="inputChange" class="input"
					 placeholder="请输入数量"></input>
				</view>
			</view>
			<view class="modal-footer">
				<view class="btn-cancel" @tap="onCancel" data-status="cancel">取消</view>
				<view class="btn-confirm" @tap="onConfirm" data-status="confirm">确定</view>
			</view>
		</view> -->
		<!-- <view class="fault" v-if="showModal">
			<view class="fault-title">
				请确认是否有故障
			</view>
			<view class="wb">
				确认误报
			</view>
			<view class="gz">
				确认有故障
			</view>
			<view class="zb">
				暂不确认
			</view>
		</view> -->
		<view class="wglx" v-if="showModal">
			<view class="page-section page-section-gap" v-for="(item,index) in radioItems" :key="index">
				<radio-group class="group" @tap="tabClick(index)">
					<view class="label-2">
						<radio :id="item.name" :value="item.name" :checked="item.checked" color="#007AFF"></radio>
						<label class="label-2-text" :for="item.name">
							<text>{{item.name}}</text>
						</label>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- <view hover-class="uni-list-cell-hover" v-for="(item,index) in radioItems" :key="index">
			<radio-group class="group" @tap="tabClick(index)">
				<view class="label-2">
					<radio :id="item.name" :value="item.name" :checked="item.checked" color="#007AFF"></radio>
					<label class="label-2-text" :for="item.name">
						<text>{{item.name}}</text>
					</label>
				</view>
			</radio-group>
		</view>
		
		<button type="primary">提交</button> -->
	</view>
</template>
<script>
	var utils = require('../../common/utils').utils;
	export default {
		data() {
			return {
				values: [],
				showModal: false,
				radioItems: [
					{
						name: '恶意虚假提交',
						value: '恶意虚假提交',
						checked: false
					},
					{
						name: '不雅内容',
						value: '不雅内容',
						checked: false
					},
					{
						name: '谣言',
						value: '谣言',
						checked: false
					},
					{
						name: '不正当言论',
						value: '不正当言论',
						checked: false
					},
					{
						name: '其它',
						value: '其它',
						checked: false
					}
				]
			}
		},
		onLoad: function() {},
		methods: {
			tabClick: function(idx,e) {
				this.radioItems[idx].checked = !this.radioItems[idx].checked
				var val = this.radioItems[idx].value;
				if(this.radioItems[idx].checked === true) {
					this.values.push(val)
				}else{
					this.values.splice(val,1)
				}
			},
			tapEvent: function (e) {
				console.log('按钮被点击')
			},
			radioChange: function (e) {
				var checked = e.target.value
				// this.values.push(checked)
				console.log(e)
				console.log(this.values)
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true
					} else {
						changed['radioItems[' + i + '].checked'] = false
					}
				}
			},
			actionSheetTap() {
				uni.showActionSheet({
					itemList: ['A', 'B', 'C'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			/**
			 * 弹窗
			 */
			showDialogBtn: function() {
				this.showModal = true
			},

			/**
			 * 弹出框蒙层截断touchmove事件
			 */
			preventTouchMove: function() {},

			/**
			 * 隐藏模态对话框
			 */
			hideModal: function() {
				this.showModal = false
			},

			/**
			 * 对话框取消按钮点击事件
			 */
			onCancel: function() {
				this.hideModal();
			},

			/**
			 * 对话框确认按钮点击事件
			 */
			onConfirm: function() {
				this.hideModal();
			}
		}

	}
</script>

<style>
	.label-2 {
		border-bottom: 1upx solid #BBBBBB;
		line-height: .8rem;
	}
	.group {
		margin-left: .3rem;
	}
	.label-2-text {
		margin-left: .2rem;
	}
	.wglx {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		background: #FFFFFF;
		width: 5rem;
		padding: .6rem;
	}
	.label-2 {
		line-height: 90upx;
	}
	.label-2-text {
		margin-left: 20upx;
	}
	.show-btn {
		margin-top: 100rpx;
		color: #22cc22;
	}

	.fault {
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}

	.fault-title {
		background: #f9f9f9;
		line-height: 1.2rem;
		color: #BBBBBB;
		text-align: center;
	}

	.wb {
		background: #f9f9f9;
		line-height: .9rem;
		color: #F96A6A;
		border-top: 1upx solid #A1A1A1;
		text-align: center;
	}

	.gz {
		background: #f9f9f9;
		text-align: center;
		line-height: .9rem;
		border-top: 1upx solid #A1A1A1;
	}

	.zb {
		line-height: .9rem;
		margin-top: 20upx;
		background: #DD524D;
		color: #FFFFFF;
		text-align: center;
	}

	.modal-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.5;
		overflow: hidden;
		z-index: 9000;
		color: #fff;
	}

	.modal-dialog {
		width: 540rpx;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 0;
		z-index: 9999;
		background: #f9f9f9;
		margin: -180rpx 105rpx;
		border-radius: 36rpx;
	}

	.modal-title {
		padding-top: 50rpx;
		font-size: 36rpx;
		color: #030303;
		text-align: center;
	}

	.modal-content {
		padding: 50rpx 32rpx;
	}

	.modal-input {
		display: flex;
		background: #fff;
		border: 2rpx solid #ddd;
		border-radius: 4rpx;
		font-size: 28rpx;
	}

	.input {
		width: 100%;
		height: 82rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		color: #333;
	}

	input-holder {
		color: #666;
		font-size: 28rpx;
	}

	.modal-footer {
		display: flex;
		flex-direction: row;
		height: 86rpx;
		border-top: 1px solid #dedede;
		font-size: 34rpx;
		line-height: 86rpx;
	}

	.btn-cancel {
		width: 50%;
		color: #666;
		text-align: center;
		border-right: 1px solid #dedede;
	}

	.btn-confirm {
		width: 50%;
		color: #ec5300;
		text-align: center;
	}
</style>
