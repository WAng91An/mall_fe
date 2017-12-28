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
	//如果是 支付成功，则应该应该再查看该订单详情加上 此订单号
	if(type == 'payment'){
		var orderNumber = _mm.getUrlParam('orderNumber');
		var orderDetailBtn = document.getElementsByClassName('order-number')[0];
		var orderNumberLink =  orderDetailBtn.getAttribute("href") + orderNumber;
		orderDetailBtn.setAttribute("href",orderNumberLink);
	}
	var classNm = type + '-success';
	var result = document.getElementsByClassName(classNm)[0];
	result.style.display = 'block';
	//to do
}
