import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		faults: '',  // 故障设备
		num: '',
		fault_dev: '',
		lables: ''
	},
	mutations: {
		// 改变属性的方法
		setFaults(state, faults) {
			state.faults = faults
		},
		setFaultDev(state, fault_dev){
			state.fault_dev = String(fault_dev)
		},
		setLables(state, lable) {
			state.lables = lable
		}
	}
})

export default store