/*
 * 购物车逻辑
 * 1. 渲染list
 * 2. + - 全选，删除 选中 等从新调用接口
 * 3. table标签有当前商品的productId
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var nav             = require('page/common/nav/index.js');
var _mm                = require('util/mm');
var _cart          	   = require('service/cart-service');
var templateIndex      = require('./index.string');

var page = {
	data : {
		
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		var cartSelect = document.getElementsByClassName('cart-select')[0];
		//商品的选择 取消选择
         document.addEventListener('click',function(e){
         	//选中商品
         	if(e.target.className == 'cart-select'){
         	var productId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
         		if(e.target.checked){
         			_cart.selectProduct(productId,function(res){
         				 _this.renderCart(res);
         			},function(errMsg){
         				_this.showCartError();
         			});
         		}
         		//取消选中商品
         		else{
	         		_cart.unselectProduct(productId,function(res){
	         			_this.renderCart(res);
	         		},function(errMsg){
	         			_this.showCartError();
	         		})
         		}
         	}
         });
         // 商品的全选 / 取消全选
          document.addEventListener('click',function(e){
         	//如果点击的是 全选按钮
         	if(e.target.className == 'cart-select-all'){
         		if(e.target.checked){
         			_cart.selectAllProduct(function(res){
         				_this.renderCart(res);
         			},function(){
         				_this.showCartError();
         			})
         		}
         		//全不选
         		else{
	         		_cart.unselectAllProduct(function(res){
	         			_this.renderCart(res);
	         		},function(errMsg){
	         			_this.showCartError();
	         		})
         		}
         	}
         });
         //商品数量的变化
          document.addEventListener('click',function(e){
         	//如果点击的是+ - 按钮
         	if(_mm.hasClass(e.target,'count-btn')){
         		var  pCount 	 = e.target.parentElement.children[1];
         		var  currCount	 = parseInt(pCount.value);
         		var  minCount    = 1;
               	var  maxCount    = parseInt(pCount.getAttribute('data-max'));
               	var  type		 = _mm.hasClass(e.target,'plus')? 'plus' : 'minus';
               	var  productId   = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
         		var  newCount 	 = 0;
         		//单机加号
         		if(type == 'plus'){
         			if(currCount >= maxCount){
	                    _mm.errorTips('该商品数量已达到上限');
	                    return;
                	}
         			newCount = currCount + 1;
         		}
         		//点击减号
         		else if(type == 'minus'){
         			if(currCount <= minCount){
                   	 	return;
                	}
                	newCount = currCount - 1;
         		}
         		 // 更新购物车商品数量
	            _cart.updateProduct({
		                productId : productId,
		                count : newCount
		            }, function(res){
		                _this.renderCart(res);
		            }, function(errMsg){
		                _this.showCartError();
		            });
	         	}
         });
        //删除单个物品
        document.addEventListener('click',function(e){
        	if(_mm.hasClass(e.target,'cart-delete')){
        		if(window.confirm('确认要删除该商品？')){
        			//todo 此处不好看，写个原生的函数
	               	var  productId   = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
	        		_this.deleteCartProduct(productId);	
        		}
        	}
        });
        //删除选中按钮点击,支持多商品删除，用逗号分割
        document.addEventListener('click',function(e){
        	if(_mm.hasClass(e.target,'delete-selected')){
        		if(window.confirm('确认要删除选中的商品？')){
        		var selectedItem  = document.getElementsByClassName('cart-select');
                var arrProductIds = [];
                // 循环查找选中的productIds
                for(var i = 0, iLength = selectedItem.length; i < iLength; i ++){
                	if(selectedItem[i].checked){
                		var productId = selectedItem[i].parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
						arrProductIds.push(productId);
                	}
                }
                if(arrProductIds.length){
                	_this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }  
             }
        	}
        });
        //提交购物车
         document.addEventListener('click',function(e){
         	if(_mm.hasClass(e.target,'btn-submit')){
         		// 总价大于0，进行提交
	            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
	                window.location.href = './order-confirm.html';
	            }else{
	                _mm.errorTips('请选择商品后再提交');
	            }
         	}
         });
	},
	//加载购物车信息
	loadCart : function(){
		var _this	 = this;
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		})
	},
	//渲染购物车
	renderCart : function(data){
		var pageWrap = document.getElementsByClassName('page-wrap')[0];
		this.filter(data);
		//缓存购物车信息！！！最后提交的时候会用
		this.data.cartInfo = data;
		//生成HTML
		var cartHtml 	   = _mm.renderHtml(templateIndex,data);
		pageWrap.innerHTML = cartHtml;
		// 通知导航的购物车更新数量
        nav.loadCartCount();
	},
	// 删除指定商品，支持批量，productId用逗号分割
	deleteCartProduct : function(productIds){
		 var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
	},
	filter  :  function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError : function(){
		var pageWrap = document.getElementsByClassName('page-wrap')[0];
		pageWrap.innerHTML = "<p class='err-tip'>乾乾提示您，哪里不对了，刷新一下哦!</p>";
	}
};
window.onload = function(){
	page.init();
}