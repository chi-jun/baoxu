<template>
	<view class="coures">
		<view class="page-section">
			<view class="page-section-title">记录内容</view>
			<view class="textarea-wrp">
				<textarea class="textare" placeholder-style="color:#888888" placeholder="请输入记录内容" maxlength="200" @input="getLeng" />
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
		</view>
		<view class="button" hover-class="button-hover">
			<button class="mini-btn" size="mini" @tap="getSubmit">提交</button>
		</view>
	</view>
</template>
<script>
	var utils = require('../../common/utils').utils;
	export default {
		data() {
			return {
				title: 'textarea',
				focus: false,
				num: 0,
				reply_desc: '',
				imageList: [],
				reply_imgs: '',
				to_user: '',
				rec_id: '',
				tempFilePaths: '',
			}
		},
		onLoad: function (options) {
			var _this = this
			_this.rec_id  = options.rec_id;
			_this.to_user = options.to_user;
		},
		methods: {
			// 删除图片
			getRecord(event){
				var indx = event.target.dataset.idx;
				this.imageList.splice(indx,1)
			},
			getLeng(e){
				this.num = e.detail.value.length;
				this.reply_desc = e.detail.value;
			},
			chooseImage: async function () {
				if(this.imageList.length === 9){
					let isContinue = await this.isFullImg();
					console.log("是否继续?",isContinue);
					if(!isContinue){
						return;
					}
				}
				uni.chooseImage({  
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.tempFilePaths = res.tempFilePaths[0];
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				});
			},
			isFullImg:function(){
				return new Promise((res) => {
					uni.showModal({
						content:"已经有9张图片了,是否清空现有图片？",
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
			//提交过程记录
			getSubmit() {
				if (this.num === 0) {
					uni.showToast({
						title: '请输入回复内容',
						duration: 2000,
						icon: 'none'
					});
				} else {
					var _this = this;
					if (_this.imageList.length === 0 ) {
						var _data = {
							action: 'reply',
							status: 9,
							reply_imgs: _this.reply_imgs,
							reply_desc: _this.reply_desc,
							to_user: _this.to_user,
							rec_id: _this.rec_id
						}
						utils.requestPost('operation/postreply', _data, function(res){
							if(res.code === 0) {
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}else {
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
								var data = JSON.parse(res.data)
								_this.reply_imgs = data.url
								console.log(_this.reply_imgs)
								var _data = {
									action: 'reply',
									status: 9,
									reply_imgs: _this.reply_imgs,
									reply_desc: _this.reply_desc,
									to_user: _this.to_user,
									rec_id: _this.rec_id
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
		}
	}
</script>

<style>
	@import '../../common/icon.css';

	page {
		background: #EFEFF4;
		width: 100%;
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
		padding-top: .4rem;
		position: relative;
	}
	textarea {
		width: 7rem;
		height: .34rem;
		line-height: .34rem;
		font-size: .32rem;
	}
	.page-section {
		padding-left: .25rem;
		background: white;
	}
	.page-section-title {
		border-bottom: 1upx solid #E5E5E5;
		line-height: .80rem;
		font-size: .33rem;
		color: #333333;
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
		overflow: hidden;
	}
	.num, button {
		float: right;
	}
	.textarea-wrp {
		padding: .25rem 0;
	}
	.picture {
		margin: .18rem 0;
		overflow: hidden;
	}
	.uploader-img {
		display:block;
		width:1.2rem;
		height:1.2rem;
	}
	.uni-uploader {
		float:left;
		position:relative;
		margin-right:.18rem;
		margin-bottom:.18rem;
		width:1.2rem;
		height:1.3rem;
		border:1upx dashed #D9D9D9;
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
	.button {
		font-size: .28rem;
		position: absolute;
    right: .3rem;
		overflow: hidden;
	}
	.mini-btn {
		background: #6492FF;
		color: white;
	}
	.button-hover button {
		background: #007AFF;
	}
</style>
