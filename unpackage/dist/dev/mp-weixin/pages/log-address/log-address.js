require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],{65:function(e,t,n){"use strict";var s=o(n(0)),i=o(n(66));function o(e){return e&&e.__esModule?e:{default:e}}new s.default(i.default).$mount()},66:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(68),i=n.n(s),o=n(73),a=!1;var u=function(e){a||n(67)},l=n(1)(i.a,o.a,u,null,null);l.options.__file="..\\..\\..\\..\\..\\allen\\project\\School-Admin\\pages\\log-address\\log-address.vue",l.esModule&&Object.keys(l.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] log-address.vue: functional components are not supported with templates, they should use render functions."),t.default=l.exports},67:function(e,t){},68:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,i=n(69),o=(s=i)&&s.__esModule?s:{default:s};var a=n(3).utils;t.default={data:function(){return{listData:[]}},onLoad:function(){var e=this;a.requestGet("logistics/place/list",function(t){console.log(t),0==t.code&&(e.listData=t.data)})},methods:{},components:{uniBadge:o.default}}},69:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(71),i=n.n(s),o=n(72),a=!1;var u=function(e){a||n(70)},l=n(1)(i.a,o.a,u,null,null);l.options.__file="..\\..\\..\\..\\..\\allen\\project\\School-Admin\\components\\uni-badge.vue",l.esModule&&Object.keys(l.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] uni-badge.vue: functional components are not supported with templates, they should use render functions."),t.default=l.exports},70:function(e,t){},71:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{type:String,inverted:{type:Boolean,default:!1},text:String},methods:{onClick:function(){this.$emit("click")}}}},72:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.text?n("text",{staticClass:"uni-badge",class:[!0===e.inverted?"uni-badge-inverted":"","uni-badge-"+e.type],attrs:{eventid:"wZv-0"},on:{click:function(t){e.onClick()}}},[e._v("\n\t"+e._s(e.text)+"\n")]):e._e()};s._withStripped=!0;var i={render:s,staticRenderFns:[]};t.a=i},73:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"page"},[n("page-head",{attrs:{title:e.title,mpcomid:"0kT-0"}}),n("view",{staticClass:"uni-card"},[n("view",{staticClass:"uni-list"},e._l(e.listData,function(t,s){return n("view",{key:s,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover",eventid:"00S-0-"+s},on:{click:function(n){e.goDetail(t.place_id)}}},[n("view",{staticClass:"uni-list-cell-navigate uni-navigate-right uni-navigate-badge"},[e._v("\n\t\t\t\t\t"+e._s(t.place_str)+"\n\t\t\t\t\t"),n("uni-badge",{attrs:{type:"success",mpcomid:"zYt-1-"+s}})],1)])}))])],1)};s._withStripped=!0;var i={render:s,staticRenderFns:[]};t.a=i}},[65]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/log-address/log-address.js.map