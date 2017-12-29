webpackJsonp([4],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 
 * 用户登录网络请求
 */
var _mm     = __webpack_require__(0);

var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 头部导航逻辑部分
 * 1.点击登陆到登陆页面
 * 2.点击注册到注册页面
 * 3.点击退出调用注销接口
 * 4.加载用户信息 欢迎您
 * 5.加载购物车数量
 */
__webpack_require__(3);
var _mm     = __webpack_require__(0);
var _user   = __webpack_require__(1);
var _cart   = __webpack_require__(4);

// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
    	var jsLogin 	= document.getElementsByClassName('js-login')[0];
    	var jsRegister  = document.getElementsByClassName('js-register')[0];
    	var jsLogout	= document.getElementsByClassName('js-logout')[0];
        // 登录点击事件
        jsLogin.onclick = function(){
        	_mm.doLogin();
        }
        // 注册点击事件
        jsRegister.onclick = function(){
        	 window.location.href = './user-register.html';
        }
        // 退出点击事件
        jsLogout.onclick = function(){
        	_user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        }
    },
    	// 加载用户信息
        loadUserInfo : function(){
        _user.checkLogin(
        	function(res){
	        	var notLogin = document.getElementsByClassName('not-login')[0];
	        	var login    = document.getElementsByClassName('login')[0];
	        	var userName = document.getElementsByClassName('username')[0];
	        		notLogin.style.display  = 'none';
	        		// to do 
	        		login.style.display		= 'inline-block';
	        		userName.innerHTML 		=  res.username;
       	 }, 
        function(errMsg){
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
    	var cartCount = document.getElementsByClassName('cart-count')[0];
        _cart.getCartCount(function(res){
        	cartCount.innerHTML = res || 0;
        }, function(errMsg){
        	cartCount.innerHTML =  0;
        });
    }
}

module.exports = nav.init();

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 购物车的网络请求
 */
var _mm     = __webpack_require__(0);

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
var _mm     = __webpack_require__(0);

//通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var searchInput = document.getElementById('search-input');
		var keyword = _mm.getUrlParam('keyword');
		//keyword 存在，则回填输入框
		if(keyword){
			searchInput.value = keyword;
		}
	},
	bindEvent : function(){
		var _this = this;
		var searchInput = document.getElementById('search-input');
		var searchBtn = document.getElementById('search-btn');
		//电击Go后做搜索提交
		searchBtn.onclick = function(){
			_this.searchSubmit();
		}
		//输入回车后，做搜索提交
		searchInput.onkeyup = function(e){
			if(e.keyCode === 13 ){
				_this.searchSubmit();
			}
			
		}
	},
	// 搜索提交
	searchSubmit : function(){
		var searchInput = document.getElementById('search-input');
		var keyword = $.trim(searchInput.value);
		//如果提交的时候有keyword,正常跳转到list页面
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果keyword为空，直接回到首页
		else{
			_mm.goHome();
		}
	}
};

header.init();

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(57);


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 商品列表逻辑
 */
__webpack_require__(58);
__webpack_require__(2);
__webpack_require__(5);

var _mm                = __webpack_require__(0);
var _product           = __webpack_require__(59);
var templateIndex      = __webpack_require__(60);

var page = {
	data : {
		listParam : {
			keyword 	: _mm.getUrlParam('keyword') 	|| '',
			categoryId  : _mm.getUrlParam('categoryId') || '',
			orderBy 	: _mm.getUrlParam('orderBy')  	|| 'default',
			pageNum 	: _mm.getUrlParam('pageNum')    || 1,
			pageSize 	: _mm.getUrlParam('pageSize')   || 20
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
		
	},
	//渲染list
	loadList : function(){
		var _this     = this;
		var listHtml  = '';
		var listParam = this.data.listParam;
		_product.getProductList(listParam, function(res){
			var listCon = document.getlementsByClassName('p-list-con')[0];
			listHtml = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			listCon.innerHTML = listHtml;
			_this.loadPagination(res.pageNum, res.pages);
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	//加载分页信息
	loadPagination : function(pageNum,pages){
		
	}
};
window.onload = function(){
	page.init();
}


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * 商品的网络请求
 */



var _mm = __webpack_require__(0);

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = "和";

/***/ })

},[56]);