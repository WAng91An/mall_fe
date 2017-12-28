/*
 * 支付模块
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm              = require('util/mm');
var _payment         = require('service/payment-service');
var templateIndex    = require('./index.string');

// page 逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam("orderNumber")
	},
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        //加载订单信息
        this.loadPaymentInfo();
    },
    //加载订单信息
    loadPaymentInfo : function(){
    	var _this 		= this;
    	var pageWrap    = document.getElementsByClassName("page-wrap")[0];
    	var paymentInfoHtml = "";
    	pageWrap.innerHTML   = "<div class='loading'></div>";
    	_payment.getPaymentInfo(this.data.orderNumber,function(res){
    		//渲染html
    		paymentInfoHtml    = _mm.renderHtml(templateIndex,res);
    		pageWrap.innerHTML = paymentInfoHtml;
    		//监听订单状态
    		_this.listenOrderStatus();
    	},function(errMsg){
    		pageWrap.innerHTML = "<p class='err-tip'>"+ errMsg +"</p>"
    	});
    },
    //轮询
    listenOrderStatus : function(){
    	var _this 		= this;
    	this.paymentTimer = window.setInterval(function(){
    		_payment.getPaymentStatus(_this.data.orderNumber,function(res){
    			if(res == true){
    				  window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
    			}
    		});
    	},5000);
    }
};
window.onload = function(){
	 page.init();
}
