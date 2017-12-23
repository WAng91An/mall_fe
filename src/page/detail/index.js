/**
 * 商品详情页 逻辑
 * 1. 页面加载调用接口，把获取的数据渲染到 页面
 * 2. + - 按钮事件
 * 3. 缩路图移入事件
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm                = require('util/mm');
var _cart          	   = require('service/cart-service');
var _product           = require('service/product-service');
var templateIndex      = require('./index.string');

var page = {
	data : {
			productId : _mm.getUrlParam('productId') 	|| '',
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//没穿productId回家啊~
		if(!this.data.productId){
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
        // 图片预览
        
         document.addEventListener('mouseenter',function(e){
         	if(e.target.className == 'p-img-item'){
         		var mainImg  = document.getElementsByClassName('main-img')[0];
         		var imageUrl = e.target.children[0].getAttribute('src');
         		mainImg.setAttribute('src',imageUrl)
         	}
         });
        // count的操作
        document.addEventListener('click',function(e){
        		var pCount 		= document.getElementsByClassName('p-count')[0];
        		var currCount   = parseInt(pCount.value);
        		var minCount    = 1;
              	var maxCount    = _this.data.detailInfo.stock || 1;
        	if(e.target.className == 'p-count-btn plus'){
                pCount.value = (currCount < maxCount ? currCount + 1 : maxCount);
        	}else if(e.target.className == 'p-count-btn minus'){
        		 pCount.value = (currCount > minCount ? currCount - 1 : minCount);
        	}
        		
        });
        // 加入购物车
         document.addEventListener('click',function(e){
         	var pCount 	= document.getElementsByClassName('p-count')[0];
         	if(e.target.className == 'cart-add'){
	         		_cart.addToCart({
	                productId   : _this.data.productId,
	                count       : pCount.value
	            }, function(res){
	                window.location.href = './result.html?type=cart-add';
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
         	}
         });
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
	},
	//加载商品详情
	loadDetail : function(){
		var _this	 = this;
		var pageWrap = document.getElementsByClassName('page-wrap')[0];
		var html 	 = '';
		//loading
		pageWrap.innerHTML = "<div class='loading'></div>";
		//请求detail信息
		_product.getProductDetail(this.data.productId,function(res){
			//subImages 用逗号分隔开
			_this.filter(res);
			// 缓存住detail的数据
            _this.data.detailInfo = res;
			html = _mm.renderHtml(templateIndex,res);
			pageWrap.innerHTML = html;
		},function(errMsg){
			pageWrap.innerHTML = "<p class='err-tip'>奇怪了，此商品竟然找不到了！</p>";
		})
	},
	filter  :  function(data){
		data.subImages = data.subImages.split(',');
	}
};
window.onload = function(){
	page.init();
}
