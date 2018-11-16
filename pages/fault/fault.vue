<template>
	<view class="coures">
		<view class="page-section">
			<view class="page-section-title">故障原因/修复过程</view>
			<view class="textarea-wrp">
				<textarea class="textare" placeholder-style="color:#888888" placeholder="请输入故障原因/修复过程" maxlength="200" @input="getLeng"/>
			</view>
			<view class="nums">
				<view class="num">
					{{num}}/200
				</view>
			</view>
			<view class="page-section-title">相关照片</view>
			<view class="picture">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file attention">
							<image class="uploader-img" :src="image" :data-src="image"></image>
							<view class="uni-icon-minus-filled uni-icon jians" :data-idx='index' @tap="getRecord"></view>
						</view>
					</block>
				</view>
				<view class="uni-uploader">
					<view class="uploader-input" @tap="chooseImage">
						<image src="../../static/img/photo.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="xuanz" @tap="geteEuipment" hover-class="uni-list-cell-hover">
				<view class="left">
					故障设备
				</view>
				<view class="right">
					选择
					<view class="icons uni-icon-arrowright uni-icon"></view>
				</view>
			</view>
			<view class="uni-list-cell" v-for="(fault,index) in faults" :key="index">
				<view class="uni-list-cell-navigate">
					{{fault}}
				</view>
			</view>
		</view>
		<view class="button" hover-class="button-hover">
			<button class="mini-btn" size="mini" hover-class="button-hover" @tap="getSubmit">提交</button>
		</view>
	</view>
</template>
<script>
	var utils = require('../../common/utils').utils;
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'textarea',
				focus: false,
				num: 0,
				imageList: [],
				faultItems: [],
				reply_imgs: '',
				to_user: '',
				rec_id: '',
				tempFilePaths: '',
				text: '',
				room_id: ''
			}
		},
		computed: mapState(['faults', 'fault_dev', 'lables']),
		onLoad(options) {
			var _this = this
			console.log(options);
			_this.rec_id  = options.rec_id;
			_this.to_user = options.to_user;
			_this.room_id = options.room_id;
		},
		methods: {
			...mapMutations(['setFaults']),
			getLeng(e){
				this.num = e.detail.value.length
				this.text = e.detail.value
			},
			// 删除图片
			getRecord(event){
				var indx = event.target.dataset.idx;
				this.imageList.splice(indx,1)
			},
			chooseImage: async function () {
				if(this.imageList.length === 4){
					let isContinue = await this.isFullImg();
					console.log("是否继续?",isContinue);
					if(!isContinue){
						return;
					}
				}
				uni.chooseImage({  
					count: 4,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.tempFilePaths = res.tempFilePaths[0]
						this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList)
					}
				});
			},
			isFullImg:function(){
				return new Promise((res) => {
					uni.showModal({
						content:"已经有4张图片了,是否清空现有图片？",
						success: (e) => {
							if(e.confirm){
								this.imageList = [];
								res(true);
							}else{
								res(false)
							}
						},
						fail:() => {
							res(false)
						}
					})
				})
			},
			// 获取设备
			geteEuipment() {
				var that = this
				uni.navigateTo({
					url: '../equipment/equipment?room_id=' +that.room_id
				})
			},
			getSubmit() {
				// 判断有没有输入故障描述
				if (this.num === 0) {
					uni.showToast({
						title: '请输入故障描述',
						duration: 2000,
						icon: 'none'
					});
				}else {
					var _this = this;
					// 判断有没有选择图片
					if (_this.imageList.length === 0){
						// 判断有没有选择故障设备
						if(_this.faults.length === 0){
							uni.showToast({
								title: '至少选择一件故障设备',
								duration: 2000,
								icon: 'none'
							});
						}else if(_this.faults.length > 0) {
							console.log(_this.text)
// 							uni.navigateBack({
// 								delta: 1
// 							});
							var _data = {
								action: 'fault',
								reply_imgs: _this.reply_imgs,
								reply_desc: '故障原因/修复过程:' + _this.text +'<br />故障设备:'+String(_this.lables).replace(',', '、'),
								to_user: _this.to_user,
								rec_id: _this.rec_id,
								fault_dev: _this.fault_dev
							}
							utils.requestPost('operation/postreply', _data, function(res){
								if(res.code === 0) {
									uni.navigateBack({
										delta: 1
									});
								}
							})
						}
					}else {
						if(_this.faults.length === 0) {
							uni.showToast({
								title: '至少选择一件故障设备',
								duration: 2000,
								icon: 'none'
							});
						}else if (_this.faults.length > 0) {
							uni.showToast({
								title: '正在上传图片',
								duration: 800,
								icon: 'none'
							})
							uni.uploadFile({
								url: 'https://' + utils.host + '/weixinweb/xiaochengcxufile/1',
								filePath: _this.tempFilePaths,
								name: 'upfile',
								success: (res) => {
									var data = JSON.parse(res.data);
									_this.reply_imgs = data.url;
									var _data = {
										action: 'fault',
										status: 9,
										reply_imgs: _this.reply_imgs,
										reply_desc: '故障原因/修复过程:' + _this.text +'<br />故障设备:'+_this.lables[0],
										to_user: _this.to_user,
										rec_id: _this.rec_id,
										fault_dev: _this.fault_dev
									}
									utils.requestPost('operation/postreply', _data, function(res){
										if(res.code === 0) {
											uni.navigateBack({
												delta: 1
											});
										}
									})
								}
							})
						}
					}
				}
				this.setFaults('')
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
	.uni-list-cell-hover .left {
		color: #007AFF;
	}
	.attention {
		position: relative;
	}
	.jians {
		position: absolute;
		top: 6upx;
		right: 6upx;
		color: red;
	}
	.coures {
		position: relative;
		background: #EFEFF4;
		padding-top: .4rem;
	}
	textarea {
		width: 7rem;
		height: .34rem;
		line-height: .34rem;
		font-size: .32rem;
	}
	.page-section {
		background: white;
	}
	.page-section-title {
		border-bottom: 1upx solid #E5E5E5;
		line-height: .80rem;
		font-size: .33rem;
		color: #333333;
		overflow: hidden;
		position: relative;
		left: .25rem;
		/* padding-left: .25rem; */
	}
	.textare {
		height: 1.22rem;
	}
	.nums {
		padding-bottom: .16rem;
		color: #A1A1A1;
		font-size: .28rem;
		padding-right: .3rem;
		border-bottom: 1upx solid #E5E5E5;
		position: relative;
		left: .25rem;
		overflow: hidden;
	}
	.num, button {
		float: right;
	}
	.textarea-wrp {
		padding: .25rem 0;
		position: relative;
		left: .25rem;
	}
	.picture {
		padding: .18rem 0;
		overflow: hidden;
		margin-left: .25rem;
		border-bottom: 1upx solid #E5E5E5;
	}
	.uploader-img {
		display:block;
		width:1.28rem;
		height:1.28rem;
	}
	.uni-uploader {
		float:left;
		position:relative;
		margin-right:.18rem;
		margin-bottom:.18rem;
		width:1.3rem;
		height:1.3rem;
		border:2upx dashed #D9D9D9;
	}
	.uploader-input {
		position:absolute;
		z-index:1;
		top:0;
		left:0;
		width:100%;
		height:100%;
		justify-content: center; /*子元素水平居中*/
		align-items: center; /*子元素垂直居中*/
		display: -webkit-flex;
	}
	.uploader-input image {
		width: .8rem;
		height: .8rem;
	}
	.left {
		float: left;
		margin-left: .25rem;
	}
	.right {
		float: right;
		margin-right: .2rem;
	}
	.icons {
		display: inline-block;
	}
	.uni-list-cell-navigate{
		font-size: .3rem;
		color: #888888;
	}
	.xuanz {
		overflow: hidden;
		line-height: .80rem;
		font-size: .33rem;
		color: #333333;
		padding-left: 0;
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
</style>
