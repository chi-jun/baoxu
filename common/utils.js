var utils = {
	host: "www.likonget.com",
	checkAuth: function(callback) {
		var _this = this;
		uni.getStorage({
			key: 'userinfo',
			success: function(res) {
				if (res.data.length > 0) {
					_this.userinfo = JSON.parse(res.data);
					callback("success");
				} else {
					uni.redirectTo({
						url: '../login/login'
					});
					callback(null);
				}
			},
			fail: function() {
				uni.redirectTo({
					url: '../login/login'
				});
				callback(null);
			}
		});
	},
	formatTimeStr: function(time) {
		var tstr = time.slice(-8);
		if (time.length <= 16) {
			tstr = time.slice(-5)
		}
		var today = ((new Date()).toISOString()).substring(0, 10) + "T00:00:00";
		var todayTime = Date.parse(today);
		var myTime = Date.parse((time.length > 16 ? time : (time + ":00")).replace(" ", "T"));
		var dis = todayTime - myTime;
		if (dis <= 0) {
			return "今天 " + tstr;
		} else {
			var day = parseInt(dis / (3600000 * 24));
			if (day == 0) {
				return "昨天 " + tstr;
			} else if (day == 1) {
				return "前天 " + tstr;
			} else if(day >2){
				return day + "天前 " + tstr;
			}else{
				return time;
			}
		}
	},
	getLoginInfo: function() {
		var _this = this;
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				uni.request({
					url: 'https://' + _this.host + '/weixinweb/miniprogram/adminlogin/' + loginRes.code,
					success: function(res) {
						_this.reqUserInfo(res.data.unionid);
					}
				});
			}
		});
	},
	reqUserInfo: function(unionid) {
		var _this = this;
		wx.request({
			url: 'https://' + this.host + '/weixinweb/loadadmininfobyuid/' + unionid,
			method: 'GET',
			success: function(res) {
				var data = res.data;
				if (data.code == 0) {
					var userinfo = data.data;
					if (userinfo.role == 0) {
						uni.setStorageSync("userinfo", JSON.stringify(userinfo));
						uni.redirectTo({
							url: '../home/home',
						})
					} else {
						uni.redirectTo({
							url: '../deny/deny',
						})
					}
				}
			}
		});
	},
	requestGet: function(url, callback) {
		var _this = this;
		if (this.userinfo == undefined || this.userinfo.userid == undefined) {
			this.checkAuth(function(infores) {
				if (infores) {
					uni.request({
						url: 'https://' + _this.host + '/tuofu/' + _this.userinfo.userid + "/" + _this.userinfo.session + "/" +
							_this.userinfo
							.schools[0].id + "/" + url,
						success: (res) => {
							var resp = res.data;
							if (resp.code <= -99) {
								uni.redirectTo({
									url: '../login/login',
								})
							} else {
								callback(resp)
							}
						}
					})
				}
			})
		} else {
			uni.request({
				url: 'https://' + this.host + '/tuofu/' + this.userinfo.userid + "/" + this.userinfo.session + "/" + this.userinfo
					.schools[0].id + "/" + url,
				success: (res) => {
					var resp = res.data;
					if (resp.code <= -99) {
						uni.redirectTo({
							url: '../login/login',
						})
					} else {
						callback(resp)
					}
				}
			})
		}


	},
	requestPost(url, data, callback) {
		var _this = this;
		if (this.userinfo == undefined || this.userinfo.userid == undefined) {
			this.checkAuth(function(infores) {
				if (infores) {
					uni.request({
						url: 'https://' + _this.host + '/tuofu/' + _this.userinfo.userid + "/" + _this.userinfo.session + "/" +
							_this.userinfo
							.schools[0].id + "/" + url,
						method: 'POST',
						data: JSON.stringify(data),
						success: (res) => {
							var resp = res.data;
							if (resp.code <= -99) {
								uni.redirectTo({
									url: '../login/login',
								})
							} else {
								callback(resp);
							}
						}
					})
				}
			});
		} else {
			uni.request({
				url: 'https://' + this.host + '/tuofu/' + this.userinfo.userid + "/" + this.userinfo.session + "/" + this.userinfo
					.schools[0].id + "/" + url,
				method: 'POST',
				data: JSON.stringify(data),
				success: (res) => {
					var resp = res.data;
					if (resp.code <= -99) {
						uni.redirectTo({
							url: '../login/login',
						})
					} else {
						callback(resp);
					}
				}
			})
		}
	}
}
module.exports = {
	utils: utils
}
