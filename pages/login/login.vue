<template>
	<view class="lable-container">
         <text>正在登陆</text>
	</view>
</template>

<script>
	var utils=require( '../../common/utils').utils;
	export default {
		onLoad:function(){
			utils.getLoginInfo();
		},
		methods:{
			
		},
	}
</script>

<style>
	 view{
		 display: block;
	 }
     .lable-container{
		 text-align: center;
		 padding-top: 48%;
		 width: 100%;
	 }
</style>
