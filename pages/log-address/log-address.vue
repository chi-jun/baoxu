<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover"  v-for="(value,key) in listData" :key="key" @click="goDetail(value.place_id)">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						{{value.place_str}}
						<uni-badge  type="success"></uni-badge>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var utils = require('../../common/utils').utils;
	import uniBadge from "../../components/uni-badge.vue";
	export default {
		data() {
			return {
				listData: []
			}
		},
		onLoad: function() {
			var _this=this;
			utils.requestGet('logistics/place/list',function(res){
				console.log(res)
				if(res.code==0){
					_this.listData=res.data;
				}
			})
		},
		methods: {

		},
		components: {
			uniBadge
		}
	}
</script>

<style>
</style>
