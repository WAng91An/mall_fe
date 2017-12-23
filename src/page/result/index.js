/*
 * result的逻辑
 * 1.根据url判断是注册成功？操作成功？
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require('util/mm');

window.onload = function(){
	//显示对应的提示元素，注册成功？操作成功？
	var type = _mm.getUrlParam('type') || 'default';
	var classNm = type + '-success';
	var result = document.getElementsByClassName(classNm)[0];
	result.style.display = 'block';
	//to do
}
