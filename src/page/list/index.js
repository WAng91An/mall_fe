/*
 * 商品列表逻辑
 * 1. 获取地址栏中的参数，存在一个对象里面
 * 2. 渲染list
 * 3. 点击来进行排序，点击后更更改 classname  重新请求list
 * 4. 加载分页容器
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm                = require('util/mm');
var _product           = require('service/product-service');
var templateIndex      = require('./index.string');
var Pagination         = require('util/pagination/index.js');

var page = {
	data : {
		listParam : {
			keyword 	: _mm.getUrlParam('keyword') 	|| '',
			categoryId  : _mm.getUrlParam('categoryId') || '',
			orderBy 	: _mm.getUrlParam('orderBy')  	|| 'default',
			pageNum 	: _mm.getUrlParam('pageNum')    || 1,   //第几页
			pageSize 	: _mm.getUrlParam('pageSize')   || 5   // 页面的大小
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		 // 排序的点击事件
		 var sortItems = document.getElementsByClassName('sort-item');
		 for(var i = 0 ; i<sortItems.length ; i++){
		 	/**
		 	 * 判断当前点击的是默认排序还是价格，然后更改样式
		 	 */
		 	sortItems[i].onclick = function(){
		 		if(this.getAttribute('data-type') == 'default'){
		 			if(_mm.hasClass(this,'active')){
		 				return;
		 			}else{
		 				_mm.addClass(this,'active');
		 				_mm.removeClass(this.nextElementSibling,'active');
		 				_mm.removeClass(this.nextElementSibling,'asc');
		 				_mm.removeClass(this.nextElementSibling,'desc');
		 				_this.data.listParam.orderBy = 'default';
		 			}
		 		}else if(this.getAttribute('data-type') == 'price'){
		 			 // active class 的处理
		 			if(!_mm.hasClass(this,'active')){
		 				_mm.addClass(this,'active');
		 			}
		 			_mm.removeClass(this.previousElementSibling,'active');
		 			_mm.removeClass(this.previousElementSibling,'asc');
		 			_mm.removeClass(this.previousElementSibling,'desc');
		 			 // 升序、降序的处理
		 			if(!_mm.hasClass(this,'asc')){
		 				_mm.addClass(this,'asc');
		 				_mm.removeClass(this,'desc');
		 				_this.data.listParam.orderBy = 'price_asc';
		 			}else{
		 				_mm.addClass(this,'desc');
		 				_mm.removeClass(this,'asc');
		 				_this.data.listParam.orderBy = 'price_desc';
		 			}
		 		}
		 		// 重新加载列表
           		 _this.loadList();
		 	}
		 }
	},
	//渲染list
	loadList : function(){
		var _this     = this;
		var listHtml  = '';
		var listParam = this.data.listParam;
		_product.getProductList(listParam, function(res){
			var listCon = document.getElementsByClassName('p-list-con')[0];
			listHtml = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			listCon.innerHTML = listHtml;
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,	//是否有上一页
                prePage         : res.prePage,			//上一页是几
                hasNextPage     : res.hasNextPage,		//是否有下一页
                nextPage        : res.nextPage,			//下一页是几
                pageNum         : res.pageNum,			//页的序号
                pages           : res.pages				//页的个数
			});
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	//加载分页信息，传到渲染分页信息的函数传入：一个对象，这个对象是 pageInfo，和container，onSelectPage 合并的
	/*
	 * render最后传进去的参数有：
	 * {
 * 			hasPreviousPage : res.hasPreviousPage,	//是否有上一页
            prePage         : res.prePage,			//上一页是几
            hasNextPage     : res.hasNextPage,		//是否有下一页
            nextPage        : res.nextPage,			//下一页是几
            pageNum         : res.pageNum,			//页的序号
            pages           : res.pages，			//页的个数
            container : paginationCon,              //这是一个HTMLcolloection 集合，用来放分页信息的容器
            onSelectPage : function(pageNum){		//传进来当前选择是哪一页，把data.listParam‘重新赋值，然后再次调接口
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
	 * }
	 */
	loadPagination : function(pageInfo){
		var paginationCon = document.getElementsByClassName('pagination')[0];
		var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : paginationCon,
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
	}
};
window.onload = function(){
	page.init();
}
