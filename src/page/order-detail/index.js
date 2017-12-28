/*
 * 订单列表页面逻辑
 * 
 * 1. 加载订单信息,并加载物品信息
 * 2. 对数据进行过滤，如果是未支付 一定要把 去支付和取消订单 显示出来
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide          = require('page/common/nav-side/index.js');
var _mm              = require('util/mm');
var _order           = require('service/order-service');
var templateIndex    = require('./index.string');

// page 逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam("orderNumber")
	},
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-detail'
        });
        //加载订单信息
        this.loadDetail();
    },
     bindEvent : function(){
    	var _this 		= this;
    	//点击取消订单
    	 document.addEventListener('click',function(e){
    	 	if(_mm.hasClass(e.target,"order-cancel")){
	    	 		if(window.confirm("确认要取消该订单吗？")){
	    	 			_order.cancelOrder(_this.data.orderNumber,function(){
	    	 			_mm.successTips("该订单取消成功！");
	    	 			_this.loadDetail();
	    	 		},function(errMsg){
	    	 			_mm.errorTips(errMsg);
	    	 		})
    	 		}
    	 	}
    	 });
    },
    //加载订单信息
    loadDetail : function(){
    	var _this 		= this;
    	var content     = document.getElementsByClassName("content")[0];
    	var orderDetailHtml = "";
    	content.innerHTML = "<div class='loading'></div>";
    	_order.getOrderDetail(this.data.orderNumber,function(res){
    		_this.dataFilter(res);
    		//渲染html
    		orderDetailHtml = _mm.renderHtml(templateIndex,res);
    		content.innerHTML = orderDetailHtml;
    	},function(errMsg){
    		content.innerHTML = "<p class='err-tip'>"+ errMsg +"</p>"
    	});
    },
    //数据过滤，判断是不是 可以支付 和 可不可以取消订单
    dataFilter : function(data){
    	data.needPay      = data.status == 10;
    	data.isCancelable = data.status == 10;
    }
};
window.onload = function(){
	 page.init();
}
