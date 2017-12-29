webpackJsonp([3],{

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

/***/ 6:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

/*
 * nav-side js逻辑
 * 1.渲染导航内容，根据传进来的值，把相应的页面导航变成active
 * 2.把渲染后的html放入容器
 */
__webpack_require__(8);
var _mm     		  = __webpack_require__(0);
var templateIndex     = __webpack_require__(9);


// 侧边导航
var navSide = {
	option : {
		name : '',
		navList	: [
			{name : 'user-center', desc : '个人中心',  href : './user-center.html'},
			{name : 'order-list',  desc : '我的订单',  href : './order-list.html'},
			{name : 'user-pass-update', desc : '修改密码',  href : './user-pass-update.html'},
			{name : 'about',       desc : '关于WMall', href : './about.html'}
		]
	},
    init : function(option){
    	//合并选项
    	$.extend(this.option, option);
      	this.renderNav();
    },
    	//渲染导航内容
    renderNav : function(){
    	var navSideUl = document.getElementsByClassName('nav-side')[0];
    	//计算active数据
    	for (var i = 0 ,iLength = this.option.navList.length ; i< iLength; i++) {
    		if(this.option.navList[i].name === this.option.name){
    			this.option.navList[i].isActive = true;
    		}
    	};
    	// 渲染list数据
    	var navHtml = _mm.renderHtml(templateIndex,{
    		navList : this.option.navList
    	});
    	//把HTML放入容器
    	navSideUl.innerHTML = navHtml;
    }
};

module.exports = navSide;

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

/*
 * 用户密码修改
 * 
 */

__webpack_require__(80);
__webpack_require__(2);
__webpack_require__(5);
var navSide         = __webpack_require__(7);
var _mm             = __webpack_require__(0);
var _user           = __webpack_require__(1);
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作，因为先加载js 后才后的节点，必须通过冒泡
        document.addEventListener('click',function(e){
        	var passwordVal 		= document.getElementById('password').value;
        	var passwordNewVal 		= document.getElementById('password-new').value;
        	var passwordConfirmVal  = document.getElementById('password-confirm').value;
        	if(e.target.innerHTML == "提交"){
	        	var userInfo = {
	                password       	   : $.trim(passwordVal),
	                passwordNew        : $.trim(passwordNewVal),
	                passwordConfirm    : $.trim(passwordConfirmVal),
	            },
		        validateResult = _this.validateForm(userInfo);
	            if(validateResult.status){
	                // 更改密码
	                _user.updatePassword({
	                	passwordOld : userInfo.password,
	                	passwordNew : userInfo.passwordNew
	                }, function(res, msg){
	                    _mm.successTips(msg);
	                }, function(errMsg){
	                    _mm.errorTips(errMsg);
	                });
	            }
	            else{
	                _mm.errorTips(validateResult.msg);
	            }
        	}
        },true);
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是不是空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码不得少于6位 ';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(formData.passwordNew != formData.passwordConfirm){
            result.msg = '两次输入的密码不一样';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
window.onload = function(){
	page.init();
}


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n\t<a href=\"{{href}}\" class=\"link\" href=\"\">{{desc}}</a>\r\n</li>\r\n{{/navList}}\r\n\r\n\r\n";

/***/ })

},[78]);