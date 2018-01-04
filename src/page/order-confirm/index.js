/**
 * 商品详情逻辑
 * 
 * 1. 加载地址列表
 * 2. 加载待付款商品列表
 * 3. 点击地址active，然后记住地址的id
 * 4. 点击编辑，调用获取此地址的接口，并把接口信息传过去，打开模态框。
 * 5. 点击删除，把id传进去，然后调用接口
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var nav               	 = require('page/common/nav/index.js');
var _mm               	 = require('util/mm');
var _order            	 = require('service/order-service');
var _address             = require('service/address-service');
var templateProduct      = require('./product-list.string');
var templateAddress      = require('./address-list.string');
var addressModal   		 = require('./address-modal.js');

var page = {
	data : {
		selectedAddressId : null
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		//点击地址active，然后记住地址的id，把其余的active 去掉
	     document.addEventListener('click',function(e){
	     	if(_mm.hasClass(e.target,'address-exist')){
	     		var addressItem		 = document.getElementsByClassName('address-item');
	     	    var addressItemNow   = e.target.parentElement;
	     	    var idSeleted 		 = addressItemNow.getAttribute("data-id");
	     	    //变为active
	     	    _mm.addClass(addressItemNow,'active');
	     	    //放入缓存
	     		_this.data.selectedAddressId = idSeleted;
	     		//其余去掉active
	     		for(var i=0,Length = addressItem.length;i<Length;i++){
	     			if(addressItem[i].getAttribute("data-id") != idSeleted){
	     				_mm.removeClass(addressItem[i],'active');
	     			}
	     		}
	     	}
	     });
	     //点击编辑新地址
	     document.addEventListener('click',function(e){
	     	if(_mm.hasClass(e.target,'address-update')){
	     		var shippingId = e.target.parentElement.parentElement.getAttribute("data-id");
	     		_address.getAddress(shippingId,function(res){
	     			//打开modal窗口，参数是update
	     			addressModal.show({
						isUpdate : true,
						data	 : res,
						onSuccess: function(){
							_this.loadAddressList();
						}
					});
	     		},function(errMsg){
	     			_mm.errorTips(errMsg);
	     		});
	     	}
	     		
	     });
	     //点击添加新地址
	     document.addEventListener('click',function(e){
	     	if(_mm.hasClass(e.target,'address-no-exist')){
				addressModal.show({
					isUpdate : false,
					onSuccess: function(){
						_this.loadAddressList();
					}
				});
	     	}
	     		
	     });
	      //点击删除地址
	     document.addEventListener('click',function(e){
	     	if(_mm.hasClass(e.target,'address-delete')){
				var id = e.target.parentElement.parentElement.getAttribute("data-id");
				if(window.confirm("确认要删除该地址吗？")){
					_address.deleteAddress(id,function(res){
						_this.loadAddressList();
					},function(errMsg){
						_mm.errorTips(errMsg);
					});
				}
	     	}
	     		
	     });
	     //提交订单
	     document.addEventListener('click',function(e){
	     	if(_mm.hasClass(e.target,'order-submit')){
	     		var selectedAddressId = _this.data.selectedAddressId;
	     		if(selectedAddressId){
	     			_order.createOrder({
	     				shippingId : selectedAddressId
	     			},function(res){
	     				window.location.href = "./payment.html?orderNumber=" + res.orderNo;
	     			},function(errMsg){
	     				_mm.errorTips(errMsg);
	     			})
	     		}else{
	     			_mm.errorTips("请选择地址后再提交!");
	     		}
	     	}
	     });
	},
	//加载地址列表
	loadAddressList : function(){
		var addressCon		 = document.getElementsByClassName('address-con')[0];
		var _this	 		 = this;
		addressCon.innerHTML = "<div class='loading'></div>";
		//获取地址列表
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressListHtml  = _mm.renderHtml(templateAddress,res);
			addressCon.innerHTML = addressListHtml;
		},function(errMsg){
			addressCon.innerHTML =  "<p class='err-tip'>地址加载失败，请刷新重试</p>";
		})
	},
	//处理地址列表active
	/*
	 * 遍历收件人地址列表，如果 此地址信息的id和缓存中的一样，就给此res加一个 active的属性
	 */
	addressFilter : function(data){
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false ;
			for(var i = 0,length = data.list.length; i < length;i++){
				if(data.list[i].id == this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			}
			//如果以前选中的地址不再列表里面，将其删除
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	//加载待付款商品列表
	loadProductList : function(){ 
		var productCon		 = document.getElementsByClassName('product-con')[0];
		var _this			 = this;
		productCon.innerHTML = "<div class='loading'></div>";
		//获取商品列表
		_order.getProductList(function(res){
			var productListHtml  = _mm.renderHtml(templateProduct,res);
			productCon.innerHTML = productListHtml;
		},function(errMsg){
			productCon.innerHTML =  "<p class='err-tip'>商品列表加载失败，请刷新重试</p>";
		})
		
	},
};
window.onload = function(){
	page.init();
}