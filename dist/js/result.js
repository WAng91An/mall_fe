webpackJsonp([8],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(82);


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

/*
 * result的逻辑
 * 1.根据url判断是注册成功？操作成功？
 */

__webpack_require__(83);
__webpack_require__(10);
var _mm     = __webpack_require__(0);

window.onload = function(){
	//显示对应的提示元素，注册成功？操作成功？
	var type = _mm.getUrlParam('type') || 'default';
	var className = type + '-success';
	var result = document.getElementsByClassName(className)[0];
	result.style.display = 'block';
	
	//to do
}


/***/ }),

/***/ 83:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[81]);