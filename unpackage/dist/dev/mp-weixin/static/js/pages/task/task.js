global.webpackJsonp([1],{12:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"container"},t._l(t.list,function(s,a){return e("view",{key:a,staticClass:"task-item"},[e("view",{staticClass:"task-school link-item",attrs:{onclick:"openMap('{school_name}','{gl_location}')"}},[t._v(t._s(s.school_name))]),t._v(" "),t._l(s.task,function(i,n){return e("view",{key:n,staticClass:"task-container",attrs:{"data-fault":i.fault_id,"data-sl":s.school_id,eventid:"0-"+a+"-"+n},on:{tap:t.goDetail}},[e("view",{staticClass:"task-info"},[e("view",{staticClass:"info-container"},[e("view",{staticClass:"info-title"},[t._v("工单编号:")]),t._v(" "),e("view",{staticClass:"info-desc"},[t._v(t._s(i.task_num))])]),t._v(" "),e("view",{staticClass:"info-container"},[e("view",{staticClass:"info-title"},[t._v("报修地址:")]),t._v(" "),e("view",{staticClass:"info-desc"},[t._v(t._s(i.building_name)+" / "+t._s(i.room_name))])]),t._v(" "),e("view",{staticClass:"info-container"},[e("view",{staticClass:"info-title"},[t._v("受理时间:")]),t._v(" "),e("view",{staticClass:"info-desc"},[t._v(t._s(i.accept_time))])])]),t._v(" "),e("view",{staticClass:"task-status-container"},[e("view",{staticClass:"task-status-inner"},[e("view",{class:t.tag},[t._v(" "+t._s(t.status_str))])])])])})],2)}))};a._withStripped=!0;var i={render:a,staticRenderFns:[]};s.a=i},20:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=n(e(1)),i=n(e(9));function n(t){return t&&t.__esModule?t:{default:t}}e(0).default;new a.default(i.default).$mount(),s.default={config:{navigationBarTitleText:"任务清单"}}},26:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e(0).default,i=e(3).utils;s.default={data:{list:[],tag:"task-status status-doing",status_str:"处理中"},onLoad:function(t){switch(t.type){case 1:this.tag="task-status status-doing",this.status_str="处理中";break;case 2:this.tag="task-status status-finish",this.status_str="已处理"}this.getList()},onReachBottom:function(){this.getList()},methods:{getList:function(){var t=this;i.requestPost("loadmodfiertask",{type:1},function(s){console.log(s),0==s.code&&(t.list=s.data)})},goDetail:function(t){var s=t.currentTarget.dataset;a.navigateTo({url:"../detail/detail?school_id="+s.sl+"&fault_id="+s.fault})}}}},30:function(t,s){},9:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e(26),i=e.n(a),n=e(12),o=!1;var l=function(t){o||e(30)},u=e(2)(i.a,n.a,l,null,null);u.options.__file="..\\..\\..\\..\\Documents\\HBuilderProjects\\Supplier-Eng\\pages\\task\\task.vue",u.esModule&&Object.keys(u.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),u.options.functional&&console.error("[vue-loader] task.vue: functional components are not supported with templates, they should use render functions."),s.default=u.exports}},[20]);
//# sourceMappingURL=../../../../.sourcemap/pages/task/task.js.map