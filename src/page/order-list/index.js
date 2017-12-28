/*
 * 订单列表页面逻辑
 * 
 * 1. 加载分页信息，订单信息渲染，分页功能
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide          = require('page/common/nav-side/index.js');
var _mm              = require('util/mm');
var _order           = require('service/order-service');
var templateIndex    = require('./index.string');
var Pagination       = require('util/pagination/index.js');  

// page 逻辑部分
var page = {
	data : {
		listParam : {
			pageNum 	:   1,   //第几页
			pageSize 	:  3   // 页面的大小
		}
	},
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        
        this.loadOrderList();
    },
    //加载订单信息和 分页信息
    loadOrderList : function(){
    	var _this = this;
    	var orderListCon  = document.getElementsByClassName("order-list-con")[0];
    	var orderListHtml = "";
    	orderListCon.innerHTML = "<div class='loading'></div>";
    	_order.getOrderList(this.data.listParam ,function(res){
    		//渲染html
    		orderListHtml = _mm.renderHtml(templateIndex,res);
    		orderListCon.innerHTML = orderListHtml;
    		_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,	//是否有上一页
                prePage         : res.prePage,			//上一页是几
                hasNextPage     : res.hasNextPage,		//是否有下一页
                nextPage        : res.nextPage,			//下一页是几
                pageNum         : res.pageNum,			//页的序号
                pages           : res.pages				//页的个数
			});
    	},function(errMsg){
    		orderListCon.innerHTML = "<p class='err-tip'>获取订单失败，请刷新重试:)</p>"
    	});
    },
    //加载分页信息
    loadPagination : function(pageInfo){
		var paginationCon = document.getElementsByClassName('pagination')[0];
		var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : paginationCon,
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
	}
};
window.onload = function(){
	 page.init();
}
