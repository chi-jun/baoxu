<template>
	<view class="container">
		<view class="device">
			<view class="device-title title-type">
				<view class="title-lx">
					违规类型
				</view>
				<view class="title-nr" @tap="showDialogBtn">
					<view class="nr-type">
						{{type}}
					</view>
					<view class="icons uni-icon-arrowright uni-icon"></view>
				</view>
			</view>
			<view class="device-title">
				备注信息
			</view>
			<view class="textarea-wrp">
				<textarea class="textare" placeholder-style="color:#888888" placeholder="请输入备注信息" maxlength="200" @input="getLeng" />
				</view>
			<view class="nums">
				<view class="num">
					{{num}}/200
				</view>
			</view>
			<view class="attention">
				注：发言者发布违规内容被举报后，若系统管理员审核通过或有多人举报该记录，发布者发布的所有信息均将被屏蔽且发布者会被禁止发布任何内容。
			</view>
		</view>
		<view class="button"  hover-class="button-hover">
			<button class="mini-btn" size="mini" hover-class="button-hover" @tap="getSubmit">提交</button>
		</view>
		<view class="modal-mask" @tap="hideModal" catchtouchmove="preventTouchMove" v-if="showModal"></view>
		<view class="wglx" v-if="showModal">
			<view class="page-section page-section-gap">
				<radio-group class="group" @change="radioChange">
					<view class="label-2" v-for="(item,index) in radioItems" :key="index">
						<radio :id="item.name" :value="item.name" :checked="item.checked" color="#007AFF"></radio>
						<label class="label-2-text" :for="item.name">
							<text>{{item.name}}</text>
						</label>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '恶意虚假提交',
				num: 0,
				showModal: false,
				radioItems: [
					{ name: '恶意虚假提交', value: '恶意虚假提交', checked: true },
					{ name: '不雅内容', value: '不雅内容', checked: false},
					{ name: '谣言', value: '谣言', checked: false},
					{ name: '不正当言论', value: '不正当言论', checked: false},
					{ name: '其它', value: '其它', checked: false}
				]
			};
		},
		methods: {
			getLeng(e) {
				this.num = e.detail.value.length
			},
			// 我来处理
			showDialogBtn: function() {
					this.showModal = true
			},

			/**
			 * 弹出框蒙层截断touchmove事件
			 */
			preventTouchMove: function() {},
			hideModal: function() {
				this.showModal = false
			},
			radioChange: function (e) {
				var checked = e.target.value
				this.type = checked
// 				var changed = {}
// 				for (var i = 0; i < this.radioItems.length; i++) {
// 					if (checked.indexOf(this.radioItems[i].name) !== -1) {
// 						changed['radioItems[' + i + '].checked'] = true
// 					} else {
// 						changed['radioItems[' + i + '].checked'] = false
// 					}
// 				}
				setTimeout(function(){
					this.showModal = false
				}.bind(this),400)
			},
			getSubmit() {
				if (this.num === 0) {
					uni.showToast({
						title: '请输入备注信息',
						duration: 2000,
						icon: 'none'
					});
				}else {
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>
	@import '../../common/icon.css';

	page {
		background: #EFEFF4;
		width: 100%;
		height: 100%;
	}

	.device {
		padding-left: .25rem;
		background: white;
	}

	.container {
		position: relative;
		background: #EFEFF4;
		padding-top: .4rem;
	}

	.device-title {
		border-bottom: 1upx solid #E5E5E5;
		line-height: .80rem;
		font-size: .33rem;
		color: #333333;
	}

	.title-type {
		overflow: hidden;
	}

	.title-lx {
		width: 20%;
		float: left;
	}

	.title-nr {
		width: 80%;
		float: left;
	}

	.nr-type {
		float: left;
		width: 60%;
		text-align: center;
	}

	textarea {
		width: 7rem;
		line-height: .34rem;
		font-size: .32rem;
	}

	.textarea-wrp {
		padding: .25rem 0;
	}

	.textare {
		height: 1.4rem;
	}

	.icons {
		color: #C7C7CC;
		line-height: .9rem;
		font-size: .3rem;
		float: right;
		margin-right: .2rem;
	}

	.nums {
		padding-bottom: .16rem;
		color: #A1A1A1;
		font-size: .33rem;
		padding-right: .3rem;
		overflow: hidden;
	}

	.num, button {
		float: right;
	}

	.attention {
		font-size: .28rem;
		color: #A1A1A1;
		padding: .1rem .1rem;
	}

	.button {
		font-size: .28rem;
		position: absolute;
		right: .3rem;
		overflow: hidden;
		margin-top: .2rem;
	}
	.mini-btn {
		background: #6492FF;
		color: white;
	}
	.button-hover button {
		background: #007AFF;
	}

	/* 我来处理弹窗 */
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

	.wglx {
		position: absolute;
		/* top: 50%; */
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
</style>
