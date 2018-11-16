<template>
	<view class="code">
		<view class="items">
			<view class="item">
				{{text}}
			</view>
		</view>
	</view>
	
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapState(['faults']),
		data() {
			return {
				text: '',
			}
		},
		onLoad() {
			this.text = this.faults
		},
		methods: {
		}
	}
</script>

<style>
</style>
