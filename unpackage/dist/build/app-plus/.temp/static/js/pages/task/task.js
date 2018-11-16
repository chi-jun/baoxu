global.webpackJsonp([1],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "container"
  }, _vm._l((_vm.list), function(school, index2) {
    return _c('view', {
      key: index2,
      staticClass: "task-item"
    }, [_c('view', {
      staticClass: "task-school link-item",
      attrs: {
        "onclick": "openMap('{school_name}','{gl_location}')"
      }
    }, [_vm._v(_vm._s(school.school_name))]), _vm._v(" "), _vm._l((school.task), function(item, index) {
      return _c('view', {
        key: index,
        staticClass: "task-container",
        attrs: {
          "data-fault": item.fault_id,
          "data-school": item.school_id,
          "eventid": '0-' + index2 + '-' + index
        },
        on: {
          "tap": _vm.goDetail
        }
      }, [_c('view', {
        staticClass: "task-info"
      }, [_c('view', {
        staticClass: "info-container"
      }, [_c('view', {
        staticClass: "info-title"
      }, [_vm._v("工单编号:")]), _vm._v(" "), _c('view', {
        staticClass: "info-desc"
      }, [_vm._v(_vm._s(item.task_num))])]), _vm._v(" "), _c('view', {
        staticClass: "info-container"
      }, [_c('view', {
        staticClass: "info-title"
      }, [_vm._v("报修地址:")]), _vm._v(" "), _c('view', {
        staticClass: "info-desc"
      }, [_vm._v(_vm._s(item.building_name) + " / " + _vm._s(item.room_name))])]), _vm._v(" "), _c('view', {
        staticClass: "info-container"
      }, [_c('view', {
        staticClass: "info-title"
      }, [_vm._v("受理时间:")]), _vm._v(" "), _c('view', {
        staticClass: "info-desc"
      }, [_vm._v(_vm._s(item.accept_time))])])]), _vm._v(" "), _c('view', {
        staticClass: "task-status-container"
      }, [_c('view', {
        staticClass: "task-status-inner"
      }, [_c('view', {
        class: _vm.tag
      }, [_vm._v(" " + _vm._s(_vm.status_str))])])])])
    })], 2)
  }))
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var _vue = __webpack_require__(1);var _vue2 = _interopRequireDefault(_vue);
var _task = __webpack_require__(9);var _task2 = _interopRequireDefault(_task);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var uni = __webpack_require__(0).default;
var app = new _vue2.default(_task2.default);
app.$mount();exports.default =

{
	config: { "navigationBarTitleText": "任务清单" } };

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var uni = __webpack_require__(0).default;


































var utils = __webpack_require__(3).utils;exports.default =
{
	data: {
		list: [],
		tag: "task-status status-doing",
		status_str: "处理中" },

	onLoad: function onLoad(e) {
		console.log(e);
		this.getList();
	},
	onReachBottom: function onReachBottom() {
		this.getList();
	},
	methods: {
		getList: function getList() {
			var _this = this;
			var data = {
				type: 1 };

			utils.requestPost("loadmodfiertask", data, function (res) {
				console.log(res);
				if (res.code == 0) {
					_this.list = res.data;
				}
			});
		} } };

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_runtime_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_uni_loader_js_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_task_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_runtime_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_uni_loader_js_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_task_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_runtime_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_uni_loader_js_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_task_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_template_compiler_index_id_data_v_1c61d7cd_hasScoped_false_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_html_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_template_index_0_task_vue__ = __webpack_require__(12);
function injectStyle (ssrContext) {
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_node_modules_babel_runtime_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_uni_loader_js_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_task_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_template_compiler_index_id_data_v_1c61d7cd_hasScoped_false_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_preprocessor_loader_js_type_html_context_APP_PLUS_true_360_HBuilderX_0_1_47_20180823_alpha_full_plugins_uniapp_lib_mpvue_loader_lib_selector_type_template_index_0_task_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

},[20]);