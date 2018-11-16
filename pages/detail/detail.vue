<template>
	<view class="content">
		<view class="container clearfix">
			<view v-bind:class="'state' + lists.status" class="header">
				<view class="head-img">
					<image :src="lists.head_img ? lists.head_img : 'http://tuofu.likonget.com/operation/img/teacher.png'"></image>
				</view>
				<view class="head-con">
					<text>{{lists.nick_name ? lists.nick_name : "匿名用户"}}</text>
					<text>{{lists.building_name}} / {{lists.room_name}}</text>
				</view>
			</view>
			<view class="title">
				{{lists.fault_desc}}
			</view>
			<view class="video-wrap" v-if="lists.imgs">
				<!-- 图片 -->
				<view class="item-images" v-if="lists.file_type==1&&lists.imgs.length>0">
					<image :src="img" v-for="(img,imgIndex) in lists.imgs" :key="imgIndex" @tap="changePreview(lists.imgs)" />
				</view>
				<!-- 视频 -->
				<view class="video-preview" v-if="lists.file_type==0&&lists.imgs.length>0">
					<image :src="lists.preview_img" />
					<view style="position: relative;">
						<view class="play-container"><text class="iconfont icon-play2"></text></view>
					</view>
				</view>
			</view>
			<view class="time">{{lists.ut}}</view>
			<!-- 回复 -->
			<view :class="statu != '2' ? 'warp' : 'reply-wrap'">
				<view class="reply-info" v-if="alist.length == 0">暂无回复</view>
				<view class="reply-list" v-if="alist.length != 0" v-for="(item, index) in alist" :key="index">
					<view class="reply-head">
						<image :src="item.head_img ? item.head_img : 'http://tuofu.likonget.com/operation/img/teacher.png'"></image>
					</view>
					<view class="reply-head-con">
						<text>{{item.fromU ? item.fromU : "匿名用户"}}</text>
						<text>{{item.ut}}</text>
					</view>
					<view class="reply-con">
						<view v-html="item.reply_desc"></view>
						<view class="img-box" v-if="item.reply_imgs.length > 0">
							<image :src="item.reply_imgs" @tap="preview(item.reply_imgs)"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 我来处理弹窗 -->
			<view class="modal-mask" @tap="hideModal(1)" catchtouchmove="preventTouchMove" v-if="showModal"></view>
			<view class="modal-dialog" v-if="showModal">
				<view class="modal-title">请输入预约处理时间</view>
				<view class="modal-content">
					<view class="modal-input">
						<textarea placeholder-class="input-holder" type="number" @input="inputChange" class="input"></textarea>
					</view>
				</view>
				<view class="modal-footer">
					<view class="btn-cancel" @tap="onCancel" data-status="cancel" hover-class="uni-list-cell-hover">取消</view>
					<view class="btn-confirm" @tap="onConfirm" data-status="confirm" hover-class="uni-list-cell-hover">确定</view>
				</view>
			</view>
			<!-- 确认故障 -->
			<view class="modal-mask" @tap="hideModal(2)" catchtouchmove="preventTouchMove" v-if="showActionSheet"></view>
			<view class="fault" v-if="showActionSheet">
				<view class="fault-title">
					请确认是否有故障
				</view>
				<view class="fault-wb" @tap="misinformation" hover-class="uni-list-cell-hover">
					确认误报
				</view>
				<view class="fault-gz" @tap="notarizeFault" hover-class="uni-list-cell-hover">
					确认有故障
				</view>
				<view class="fault-zb" @tap="hideModal(2)">
					暂不确认
				</view>
			</view>
		</view>
		<view class="button" hover-class="button-hover" v-if="statu === 2">
			<button class="mini-btn" size="mini">评价</button>
		</view>
		<view class="footer" v-if="statu != 2&&statu != 3">
			<view class="info-text">
				<view class="item-text" @tap="unfoldMenu(1)" hover-class="uni-list-cell-hover">
					<view class="text">
						跟踪处理
					</view>
					<view>
						<view class="uni-icon-bars uni-icon icons"></view>
					</view>
				</view>
				<view class="item-top" v-if="unfold.unfold1">
					<view @tap="reply" hover-class="uni-list-cell-hover">过程记录</view>
					<view @tap="showDialogBtn(1)" hover-class="uni-list-cell-hover">我来处理</view>
					<view @tap="ido" hover-class="uni-list-cell-hover">指派处理</view>
					<view @tap="showDialogBtn(2)" hover-class="uni-list-cell-hover">确认故障</view>
				</view>
			</view>
			<view class="info-text">
				<view class="item-text" @tap="unfoldMenu(2)" hover-class="uni-list-cell-hover">
					<view class="text">
						状态更新
					</view>
					<view>
						<view class="uni-icon-bars icons uni-icon"></view>
					</view>
				</view>
				<view class="item-top" v-if="unfold.unfold2">
					<view @tap="sureFaultDevice" hover-class="uni-list-cell-hover">检修待续</view>
					<view @tap="otherdo" hover-class="uni-list-cell-hover">检修完成</view>
				</view>
			</view>
			<view class="info-text">
				<view class="item-text" @tap="unfoldMenu(3)" hover-class="uni-list-cell-hover">
					<view class="text">
						更多
					</view>
					<view>
						<view class="uni-icon-bars uni-icon icons"></view>
					</view>
				</view>
				<view class="item-top" v-if="unfold.unfold3">
					<view @tap="complaint" hover-class="uni-list-cell-hover">举报违规内容</view>
				</view>
			</view>
			<!-- <text>更多</text> -->
		</view>
	</view>
	
</template>

<script>
	var utils = require('../../common/utils').utils;
	export default {
		data() {
			return {
				status_class: '',
				lists: [],  //报修详情记录
				alist: [],  // 用户回复列表
				statu: '',
				file_type: '',
				unfold: {
					unfold1: false,
					unfold2: false,
					unfold3: false
				},
				showModal: false,
				showActionSheet: false,
				reply_desc: '',   //输入的内容
				rec_id: '',       //报修记录id
				to_user: '',      //报修用户id
				building_id: '',  //报修楼栋id
				room_id: ''       //教室id
			}
		},
		onLoad: function(options) {
			// console.log(options)
			this.rec_id = options.fault_id
			this.getReportDetails(options.fault_id);
			this.getReplyToList(options.fault_id)
		},
		methods: {
			getReportDetails (faultid) {
				//获取报修详情
				var _this = this;
				utils.requestGet("operation/getmodifydetail/" + faultid, function(res) {
					if (res.code == 0) {
						var data = res.data[0];
						// console.log(data.status);
						_this.statu = data.status;
						_this.to_user = data.user_id;
						_this.building_id = data.building_id
						data.ut = utils.formatTimeStr(data.ut);
						_this.status_class = "header state" + data.status;
						_this.lists = data;
						_this.room_id = data.room_id
					}
				})
			},
			getReplyToList (fault_id) {
				//获取回复列表
				var _this = this;
				var url = 'operation/getreplylist/' + fault_id;
				utils.requestGet(url, function(res) {
					if (res.code == 0) {
						var datal = res.data
						for (var j in datal) {
							datal[j].ut = utils.formatTimeStr(datal[j].ut);
						}
						_this.alist = datal
					}
				})
			},
			// 图片预览
			changePreview (urls) {
				uni.previewImage({
					urls: urls
				});
			},
			preview (url) {
				var urls = [];
				urls.push(url)
				uni.previewImage({
					urls: urls
				})
			},
			// 底部菜单展开功能
			unfoldMenu (index) {
				if (index === 1) {
					this.unfold.unfold2 = false
					this.unfold.unfold3 = false
					this.unfold.unfold1 = !this.unfold.unfold1
				}
				if (index === 2) {
					this.unfold.unfold1 = false
					this.unfold.unfold3 = false
					this.unfold.unfold2 = !this.unfold.unfold2
				}
				if (index === 3) {
					this.unfold.unfold1 = false
					this.unfold.unfold2 = false
					this.unfold.unfold3 = !this.unfold.unfold3
				}
			},
			// 过程记录
			reply () {
				var _this = this
				_this.closeMenu();
				uni.navigateTo({
					url: '../course/course?to_user=' + _this.to_user + '&rec_id=' + _this.rec_id
				})
			},
			closeMenu () {
				this.unfold.unfold1 = false;
				this.unfold.unfold2 = false;
				this.unfold.unfold3 = false;
			},
			// 指派处理
			ido () {
				var _this = this
				this.closeMenu();
				uni.navigateTo({
					url: '../designate/designate?building_id=' + _this.building_id + '&to_user=' + _this.to_user + '&rec_id=' + _this.rec_id
				})
			},
			
			// 检修待续
			sureFaultDevice () {
				var _this = this
				_this.closeMenu();
				uni.showModal({
					title: '操作确认',
					content: '确认更新检修状态为检修待续吗？',
					success: function(res) {
						if (res.confirm) {
							if ( _this.statu === 1 || _this.lists.file_type === 0) {
								var _data = {
									status: 1,
									reply_imgs: '',
									reply_desc: '您报告的故障已得到确认，但需要一段时间进行修复，请您耐心等待。修复好后，系统会及时通知您。',
									to_user: _this.to_user,
									rec_id: _this.rec_id
								}
								utils.requestPost('operation/postreply',_data, function(res){
									if ( res.code === 0 ) {
										console.log(res.data)
										_this.getReplyToList(_this.rec_id);
										_this.getReportDetails(_this.rec_id)
									}
								})
							}else {
								_this.showDialogBtn(2)
							}
						}
					}
				})
			},
			// 检修完成
			otherdo () {
				var than = this
				than.closeMenu();
				uni.showModal({
					title: '操作确认',
					content: '确认更新检修状态为已完成吗？',
					success: function(res) {
						if (res.confirm) {
							if ( than.statu === 1 || than.lists.file_type === 0) {
								console.log('用户点击确定');
								var _data = {
									status: 2,
									reply_imgs: '',
									reply_desc: '经过我们的努力，您报告的故障已经检修完成。',
									to_user: than.to_user,
									rec_id: than.rec_id
								}
								utils.requestPost('operation/postreply',_data, function(res){
									if ( res.code === 0 ) {
										console.log(res.data)
										than.getReplyToList(than.rec_id);
										than.getReportDetails(than.rec_id)
									}
								})
							}else {
								than.showDialogBtn(2)
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 我来处理
			showDialogBtn: function(i) {
				this.closeMenu();
				if (i === 2) {
					this.showActionSheet = true
				}
				if (i === 1) {
					this.showModal = true
				}
			},
			inputChange (e) {
				this.reply_desc = e.detail.value
			},
			/**
			 * 弹出框蒙层截断touchmove事件
			 */
			preventTouchMove: function() {},
			hideModal: function(i) {
				if (i === 2) {
					this.showActionSheet = false
				}
				if (i === 1) {
					this.showModal = false
				}
			},
			onCancel: function() {
				this.hideModal(1);
			},
			/**
			 * 确认我来处理的请求
			 */
			onConfirm: function() {
				var _this = this
				var data = {
					status: 9,
					reply_desc: _this.reply_desc,
					to_user: _this.to_user,
					reply_imgs: '',
					rec_id: _this.rec_id
				}
				utils.requestPost('operation/postreply',data, function(res){
					if ( res.code === 0 ) {
						console.log(res.data)
						_this.getReplyToList(_this.rec_id)
					}
				})
				this.hideModal(1);
			},
			/**
			 * 投诉建议 
			*/
			complaint () {
				this.closeMenu();
				uni.navigateTo({
					url: '../device/device'
				})
			},
			// 确认故障
			notarizeFault () {
				var _this = this
				_this.showActionSheet = false;
				uni.navigateTo({
					url: '../fault/fault?to_user=' + _this.to_user + '&rec_id=' + _this.rec_id + '&room_id='+ _this.room_id
				})
			},
			// 误报
			misinformation () {
				var that = this
				that.showActionSheet = false;
				uni.showModal({
					title: '操作确认',
					content: '确认更新检修状态为误报吗？',
					success: function(res) {
						if ( res.confirm ) {
							var data = {
								status: 3,
								reply_imgs: '',
								reply_desc: '您报告的故障经检查不属实,系统将结束本次报修。',
								to_user: that.to_user,
								rec_id: that.rec_id
							}
							utils.requestPost('operation/postreply', data, function(res) {
								if (res.code === 0 ){
									that.getReportDetails(that.rec_id)
									that.getReplyToList(that.rec_id)
								}
							})
						}
					}
				})
			},
			
		}
	}
</script>

<style>
	@import '../../common/icon.css';
	.active {
		background: #BBBBBB;
	}
	.warp {
		width: 100%;
		position: relative;
		background: rgba(239, 239, 244, 1);
		border-radius: 6upx;
		margin-bottom: 1.1rem;
	}
	.warp:before {
		display: block;
		content: '';
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 16rpx solid #EFEFF4;
		position: absolute;
		top: -.14rem;
		left: .22rem;
	}
	.content {
		height: 100%;
		position: relative;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 0 .35rem !important;
		box-sizing: border-box;
		border-top: 1upx solid #E5E5E5;
		position: relative;
	}


	page {
		display: block;
		background: #fff;
	}



	.low-end-tip {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		position: relative;
		font-size: .28rem;
		color: gray
	}

	.low-end-tip text {
		position: relative;
		padding: 0 .2rem;
		background: #EFEFF4;
	}

	.low-end-tip:before {
		display: block;
		content: '';
		width: 100%;
		height: 1upx;
		border-top: 1upx dashed gray;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto 0;
	}

	/* 内容样式 */

	.header {
		width: 100%;
		height: 1.32rem;
		position: relative;
	}

	.header.state0:before,
	.header.state1:before,
	.header.state9:before,
	.header.state2:before,
	.header.state3:before {
		display: block;
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		border-radius: 50%;
		font-size: .24rem;
		font-family: "microsoft yahei";
		box-sizing: border-box;
		position: absolute;
		top: .22rem;
		right: 0;
	}

	.header.state0:before {
		border: 1upx solid #F96A6A;
		color: #F96A6A;
		content: "待处理";
	}

	.header.state1:before {
		border: 1upx solid #6492FF;
		color: #6492FF;
		content: "已受理";
	}
	.header.state9:before {
		border: 1upx solid #6492FF;
		color: #6492FF;
		content: "处理中";
	}

	.header.state3:before {
		border: 1upx solid #6492FF;
		color: #6492FF;
		content: "误报";
	}
	.header.state2:before {
		border: 1upx solid #09BB07;
		color: #09BB07;
		content: "已完成";
	}

	.head-img {
		width: .78rem;
		height: .78rem;
		float: left;
		margin: .28rem .2rem 0 0;
		overflow: hidden;
	}

	.head-img image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.head-con {
		float: left;
		width: 4.74rem;
		height: 1.48rem;
		box-sizing: border-box;
		padding: .22rem 0 0 0;
	}

	.head-con text {
		display: block;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.head-con text:nth-of-type(1) {
		height: .4rem;
		line-height: .4rem;
		font-size: .32rem;
		color: rgba(136, 136, 136, 1);
	}

	.head-con text:nth-of-type(2) {
		height: .48rem;
		line-height: .48rem;
		font-size: .28rem;
		color: rgba(0, 0, 0, 1);
	}

	.title {
		width: 100%;
		line-height: .5rem;
		font-size: .30rem;
	}

	.video-wrap {
		width: 100%;
		margin: 0 auto;
	}

	.item-images {
		width: 13rem;
		clear: both;
		margin-top: .08rem;
		max-width: 100%;
	}

	.item-images image {
		width: 2rem;
		height: 2rem;
		max-width: 46%;
		margin-right: 0.08rem;
	}

	.video-preview {
		margin-top: 0.08rem;
	}

	.video-preview image {
		width: 2.7rem;
		height: 4.8rem;
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

	.time {
		width: 100%;
		height: 33upx;
		line-height: .33rem;
		font-size: .24rem;
		color: rgba(178, 178, 178, 1);
		margin-bottom: .2rem;
	}

	.reply-wrap {
		width: 100%;
		position: relative;
		background: rgba(239, 239, 244, 1);
		border-radius: 6upx;
		margin-bottom: .2rem;
	}

	.reply-wrap:before {
		display: block;
		content: '';
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 16rpx solid #EFEFF4;
		position: absolute;
		top: -.14rem;
		left: .22rem;
	}

	.reply-info {
		width: 100%;
		height: 1.70rem;
		line-height: 1.70rem;
		font-size: .28rem;
		color: rgba(136, 136, 136, 1);
		text-align: center;
	}

	.reply-list {
		padding: .3rem .2rem .4rem;
		border-bottom: 1upx solid #d8d8d8;
		overflow: hidden;
		zoom: 1;
	}

	.reply-list::after {
		display: block;
		content: '';
		clear: both;
	}

	.reply-wrap view.reply-list:nth-last-child(1) {
		border: 0;
	}

	.reply-list .reply-head {
		width: .8rem;
		height: .8rem;
		float: left;
		margin: 0 .2rem 0 0;
		overflow: hidden;
	}

	.reply-head image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.reply-head-con {
		width: 5.4rem;
		height: .4rem;
		line-height: .4rem;
		font-size: .28rem;
		color: rgba(136, 136, 136, 1);
		float: left;
	}

	.reply-head-con text {
		display: block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.reply-head-con text:nth-of-type(1) {
		width: 55%;
		float: left;
		text-align: left;
	}

	.reply-head-con text:nth-of-type(2) {
		width: 45%;
		float: right;
		text-align: right;
	}

	.reply-con {
		width: 5.4rem;
		float: left;
		font-size: .3rem;
		color: rgba(0, 0, 0, 1);
		line-height: .42rem;
		overflow: hidden;
		zoom: 1;
	}

	.reply-con::after {
		display: block;
		content: '';
		clear: both;
	}

	.reply-con text {
		display: block;
		width: 100%;
	}

	.img-box {
		width: 1.26rem;
		height: 1.26rem;
		float: left;
		margin: .1rem .2rem .1rem 0;
	}

	.img-box image {
		display: block;
		width: 100%;
		height: 100%;
		zoom: 1;
	}

	/* 底部导航栏 */
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 10;
		width: 100%;
		height: .90rem;
		line-height: .90rem;
		background: #fff;
		box-shadow: 0 0 4upx rgba(0, 0, 0, .5);
		text-align: center;
		font-size: .34rem;
		color: rgba(0, 0, 0, 1);
		display: flex;
	}

	.footer .info-text {
		flex-grow: 1;
		flex-basis: 50%;
		position: relative;
	}

	.item-text {
		display: flex;
		justify-content: center;
	}

	.footer .info-text .text {
		margin-right: .08rem;
		line-height: .9rem;
	}

	.footer .info-text:nth-of-type(1),
	.footer .info-text:nth-of-type(2) {
		border-right: 1upx solid #d8d8d8;
	}

	.icons {
		color: #000000;
		line-height: .9rem;
		font-size: .3rem;
	}

	.item-top {
		position: absolute;
		bottom: .9rem;
		width: 100%;
		font-size: .26rem;
		background: white;
	}

	.item-top:nth-of-type(1) view {
		border-top: 1upx solid #d8d8d8;
		border-right: 1upx solid #d8d8d8;
	}
	.item-top view:last-child {
		border-bottom: 1upx solid #d8d8d8;
	}
	.item-top:nth-of-type(2) view {
		border-top: 1upx solid #d8d8d8;
		border-right: 1upx solid #d8d8d8;
		border-left: 1upx solid #d8d8d8;
	}

	.item-top:nth-of-type(1) view {
		border-top: 1upx solid #d8d8d8;
		border-left: 1upx solid #d8d8d8;
		;
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

	.modal-dialog {
		width: 5.4rem;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 0;
		z-index: 9999;
		background: #f9f9f9;
		margin: -1.80rem 1.05rem;
		border-radius: .36rem;
	}

	.modal-title {
		padding-top: .30rem;
		font-size: .36rem;
		color: #030303;
		text-align: center;
	}

	.modal-content {
		padding: .36rem .32rem;
	}

	.modal-input {
		display: flex;
		background: #fff;
		border: 2upx solid #ddd;
		border-radius: .04rem;
		font-size: .28rem;
	}

	.input {
		width: 100%;
		height: 1rem;
		font-size: .28rem;
		line-height: .28rem;
		box-sizing: border-box;
		color: #333;
	}

	input-holder {
		color: #666;
		font-size: .28rem;
	}

	.modal-footer {
		display: flex;
		flex-direction: row;
		height: .86rem;
		border-top: 1upx solid #dedede;
		font-size: .34rem;
		line-height: .86rem;
	}

	.btn-cancel {
		width: 50%;
		color: #666;
		text-align: center;
		border-right: 1upx solid #dedede;
	}

	.btn-confirm {
		width: 50%;
		color: #22cc22;
		text-align: center;
	}

	.fault {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;

	}

	.fault-title {
		background: #f9f9f9;
		line-height: 1.2rem;
		color: #BBBBBB;
		text-align: center;
		font-size: 28upx;
	}

	.fault-wb,
	.fault-gz,
	.fault-zb {
		background: #f9f9f9;
		line-height: .9rem;
		border-top: 1upx solid #E5E5E5;
		text-align: center;
		font-size: .32rem;
	}

	.fault-wb {
		color: #F96A6A;
	}

	.fault-zb {
		margin-top: .16rem;
		background: #DD524D;
		color: #FFFFFF;
	}
	button {
		float: right;
	}
	.button {
		font-size: .28rem;
		position: absolute;
		right: .3rem;
		overflow: hidden;
		margin-bottom: .1rem;
	}
	.mini-btn {
		background: #6492FF;
		color: white;
	}
	.button-hover button {
		background: #007AFF;
	}
	
</style>
