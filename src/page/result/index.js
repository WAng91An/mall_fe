/*
 * result的逻辑
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require('util/mm');

window.onload = function(){
	//显示对应的提示元素，注册成功？操作成功？
	var type = _mm.getUrlParam('type') || 'default';
	var className = type + '-success';
	var result = document.getElementsByClassName(className)[0];
	result.style.display = 'block';
	
	//to do
}
